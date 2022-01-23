import React, { useState, useCallback } from 'react'
import { MenuItemOption, MenuOptionGroup, MenuButton } from '@chakra-ui/react'

import { MenuWindow } from '../MenuWindow'
import { PolishFlagIcon, EnglishFlagIcon } from '../../../assets/icons/flags'
import { LanguageEnum, LanguageEnumType } from '../../schemas/LanguageSchema'

import classes from './LanguageMenu.module.scss'

export function LanguageMenu(): JSX.Element {
  const [lang, setLang] = useState<LanguageEnumType>(LanguageEnum.enum.ENGLISH)

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
    <MenuWindow
      title="language"
      menuButton={
        <MenuButton
          className={classes.menu}
          aria-label="Languages"
          variant="ghost"
        >
          {getLanguageIcon()}
        </MenuButton>
      }
    >
      <MenuOptionGroup value={lang} type="radio" onChange={onLangChange}>
        <MenuItemOption value={LanguageEnum.enum.POLISH}>
          <PolishFlagIcon /> Polish
        </MenuItemOption>
        <MenuItemOption value={LanguageEnum.enum.ENGLISH}>
          <EnglishFlagIcon /> English
        </MenuItemOption>
      </MenuOptionGroup>
    </MenuWindow>
  )
}

export default LanguageMenu
