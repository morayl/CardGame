const SHEET_NAME_MASTER = "master"
const CELL_MASTER_FIELD = "C1"
const CELL_MASTER_PRIZE = "C2"
const CELL_PLAYER_MONEY = "C4"
const CELL_PLAYER_REMAINING_COUNT = "D12"
const CELL_RANGE_PLAY_CHECK = "D6:D11"
const CELL_RANGE_PLAYER_CONTENT = "C6:D11"

function playCard1() {
  playCard(1)
}

function playCard2() {
  playCard(2)
}

function playCard3() {
  playCard(3)
}

function playCard4() {
  playCard(4)
}

function playCard5() {
  playCard(5)
}

function playCard6() {
  playCard(6)
}

function playCard(num) {
  const selectedCellId = "C" + (num + 5)
  const playerSheet = getPlayerSheet()
  const selectedCell = playerSheet.getRange(selectedCellId)
  getMasterSheet().getRange(CELL_MASTER_FIELD).setValue(selectedCell.getValue())
  playerSheet.getRange("D" + (num + 5)).setValue(true)
}

function getPrize() {
  const playerSheet = SpreadsheetApp.getActiveSheet()
  //  const isMyTurn = playerSheet.getRange("F5").getValue()
  //  if(!isMyTurn){
  //    return
  //  }
  const masterSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME_MASTER);
  const prizeValue = playerSheet.getRange(CELL_MASTER_PRIZE).getValue()
  const playerMoneyCell = playerSheet.getRange(CELL_PLAYER_MONEY)
  playerMoneyCell.setValue(prizeValue + playerMoneyCell.getValue())
  masterSheet.getRange(CELL_MASTER_PRIZE).setValue(30)
}

function reset() {
  const selectedCell = SpreadsheetApp.getActiveSheet().getRange("C6:C11").clearFormat()
  const masterSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME_MASTER);
  masterSheet.getRange(CELL_MASTER_FIELD).clearContent()
  SpreadsheetApp.getActiveSheet().getRange("C6:C11").clearContent()
}

function gameReset() {
  const masterSheet = getMasterSheet()
  const playerSheet = getPlayerSheet()
  const playerRemainingCount = playerSheet.getRange(CELL_PLAYER_REMAINING_COUNT).getValue()
  const playerMoneyCell = playerSheet.getRange(CELL_PLAYER_MONEY)
  playerMoneyCell.setValue(playerMoneyCell.getValue() - (playerRemainingCount * 20))
  const masterPrizeCell = masterSheet.getRange(CELL_MASTER_PRIZE)
  masterPrizeCell.setValue(masterPrizeCell.getValue() + (playerRemainingCount * 20))
  masterSheet.getRange(CELL_MASTER_FIELD).clearContent()
  playerSheet.getRange(CELL_RANGE_PLAYER_CONTENT).clearContent()
}

function allReset() {
  const playerSheet = getPlayerSheet()
  playerSheet.getRange(CELL_PLAYER_MONEY).setValue(180)
  playerSheet.getRange(CELL_RANGE_PLAYER_CONTENT).clearContent()
  const masterSheet = getMasterSheet()
  masterSheet.getRange(CELL_MASTER_FIELD).clearContent()
  masterSheet.getRange(CELL_MASTER_PRIZE).setValue(30)
}

function pay() {
  const playerSheet = getPlayerSheet()
  const playerMoneyCell = playerSheet.getRange(CELL_PLAYER_MONEY)
  playerMoneyCell.setValue(playerMoneyCell.getValue() - 10)
  const prizeValueCell = getMasterSheet().getRange(CELL_MASTER_PRIZE)
  prizeValueCell.setValue(prizeValueCell.getValue() + 10)
}

function getMasterSheet() {
  return getSheetInstanceByName(SHEET_NAME_MASTER)
}

function getPlayerSheet() {
  return getActiveSheetInstance()
}