import { CodeTypeType, CodeType } from '../../schemas'

export type CodeTypeOption = {
  value: CodeTypeType
  label: string
}

export const codeTypeOptions = Object.values(CodeType.Enum).map((type) => ({
  value: type,
  label: type,
}))

export default codeTypeOptions
