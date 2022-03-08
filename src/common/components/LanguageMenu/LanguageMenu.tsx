import React, { useState, useCallback } from 'react'
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'

import { PolishFlagIcon, EnglishFlagIcon } from '../../../icons/flags'
import { LanguageEnum } from '../../schemas/LanguageEnum'

export function LanguageMenu(): JSX.Element {
  const [lang, setLang] = useState<LanguageEnum>(LanguageEnum.enum.ENGLISH)

  const getLanguageIcon = useCallback(() => {
    switch (lang) {
      case LanguageEnum.enum.ENGLISH:
        return <EnglishFlagIcon fontSize="2rem" />
      case LanguageEnum.enum.POLISH:
        return <PolishFlagIcon fontSize="2rem" />
      default:
        throw new Error('Set unknown language')
    }
  }, [lang])

  const onLangChange = (value: string | string[]) => {
    setLang(LanguageEnum.parse(value))
  }

  return (
    <Menu>
      <MenuButton>{getLanguageIcon()}</MenuButton>
      <MenuList>
        <MenuOptionGroup value={lang} type="radio" onChange={onLangChange}>
          <MenuItemOption value={LanguageEnum.enum.POLISH}>
            <PolishFlagIcon /> Polish
          </MenuItemOption>
          <MenuItemOption value={LanguageEnum.enum.ENGLISH}>
            <EnglishFlagIcon /> English
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default LanguageMenu
