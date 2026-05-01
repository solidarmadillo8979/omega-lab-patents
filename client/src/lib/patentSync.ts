/**
 * Patent Sync Utility
 * Handles syncing patent specifications to GitHub and Google Drive
 * Triggered whenever a patent is updated
 */

interface PatentData {
  patentNumber: string;
  title: string;
  inventor: string;
  date: string;
  description: string;
  category: string;
  features: string[];
  specifications?: Record<string, string>;
  applications?: string[];
}

/**
 * Generate markdown documentation for a patent
 */
export function generatePatentMarkdown(patent: PatentData): string {
  const markdown = `# ${patent.title}

**Patent Number:** ${patent.patentNumber}  
**Inventor:** ${patent.inventor}  
**Date:** ${patent.date}  
**Category:** ${patent.category}

## Overview

${patent.description}

## Key Features

${patent.features.map((feature) => `- ${feature}`).join("\n")}

## Specifications

${
  patent.specifications
    ? Object.entries(patent.specifications)
        .map(([key, value]) => `- **${key}:** ${value}`)
        .join("\n")
    : "No specifications available."
}

## Applications

${
  patent.applications && patent.applications.length > 0
    ? patent.applications.map((app) => `- ${app}`).join("\n")
    : "No applications listed."
}

---

*This patent is part of the Omega Lab Patent Reservoir - an open-source initiative for scientific discovery.*  
*For more information, visit: https://github.com/solidarmadillo8979/omega-lab-patents*
`;

  return markdown;
}

/**
 * Generate JSON specification file for a patent
 */
export function generatePatentJSON(patent: PatentData): string {
  return JSON.stringify(
    {
      metadata: {
        patentNumber: patent.patentNumber,
        title: patent.title,
        inventor: patent.inventor,
        date: patent.date,
        category: patent.category,
        synced: new Date().toISOString(),
      },
      description: patent.description,
      features: patent.features,
      specifications: patent.specifications || {},
      applications: patent.applications || [],
      source: "Omega Lab Patent Reservoir",
      license: "MIT",
    },
    null,
    2
  );
}

/**
 * Sync patent to GitHub via API
 * Creates or updates a file in the repository
 */
export async function syncPatentToGitHub(patent: PatentData): Promise<void> {
  try {
    const filename = `patents/${patent.patentNumber}.md`;
    const content = generatePatentMarkdown(patent);
    const encodedContent = btoa(content); // Base64 encode

    // This would be called from a backend endpoint that has GitHub credentials
    const response = await fetch("/api/sync/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename,
        content: encodedContent,
        patentNumber: patent.patentNumber,
        message: `Update patent: ${patent.title}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub sync failed: ${response.statusText}`);
    }

    console.log(`✓ Patent ${patent.patentNumber} synced to GitHub`);
  } catch (error) {
    console.error("GitHub sync error:", error);
    throw error;
  }
}

/**
 * Sync patent to Google Drive
 * Creates or updates a document in the designated folder
 */
export async function syncPatentToGoogleDrive(patent: PatentData): Promise<void> {
  try {
    const filename = `${patent.patentNumber} - ${patent.title}`;
    const content = generatePatentJSON(patent);

    // This would be called from a backend endpoint that has Google Drive credentials
    const response = await fetch("/api/sync/google-drive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename,
        content,
        patentNumber: patent.patentNumber,
        mimeType: "application/json",
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Drive sync failed: ${response.statusText}`);
    }

    console.log(`✓ Patent ${patent.patentNumber} synced to Google Drive`);
  } catch (error) {
    console.error("Google Drive sync error:", error);
    throw error;
  }
}

/**
 * Sync patent to both GitHub and Google Drive
 */
export async function syncPatentToAll(patent: PatentData): Promise<void> {
  try {
    await Promise.all([
      syncPatentToGitHub(patent),
      syncPatentToGoogleDrive(patent),
    ]);
    console.log(`✓ Patent ${patent.patentNumber} synced to all platforms`);
  } catch (error) {
    console.error("Sync error:", error);
    throw error;
  }
}
