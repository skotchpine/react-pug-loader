import 'core-js/stable'
import 'regenerator-runtime/runtime'

import lex from 'pug-lexer'
import parse from 'pug-parser'
import {handleFilters} from 'pug-filters'
import stripComments from 'pug-strip-comments'

const pugToJsxNode = (node, ctx) => {
  switch (node.type) {
    case 'Tag':
      console.log(JSON.stringify(node))
      if (node.selfClosing) { return `<${node.name}/>` }
      return `<${node.name}></${node.name}>`

    default:
      return ''
  }
}

export default async function(input) {
  this.cacheable()

  const parseOps = {stripUnbuffered: true, stripBuffered: true}
  const ast = handleFilters(parse(stripComments(lex(input), parseOps)))

  const ctx = {}
  const jsxNodes = await ast.nodes.map((node) => pugToJsxNode(node, ctx))

  var jsx = []

  if (jsxNodes.length === 0) {
    jsx = ['<React.Fragment/>']
  } else if (jsxNodes.length == 1) {
    jsx = [jsxNodes[0]]
  } else {
    jsx = ['<React.Fragment>', jsxNodes, '</React.Fragment>']
  }

  return `export default const (props = {}) => ${jsx.join('')}`
}
