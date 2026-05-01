# Patent Sync Setup Guide

This document explains how to configure automatic syncing of patent specifications to GitHub and Google Drive.

## Overview

When you update a patent in the Omega Lab Patent Reservoir, the system can automatically:
1. Create/update a markdown file in the GitHub repository with full specifications
2. Create/update a JSON document in Google Drive with technical details
3. Maintain a complete audit trail of all patent updates

## GitHub Setup

### 1. Create a Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `omega-lab-patents-sync`
4. Select scopes:
   - `repo` (full control of private repositories)
   - `workflow` (if you want to trigger workflows)
5. Copy the token (you won't see it again)

### 2. Set Environment Variable

Add to your `.env` file:

```
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_REPO=solidarmadillo8979/omega-lab-patents
GITHUB_BRANCH=main
```

### 3. Repository Structure

Patents are stored in the `patents/` directory:

```
omega-lab-patents/
├── patents/
│   ├── OL-2023-0814.md
│   ├── OL-2024-XXXX.md
│   └── ...
├── README.md
└── ...
```

Each patent file contains:
- Full title and specifications
- Key features
- Technical specifications
- Applications and use cases
- Metadata and licensing

## Google Drive Setup

### 1. Create a Service Account

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable Google Drive API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the details and create
5. Generate a key:
   - Click on the service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose JSON format
   - Download the key file

### 2. Share Google Drive Folder with Service Account

1. Create a folder in Google Drive for patents (e.g., "Omega Lab Patents")
2. Right-click → "Share"
3. Copy the service account email from the JSON key file (looks like: `xxx@xxx.iam.gserviceaccount.com`)
4. Paste it in the share dialog and give it "Editor" access
5. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

### 3. Set Environment Variables

Add to your `.env` file:

```
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

**Note:** The `GOOGLE_SERVICE_ACCOUNT` should be the entire JSON content from the key file (as a single line or properly escaped).

## Triggering Syncs

### Automatic Sync on Patent Update

When you save a patent via the admin editor:

1. Click the edit button on a patent
2. Enter your creator password
3. Make changes and click "Save Changes"
4. The system will automatically:
   - Update the patent in the reservoir
   - Sync specifications to GitHub
   - Sync specifications to Google Drive

### Manual Sync (API Endpoint)

You can also trigger syncs manually via API:

```bash
# Sync to GitHub
curl -X POST http://localhost:3000/api/sync/github \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "patents/OL-2023-0814.md",
    "content": "base64_encoded_content",
    "patentNumber": "OL-2023-0814",
    "message": "Update patent specifications"
  }'

# Sync to Google Drive
curl -X POST http://localhost:3000/api/sync/google-drive \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "OL-2023-0814 - Acousto-Resonant Biometric Attuner",
    "content": "json_content",
    "patentNumber": "OL-2023-0814",
    "mimeType": "application/json"
  }'
```

## File Formats

### GitHub (Markdown)

Patents are stored as markdown files with:
- Title and metadata
- Overview/description
- Key features (bullet list)
- Technical specifications
- Applications and use cases
- License and source information

Example: `patents/OL-2023-0814.md`

### Google Drive (JSON)

Patents are stored as JSON documents with:
- Metadata (patent number, title, inventor, date, category)
- Description
- Features array
- Specifications object
- Applications array
- License and source information

Example: `OL-2023-0814 - Acousto-Resonant Biometric Attuner.json`

## Troubleshooting

### GitHub Sync Fails

- Verify your personal access token is valid and has `repo` scope
- Check that the repository name is correct
- Ensure the `GITHUB_TOKEN` environment variable is set
- Check server logs for detailed error messages

### Google Drive Sync Fails

- Verify the service account has been shared with the folder
- Check that the folder ID is correct
- Ensure the service account JSON is properly formatted
- Verify Google Drive API is enabled in your project
- Check server logs for detailed error messages

### Files Not Appearing

- Check that you have the correct permissions in GitHub/Google Drive
- Verify the sync endpoint is being called (check server logs)
- Try manual sync via API to test connectivity
- Check for rate limiting (GitHub has 5,000 requests/hour, Google Drive has quotas)

## Security Notes

- **Never commit `.env` files** to version control
- Store credentials securely (use environment variables, not hardcoded values)
- Rotate personal access tokens periodically
- Use service accounts with minimal required permissions
- Keep GitHub repository private to protect patent information

## Future Enhancements

- [ ] Automatic GitHub releases for patent versions
- [ ] Webhook integration for real-time sync notifications
- [ ] Backup sync to additional platforms (GitLab, Notion, etc.)
- [ ] Automatic changelog generation
- [ ] Patent versioning and history tracking
- [ ] Collaboration notifications for contributors
