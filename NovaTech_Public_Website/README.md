# NovaTech IT Service Portal

Public static website for the NovaTech student project.

## Pages
- `index.html` — Home
- `submit-ticket.html` — Submit an IT support request through the configured Google Form
- `knowledge-base.html` — Troubleshooting guides and change request process
- `team.html` — Team roles
- `dashboard.html` — Illustrative sample dashboard

## Publish with GitHub Pages
1. Upload the **contents** of this folder to the root of a public GitHub repository.
2. In the repository, select **Settings → Pages**.
3. Set Source to **Deploy from a branch**, Branch to `main`, Folder to `/(root)`, then Save.
4. Wait for deployment and open the URL shown in Pages settings.

## Connect the Google Form
Edit `js/google-form-config.js` and populate `responderUrl` and `embedUrl` with the responder URL and iframe `src` URL from your Google Form. Save and upload the updated file.

## Privacy and data notes
- This public website package intentionally excludes the SLA/SOP Word documents, Google Apps Script source, setup files, and the private Google Sheets ticket register.
- Do not upload student IDs, signatures, passwords, confidential ticket records, or private documents to a public repository.
- The dashboard currently shows illustrative sample figures and is not connected live to the private ticket register.
- Ensure the Google Form and linked spreadsheet use appropriate access settings before sharing the website.
