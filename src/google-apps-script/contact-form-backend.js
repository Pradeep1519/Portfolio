
// Google Apps Script Backend for Portfolio Contact Form

// --- Configuration ---
var SPREADSHEET_NAME = "ContactResponses"; // Name of the Google Sheet to store responses
var SHEET_NAME = "Submissions"; // Name of the specific sheet within the spreadsheet
var FOLDER_NAME = "PortfolioContactFormBackups"; // Optional: Name of the Google Drive folder for backups
var CREATE_XLSX_BACKUP = false; // Optional: Set to true to enable Excel backups

// --- Main Function: Handles POST requests ---
function doPost(e) {
  // Enable CORS (allow requests from any origin)
  // Note: For production, consider restricting the origin if possible,
  // but Apps Script web apps often require '*' for cross-domain POST.
  var response = {
    success: false,
    error: "An unknown error occurred.",
  };

  try {
    // --- 1. Parse Incoming Data ---
    // Data sent as 'application/x-www-form-urlencoded' is in e.parameter
    // Data sent as 'application/json' would be in JSON.parse(e.postData.contents)
    var name = e.parameter.name;
    var email = e.parameter.email;
    var subject = e.parameter.subject;
    var message = e.parameter.message;
    var timestamp = new Date();

    // --- Basic Validation (Server-Side) ---
    if (!name || !email || !subject || !message) {
      throw new Error("Missing required form fields.");
    }
    // Very basic email format check
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
       throw new Error("Invalid email format provided.");
    }


    // --- 2. Get or Create Spreadsheet & Sheet ---
    var ss = getOrCreateSpreadsheet_(SPREADSHEET_NAME);
    var sheet = getOrCreateSheet_(ss, SHEET_NAME);

    // --- 3. Ensure Headers Exist ---
    ensureHeaders_(sheet, ["Timestamp", "Name", "Email", "Subject", "Message"]);

    // --- 4. Append Data to Sheet ---
    sheet.appendRow([timestamp, name, email, subject, message]);

    // --- 5. Optional: Create XLSX Backup ---
    if (CREATE_XLSX_BACKUP) {
      createXlsxBackup_(ss, FOLDER_NAME);
    }

    // --- 6. Prepare Success Response ---
    response.success = true;
    delete response.error; // Remove error key on success

  } catch (error) {
    // --- Handle Errors ---
    Logger.log("Error processing form submission: " + error.toString());
    Logger.log("Stack Trace: " + error.stack); // Log stack trace for debugging
     // Log the raw event object for detailed debugging
    Logger.log("Raw Event Object (e): " + JSON.stringify(e, null, 2));

    response.success = false;
    // Provide a user-friendly error message, but log the technical details
    response.error = "Failed to process submission. Error: " + error.message;
  }

  // --- 7. Return JSON Response ---
  return ContentService.createTextOutput(JSON.stringify(response))
                     .setMimeType(ContentService.MimeType.JSON);
}

// --- Helper Function: Get or create Spreadsheet ---
function getOrCreateSpreadsheet_(spreadsheetName) {
  var files = DriveApp.getFilesByName(spreadsheetName);
  if (files.hasNext()) {
    // Spreadsheet exists, open it
    var file = files.next();
    return SpreadsheetApp.openById(file.getId());
  } else {
    // Spreadsheet doesn't exist, create it
    Logger.log("Spreadsheet '" + spreadsheetName + "' not found. Creating...");
    var ss = SpreadsheetApp.create(spreadsheetName);
    Logger.log("Spreadsheet created with ID: " + ss.getId());
    // Move to the specified folder if backup is enabled
     if (CREATE_XLSX_BACKUP) {
       try {
        var folder = getOrCreateFolder_(FOLDER_NAME);
        DriveApp.getFileById(ss.getId()).moveTo(folder);
        Logger.log("Spreadsheet moved to folder: " + FOLDER_NAME);
       } catch (moveError) {
          Logger.log("Warning: Could not move spreadsheet to folder '" + FOLDER_NAME + "'. Error: " + moveError.message);
          // Continue execution even if move fails
       }
     }
    return ss;
  }
}


