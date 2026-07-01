import { css } from '../lib/css.js'
import { breakSentences } from '../lib/helpers.js'

// Map a raw theory block into the flags/shape the renderer expects
// (ported from renderVals' theoryBlocks mapping).
function mapBlock(b) {
  const o = {
    type: b.type,
    text: b.type === 'summary' || b.type === 'para' ? breakSentences(b.text || '') : b.text || '',
  }
  if (b.type === 'table' || b.type === 'tableNum') {
    o.headers = { c1: b.headers[0], c2: b.headers[1] }
    o.rows = b.rows.map((r, i) => ({ k: r[0], v: r[1], num: String(i + 1) }))
  }
  if (b.type === 'tableNum3') {
    o.headers3 = { c1: b.headers[0], c2: b.headers[1], c3: b.headers[2] }
    o.rows = b.rows.map((r, i) => ({ num: String(i + 1), a: r[1], b: r[2] }))
  }
  if (b.type === 'tableN') {
    o.headCells = b.headers.map((h) => ({ text: h }))
    o.rows = b.rows.map((r) => ({ cells: r.map((c) => ({ text: c })) }))
  }
  if (b.type === 'list' || b.type === 'checks') o.items = b.items.map((t) => ({ text: t }))
  if (b.type === 'easy') {
    o.pre = breakSentences(b.pre || '')
    o.hasPre = !!b.pre
    o.bullets = (b.bullets || []).map((t) => ({ text: t }))
    o.hasBullets = !!(b.bullets && b.bullets.length)
    o.post = breakSentences(b.post || '')
    o.hasPost = !!b.post
    o.titleSuffix = b.titleSuffix || ''
    o.hasTitleSuffix = !!b.titleSuffix
    if (b.table) {
      o.eHead = b.table.headers.map((h) => ({ text: h }))
      o.eRows = b.table.rows.map((r) => ({ cells: r.map((c) => ({ text: c })) }))
      o.hasETable = true
    } else o.hasETable = false
  }
  return o
}

