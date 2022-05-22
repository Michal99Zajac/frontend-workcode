import React, { useState, useCallback } from 'react'
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { PolishFlagIcon, EnglishFlagIcon } from 'icons/flags'
import { Language } from 'i18n'

export function LanguageMenu(): JSX.Element {
  const { i18n, t } = useTranslation()
  const [lang, setLang] = useState<Language>(i18n.language as Language)

  const getLanguageIcon = useCallback(() => {
    switch (lang) {
      case 'en':
        return <EnglishFlagIcon fontSize="2rem" />
      case 'pl':
        return <PolishFlagIcon fontSize="2rem" />
      default:
        throw new Error('Set unknown language')
    }
  }, [lang])

  const onLangChange = (value: string | string[]) => {
    const language = value as Language
    setLang(language)
    i18n.changeLanguage(language)
    dayjs.locale(language)
  }

  return (
    <Menu>
      <MenuButton>{getLanguageIcon()}</MenuButton>
      <MenuList>
        <MenuOptionGroup value={lang} type="radio" onChange={onLangChange}>
          <MenuItemOption value={Language.enum.pl}>
            <PolishFlagIcon />{' '}
            {t('common.components.language_menu.options.polish')}
          </MenuItemOption>
          <MenuItemOption value={Language.enum.en}>
            <EnglishFlagIcon />{' '}
            {t('common.components.language_menu.options.english')}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default LanguageMenu
