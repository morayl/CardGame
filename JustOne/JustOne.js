const PLAYER_COUNT = 3
const ANSWER_RANGE_BASE = 3
const ANSWERS_RANGE = `B${ANSWER_RANGE_BASE}:C${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
const ANSWERER_ANSWER_RANGE = `B${ANSWER_RANGE_BASE}:B${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
const DISTINCT_ANSWERS_RANGE = `B${ANSWER_RANGE_BASE}:B${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
const ANSWER_SHEET_NAMES_RANGE = `A${ANSWER_RANGE_BASE}:A${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
const PLAYER_SHEET_NAME_ANSWER = "A2:A3"
const THEME_SHEET_QUESTIONER = "D2"

const SHEET_NAME_ANSWER_MERGE = "回答合わせ"
const SHEET_NAME_ANSERER = "回答者"
const SHEET_NAME_THEME = "お題"

const SETUP_NAME = "名前はここ"
const SETUP_ANSWER = "回答はここ"

function clear() {
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    getSheetInstanceByName(`player${i}`).getRange("A3").setValue("")
  }
  const answersRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=player" + (i + 1) + "!A3", "=player" + (i + 1) + "!A3"])
  getSheetInstanceByName(SHEET_NAME_ANSWER_MERGE).getRange(ANSWERS_RANGE).setValues(answersRangeValues)
  const answererRange = ANSWERER_ANSWER_RANGE
  const answererRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => [""])
  getSheetInstanceByName(SHEET_NAME_ANSERER).getRange(answererRange).setValues(answererRangeValues)
  getSheetInstanceByName(SHEET_NAME_THEME).getRange(THEME_SHEET_QUESTIONER).setValue("")
}

function showAnswers() {
  const answersRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=" + SHEET_NAME_ANSWER_MERGE + "!C" + (i + ANSWER_RANGE_BASE)])
  Logger.log(DISTINCT_ANSWERS_RANGE)
  getSheetInstanceByName(SHEET_NAME_ANSERER).getRange(DISTINCT_ANSWERS_RANGE).setValues(answersRangeValues)
}

function setup() {
  const namesRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=player" + (i + 1) + "!A2"])
  getSheetInstanceByName(SHEET_NAME_ANSWER_MERGE).getRange(ANSWER_SHEET_NAMES_RANGE).setValues(namesRangeValues)
  getSheetInstanceByName(SHEET_NAME_ANSERER).getRange(ANSWER_SHEET_NAMES_RANGE).setValues(namesRangeValues)
  const playerNameAnswerValues = [[SETUP_NAME], [SETUP_ANSWER]]
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    getSheetInstanceByName(`player${i}`).getRange(PLAYER_SHEET_NAME_ANSWER).setValues(playerNameAnswerValues)
  }
}

function randomQuestioner() {
  const min = 0
  const maxLess = PLAYER_COUNT
  const number = Math.floor(Math.random() * (maxLess - min) + min)
  getSheetInstanceByName(SHEET_NAME_THEME).getRange(THEME_SHEET_QUESTIONER).setValue(`=player${number + 1}!A2`)
}