import { CodeType } from '../../schemas'

export type CodeTypeOption = {
  value: CodeType
  label: string
}

export const codeTypeOptions = Object.values(CodeType.Enum).map((type) => ({
  value: type,
  label: type,
}))

export default codeTypeOptions
