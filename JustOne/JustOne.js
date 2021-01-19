const PLAYER_COUNT = 2
const ANSWER_RANGE_BASE = 3
function clear() {
  for (let i = 1; i <= PLAYER_COUNT; i++) {
    getSheetInstanceByName(`player${i}`).getRange("A3").setValue("")
  }
  const answersRange = `B${ANSWER_RANGE_BASE}:B${ANSWER_RANGE_BASE + PLAYER_COUNT - 1}`
  const answersRangeValues = Array(PLAYER_COUNT).fill(0).map((_, i) => ["=player" + (i + 1) + "!A3"])
  Logger.log(answersRangeValues)
  Logger.log(answersRange)
  getSheetInstanceByName("回答合わせ").getRange(answersRange).setValues(answersRangeValues)
}