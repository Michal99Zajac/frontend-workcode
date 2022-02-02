import { CodeTypeType } from '../../schemas/CodeType'

export const codeColor = (code: CodeTypeType): string => {
  switch (code) {
    case 'BASH':
      return '#89e05199'
    case 'JAVASCRIPT':
      return '#f1e05a99'
    case 'PYTHON':
      return '#3572A599'
    default:
      throw new Error('Code Color is not defined')
  }
}

export default codeColor
