// Parse an inline CSS string into a React style object. Lets us keep the
// prototype's verbatim inline styles instead of hand-converting each property.
const cache = new Map()

export function css(str) {
  if (!str) return undefined
  if (cache.has(str)) return cache.get(str)
  const obj = {}
  str.split(';').forEach((decl) => {
    const idx = decl.indexOf(':')
    if (idx === -1) return
    const prop = decl.slice(0, idx).trim()
    const val = decl.slice(idx + 1).trim()
    if (!prop || !val) return
    // Custom properties stay as-is; otherwise camelCase the property.
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    obj[key] = val
  })
  cache.set(str, obj)
  return obj
}
