import { CodeType } from 'common/schemas'

export const chooseMode = (type: CodeType) => {
  switch (type) {
    case 'BASH':
      return 'shell'
    case 'JAVASCRIPT':
      return 'javascript'
    case 'PYTHON':
      return 'python'
    default:
      throw new Error('type out of scope')
  }
}

export default chooseMode