// --- Helper Function: Get or create Sheet within Spreadsheet ---
function getOrCreateSheet_(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    return sheet;
  } else {
    Logger.log("Sheet '" + sheetName + "' not found in spreadsheet. Creating...");
    var newSheet = spreadsheet.insertSheet(sheetName);
     Logger.log("Sheet '" + sheetName + "' created.");
    return newSheet;
  }
}

// --- Helper Function: Ensure Headers exist in the first row ---
function ensureHeaders_(sheet, headers) {
   if (sheet.getLastRow() === 0) { // Check if the sheet is completely empty
      Logger.log("Sheet is empty. Adding headers...");
      sheet.appendRow(headers);
      // Optional: Freeze the header row
      sheet.setFrozenRows(1);
       // Optional: Bold the header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      Logger.log("Headers added: " + headers.join(", "));
   } else {
       // Optional: Check if existing headers match (more robust)
       var currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
       if (JSON.stringify(currentHeaders.slice(0, headers.length)) !== JSON.stringify(headers)) {
           Logger.log("Warning: Existing headers don't match expected headers. Appending data anyway.");
           // You could choose to overwrite or throw an error here if needed
       } else {
           // Logger.log("Headers already exist and match.");
       }
   }
}

// --- Helper Function: Get or create Google Drive Folder ---
function getOrCreateFolder_(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
     Logger.log("Folder '" + folderName + "' not found. Creating...");
    var newFolder = DriveApp.createFolder(folderName);
     Logger.log("Folder '" + folderName + "' created.");
    return newFolder;
  }
}

// --- Helper Function: Create XLSX backup ---
function createXlsxBackup_(spreadsheet, folderName) {
 try {
  var folder = getOrCreateFolder_(folderName);
  var fileName = spreadsheet.getName() + "_" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd_HH-mm-ss") + ".xlsx";
  var spreadsheetId = spreadsheet.getId();
  var url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export?format=xlsx";

  var options = {
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
    muteHttpExceptions: true // Prevent script failure on export error, log it instead
  };

  var response = UrlFetchApp.fetch(url, options);

   if (response.getResponseCode() === 200) {
      var blob = response.getBlob().setName(fileName);
      var newFile = folder.createFile(blob);
      Logger.log("XLSX backup created: " + newFile.getName() + " in folder " + folder.getName());
    } else {
       Logger.log("Error creating XLSX backup for spreadsheet ID: " + spreadsheetId + ". Response code: " + response.getResponseCode() + ". Response content: " + response.getContentText());
    }
 } catch (backupError) {
     Logger.log("Error during XLSX backup creation: " + backupError.message);
     Logger.log("Backup Stack Trace: " + backupError.stack);
 }
}

// --- Test Function (for debugging in Apps Script editor) ---
function testDoPost() {
  // Simulate a POST request event object
  var simulatedEvent = {
    parameter: {
      name: "Test User",
      email: "test@example.com",
      subject: "Testing Form",
      message: "This is a test message from the Apps Script editor."
    },
    // Include postData for JSON simulation if needed
    // postData: {
    //   contents: JSON.stringify({
    //      name: "Test User JSON",
    //      email: "test.json@example.com",
    //      subject: "Testing JSON",
    //      message: "This is a test message via JSON."
    //   }),
    //   type: "application/json"
    // }
  };

  Logger.log("--- Running Test ---");
  var result = doPost(simulatedEvent);
  Logger.log("Test Result (ContentService Output):");
  Logger.log(result.getContent());
  Logger.log("--- Test Complete ---");
}

// --- Function to clear sheet for testing ---
function clearSheet() {
  var ss = getOrCreateSpreadsheet_(SPREADSHEET_NAME);
  var sheet = getOrCreateSheet_(ss, SHEET_NAME);
  sheet.clearContents(); // Clears data but keeps formatting
  // Or use sheet.clear() to clear everything including formatting
  Logger.log("Sheet '" + SHEET_NAME + "' cleared.");
}
