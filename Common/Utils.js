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

function notUndefined(value) {
  return typeof value !== "undefined"
}

function randomNumber(min, maxLess) {
  return Math.floor(Math.random() * (maxLess - min) + min)
}

function insertOrGetSheet(sheetName, index) {
  let sheet
  try {
    if (notUndefined(index)) {
      sheet = SpreadsheetApp.getActive().insertSheet(sheetName, index)
    } else {
      sheet = SpreadsheetApp.getActive().insertSheet(sheetName)
    }
  } catch (e) {
    sheet = getSheetInstanceByName(sheetName)
  }
  return sheet
}