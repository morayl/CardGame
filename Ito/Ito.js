const PLAYER_COUNT = 3
const SHEET_NAME_MASTER = "管理"
const SETUP_PLAYER_RANGE = "A1:C4"
const SETUP_PLAYER_RANGE_VALUES = [["↓セルA2↓に名前を入れてね", "", "↓場のカード↓"], ["名前はここ", "", `='${SHEET_NAME_MASTER}'!$E$2`], ["", "手札", "↓出すカード↓"], ["", "", "ここに手札を貼り付け"]]
const SETUP_MASTER_RANGE_CALCULATE = "D2:E3"
const SETUP_MASTER_RANGE_CALCULATE_VALUE = [["最大値", "=MAX(B:B)"], ["手札配布数", 1]]
const CELL_PLAYER_NAME = "$A$2"
const CELL_PLAYER_ANSWER = "$C$4"
const CELL_MASTER_CARD_COUNT = "$E$3"
const CELL_PLAYER_CARDS_COLUMN = "$B"
const CELL_PLAYER_CARDS_ROW = 4
const CELL_PLAYER_PLAY_CARD = "C4"
const ROW_MASTER_PLAYER_START = 2
const MAX_PLAYER_CARD_COUNT = 10
const RANGE_PLAYER_CARDS_MAX = CELL_PLAYER_CARDS_COLUMN + CELL_PLAYER_CARDS_ROW + ":" + CELL_PLAYER_CARDS_COLUMN + (CELL_PLAYER_CARDS_ROW + MAX_PLAYER_CARD_COUNT)

function setupCards() {
  clearCards()
  const cardCount = getSheetInstanceByName(SHEET_NAME_MASTER).getRange(CELL_MASTER_CARD_COUNT).getValue()
  const cards = Array(100).fill(0).map((_, i) => i + 1)
  Logger.log(cards)
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    const playerCards = []
    for (let i = 0; i <= cardCount - 1; i++) {
      const rand = randomNumber(0, cards.length)
      const target = cards.splice(rand, 1)
      playerCards.push(target)
    }
    getSheetInstanceByName(`player${i}`)
      .getRange(`${CELL_PLAYER_CARDS_COLUMN + CELL_PLAYER_CARDS_ROW}:${CELL_PLAYER_CARDS_COLUMN}${CELL_PLAYER_CARDS_ROW + cardCount - 1}`)
      .setValues(playerCards.sort(compareFunc))
  }
}

function compareFunc(a, b) {
  return a - b;
}

function clearCards() {
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    const sheet = getSheetInstanceByName(`player${i}`)
    sheet.getRange(RANGE_PLAYER_CARDS_MAX).clear()
    sheet.getRange(CELL_PLAYER_PLAY_CARD).clear()
  }
}

function setupSheets() {
  setupMasterSheet()
  setupPlayerSheet()
  setupMasterSheet()
}

function setupPlayerSheet() {
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    const sheetName = `player${i}`
    insertOrGetSheet(sheetName, i).getRange(SETUP_PLAYER_RANGE).setValues(SETUP_PLAYER_RANGE_VALUES)
  }
}

function setupMasterSheet() {
  let rows = []
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    rows.push([`=player${i}!${CELL_PLAYER_NAME}`, `=INDIRECT(C${ROW_MASTER_PLAYER_START + i - 1}&"!C4")`, `player${i}`])
  }
  const sheet = insertOrGetSheet(SHEET_NAME_MASTER)
  sheet.getRange(`A2:C${PLAYER_COUNT + 1}`).setValues(rows)
  sheet.getRange(SETUP_MASTER_RANGE_CALCULATE).setValues(SETUP_MASTER_RANGE_CALCULATE_VALUE)
}
