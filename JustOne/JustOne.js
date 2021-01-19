const PLAYER_COUNT = 2
const ANSWER_RANGE_BASE = 3
function clear() {
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    getSheetInstanceByName(`player${i}`).getRange("A3").setValue("")
  }
  const answersRange = `B${ANSWER_RANGE_BASE}:C${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
  const answersRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=player" + (i + 1) + "!A3","=player" + (i + 1) + "!A3"])
  getSheetInstanceByName("回答合わせ").getRange(answersRange).setValues(answersRangeValues)
}

function showAnswers(){
  const answersRange = `B${ANSWER_RANGE_BASE}:B${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
  const answersRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=回答合わせ!C" + (i + ANSWER_RANGE_BASE)])
  getSheetInstanceByName("回答者").getRange(answersRange).setValues(answersRangeValues)
}

function setup(){
  const namesRange = `A${ANSWER_RANGE_BASE}:A${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
  const namesRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=player" + (i + 1) + "!A2"])
  getSheetInstanceByName("回答合わせ").getRange(namesRange).setValues(namesRangeValues)
  getSheetInstanceByName("回答者").getRange(namesRange).setValues(namesRangeValues)
}