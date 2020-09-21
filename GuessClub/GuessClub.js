const SHEET_NAME_MASTER = "master"
const CELL_MASTER_FIELD = "C2"
const CELL_MASTER_PRIZE = "C3"
const CELL_PLAYER_MONEY = "C6"
const CELL_PLAYER_REMAINING_COUNT = "D14"
const CELL_PLAYER_CARD_BASE_ROW = 8
const CELL_RANGE_PLAY_CHECK = "D" + CELL_PLAYER_CARD_BASE_ROW + ":D" + (CELL_PLAYER_CARD_BASE_ROW + 5)
const CELL_RANGE_PLAYER_CONTENT = "C" + CELL_PLAYER_CARD_BASE_ROW + ":D" + (CELL_PLAYER_CARD_BASE_ROW + 5)

function playCard1() {
  safePlayCard(0)
}

function playCard2() {
  safePlayCard(1)
}

function playCard3() {
  safePlayCard(2)
}

function playCard4() {
  safePlayCard(3)
}

function playCard5() {
  safePlayCard(4)
}

function playCard6() {
  safePlayCard(5)
}

function safePlayCard(num) {
  try {
    playCard(num)
  } catch (e) {
    Logger.log(e.message)
  }
}

function playCard(num) {
  const selectedCellNumber = num + CELL_PLAYER_CARD_BASE_ROW
  const selectedCellId = "C" + selectedCellNumber
  const playerSheet = getPlayerSheet()
  const selectedCell = playerSheet.getRange(selectedCellId)
  if (notUndefined(selectedCell)) {
    getMasterSheet().getRange(CELL_MASTER_FIELD).setValue(selectedCell.getValue())
    playerSheet.getRange("D" + selectedCellNumber).setValue(true)
  }
}

function getPrize() {
  const playerSheet = getPlayerSheet()
  const prizeValue = playerSheet.getRange(CELL_MASTER_PRIZE).getValue()
  const playerMoneyCell = playerSheet.getRange(CELL_PLAYER_MONEY)
  playerMoneyCell.setValue(prizeValue + playerMoneyCell.getValue())
  const masterSheet = getMasterSheet()
  masterSheet.getRange(CELL_MASTER_PRIZE).setValue(30)
  resetMasterField()
}

function pay() {
  const playerSheet = getPlayerSheet()
  const playerMoneyCell = playerSheet.getRange(CELL_PLAYER_MONEY)
  playerMoneyCell.setValue(playerMoneyCell.getValue() - 10)
  const prizeValueCell = getMasterSheet().getRange(CELL_MASTER_PRIZE)
  prizeValueCell.setValue(prizeValueCell.getValue() + 10)
  resetMasterField()
}

function resetMasterField() {
  getMasterSheet().getRange(CELL_MASTER_FIELD).clearContent()
}

function endAGame() {
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

function resetPlayer() {
  const playerSheet = getPlayerSheet()
  playerSheet.getRange(CELL_PLAYER_MONEY).setValue(180)
  playerSheet.getRange(CELL_RANGE_PLAYER_CONTENT).clearContent()
  const masterSheet = getMasterSheet()
  masterSheet.getRange(CELL_MASTER_FIELD).clearContent()
  masterSheet.getRange(CELL_MASTER_PRIZE).setValue(30)
}

function getMasterSheet() {
  return getSheetInstanceByName(SHEET_NAME_MASTER)
}

function getPlayerSheet() {
  return getActiveSheetInstance()
}