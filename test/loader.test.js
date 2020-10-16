import {expect} from 'chai'
import reactPugLoader from '..'

const cases = [
  {
    desc: 'empty pug returns React.Fragment',
    input: ``,
    output: `export default const (props = {}) => <React.Fragment/>`,
  },

  {
    desc: 'empty tag',
    input: `button`,
    output: `export default const (props = {}) => <button></button>`,
  },
]

const run = async (input, extraOps = {}) => {
  const ops = {
    cacheable: () => {},
    resourcePath: '.test.pug',
    detail: true,
    ...extraOps,
  }

  return await reactPugLoader.call(ops, input)
}

describe('ReactPugLoader', () =>
  cases.forEach(({desc, input, output}) =>
    it(desc, async () =>
      expect(await run(input)).to.equal(output))))