function Blocks({ blocks }) {
  return blocks.map((blk, i) => {
    switch (blk.type) {
      case 'heading':
        return <div key={i} style={css('font-size: 14px; font-weight: 800; color: #312A6B; margin: 16px 0 9px;')}>{blk.text}</div>
      case 'summary':
        return <div key={i} style={css('font-size: 14px; color: #4A4170; background: #F7F6FD; border-radius: 10px; padding: 11px 13px; line-height: 1.6; font-weight: 600; margin-bottom: 10px; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{blk.text}</div>
      case 'para':
        return <div key={i} style={css('font-size: 14px; color: #2C3140; line-height: 1.55; margin-bottom: 10px; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{blk.text}</div>
      case 'pre':
        return <div key={i} style={css('font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; line-height: 1.5; color: #2C3140; background: #F4F6FA; border: 1px solid #E5E8EF; border-radius: 10px; padding: 11px 13px; margin-bottom: 10px; white-space: pre; overflow-x: auto;')}>{blk.text}</div>
      case 'warn':
        return (
          <div key={i} style={css('display: flex; gap: 9px; align-items: flex-start; background: #FEF3F2; border: 1px solid #F6C9C2; border-radius: 10px; padding: 11px 13px; margin-bottom: 10px;')}>
            <span style={css('flex-shrink: 0; font-size: 14px; margin-top: 1px;')}>⚠️</span>
            <div style={css('font-size: 13.5px; color: #9A3412; line-height: 1.6; font-weight: 600; word-break: keep-all; text-wrap: pretty;')}>{blk.text}</div>
          </div>
        )
      case 'table':
        return (
          <div key={i} style={css('border: 1px solid #E5E2F5; border-radius: 10px; overflow: hidden; margin-bottom: 10px;')}>
            <div style={css('display: flex; background: #EDEAFB;')}>
              <div style={css('flex: 0 0 38%; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{blk.headers.c1}</div>
              <div style={css('flex: 1; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA;')}>{blk.headers.c2}</div>
            </div>
            {blk.rows.map((row, ri) => (
              <div key={ri} style={css('display: flex; border-top: 1px solid #EEEBFB; background: #fff;')}>
                <div style={css('flex: 0 0 38%; padding: 9px 11px; font-size: 13px; font-weight: 700; color: #1A1D24; border-right: 1px solid #EEEBFB; word-break: keep-all; line-height: 1.45;')}>{row.k}</div>
                <div style={css('flex: 1; padding: 9px 11px; font-size: 13px; color: #2C3140; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{row.v}</div>
              </div>
            ))}
          </div>
        )
      case 'tableNum':
        return (
          <div key={i} style={css('border: 1px solid #E5E2F5; border-radius: 10px; overflow: hidden; margin-bottom: 10px;')}>
            <div style={css('display: flex; background: #EDEAFB;')}>
              <div style={css('flex: 0 0 56px; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{blk.headers.c1}</div>
              <div style={css('flex: 1; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA;')}>{blk.headers.c2}</div>
            </div>
            {blk.rows.map((row, ri) => (
              <div key={ri} style={css('display: flex; border-top: 1px solid #EEEBFB; background: #fff;')}>
                <div style={css('flex: 0 0 56px; padding: 8px 0; display: flex; align-items: center; justify-content: center; border-right: 1px solid #EEEBFB;')}>
                  <span style={css('width: 28px; height: 28px; border-radius: 9px; background: linear-gradient(135deg, #6D63F2, #4338CA); color: #fff; font-size: 13.5px; font-weight: 800; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(79,70,229,.32);')}>{row.num}</span>
                </div>
                <div style={css('flex: 1; padding: 9px 11px; font-size: 13px; color: #2C3140; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{row.v}</div>
              </div>
            ))}
          </div>
        )
      case 'tableNum3':
        return (
          <div key={i} style={css('border: 1px solid #E5E2F5; border-radius: 10px; overflow: hidden; margin-bottom: 10px;')}>
            <div style={css('display: flex; background: #EDEAFB;')}>
              <div style={css('flex: 0 0 52px; padding: 8px 10px; font-size: 12px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{blk.headers3.c1}</div>
              <div style={css('flex: 0 0 34%; padding: 8px 10px; font-size: 12px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{blk.headers3.c2}</div>
              <div style={css('flex: 1; padding: 8px 10px; font-size: 12px; font-weight: 800; color: #4338CA;')}>{blk.headers3.c3}</div>
            </div>
            {blk.rows.map((row, ri) => (
              <div key={ri} style={css('display: flex; border-top: 1px solid #EEEBFB; background: #fff;')}>
                <div style={css('flex: 0 0 52px; padding: 8px 0; display: flex; align-items: center; justify-content: center; border-right: 1px solid #EEEBFB;')}>
                  <span style={css('width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg, #6D63F2, #4338CA); color: #fff; font-size: 12.5px; font-weight: 800; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(79,70,229,.32);')}>{row.num}</span>
                </div>
                <div style={css('flex: 0 0 34%; padding: 9px 10px; font-size: 12.5px; font-weight: 700; color: #1A1D24; border-right: 1px solid #EEEBFB; word-break: keep-all; line-height: 1.45;')}>{row.a}</div>
                <div style={css('flex: 1; padding: 9px 10px; font-size: 12.5px; color: #2C3140; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{row.b}</div>
              </div>
            ))}
          </div>
        )
      case 'tableN':
        return (
          <div key={i} style={css('border: 1px solid #E5E2F5; border-radius: 10px; overflow: hidden; margin-bottom: 10px;')}>
            <div style={css('display: flex; background: #EDEAFB;')}>
              {blk.headCells.map((hc, hi) => (
                <div key={hi} style={css('flex: 1; padding: 8px 10px; font-size: 11.5px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{hc.text}</div>
              ))}
            </div>
            {blk.rows.map((row, ri) => (
              <div key={ri} style={css('display: flex; border-top: 1px solid #EEEBFB; background: #fff;')}>
                {row.cells.map((cell, ci) => (
                  <div key={ci} style={css('flex: 1; padding: 8px 10px; font-size: 12px; color: #2C3140; line-height: 1.45; border-right: 1px solid #EEEBFB; word-break: keep-all; text-wrap: pretty;')}>{cell.text}</div>
                ))}
              </div>
            ))}
          </div>
        )
      case 'list':
        return (
          <div key={i} style={css('display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px;')}>
            {blk.items.map((li, li2) => (
              <div key={li2} style={css('display: flex; gap: 10px; align-items: flex-start;')}>
                <div style={css('flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: #4F46E5; margin-top: 8px;')} />
                <div style={css('font-size: 14px; color: #2C3140; line-height: 1.55; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{li.text}</div>
              </div>
            ))}
          </div>
        )
      case 'checks':
        return (
          <div key={i} style={css('display: flex; flex-direction: column; gap: 9px; margin-bottom: 10px;')}>
            {blk.items.map((ci, ci2) => (
              <div key={ci2} style={css('display: flex; gap: 9px; align-items: flex-start;')}>
                <span style={css('flex-shrink: 0; color: #15803D; font-size: 14px; font-weight: 800; margin-top: 1px;')}>✔</span>
                <div style={css('font-size: 13.5px; color: #2C3140; line-height: 1.55; word-break: keep-all; text-wrap: pretty;')}>{ci.text}</div>
              </div>
            ))}
          </div>
        )
      case 'easy':
        return (
          <div key={i} style={css('margin-bottom: 4px; background: #FFF7EA; border: 1px solid #F4E2C2; border-radius: 10px; padding: 11px 13px;')}>
            <div style={css('font-size: 13px; font-weight: 800; color: #B45309; margin-bottom: 6px;')}>
              💡 쉬운 설명{blk.hasTitleSuffix && <span style={css('font-weight: 700;')}> {blk.titleSuffix}</span>}
            </div>
            {blk.hasPre && <div style={css('font-size: 14px; color: #4A4032; line-height: 1.65; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{blk.pre}</div>}
            {blk.hasBullets && (
              <div style={css('display: flex; flex-direction: column; gap: 7px; margin-top: 9px;')}>
                {blk.bullets.map((bu, bi) => (
                  <div key={bi} style={css('display: flex; gap: 9px; align-items: flex-start;')}>
                    <div style={css('flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: #D9A441; margin-top: 8px;')} />
                    <div style={css('font-size: 14px; color: #4A4032; line-height: 1.6; word-break: keep-all; text-wrap: pretty;')}>{bu.text}</div>
                  </div>
                ))}
              </div>
            )}
            {blk.hasETable && (
              <div style={css('border: 1px solid #EAD9A8; border-radius: 9px; overflow: hidden; margin-top: 10px; background: #fff;')}>
                <div style={css('display: flex; background: #FBEFD3;')}>
                  {blk.eHead.map((hc, hi) => (
                    <div key={hi} style={css('flex: 1; padding: 7px 9px; font-size: 11.5px; font-weight: 800; color: #92510A; border-right: 1px solid #EAD9A8;')}>{hc.text}</div>
                  ))}
                </div>
                {blk.eRows.map((row, ri) => (
                  <div key={ri} style={css('display: flex; border-top: 1px solid #F0E4C4;')}>
                    {row.cells.map((cell, ci) => (
                      <div key={ci} style={css('flex: 1; padding: 7px 9px; font-size: 12px; color: #4A4032; line-height: 1.45; border-right: 1px solid #F0E4C4; word-break: keep-all; text-wrap: pretty;')}>{cell.text}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {blk.hasPost && <div style={css('font-size: 14px; color: #4A4032; line-height: 1.65; margin-top: 9px; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{blk.post}</div>}
          </div>
        )
      default:
        return null
    }
  })
}

// Legacy (non-block) theory shape: summary/intro/bullets/table/points/easy + heading2/table2/easy2.
function Legacy({ theory }) {
  const hasIntro = !!theory.intro
  const hasBullets = !!(theory.bullets && theory.bullets.length)
  const theoryBullets = (theory.bullets || []).map((b) => breakSentences(b))
  const hasTable = !!theory.table
  const theoryTable = theory.table ? theory.table.rows.map((r) => ({ k: r[0], v: r[1] })) : []
  const th = theory.table ? { c1: theory.table.headers[0], c2: theory.table.headers[1] } : { c1: '', c2: '' }
  const theoryPoints = (theory.points || []).map((p, i) => ({ n: i + 1, term: p.term, text: breakSentences(p.text) }))
  const hasEasy = !!theory.easy
  const hasHeading2 = !!theory.heading2
  const hasTable2 = !!theory.table2
  const theoryTable2 = theory.table2 ? theory.table2.rows.map((r, i) => ({ v: r[1], num: String(i + 1) })) : []
  const th2 = theory.table2 ? { c1: theory.table2.headers[0], c2: theory.table2.headers[1] } : { c1: '', c2: '' }
  const hasEasy2 = !!theory.easy2

  return (
    <>
      <div style={css('font-size: 14px; color: #4A4170; background: #F7F6FD; border-radius: 10px; padding: 11px 13px; line-height: 1.6; font-weight: 600; margin-bottom: 12px; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{breakSentences(theory.summary)}</div>
      {hasIntro && <div style={css('font-size: 14px; color: #2C3140; line-height: 1.55; font-weight: 600; margin-bottom: 10px; word-break: keep-all; text-wrap: pretty;')}>{theory.intro}</div>}
      {hasBullets && (
        <div style={css('display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px;')}>
          {theoryBullets.map((b, i) => (
            <div key={i} style={css('display: flex; gap: 10px; align-items: flex-start;')}>
              <div style={css('flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: #4F46E5; margin-top: 8px;')} />
              <div style={css('font-size: 14px; color: #2C3140; line-height: 1.55; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{b}</div>
            </div>
          ))}
        </div>
      )}
      {hasTable && (
        <div style={css('border: 1px solid #E5E2F5; border-radius: 10px; overflow: hidden; margin-bottom: 4px;')}>
          <div style={css('display: flex; background: #EDEAFB;')}>
            <div style={css('flex: 0 0 38%; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{th.c1}</div>
            <div style={css('flex: 1; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA;')}>{th.c2}</div>
          </div>
          {theoryTable.map((row, i) => (
            <div key={i} style={css('display: flex; border-top: 1px solid #EEEBFB; background: #fff;')}>
              <div style={css('flex: 0 0 38%; padding: 9px 11px; font-size: 13px; font-weight: 700; color: #1A1D24; border-right: 1px solid #EEEBFB; word-break: keep-all; line-height: 1.45;')}>{row.k}</div>
              <div style={css('flex: 1; padding: 9px 11px; font-size: 13px; color: #2C3140; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{row.v}</div>
            </div>
          ))}
        </div>
      )}
      <div style={css('display: flex; flex-direction: column; gap: 9px;')}>
        {theoryPoints.map((pt, i) => (
          <div key={i} style={css('display: flex; gap: 9px;')}>
            <div style={css('flex-shrink: 0; width: 19px; height: 19px; border-radius: 6px; background: #EDEAFB; color: #4F46E5; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-top: 2px;')}>{pt.n}</div>
            <div style={css('font-size: 14px; color: #2C3140; line-height: 1.55; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>
              <b style={css('color: #1A1D24;')}>{pt.term}</b> · {pt.text}
            </div>
          </div>
        ))}
      </div>
      {hasEasy && (
        <div style={css('margin-top: 12px; background: #FFF7EA; border: 1px solid #F4E2C2; border-radius: 10px; padding: 11px 13px;')}>
          <div style={css('font-size: 13px; font-weight: 800; color: #B45309; margin-bottom: 6px;')}>💡 쉬운 설명</div>
          <div style={css('font-size: 14px; color: #4A4032; line-height: 1.65; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{breakSentences(theory.easy)}</div>
        </div>
      )}
      {hasHeading2 && <div style={css('margin-top: 16px; padding-top: 14px; border-top: 1px dashed #E0DCF4; font-size: 13.5px; font-weight: 800; color: #312A6B; margin-bottom: 10px;')}>{theory.heading2}</div>}
      {hasTable2 && (
        <div style={css('border: 1px solid #E5E2F5; border-radius: 10px; overflow: hidden; margin-bottom: 4px;')}>
          <div style={css('display: flex; background: #EDEAFB;')}>
            <div style={css('flex: 0 0 56px; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA; border-right: 1px solid #E0DCF4;')}>{th2.c1}</div>
            <div style={css('flex: 1; padding: 8px 11px; font-size: 12px; font-weight: 800; color: #4338CA;')}>{th2.c2}</div>
          </div>
          {theoryTable2.map((row, i) => (
            <div key={i} style={css('display: flex; border-top: 1px solid #EEEBFB; background: #fff;')}>
              <div style={css('flex: 0 0 56px; padding: 8px 0; display: flex; align-items: center; justify-content: center; border-right: 1px solid #EEEBFB;')}>
                <span style={css('width: 28px; height: 28px; border-radius: 9px; background: linear-gradient(135deg, #6D63F2, #4338CA); color: #fff; font-size: 13.5px; font-weight: 800; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(79,70,229,.32);')}>{row.num}</span>
              </div>
              <div style={css('flex: 1; padding: 9px 11px; font-size: 13px; color: #2C3140; line-height: 1.5; word-break: keep-all; text-wrap: pretty;')}>{row.v}</div>
            </div>
          ))}
        </div>
      )}
      {hasEasy2 && (
        <div style={css('margin-top: 12px; background: #FFF7EA; border: 1px solid #F4E2C2; border-radius: 10px; padding: 11px 13px;')}>
          <div style={css('font-size: 13px; font-weight: 800; color: #B45309; margin-bottom: 6px;')}>💡 쉬운 설명</div>
          <div style={css('font-size: 14px; color: #4A4032; line-height: 1.65; word-break: keep-all; text-wrap: pretty; white-space: pre-line;')}>{breakSentences(theory.easy2)}</div>
        </div>
      )}
    </>
  )
}

export default function TheoryPanel({ theory, theoryOn, toggleTheory }) {
  const hasBlocks = !!(theory.blocks && theory.blocks.length)
  const blocks = hasBlocks ? theory.blocks.map(mapBlock) : []

  return (
    <div style={css('padding: 8px 18px 0;')}>
      <div style={css('background: #fff; border: 1.5px solid #DDD7F7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(79,70,229,.06);')}>
        <button onClick={toggleTheory} className="theory-toggle" style={css('width: 100%; border: none; cursor: pointer; display: flex; align-items: center; gap: 9px; padding: 12px 14px; background: #F3F1FE; font-family: inherit;')}>
          <div style={css('width: 24px; height: 24px; border-radius: 7px; background: #4F46E5; color: #fff; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;')}>📖</div>
          <div style={css('flex: 1; text-align: left; font-size: 13px; font-weight: 800; color: #312A6B;')}>이론 정리</div>
          {theoryOn ? (
            <div style={css('display: flex; align-items: center; gap: 6px;')}>
              <span style={css('font-size: 11px; font-weight: 800; color: #4F46E5; letter-spacing: .04em;')}>ON</span>
              <div style={css('width: 38px; height: 22px; border-radius: 99px; background: #4F46E5; position: relative; flex-shrink: 0;')}>
                <div style={css('position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff;')} />
              </div>
            </div>
          ) : (
            <div style={css('display: flex; align-items: center; gap: 6px;')}>
              <span style={css('font-size: 11px; font-weight: 800; color: #A4ABBA; letter-spacing: .04em;')}>OFF</span>
              <div style={css('width: 38px; height: 22px; border-radius: 99px; background: #D6DAE2; position: relative; flex-shrink: 0;')}>
                <div style={css('position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff;')} />
              </div>
            </div>
          )}
        </button>
        {theoryOn && (
          <div style={css('padding: 12px 14px 14px;')}>
            {hasBlocks ? <Blocks blocks={blocks} /> : <Legacy theory={theory} />}
          </div>
        )}
      </div>
    </div>
  )
}
