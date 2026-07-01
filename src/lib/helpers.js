// Text/markdown helpers ported verbatim from the prototype logic.

export function label(a) { return a === 'O' ? 'O' : 'X' }

// Insert a newline after sentence-ending punctuation so explanations wrap per sentence.
export function breakSentences(text) {
  if (!text) return text
  return text.replace(/([.!?✓])\s+/g, '$1\n')
}

export function splitPartName(name) {
  const m = name.match(/^(PART\s*\d+)\.\s*(.*)$/)
  if (m) return { label: m[1], title: m[2] }
  return { label: '', title: name }
}

// Build markdown for the brief (11–20 legacy) explanation shape, if used.
export function buildBriefMd(ex) {
  const L = ['### 🔍 이 문제가 묻는 핵심', ex.q, '', '### 📐 풀이 과정']
  ex.steps.forEach((s) => {
    L.push('**' + s.t + '**')
    L.push('```')
    s.lines.forEach((x) => L.push(x))
    L.push('```')
  })
  if (ex.traps && ex.traps.length) {
    L.push('### ❌ 자주 하는 실수')
    ex.traps.forEach((t) => L.push('- ' + t))
  }
  if (ex.tips && ex.tips.length) {
    L.push('### 💡 포인트')
    ex.tips.forEach((t) => L.push('- ' + t))
  }
  return L.join('\n')
}

// Minimal markdown → HTML converter (verbatim from the prototype), producing the
// exact inline styles the worksheet explanation card expects.
export function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const inline = (s) =>
    esc(s).replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:800;color:#14171D;">$1</strong>')
  const lines = md.split('\n')
  let html = '',
    i = 0
  const cellS =
    'border:1px solid #E4E8F0;padding:5px 8px;vertical-align:top;text-align:left;word-break:keep-all;overflow-wrap:anywhere;'
  while (i < lines.length) {
    const raw = lines[i]
    const t = raw.trim()
    if (t.startsWith('```')) {
      i++
      const code = []
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i])
        i++
      }
      i++
      html +=
        '<pre style="background:#F5F6FA;border:1px solid #ECEFF4;border-radius:10px;padding:10px 12px;font-size:11px;line-height:1.7;color:#2C3140;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;margin:8px 0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">' +
        esc(code.join('\n')) +
        '</pre>'
      continue
    }
    if (t.startsWith('|')) {
      const tb = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tb.push(lines[i].trim())
        i++
      }
      const parse = (r) =>
        r
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((c) => c.trim())
      const head = parse(tb[0])
      let body = ''
      for (let r = 2; r < tb.length; r++) {
        const cells = parse(tb[r])
        body += '<tr>' + cells.map((c) => '<td style="' + cellS + '">' + inline(c) + '</td>').join('') + '</tr>'
      }
      html +=
        '<div style="margin:8px 0;"><table style="border-collapse:collapse;font-size:11px;width:100%;table-layout:fixed;"><thead><tr>' +
        head.map((h) => '<th style="' + cellS + 'background:#F5F6FA;font-weight:800;">' + inline(h) + '</th>').join('') +
        '</tr></thead><tbody>' +
        body +
        '</tbody></table></div>'
      continue
    }
    if (/^-{3,}$/.test(t) || t === '&nbsp;' || t === '') {
      i++
      continue
    }
    if (/^#{1,6}\s/.test(t)) {
      if (t.startsWith('# ')) {
        i++
        continue
      }
      html +=
        '<div style="font-size:12.5px;font-weight:800;color:#2F9E5E;margin:15px 0 7px;">' +
        inline(t.replace(/^#{1,6}\s+/, '')) +
        '</div>'
      i++
      continue
    }
    if (t.startsWith('- ') || t.startsWith('• ')) {
      const items = []
      while (i < lines.length) {
        const tt = lines[i].trim()
        if (tt.startsWith('- ') || tt.startsWith('• ')) {
          items.push(tt.replace(/^(- |• )/, ''))
          i++
        } else break
      }
      html +=
        '<ul style="margin:6px 0;padding-left:17px;">' +
        items
          .map((it) => '<li style="font-size:12px;color:#353B47;line-height:1.6;margin:3px 0;">' + inline(it) + '</li>')
          .join('') +
        '</ul>'
      continue
    }
    if (/^\*\*.+\*\*$/.test(t)) {
      html +=
        '<div style="font-weight:700;color:#14171D;font-size:12.5px;margin:11px 0 4px;">' +
        inline(t.replace(/^\*\*/, '').replace(/\*\*$/, '')) +
        '</div>'
      i++
      continue
    }
    html += '<p style="font-size:12px;color:#353B47;line-height:1.62;margin:7px 0;">' + inline(t) + '</p>'
    i++
  }
  return html
}
