function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Notes");

  const data = e.parameter; // Works with FormData

  sheet.appendRow([
    data.educatorName,
    data.batchName,
    data.fileUrl,
    data.uploadTime,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}


function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Notes");
  const data = sheet.getDataRange().getValues();

  // Skip header row if present
  const result = data.slice(1).map(row => ({
    educatorName: row[0],
    batchName: row[1],
    fileUrl: row[2],
    uploadTime: row[3],
  }));

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
