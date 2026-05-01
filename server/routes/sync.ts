import { Router, Request, Response } from "express";

const router = Router();

/**
 * GitHub Sync Endpoint
 * POST /api/sync/github
 * Syncs patent specifications to GitHub repository
 */
router.post("/github", async (req: Request, res: Response) => {
  try {
    const { filename, content, patentNumber, message } = req.body;

    // Validate inputs
    if (!filename || !content || !patentNumber) {
      return res.status(400).json({
        error: "Missing required fields: filename, content, patentNumber",
      });
    }

    // GitHub API credentials from environment
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || "solidarmadillo8979/omega-lab-patents";
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (!githubToken) {
      return res.status(500).json({
        error: "GitHub token not configured",
      });
    }

    // Get current file SHA (if it exists) for update
    let sha: string | undefined;
    try {
      const getResponse = await fetch(
        `https://api.github.com/repos/${githubRepo}/contents/${filename}?ref=${githubBranch}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      }
    } catch (error) {
      // File doesn't exist yet, that's fine
    }

    // Create or update file via GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${githubRepo}/contents/${filename}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message || `Update patent: ${patentNumber}`,
          content, // Base64 encoded
          branch: githubBranch,
          ...(sha && { sha }), // Include SHA if updating existing file
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GitHub API error: ${error.message}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      message: `Patent ${patentNumber} synced to GitHub`,
      url: result.content.html_url,
    });
  } catch (error) {
    console.error("GitHub sync error:", error);
    res.status(500).json({
      error: "Failed to sync to GitHub",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Google Drive Sync Endpoint
 * POST /api/sync/google-drive
 * Syncs patent specifications to Google Drive
 */
router.post("/google-drive", async (req: Request, res: Response) => {
  try {
    const { filename, content, patentNumber, mimeType } = req.body;

    // Validate inputs
    if (!filename || !content || !patentNumber) {
      return res.status(400).json({
        error: "Missing required fields: filename, content, patentNumber",
      });
    }

    // Google Drive API credentials from environment
    const googleDriveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const googleServiceAccount = process.env.GOOGLE_SERVICE_ACCOUNT;

    if (!googleDriveFolderId || !googleServiceAccount) {
      return res.status(500).json({
        error: "Google Drive configuration not available",
      });
    }

    // Parse service account JSON
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(googleServiceAccount);
    } catch (error) {
      return res.status(500).json({
        error: "Invalid Google service account configuration",
      });
    }

    // Get access token from Google
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: serviceAccount.client_id,
        client_secret: serviceAccount.client_secret,
        refresh_token: serviceAccount.refresh_token || "",
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get Google access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Check if file already exists
    let fileId: string | undefined;
    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='${filename}' and '${googleDriveFolderId}' in parents and trashed=false&spaces=drive&fields=files(id)`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.files && searchData.files.length > 0) {
          fileId = searchData.files[0].id;
        }
      }
    } catch (error) {
      // File doesn't exist yet, that's fine
    }

    // Create or update file
    let fileResponse;
    if (fileId) {
      // Update existing file
      fileResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?uploadType=media`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": mimeType || "application/json",
          },
          body: content,
        }
      );
    } else {
      // Create new file
      const metadata = {
        name: filename,
        parents: [googleDriveFolderId],
        mimeType: mimeType || "application/json",
      };

      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      formData.append("file", new Blob([content], { type: mimeType || "application/json" }));

      fileResponse = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
    }

    if (!fileResponse.ok) {
      const error = await fileResponse.json();
      throw new Error(`Google Drive API error: ${error.error.message}`);
    }

    const result = await fileResponse.json();

    res.json({
      success: true,
      message: `Patent ${patentNumber} synced to Google Drive`,
      fileId: result.id,
    });
  } catch (error) {
    console.error("Google Drive sync error:", error);
    res.status(500).json({
      error: "Failed to sync to Google Drive",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
