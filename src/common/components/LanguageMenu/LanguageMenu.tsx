import React, { useState, useCallback } from 'react'
import {
  Menu,
  MenuItemOption,
  MenuOptionGroup,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'

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
    <Menu computePositionOnMount>
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
