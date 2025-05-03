
/**
 * Handles POST requests, typically from a web form submission.
 * Saves the data to a Google Sheet, exports it to XLSX in Drive, and returns a JSON response.
 * Expects data in the request body as JSON: { name, email, subject, message }
 */
function doPost(e) {
  // Enable CORS by allowing requests from any origin (adjust if needed for specific domains)
  const responseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
    'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
  };

  // Handle preflight OPTIONS request for CORS
  if (e.postData.type === 'application/json' && e.postData.contents === 'OPTIONS') {
    return ContentService.createTextOutput()
      .setMimeType(ContentService.MimeType.JSON)
      .setContent(JSON.stringify({ success: true })) // Respond affirmatively to OPTIONS
      .withHeaders(responseHeaders);
  }


  // --- Configuration ---
  const SPREADSHEET_NAME = "Portfolio Contact Submissions";
  const SHEET_NAME = "Submissions";
  const EXPORT_FOLDER_NAME = "Portfolio Exports"; // Folder in Google Drive to save XLSX exports
  const EXPORT_FILENAME_PREFIX = "PortfolioSubmissions_"; // Prefix for the exported XLSX file

  try {
    // --- Parse Incoming Data ---
    let requestData;
    if (e.postData.type === 'application/json') {
      requestData = JSON.parse(e.postData.contents);
    } else {
      // Handle form-urlencoded data if necessary (less common with fetch JSON)
      // requestData = e.parameter; // Access parameters directly
      throw new Error("Unsupported content type. Expected application/json.");
    }

    const name = requestData.name || 'N/A';
    const email = requestData.email || 'N/A';
    const subject = requestData.subject || 'N/A';
    const message = requestData.message || 'N/A';
    const timestamp = new Date();

    // --- Google Sheet Interaction ---
    let spreadsheet = getOrCreateSpreadsheet_(SPREADSHEET_NAME);
    let sheet = getOrCreateSheet_(spreadsheet, SHEET_NAME);

    // Add headers if the sheet is new/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
      SpreadsheetApp.flush(); // Ensure headers are written before adding data
    }

    // Append the new submission data
    sheet.appendRow([timestamp, name, email, subject, message]);
    SpreadsheetApp.flush(); // Ensure data is written

    // --- Google Drive Export (XLSX) ---
    exportSheetToXlsx_(spreadsheet, sheet.getName(), EXPORT_FOLDER_NAME, EXPORT_FILENAME_PREFIX);


    // --- Success Response ---
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .withHeaders(responseHeaders); // Include CORS headers in the success response

  } catch (error) {
    Logger.log("Error processing form submission: " + error.toString());
    Logger.log("Stack Trace: " + error.stack); // Log stack trace for debugging
    // --- Error Response ---
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Failed to process submission: " + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .withHeaders(responseHeaders); // Include CORS headers in the error response
  }
}


/**
 * Gets a Google Spreadsheet by name, creating it if it doesn't exist.
 * @param {string} spreadsheetName The name of the spreadsheet.
 * @return {Spreadsheet} The Google Spreadsheet object.
 * @private
 */
function getOrCreateSpreadsheet_(spreadsheetName) {
  const files = DriveApp.getFilesByName(spreadsheetName);
  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.openById(file.getId());
  } else {
    Logger.log("Spreadsheet '" + spreadsheetName + "' not found. Creating new one.");
    return SpreadsheetApp.create(spreadsheetName);
  }
}

/**
 * Gets a specific sheet within a spreadsheet by name, creating it if it doesn't exist.
 * @param {Spreadsheet} spreadsheet The parent spreadsheet object.
 * @param {string} sheetName The name of the sheet.
 * @return {Sheet} The Google Sheet object.
 * @private
 */
function getOrCreateSheet_(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Sheet '" + sheetName + "' not found in spreadsheet '" + spreadsheet.getName() + "'. Creating new one.");
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

/**
 * Exports a specific sheet from a Google Spreadsheet to XLSX format in a specified Google Drive folder.
 * @param {Spreadsheet} spreadsheet The spreadsheet containing the sheet.
 * @param {string} sheetName The name of the sheet to export.
 * @param {string} folderName The name of the Drive folder to save the export.
 * @param {string} filenamePrefix The prefix for the exported filename.
 * @private
 */
function exportSheetToXlsx_(spreadsheet, sheetName, folderName, filenamePrefix) {
  try {
    const spreadsheetId = spreadsheet.getId();
    const sheetId = spreadsheet.getSheetByName(sheetName).getSheetId(); // Get GID

    // --- Get or Create Export Folder ---
    let folder = getOrCreateFolder_(folderName);

    // --- Construct Export URL ---
    // Reference: https://developers.google.com/drive/api/v3/ref-export-formats
    const url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export?format=xlsx&gid=" + sheetId;

    const params = {
      method: "GET",
      headers: { "Authorization": "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true // Prevent throwing error for non-200 responses
    };

    const response = UrlFetchApp.fetch(url, params);

    if (response.getResponseCode() == 200) {
      const blob = response.getBlob();
      const timestampSuffix = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
      const filename = filenamePrefix + timestampSuffix + ".xlsx";

      // Delete existing files with the same prefix in the folder to keep only the latest (optional)
      const existingFiles = folder.getFilesByName(filenamePrefix + "*");
      while (existingFiles.hasNext()) {
          const oldFile = existingFiles.next();
          Logger.log("Deleting old export file: " + oldFile.getName());
          oldFile.setTrashed(true); // Move to trash instead of permanent delete
      }

      const newFile = folder.createFile(blob.setName(filename));
      Logger.log("Successfully exported '" + sheetName + "' to '" + newFile.getName() + "' in folder '" + folder.getName() + "'.");
    } else {
      Logger.log("Error exporting sheet to XLSX. Response Code: " + response.getResponseCode());
      Logger.log("Response Content: " + response.getContentText());
      throw new Error("Failed to export sheet. Response code: " + response.getResponseCode());
    }
  } catch (error) {
    Logger.log("Error during XLSX export: " + error.toString());
    throw error; // Re-throw the error to be caught by the main doPost function
  }
}

/**
 * Gets a Google Drive folder by name, creating it if it doesn't exist.
 * @param {string} folderName The name of the folder.
 * @return {Folder} The Google Drive Folder object.
 * @private
 */
function getOrCreateFolder_(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    Logger.log("Folder '" + folderName + "' not found. Creating new one.");
    return DriveApp.createFolder(folderName);
  }
}

// Optional: Add a doGet function for basic testing or verification if needed
function doGet(e) {
  return ContentService.createTextOutput("Apps Script backend is running. Use POST to submit data.");
}
