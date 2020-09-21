const sheetCache = {};
let activeSheetCache = null

function getSheetInstanceByName(sheetName) {
  const sheet = sheetCache[sheetName]
  if (typeof sheet !== "undefined") {
    return sheet
  } else {
    const newSheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    sheetCache[sheetName] = newSheet
    return newSheet;
  }
}

function getActiveSheetInstance() {
  if (activeSheetCache != null) {
    return activeSheetCache
  } else {
    activeSheetCache = SpreadsheetApp.getActiveSheet();
    return activeSheetCache;
  }
}