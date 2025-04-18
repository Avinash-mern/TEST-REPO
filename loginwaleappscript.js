function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1'); // Your sheet name
  const data = sheet.getDataRange().getValues(); // Fetch all rows of data

  // Fetch the query parameter (userId) from the request
  const userId = e.parameter.userId;

  // Find the userId in the sheet
  for (let i = 1; i < data.length; i++) {
    const [storedUserId, role] = data[i];
    if (storedUserId === userId) {
      return ContentService.createTextOutput(
        JSON.stringify({ userId: storedUserId, role: role })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ error: 'User not found' })
  ).setMimeType(ContentService.MimeType.JSON);
}
