import { CodeTypeType } from '../../schemas/CodeType'

interface Color {
  bg: string
  color: string
}

type Colors = Record<CodeTypeType, Color>

export const codeColors: Colors = {
  BASH: {
    bg: '#89e051',
    color: 'white',
  },
  JAVASCRIPT: {
    bg: '#f1e05a',
    color: 'black',
  },
  PYTHON: {
    bg: '#3572A5',
    color: 'white',
  },
}

export default codeColors
