import { theoryList, theoryList4 } from './theory.js'
import { ch3Data, ch4Data } from './questions.js'
import { invData, invExpBrief, invExpMd } from './worksheet.js'
import { EXTRA_INV_DATA, EXTRA_INV_EXP_BRIEF, EXTRA_INV_EXP_MD } from './worksheet-extra.js'

// Evaluate the verbatim data getters once.
export const CH3_DATA = ch3Data()
export const CH4_DATA = ch4Data()
export const THEORY_3 = theoryList()
export const THEORY_4 = theoryList4()

// Worksheet problems 1–30 (from the prototype) + 31–40 (added verbatim).
export const INV_DATA = invData().concat(EXTRA_INV_DATA)
export const INV_EXP_BRIEF = { ...invExpBrief(), ...EXTRA_INV_EXP_BRIEF }
export const INV_EXP_MD = { ...invExpMd(), ...EXTRA_INV_EXP_MD }

// Mirrors the prototype's `chapters` getter (ch3 + ch4). Ch5 (worksheet) is a
// separate card handled by the worksheet screen.
export const CHAPTERS = [
  { num: 3, title: '재무회계 챕터3 (개념체계)', data: CH3_DATA, theory: THEORY_3 },
  { num: 4, title: '재무회계 챕터4 (재무제표 표시)', data: CH4_DATA, theory: THEORY_4 },
]
