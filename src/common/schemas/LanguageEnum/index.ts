import { z } from 'zod'

export const LanguageEnum = z.enum(['POLISH', 'ENGLISH'])

export const LanguageEnumArray = LanguageEnum.array()

export type LanguageEnum = z.infer<typeof LanguageEnum>

export type LanguageEnumArray = z.infer<typeof LanguageEnumArray>
