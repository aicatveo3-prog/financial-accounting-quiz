import { css } from '../lib/css.js'

export default function ResultScreen({
  resultTitle,
  chapterTitle,
  score,
  totalCount,
  reviewList,
  goHome,
  retry,
}) {
  return (
    <div style={css('display: flex; flex-direction: column; min-height: 100vh;')}>
      <div style={css('padding: 48px 24px 20px;')}>
        <div style={css('font-size: 13px; font-weight: 600; color: #5C6473;')}>학습 완료</div>
        <div style={css('font-size: 24px; font-weight: 800; margin-top: 8px;')}>{resultTitle}</div>
        <div style={css('font-size: 14px; color: #5C6473; margin-top: 6px;')}>{chapterTitle}</div>
        <div style={css('display: flex; align-items: baseline; gap: 6px; margin-top: 22px;')}>
          <span style={css('font-size: 40px; font-weight: 800; color: #1A1D24;')}>{score}</span>
          <span style={css('font-size: 18px; font-weight: 700; color: #B0B6C5;')}>/ {totalCount}점</span>
        </div>
      </div>

      <div style={css('padding: 8px 16px 16px; flex: 1;')}>
        <div style={css('font-size: 12px; font-weight: 700; color: #6E7585; letter-spacing: .03em; padding: 8px;')}>다시 보기</div>
        <div style={css('display: flex; flex-direction: column; gap: 8px;')}>
          {reviewList.map((r, i) => (
            <div key={i} style={css('display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 14px; padding: 13px 15px; box-shadow: 0 2px 8px rgba(30,40,70,.04);')}>
              <span style={css('font-size: 18px; flex-shrink: 0;')}>{r.resultMark}</span>
              <div style={css('flex: 1; min-width: 0;')}>
                <div style={css('font-size: 13.5px; line-height: 1.45; color: #14171D; word-break: keep-all;')}>{r.text}</div>
                <div style={css('font-size: 11.5px; color: #727A8A; margin-top: 3px;')}>Q{r.number} · 정답 {r.correctLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={css('padding: 12px 20px 28px; display: flex; gap: 12px; position: sticky; bottom: 0; background: linear-gradient(to top, #F7F8FB 70%, transparent);')}>
        <button onClick={goHome} className="press-98" style={css('flex: 1; border: 2px solid #DDE3EF; background: #fff; color: #5A6172; font-size: 15px; font-weight: 700; padding: 15px; border-radius: 16px; cursor: pointer; font-family: inherit;')}>목록으로</button>
        <button onClick={retry} className="press-98" style={css('flex: 1.4; border: none; background: #4F46E5; color: #fff; font-size: 15px; font-weight: 700; padding: 15px; border-radius: 16px; cursor: pointer; font-family: inherit;')}>다시 풀기</button>
      </div>
    </div>
  )
}
