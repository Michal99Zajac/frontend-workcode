import { z } from 'zod'

export const LanguageEnum = z.enum(['POLISH', 'ENGLISH'])

export const LanguageEnumArray = LanguageEnum.array()

export type LanguageEnumType = z.infer<typeof LanguageEnum>

export type LanguageEnumArrayType = z.infer<typeof LanguageEnumArray>
