import { useCallback, useMemo, useState } from 'react'
import { CHAPTERS, INV_DATA, INV_EXP_BRIEF, INV_EXP_MD } from './data/index.js'
import { breakSentences, buildBriefMd, label, mdToHtml, splitPartName } from './lib/helpers.js'
import HomeScreen from './components/HomeScreen.jsx'
import TocScreen from './components/TocScreen.jsx'
import QuizScreen from './components/QuizScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import WorksheetScreen from './components/WorksheetScreen.jsx'

const THEORY_KEY = 'oxquiz_theoryOn'

function initTheoryOn() {
  let t = true
  try {
    const v = localStorage.getItem(THEORY_KEY)
    if (v != null) t = v === '1'
  } catch (e) {
    /* ignore */
  }
  return t
}

function freshAnswers(ci) {
  return new Array(CHAPTERS[ci].data.length).fill(null)
}

// Group a chapter's flat question list into parts (in order of first appearance).
function groupParts(data) {
  const groups = []
  data.forEach((q, i) => {
    let g = groups.find((x) => x.name === q.part)
    if (!g) {
      g = { name: q.part, items: [] }
      groups.push(g)
    }
    g.items.push({ gi: i, ...q })
  })
  return groups
}

function scrollTop() {
  requestAnimationFrame(() => {
    try {
      const root = document.scrollingElement || document.documentElement
      if (root) root.scrollTo({ top: 0, behavior: 'smooth' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      window.scrollTo(0, 0)
    }
  })
}

export default function App() {
  const [state, setState] = useState(() => ({
    screen: 'home',
    chapterIndex: 0,
    partIndex: 0,
    answersByChapter: {},
    theoryOn: initTheoryOn(),
    worksheetPi: 0,
    worksheetSels: {},
    wOpenKey: null,
    wExpOpen: {},
  }))

  // setState-style shallow merge, matching the prototype's this.setState.
  const patch = useCallback((upd) => setState((s) => ({ ...s, ...upd })), [])

  // ---- Derived: current chapter / answers / parts ----
  const curChapter = CHAPTERS[state.chapterIndex] || CHAPTERS[0]
  const data = curChapter.data
  const parts = useMemo(() => groupParts(data), [data])
  const curAnswers = useMemo(() => {
    const a = state.answersByChapter[state.chapterIndex]
    return a && a.length === data.length ? a : new Array(data.length).fill(null)
  }, [state.answersByChapter, state.chapterIndex, data])

  // ---- Navigation / answer methods (ported from the prototype) ----
  const toggleTheory = useCallback(() => {
    setState((s) => {
      const v = !s.theoryOn
      try {
        localStorage.setItem(THEORY_KEY, v ? '1' : '0')
      } catch (e) {
        /* ignore */
      }
      return { ...s, theoryOn: v }
    })
  }, [])

  const enterChapter = useCallback((ci) => {
    setState((s) => {
      const cur = s.answersByChapter[ci]
      const a = cur && cur.length === CHAPTERS[ci].data.length ? cur : freshAnswers(ci)
      return {
        ...s,
        chapterIndex: ci,
        partIndex: 0,
        screen: 'toc',
        answersByChapter: { ...s.answersByChapter, [ci]: a },
      }
    })
  }, [])

  const openPart = useCallback((i) => patch({ screen: 'quiz', partIndex: i }), [patch])
  const goToc = useCallback(() => patch({ screen: 'toc' }), [patch])
  const goHome = useCallback(() => patch({ screen: 'home' }), [patch])
  const showResult = useCallback(() => patch({ screen: 'result' }), [patch])

  const retry = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: 'toc',
      partIndex: 0,
      answersByChapter: { ...s.answersByChapter, [s.chapterIndex]: freshAnswers(s.chapterIndex) },
    }))
  }, [])

  const pick = useCallback((gi, choice) => {
    setState((s) => {
      const ci = s.chapterIndex
      const cur = (s.answersByChapter[ci] || freshAnswers(ci)).slice()
      if (cur[gi] != null) return s
      cur[gi] = choice
      return { ...s, answersByChapter: { ...s.answersByChapter, [ci]: cur } }
    })
  }, [])

  const prevPart = useCallback(() => {
    setState((s) => (s.partIndex > 0 ? { ...s, partIndex: s.partIndex - 1 } : s))
  }, [])

  const nextPart = useCallback(() => {
    setState((s) =>
      s.partIndex >= parts.length - 1
        ? { ...s, screen: 'result' }
        : { ...s, partIndex: s.partIndex + 1 },
    )
    scrollTop()
  }, [parts.length])

  // ---- Worksheet methods ----
  const enterWorksheet = useCallback(() => {
    patch({ screen: 'worksheet', worksheetPi: 0, wOpenKey: null })
    scrollTop()
  }, [patch])
  const wSetPi = useCallback((i) => {
    patch({ worksheetPi: i, wOpenKey: null })
    scrollTop()
  }, [patch])
  const wPrev = useCallback(() => {
    setState((s) => {
      const p = s.worksheetPi || 0
      if (p > 0) {
        scrollTop()
        return { ...s, worksheetPi: p - 1, wOpenKey: null }
      }
      return s
    })
  }, [])
  const wNext = useCallback(() => {
    setState((s) => {
      const p = s.worksheetPi || 0
      if (p < INV_DATA.length - 1) {
        scrollTop()
        return { ...s, worksheetPi: p + 1, wOpenKey: null }
      }
      return s
    })
  }, [])
  const wToggle = useCallback((key, isRight) => {
    if (isRight) return
    setState((s) => ({ ...s, wOpenKey: s.wOpenKey === key ? null : key }))
  }, [])
  const wCloseBlank = useCallback(() => patch({ wOpenKey: null }), [patch])
  const wPick = useCallback((id, v) => {
    setState((s) => {
      const pi = s.worksheetPi || 0
      const cur = { ...(s.worksheetSels[pi] || {}) }
      cur[id] = v
      return { ...s, worksheetSels: { ...s.worksheetSels, [pi]: cur }, wOpenKey: null }
    })
  }, [])
  const wReset = useCallback(() => {
    setState((s) => {
      const pi = s.worksheetPi || 0
      return { ...s, worksheetSels: { ...s.worksheetSels, [pi]: {} }, wOpenKey: null }
    })
  }, [])
  const wToggleExp = useCallback((pi, perfect) => {
    setState((s) => {
      const cur = s.wExpOpen[pi] !== undefined ? s.wExpOpen[pi] : perfect
      return { ...s, wExpOpen: { ...s.wExpOpen, [pi]: !cur } }
    })
  }, [])

  // Clamp an open dropdown so it never clips past the viewport edges.
  const dropClamp = useCallback((el) => {
    if (!el) return
    requestAnimationFrame(() => {
      if (!el.isConnected) return
      el.style.transform = 'translateX(-50%)'
      const pad = 10
      const r = el.getBoundingClientRect()
      const vw = window.innerWidth || document.documentElement.clientWidth
      let shift = 0
      if (r.left < pad) shift = pad - r.left
      else if (r.right > vw - pad) shift = vw - pad - r.right
      if (shift) el.style.transform = 'translateX(-50%) translateX(' + Math.round(shift) + 'px)'
    })
  }, [])

  // Non-passive wheel → horizontal scroll on the worksheet number-tab rail.
  const wTabRef = useCallback((el) => {
    if (el && !el.__wheelBound) {
      el.__wheelBound = true
      el.addEventListener(
        'wheel',
        (ev) => {
          if (Math.abs(ev.deltaY) >= Math.abs(ev.deltaX)) {
            el.scrollLeft += ev.deltaY
            ev.preventDefault()
          }
        },
        { passive: false },
      )
    }
  }, [])

  const screen = state.screen

  // ---------- HOME ----------
  const homeChapters = CHAPTERS.map((c, ci) => {
    const ans = state.answersByChapter[ci] || []
    const answered = ans.filter((a) => a != null).length
    const tot = c.data.length
    const partsN = new Set(c.data.map((q) => q.part)).size
    return {
      num: c.num,
      title: c.title,
      meta: partsN + '개 파트 · ' + tot + '문제 · O/X',
      pct: tot ? Math.round((answered / tot) * 100) : 0,
      answeredText: answered + ' / ' + tot,
      open: () => enterChapter(ci),
    }
  })

  const wsSolved = INV_DATA.filter((p, i) => {
    const s = state.worksheetSels[i] || {}
    const ks = Object.keys(p.b)
    return ks.length > 0 && ks.every((k) => s[k] === p.b[k][1])
  }).length
  const wsTotal = INV_DATA.length
  const ch5Card = {
    num: 5,
    title: '재무회계 챕터5 (재고자산)',
    meta: wsTotal + '문제 · 빈칸 채우기',
    pct: wsTotal ? Math.round((wsSolved / wsTotal) * 100) : 0,
    answeredText: wsSolved + ' / ' + wsTotal,
    open: () => enterWorksheet(),
  }
  const homeList = homeChapters.concat([ch5Card])

  if (screen === 'home') {
    return (
      <Shell>
        <HomeScreen homeChapters={homeList} />
      </Shell>
    )
  }

  // ---------- Shared chapter-level derived values ----------
  const A = curAnswers
  const total = data.length
  const totalAnswered = A.filter((a) => a != null).length
  const chapterTitle = curChapter.title

  // ---------- TOC ----------
  if (screen === 'toc') {
    const tocParts = parts.map((p, i) => {
      const count = p.items.length
      const done = p.items.filter((it) => A[it.gi] != null).length
      const split = splitPartName(p.name)
      const status = done >= count ? 'done' : done > 0 ? 'active' : 'todo'
      return {
        num: i + 1,
        title: split.title,
        pct: Math.round((done / count) * 100),
        progressText: done + ' / ' + count,
        isDone: status === 'done',
        isActive: status === 'active',
        isTodo: status === 'todo',
        open: () => openPart(i),
      }
    })
    return (
      <Shell>
        <TocScreen
          chapterTitle={chapterTitle}
          partCount={parts.length}
          totalCount={total}
          chapterDoneText={totalAnswered + '문제 완료'}
          tocParts={tocParts}
          goHome={goHome}
          showResult={showResult}
        />
      </Shell>
    )
  }

  // ---------- QUIZ ----------
  if (screen === 'quiz') {
    const pIdx = Math.min(state.partIndex, parts.length - 1)
    const curPart = parts[pIdx] || parts[0]
    const split = splitPartName(curPart.name)
    const theoryArr = curChapter.theory || []
    const theory = theoryArr[pIdx] || { summary: '', points: [] }
    const hasTheory = !!(theory.blocks
      ? theory.blocks.length
      : theory.summary ||
        (theory.bullets && theory.bullets.length) ||
        (theory.points && theory.points.length) ||
        theory.intro)

    const partQuestions = curPart.items.map((it) => {
      const sel = A[it.gi] != null ? A[it.gi] : null
      const answered = sel != null
      const isCorrect = answered && sel === it.answer
      return {
        gLabel: String(it.gi + 1).padStart(2, '0'),
        text: it.text,
        notAnswered: !answered,
        answered,
        isCorrect,
        isWrong: answered && !isCorrect,
        userLabel: answered ? label(sel) : '',
        correctLabel: label(it.answer),
        explanation: breakSentences(it.exp),
        answerO: () => pick(it.gi, 'O'),
        answerX: () => pick(it.gi, 'X'),
      }
    })

    const partAnswered = curPart.items.filter((it) => A[it.gi] != null).length
    const isLastPart = pIdx >= parts.length - 1

    return (
      <Shell>
        <QuizScreen
          chapterTitle={chapterTitle}
          partProgress={'PART ' + (pIdx + 1) + ' / ' + parts.length}
          answeredText={partAnswered + ' / ' + curPart.items.length}
          progressPercent={Math.round((totalAnswered / total) * 100)}
          partLabel={split.label}
          partTitle={split.title}
          hasTheory={hasTheory}
          theory={theory}
          theoryOn={state.theoryOn}
          toggleTheory={toggleTheory}
          partQuestions={partQuestions}
          hasPrevPart={pIdx > 0}
          prevPart={prevPart}
          nextPart={nextPart}
          nextLabel={isLastPart ? '결과 보기' : '다음 파트 →'}
          goToc={goToc}
        />
      </Shell>
    )
  }

  // ---------- RESULT ----------
  if (screen === 'result') {
    const score = A.reduce((acc, a, i) => acc + (a === data[i].answer ? 1 : 0), 0)
    const pct = Math.round((score / total) * 100)
    let resultTitle
    if (pct >= 90) resultTitle = '완벽해요!'
    else if (pct >= 70) resultTitle = '잘했어요!'
    else if (pct >= 50) resultTitle = '조금만 더!'
    else resultTitle = '다시 복습해요'

    const reviewList = data.map((q, i) => {
      const a = A[i]
      const ok = a === q.answer
      return {
        number: String(i + 1).padStart(2, '0'),
        text: q.text,
        correctLabel: label(q.answer),
        resultMark: ok ? '✅' : '❌',
      }
    })

    return (
      <Shell>
        <ResultScreen
          resultTitle={resultTitle}
          chapterTitle={chapterTitle}
          score={score}
          totalCount={total}
          reviewList={reviewList}
          goHome={goHome}
          retry={retry}
        />
      </Shell>
    )
  }

  // ---------- WORKSHEET ----------
  if (screen === 'worksheet') {
    const invD = INV_DATA
    const wpi = Math.min(state.worksheetPi || 0, invD.length - 1)
    const wp = invD[wpi]
    const wsel = state.worksheetSels[wpi] || {}
    const wbkeys = Object.keys(wp.b)
    const wtotal = wbkeys.length
    const wcorr = wbkeys.filter((k) => wsel[k] === wp.b[k][1]).length
    const wfilled = wbkeys.filter((k) => wsel[k] !== undefined).length
    const wPerfect = wcorr === wtotal

    const wProblems = invD.map((p, i) => {
      const s = state.worksheetSels[i] || {}
      const ks = Object.keys(p.b)
      const c = ks.filter((k) => s[k] === p.b[k][1]).length
      const done = c === ks.length
      const attempted = ks.some((k) => s[k] !== undefined)
      return {
        label: String(i + 1).padStart(2, '0'),
        isCur: i === wpi,
        isDone: done && i !== wpi,
        isAttempted: attempted && !done && i !== wpi,
        isTodo: !attempted && !done && i !== wpi,
        open: () => wSetPi(i),
      }
    })

    const wSteps = wp.s.map((st, si) => {
      const formulas = st[1].map((f, fi) => {
        const segs = f.split(/(\{[A-T]\})/).map((piece, pidx) => {
          const m = piece.match(/^\{([A-T])\}$/)
          if (m) {
            const id = m[1]
            const dd = wp.b[id]
            if (!dd) return { isText: true, isBlank: false, text: piece }
            const key = si + '-' + fi + '-' + pidx
            const val = wsel[id] != null ? wsel[id] : null
            const answered = val !== null
            const isRight = answered && val === dd[1]
            const isWrong = answered && val !== dd[1]
            return {
              isText: false,
              isBlank: true,
              isDefault: !answered,
              isRight,
              isWrong,
              display: answered ? dd[0][val] : '▾ ___',
              correctText: dd[0][dd[1]],
              isOpen: state.wOpenKey === key && !isRight,
              opts: dd[0].map((o, oi) => ({ text: o, pick: () => wPick(id, oi) })),
              toggle: () => wToggle(key, isRight),
              dropRef: dropClamp,
            }
          }
          return { isText: true, isBlank: false, text: piece }
        })
        return { segs }
      })
      return { title: st[0], formulas }
    })

    const exBrief = INV_EXP_BRIEF[wp.id] || null
    const expMd = INV_EXP_MD[wp.id] || (exBrief ? buildBriefMd(exBrief) : '')
    const expManual = state.wExpOpen[wpi]
    const expVisible = expManual !== undefined ? expManual : wPerfect
    const wShowExp = expVisible && !!expMd
    const wExpHtml = expMd ? mdToHtml(expMd) : null

    return (
      <Shell>
        <WorksheetScreen
          wProblems={wProblems}
          wTabRef={wTabRef}
          wProgressLabel={String(wpi + 1).padStart(2, '0') + ' / ' + invD.length}
          wSub={wp.sub}
          wSrc={wp.src}
          wQuestion={wp.q}
          wDataList={wp.data.map((t) => ({ text: t }))}
          wChoices={wp.choices.map((t) => ({ text: t }))}
          wChoiceCols={wp.choices.some((t) => t.length > 20) ? '1fr' : '1fr 1fr'}
          wProgressPct={wtotal ? Math.round((wcorr / wtotal) * 100) : 0}
          wCountText={wfilled === 0 ? wtotal + '칸' : wcorr + '/' + wtotal}
          wSteps={wSteps}
          wShowExp={wShowExp}
          wExpHtml={wExpHtml}
          wExpA={exBrief ? exBrief.a : ''}
          wExpBtnLabel={expVisible ? '해설 닫기' : '해설 보기'}
          wToggleExp={() => wToggleExp(wpi, wPerfect)}
          wStatusPerfect={wPerfect}
          wStatusPartial={!wPerfect && wfilled === wtotal}
          wStatusEmpty={!wPerfect && wfilled !== wtotal}
          wCanReset={wfilled > 0}
          wScoreText={wcorr + ' / ' + wtotal + ' 정답'}
          wAns={wp.ans}
          wReset={wReset}
          wPrevOn={wpi > 0}
          wNextOn={wpi < invD.length - 1}
          wPrev={wPrev}
          wNext={wNext}
          wHasOpen={state.wOpenKey != null}
          wCloseBlank={wCloseBlank}
          goHome={goHome}
        />
      </Shell>
    )
  }

  return null
}

// The phone-frame shell that centers the app column (max-width 460px).
function Shell({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#EEF1F6',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        color: '#1A1D24',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          minHeight: '100vh',
          background: '#F7F8FB',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 40px rgba(20,25,40,.08)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
