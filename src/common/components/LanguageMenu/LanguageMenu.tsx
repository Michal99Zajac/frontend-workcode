import React, { useState, useCallback } from 'react'
import {
  Menu,
  MenuItemOption,
  MenuOptionGroup,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'

import { PolishFlagIcon, EnglishFlagIcon } from '../../../assets/icons/flags'
import { Language } from '../../types'

import classes from './LanguageMenu.module.scss'

export function LanguageMenu(): JSX.Element {
  const [lang, setLang] = useState<Language>(Language.ENGLISH)

  const getLanguageIcon = useCallback(() => {
    switch (lang) {
      case Language.ENGLISH:
        return <EnglishFlagIcon fontSize="2rem" />
      case Language.POLISH:
        return <PolishFlagIcon fontSize="2rem" />
      default:
        throw new Error('Set unknown language')
    }
  }, [lang])

  const onLangChange = (value: string | string[]) => {
    setLang(value as Language)
  }

  return (
    <Menu>
      <MenuButton
        className={classes.menu}
        aria-label="Languages"
        variant="ghost"
      >
        {getLanguageIcon()}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          value={lang}
          type="radio"
          title="language"
          onChange={onLangChange}
        >
          <MenuItemOption value={Language.POLISH}>
            <PolishFlagIcon /> Polish
          </MenuItemOption>
          <MenuItemOption value={Language.ENGLISH}>
            <EnglishFlagIcon /> English
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default LanguageMenu
