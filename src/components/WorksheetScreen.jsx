import { css } from '../lib/css.js'

// A single formula segment: literal text, or an interactive blank (default / right / wrong / open).
function Segment({ sg }) {
  if (sg.isText) {
    return <span style={css('font-size: 12.5px; color: #16191F; white-space: pre; font-weight: 500;')}>{sg.text}</span>
  }
  return (
    <span style={css('position: relative; display: inline-block; vertical-align: middle;')}>
      {sg.isDefault && (
        <button onClick={sg.toggle} className="ws-blank-default" style={css('padding: 2px 10px; border-radius: 8px; border: 1.5px dashed #C7CDDA; background: #fff; color: #8A92A3; font-size: 11.5px; font-weight: 600; min-width: 56px; text-align: center; cursor: pointer; font-family: inherit;')}>{sg.display}</button>
      )}
      {sg.isRight && (
        <span style={css('display: inline-block; padding: 2px 10px; border-radius: 8px; border: 1.5px solid #DEEEE4; background: #F4FAF6; color: #5C9679; font-size: 11.5px; font-weight: 600; min-width: 56px; text-align: center;')}>
          {sg.display}
          <span style={css('font-size: 9px; margin-left: 2px; opacity: .7;')}>✓</span>
        </span>
      )}
      {sg.isWrong && (
        <>
          <button onClick={sg.toggle} style={css('padding: 2px 10px; border-radius: 8px; border: 1.5px solid #EDD8D5; background: #FBF5F4; color: #BC7E77; font-size: 11.5px; font-weight: 600; min-width: 56px; text-align: center; cursor: pointer; font-family: inherit;')}>{sg.display}</button>
          <span style={css('margin-left: 4px; font-size: 11px; font-weight: 700; color: #86B79A;')}>{sg.correctText}</span>
        </>
      )}
      {sg.isOpen && (
        <div ref={sg.dropRef} style={css('position: absolute; z-index: 50; left: 50%; transform: translateX(-50%); top: 100%; margin-top: 6px; background: #fff; box-shadow: 0 10px 30px rgba(20,25,40,.18); border-radius: 12px; border: 1px solid #E7EAF1; padding: 5px; display: flex; gap: 4px;')}>
          {sg.opts.map((op, oi) => (
            <button key={oi} onClick={op.pick} className="ws-opt" style={css('padding: 4px 8px; font-size: 10px; border-radius: 7px; border: none; cursor: pointer; font-weight: 700; white-space: nowrap; font-family: inherit; background: #fff; color: #5A6172;')}>{op.text}</button>
          ))}
        </div>
      )}
    </span>
  )
}

