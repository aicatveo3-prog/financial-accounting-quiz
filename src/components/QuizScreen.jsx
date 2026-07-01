import { css } from '../lib/css.js'
import TheoryPanel from './TheoryPanel.jsx'

export default function QuizScreen({
  chapterTitle,
  partProgress,
  answeredText,
  progressPercent,
  partLabel,
  partTitle,
  hasTheory,
  theory,
  theoryOn,
  toggleTheory,
  partQuestions,
  hasPrevPart,
  prevPart,
  nextPart,
  nextLabel,
  goToc,
}) {
  return (
    <div style={css('display: flex; flex-direction: column; min-height: 100vh;')}>
      <div style={css('padding: 14px 18px 12px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #ECEFF4; position: sticky; top: 0; background: #F7F8FB; z-index: 5;')}>
        <button onClick={goToc} style={css('border: none; background: #EAEDF3; width: 32px; height: 32px; border-radius: 9px; font-size: 15px; color: #5A6172; cursor: pointer; flex-shrink: 0; font-family: inherit;')}>‹</button>
        <div style={css('flex: 1; min-width: 0;')}>
          <div style={css('font-size: 12.5px; font-weight: 700; color: #1A1D24; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;')}>{chapterTitle}</div>
          <div style={css('font-size: 10.5px; color: #6E7585; margin-top: 1px;')}>{partProgress}</div>
        </div>
        <div style={css('font-size: 11px; font-weight: 700; color: #5C6473; flex-shrink: 0;')}>{answeredText}</div>
      </div>

      <div style={css('height: 4px; background: #E4E8F0; flex-shrink: 0;')}>
        <div style={css('height: 100%; background: #4F46E5; width: ' + progressPercent + '%; transition: width .35s cubic-bezier(.4,0,.2,1);')} />
      </div>

      <div style={css('padding: 20px 18px 6px;')}>
        <div style={css('font-size: 11px; font-weight: 700; color: #6E7585; letter-spacing: .03em;')}>{partLabel}</div>
        <div style={css('font-size: 16px; font-weight: 800; margin-top: 4px; color: #1A1D24; word-break: keep-all;')}>{partTitle}</div>
      </div>

      {hasTheory && <TheoryPanel theory={theory} theoryOn={theoryOn} toggleTheory={toggleTheory} />}

      <div style={css('padding: 4px 18px 12px; flex: 1;')}>
        {partQuestions.map((q, i) => (
          <div key={i} style={css('border-bottom: 1px solid #ECEFF4; padding: 13px 0;')}>
            <div style={css('display: flex; gap: 10px; align-items: flex-start;')}>
              <div style={css('font-size: 11px; font-weight: 800; color: #C2C8D4; flex-shrink: 0; width: 18px; padding-top: 2px;')}>{q.gLabel}</div>
              <div style={css('flex: 1; min-width: 0; font-size: 13.5px; line-height: 1.55; color: #14171D; word-break: keep-all; text-wrap: pretty;')}>{q.text}</div>
              <div style={css('flex-shrink: 0; display: flex; gap: 6px; align-items: center; padding-top: 1px;')}>
                {q.notAnswered && (
                  <>
                    <button onClick={q.answerO} className="ans-o" style={css('width: 34px; height: 32px; border: 1.5px solid #DDE3EF; background: #fff; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit;')}>
                      <span style={css('width: 13px; height: 13px; border-radius: 50%; border: 2.5px solid #2563EB; display: block;')} />
                    </button>
                    <button onClick={q.answerX} className="ans-x" style={css('width: 34px; height: 32px; border: 1.5px solid #DDE3EF; background: #fff; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit; font-size: 15px; color: #EF4444; line-height: 1;')}>✕</button>
                  </>
                )}
                {q.isCorrect && (
                  <span style={css('display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #E8F8EF; color: #15803D; font-size: 14px; font-weight: 800;')}>✓</span>
                )}
                {q.isWrong && (
                  <span style={css('display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #FDECEC; color: #DC2626; font-size: 13px; font-weight: 800;')}>✕</span>
                )}
              </div>
            </div>
            {q.answered && (
              <div style={{ ...css('margin-left: 28px; margin-top: 8px;'), animation: 'slideUp .2s ease' }}>
                {q.isCorrect && <div style={css('font-size: 11.5px; font-weight: 700; color: #15803D;')}>정답입니다 · 정답 {q.correctLabel}</div>}
                {q.isWrong && <div style={css('font-size: 11.5px; font-weight: 700; color: #DC2626;')}>오답 · 내 답 {q.userLabel} · 정답 {q.correctLabel}</div>}
                <div style={css('font-size: 12.5px; line-height: 1.65; color: #353B47; margin-top: 5px; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{q.explanation}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={css('padding: 12px 18px 22px; position: sticky; bottom: 0; background: linear-gradient(to top, #F7F8FB 72%, transparent); display: flex; gap: 10px;')}>
        {hasPrevPart && (
          <button onClick={prevPart} className="press-98" style={css('flex-shrink: 0; border: 1.5px solid #DDE3EF; background: #fff; color: #5A6172; font-size: 14px; font-weight: 700; padding: 7px 14px; border-radius: 10px; cursor: pointer; font-family: inherit;')}>이전</button>
        )}
        <button onClick={nextPart} className="press" style={css('flex: 0 0 auto; margin-left: auto; border: none; background: #1A1D24; color: #fff; font-size: 14px; font-weight: 700; padding: 7px 22px; border-radius: 10px; cursor: pointer; font-family: inherit;')}>{nextLabel}</button>
      </div>
    </div>
  )
}
