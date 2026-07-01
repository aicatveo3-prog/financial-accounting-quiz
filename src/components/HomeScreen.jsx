import { css } from '../lib/css.js'

export default function HomeScreen({ homeChapters }) {
  return (
    <div style={css('display: flex; flex-direction: column; min-height: 100vh;')}>
      <div style={css('padding: 56px 24px 28px;')}>
        <div style={css('font-size: 13px; font-weight: 600; letter-spacing: .04em; color: #5C6473;')}>학습 퀴즈</div>
        <div style={css('font-size: 22px; font-weight: 800; margin-top: 8px; line-height: 1.3;')}>재무회계</div>
        <div style={css('font-size: 14px; color: #434A59; margin-top: 6px;')}>O/X 문제로 핵심 개념을 빠르게 점검해요</div>
      </div>

      <div style={css('padding: 0 16px 24px;')}>
        <div style={css('font-size: 12px; font-weight: 700; color: #6E7585; letter-spacing: .03em; padding: 0 8px 10px;')}>목록</div>

        <div style={css('display: flex; flex-direction: column; gap: 12px;')}>
          {homeChapters.map((ch, i) => (
            <button
              key={i}
              onClick={ch.open}
              className="press-985"
              style={css('width: 100%; text-align: left; border: none; cursor: pointer; background: #FFFFFF; border-radius: 20px; padding: 20px; box-shadow: 0 6px 20px rgba(30,40,70,.06); display: flex; flex-direction: column; gap: 16px; font-family: inherit;')}
            >
              <div style={css('display: flex; align-items: flex-start; gap: 14px;')}>
                <div style={css('width: 46px; height: 46px; border-radius: 14px; background: #4F46E5; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #fff;')}>{ch.num}</div>
                <div style={css('flex: 1; min-width: 0;')}>
                  <div style={css('font-size: 15.5px; font-weight: 700; line-height: 1.35; color: #1A1D24;')}>{ch.title}</div>
                  <div style={css('font-size: 13px; color: #5C6473; margin-top: 4px;')}>{ch.meta}</div>
                </div>
                <div style={css('color: #C2C8D4; font-size: 22px; align-self: center;')}>›</div>
              </div>
              <div style={css('display: flex; align-items: center; gap: 10px;')}>
                <div style={css('flex: 1; height: 6px; background: #ECEFF4; border-radius: 99px; overflow: hidden;')}>
                  <div style={css('height: 100%; background: #4F46E5; border-radius: 99px; width: ' + ch.pct + '%;')} />
                </div>
                <div style={css('font-size: 12px; font-weight: 700; color: #AEB5C4; flex-shrink: 0;')}>{ch.answeredText}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={css('margin-top: auto; padding: 16px 24px 28px; text-align: center; font-size: 12px; color: #B4BAC8;')}>탭하여 문제 풀기를 시작하세요</div>
    </div>
  )
}
