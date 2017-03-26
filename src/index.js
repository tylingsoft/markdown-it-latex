import asciimath2latex from 'asciimath-to-latex'
import katex from 'katex'

const LatexPlugin = (md) => {
  // inline math
  const temp = md.renderer.rules.code_inline.bind(md.renderer.rules)
  md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
    let code = tokens[idx].content
    if (code.startsWith('@') && code.endsWith('@')) {
      code = '$' + asciimath2latex(code.substr(1, code.length - 2)) + '$'
    }
    if (code.startsWith('$') && code.endsWith('$')) { // inline math
      code = code.substr(1, code.length - 2)
      try {
        return katex.renderToString(code)
      } catch (err) {
        return `<code>${err}</code>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }

  // fenced math block
}

export default LatexPlugin
