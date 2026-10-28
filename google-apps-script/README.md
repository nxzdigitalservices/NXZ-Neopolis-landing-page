# Google Sheets Integration Guide for Neopolis Luxury Residences

## Target Spreadsheet Details
- **Spreadsheet URL:** [https://docs.google.com/spreadsheets/d/1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk/edit?usp=sharing)
- **Spreadsheet ID:** `1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk`

---

## 7-Column Data Schema

Each enquiry submitted from the website creates a new row with the following 7 columns in this exact sequence:

| Col | Header Name | Description |
|---|---|---|
| **A** | `Date` | Submission date and time in IST (e.g. `26/10/2026, 03:45:20 PM`) |
| **B** | `Full Name` | Visitor full name |
| **C** | `Mobile Number` | Contact phone number (formatted as text to retain leading 0s) |
| **D** | `Email Address` | Visitor email address |
| **E** | `Enquiry Type` | Property Enquiry, Site Visit, Price List Request, etc. |
| **F** | `Preferred Project in Neopolis` | Selected or active property name |
| **G** | `Message` | Detailed message or requirement |

---

## Deployment & Update Instructions

### Option 1: Updating an Existing Deployment (Recommended)
1. Open Google Sheets → Click **Extensions > Apps Script**.
2. Replace the contents of `Code.gs` with the updated script.
3. Click the **Save** (floppy disk) icon.
4. In the top right, click **Deploy** → **Manage deployments**.
5. Select the active deployment on the left.
6. Click the **Pencil (Edit)** icon at the top right of the popup.
7. Under **Version**, click the dropdown and choose **"New version"** *(Crucial: if you leave it on the old version, Google will continue running the old 4-column code!)*.
8. Click **Deploy**.

### Option 2: Creating a New Deployment
1. Open Google Sheets → Click **Extensions > Apps Script**.
2. Paste the script into `Code.gs` and click **Save**.
3. In the top right, click **Deploy** → **New deployment**.
4. Click the gear icon ⚙️ and select **Web app**.
5. Set:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
6. Click **Deploy**.
7. Copy the resulting Web App URL.
