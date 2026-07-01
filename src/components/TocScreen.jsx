import { css } from '../lib/css.js'

export default function TocScreen({
  chapterTitle,
  partCount,
  totalCount,
  chapterDoneText,
  tocParts,
  goHome,
  showResult,
}) {
  return (
    <div style={css('display: flex; flex-direction: column; min-height: 100vh;')}>
      <div style={css('padding: 20px 20px 14px; flex-shrink: 0; position: sticky; top: 0; background: #F7F8FB; z-index: 5;')}>
        <button onClick={goHome} style={css('border: none; background: transparent; padding: 0; display: flex; align-items: center; gap: 6px; color: #5C6473; font-size: 12.5px; cursor: pointer; font-family: inherit;')}>‹ 목록</button>
        <div style={css('font-size: 18px; font-weight: 800; margin-top: 12px; color: #1A1D24;')}>{chapterTitle}</div>
        <div style={css('font-size: 12.5px; color: #5C6473; margin-top: 4px;')}>총 {partCount}개 파트 · {totalCount}문제 · {chapterDoneText}</div>
      </div>

      <div style={css('flex: 1; padding: 2px 14px 14px;')}>
        {tocParts.map((p, i) => (
          <button
            key={i}
            onClick={p.open}
            className="press"
            style={css('width: 100%; text-align: left; border: none; cursor: pointer; display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 14px; padding: 13px 14px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(30,40,70,.04); font-family: inherit;')}
          >
            {p.isDone && (
              <div style={css('width: 30px; height: 30px; border-radius: 9px; background: #E8F8EF; color: #15803D; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;')}>{p.num}</div>
            )}
            {p.isActive && (
              <div style={css('width: 30px; height: 30px; border-radius: 9px; background: #4F46E5; color: #fff; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;')}>{p.num}</div>
            )}
            {p.isTodo && (
              <div style={css('width: 30px; height: 30px; border-radius: 9px; background: #EEF1F6; color: #5A6172; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;')}>{p.num}</div>
            )}
            <div style={css('flex: 1; min-width: 0;')}>
              <div style={css('font-size: 13.5px; font-weight: 700; color: #1A1D24; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;')}>{p.title}</div>
              <div style={css('display: flex; align-items: center; gap: 8px; margin-top: 6px;')}>
                <div style={css('flex: 1; height: 4px; background: #ECEFF4; border-radius: 99px; overflow: hidden;')}>
                  <div style={css('height: 100%; background: #4F46E5; border-radius: 99px; width: ' + p.pct + '%;')} />
                </div>
                <div style={css('font-size: 10.5px; font-weight: 700; color: #AEB5C4; flex-shrink: 0;')}>{p.progressText}</div>
              </div>
            </div>
            {p.isDone && <span style={css('color: #15803D; font-size: 14px; flex-shrink: 0;')}>✓</span>}
            {p.isActive && <span style={css('color: #4F46E5; font-size: 18px; flex-shrink: 0;')}>›</span>}
            {p.isTodo && <span style={css('color: #C2C8D4; font-size: 18px; flex-shrink: 0;')}>›</span>}
          </button>
        ))}
      </div>

      <div style={css('padding: 12px 18px 22px; position: sticky; bottom: 0; background: linear-gradient(to top, #F7F8FB 72%, transparent);')}>
        <button onClick={showResult} className="press" style={css('width: 100%; border: 1.5px solid #DDE3EF; background: #fff; color: #5A6172; font-size: 14.5px; font-weight: 700; padding: 14px; border-radius: 12px; cursor: pointer; font-family: inherit;')}>전체 결과 보기</button>
      </div>
    </div>
  )
}
