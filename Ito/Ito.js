const PLAYER_COUNT = 3
const SHEET_NAME_MASTER = "管理"
const SETUP_PLAYER_RANGE = "A1:C4"
const SETUP_PLAYER_RANGE_VALUES = [["↓セルA2↓に名前を入れてね", "", "↓場のカード↓"], ["名前はここ", "", `='${SHEET_NAME_MASTER}'!$D$2`], ["", "手札", "↓出すカード↓"], ["", "", "ここに手札を貼り付け"]]
const CELL_PLAYER_NAME = "$A$2"
const CELL_PLAYER_ANSWER = "$C$4"
const CELL_MASTER_CARD_COUNT = "$D$3"
const CELL_PLAYER_CARDS_COLUMN = "$B"
const CELL_PLAYER_CARDS_ROW = 4

function setupCards() {
  const cardCount = getSheetInstanceByName(SHEET_NAME_MASTER).getRange(CELL_MASTER_CARD_COUNT).getValue()
  const cards = Array(100).fill(0).map((_, i) => i + 1)
  Logger.log(cards)
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    const playerCards = []
    for (let i = 0; i <= cardCount; i++) {
      const rand = randomNumber(0, cards.length)
      const target = cards.splice(rand, 1)
      playerCards.push(target)
    }
    getSheetInstanceByName(`player${i}`)
      .getRange(`${CELL_PLAYER_CARDS_COLUMN + CELL_PLAYER_CARDS_ROW}:${CELL_PLAYER_CARDS_COLUMN}${CELL_PLAYER_CARDS_ROW + cardCount}`)
      .setValues(playerCards)
  }
}

function setupPlayerSheet() {
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    const sheetName = `player${i}`
    let sheet
    try {
      sheet = SpreadsheetApp.getActive().insertSheet(sheetName, i)
    } catch (e) {
      sheet = getSheetInstanceByName(sheetName)
    }
    sheet.getRange(SETUP_PLAYER_RANGE).setValues(SETUP_PLAYER_RANGE_VALUES)
  }
}

function setupMasterSheet() {
  let rows = []
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    rows.push([`=player${i}!${CELL_PLAYER_NAME}`, `=player${i}!${CELL_PLAYER_ANSWER}`])
  }
  getSheetInstanceByName(SHEET_NAME_MASTER).getRange(`A2:B${PLAYER_COUNT + 1}`).setValues(rows)
}