export default function WorksheetScreen(props) {
  const {
    wProblems,
    wTabRef,
    wProgressLabel,
    wSub,
    wSrc,
    wQuestion,
    wDataList,
    wChoices,
    wChoiceCols,
    wProgressPct,
    wCountText,
    wSteps,
    wShowExp,
    wExpHtml,
    wExpA,
    wExpBtnLabel,
    wToggleExp,
    wStatusPerfect,
    wStatusPartial,
    wStatusEmpty,
    wCanReset,
    wScoreText,
    wAns,
    wReset,
    wPrevOn,
    wNextOn,
    wPrev,
    wNext,
    wHasOpen,
    wCloseBlank,
    goHome,
  } = props

  return (
    <>
      <div style={css('display: flex; flex-direction: column; min-height: 100vh;')}>
        <div style={css('padding: 14px 18px 12px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #ECEFF4; position: sticky; top: 0; background: #F7F8FB; z-index: 5;')}>
          <button onClick={goHome} style={css('border: none; background: #EAEDF3; width: 32px; height: 32px; border-radius: 9px; font-size: 15px; color: #5A6172; cursor: pointer; flex-shrink: 0; font-family: inherit;')}>‹</button>
          <div style={css('flex: 1; min-width: 0;')}>
            <div style={css('font-size: 12.5px; font-weight: 700; color: #1A1D24; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;')}>재무회계 챕터5 (재고자산)</div>
            <div style={css('font-size: 10.5px; color: #6E7585; margin-top: 1px;')}>빈칸형 워크시트 · {wProgressLabel}</div>
          </div>
        </div>

        <div style={css('padding: 12px 14px 2px;')}>
          <div ref={wTabRef} style={css('display: flex; gap: 7px; overflow-x: auto; padding-bottom: 6px;')}>
            {wProblems.map((t, i) => {
              if (t.isCur)
                return <button key={i} onClick={t.open} style={css('flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; font-size: 12.5px; font-weight: 800; cursor: pointer; font-family: inherit; border: none; background: #4F46E5; color: #fff; box-shadow: 0 3px 8px rgba(79,70,229,.3);')}>{t.label}</button>
              if (t.isDone)
                return <button key={i} onClick={t.open} style={css('flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; font-size: 12.5px; font-weight: 800; cursor: pointer; font-family: inherit; border: 1px solid #CDEBD8; background: #EEFAF2; color: #2F9E5E;')}>{t.label}</button>
              if (t.isAttempted)
                return <button key={i} onClick={t.open} style={css('flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; font-size: 12.5px; font-weight: 800; cursor: pointer; font-family: inherit; border: 1px solid #E4E8F0; background: #F1F3F8; color: #8A92A3;')}>{t.label}</button>
              return <button key={i} onClick={t.open} style={css('flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; font-size: 12.5px; font-weight: 800; cursor: pointer; font-family: inherit; border: 1px solid #ECEFF4; background: #fff; color: #C2C8D4;')}>{t.label}</button>
            })}
          </div>
        </div>

        <div style={css('flex: 1; padding: 4px 14px 16px;')}>
          <div style={css('background: #fff; border-radius: 20px; box-shadow: 0 6px 20px rgba(30,40,70,.06); overflow: hidden;')}>
            <div style={css('padding: 18px 18px 14px;')}>
              <div style={css('display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;')}>
                <span style={css('background: #EDEAFB; color: #4338CA; padding: 3px 9px; border-radius: 7px; font-size: 10.5px; font-weight: 800;')}>{wSub}</span>
                <span style={css('font-size: 10.5px; color: #B4BAC8; font-weight: 600;')}>{wSrc}</span>
              </div>
              <p style={css('font-size: 13.5px; font-weight: 700; color: #14171D; line-height: 1.55; margin: 0; word-break: keep-all; text-wrap: pretty;')}>{wQuestion}</p>
              <div style={css('margin-top: 12px; display: flex; flex-direction: column; gap: 5px;')}>
                {wDataList.map((d, i) => (
                  <div key={i} style={css('display: flex; gap: 8px; align-items: flex-start;')}>
                    <span style={css('flex-shrink: 0; width: 4px; height: 4px; border-radius: 50%; background: #C2C8D4; margin-top: 8px;')} />
                    <div style={css('font-size: 12px; color: #353B47; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{d.text}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...css('margin-top: 14px; display: grid; gap: 4px 14px;'), gridTemplateColumns: wChoiceCols }}>
                {wChoices.map((c, i) => (
                  <div key={i} style={css('font-size: 12px; color: #4E5666; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{c.text}</div>
                ))}
              </div>
            </div>

            <div style={css('height: 1px; background: #ECEFF4; margin: 0 18px;')} />

            <div style={css('padding: 10px 18px 6px; display: flex; align-items: center; gap: 10px;')}>
              <div style={css('flex: 1; height: 5px; background: #ECEFF4; border-radius: 99px; overflow: hidden;')}>
                <div style={css('height: 100%; background: #4F46E5; border-radius: 99px; width: ' + wProgressPct + '%; transition: width .4s cubic-bezier(.4,0,.2,1);')} />
              </div>
              <span style={css('font-size: 10.5px; font-weight: 800; color: #AEB5C4; flex-shrink: 0;')}>{wCountText}</span>
            </div>

            <div style={css('padding: 8px 18px 18px; display: flex; flex-direction: column; gap: 12px;')}>
              {wSteps.map((st, si) => (
                <div key={si}>
                  <div style={css('font-size: 10.5px; font-weight: 600; color: #2C3140; margin-bottom: 6px; display: flex; align-items: center; gap: 7px;')}>
                    <span style={css('width: 5px; height: 5px; border-radius: 50%; background: #4F46E5; display: inline-block; flex-shrink: 0;')} />
                    {st.title}
                  </div>
                  <div style={css('background: #F5F6FA; border: 1px solid #ECEFF4; border-radius: 12px; padding: 4px 12px;')}>
                    {st.formulas.map((fm, fi) => (
                      <div key={fi} style={css('padding: 7px 0; display: flex; flex-wrap: wrap; align-items: center; gap: 3px; line-height: 2;')}>
                        {fm.segs.map((sg, sgi) => (
                          <Segment key={sgi} sg={sg} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {wShowExp && (
          <div style={css('padding: 0 14px 4px;')}>
            <div style={{ ...css('background: #fff; border-radius: 20px; box-shadow: 0 6px 20px rgba(30,40,70,.06); overflow: hidden; border: 1px solid #E4F0E8;'), animation: 'slideUp .3s ease' }}>
              <div style={css('padding: 13px 18px; background: #F4FAF6; border-bottom: 1px solid #E4F0E8; display: flex; align-items: center; gap: 8px;')}>
                <span style={css('font-size: 15px;')}>📘</span>
                <span style={css('font-size: 13px; font-weight: 800; color: #2F9E5E;')}>해설</span>
                <span style={css('margin-left: auto; font-size: 11px; font-weight: 800; color: #4E8F6A; background: #E4F0E8; padding: 3px 10px; border-radius: 7px;')}>{wExpA}</span>
              </div>
              <div style={css('padding: 6px 18px 16px; word-break: keep-all;')} dangerouslySetInnerHTML={{ __html: wExpHtml }} />
            </div>
          </div>
        )}

        <div style={css('padding: 10px 18px 22px; position: sticky; bottom: 0; background: linear-gradient(to top, #F7F8FB 72%, transparent);')}>
          <div style={css('display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 24px; margin-bottom: 9px; padding: 0 2px;')}>
            {wStatusPerfect && (
              <div style={css('display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 800; color: #2F9E5E; min-width: 0;')}>🎉 완벽해요<span style={css('color: #B7CFC0; font-weight: 700;')}>·</span><span style={css('color: #5C9679; font-weight: 700;')}>정답 {wAns}</span></div>
            )}
            {wStatusPartial && (
              <div style={css('display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 800; color: #4F46E5; min-width: 0;')}>{wScoreText}<span style={css('color: #CBD0DC; font-weight: 700;')}>·</span><span style={css('color: #9AA1B1; font-weight: 700;')}>정답 {wAns}</span></div>
            )}
            {wStatusEmpty && (
              <div style={css('display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #AEB5C4; min-width: 0;')}><span style={css('width: 5px; height: 5px; border-radius: 50%; background: #D3D8E2; display: inline-block; flex-shrink: 0;')} />빈칸을 채워보세요</div>
            )}
            {wCanReset && (
              <button onClick={wReset} className="ws-reset" style={css('display: inline-flex; align-items: center; gap: 4px; padding: 5px 11px; border-radius: 9px; border: 1px solid #E4E8F0; background: #fff; color: #8A92A3; font-size: 11.5px; font-weight: 700; cursor: pointer; font-family: inherit; flex-shrink: 0;')}>↺ 초기화</button>
            )}
          </div>
          <button onClick={wToggleExp} className="press" style={css('width: 100%; margin-bottom: 8px; padding: 10px; border-radius: 12px; border: 1.5px solid #CDEBD8; background: #F4FAF6; color: #2F9E5E; font-size: 13px; font-weight: 800; cursor: pointer; font-family: inherit;')}>{wExpBtnLabel}</button>
          <div style={css('display: flex; gap: 8px;')}>
            {wPrevOn && (
              <button onClick={wPrev} className="press" style={css('flex: 1; padding: 11px; border-radius: 12px; border: 1.5px solid #DDE3EF; background: #fff; color: #5A6172; font-size: 13.5px; font-weight: 700; cursor: pointer; font-family: inherit;')}>← 이전</button>
            )}
            {wNextOn && (
              <button onClick={wNext} className="press" style={css('flex: 1; padding: 11px; border-radius: 12px; border: none; background: #1A1D24; color: #fff; font-size: 13.5px; font-weight: 700; cursor: pointer; font-family: inherit;')}>다음 →</button>
            )}
          </div>
        </div>
      </div>

      {wHasOpen && <div onClick={wCloseBlank} style={css('position: fixed; inset: 0; z-index: 40;')} />}
    </>
  )
}
