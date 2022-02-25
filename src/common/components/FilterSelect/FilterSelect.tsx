import React, { useRef, useState } from 'react'
import {
  InputProps,
  Input,
  Box,
  MenuItem,
  Menu,
  MenuList,
  useColorModeValue,
  useOutsideClick,
} from '@chakra-ui/react'

type OnChange<T> = (option: T) => void

interface FilterSelectProps<T> extends Omit<InputProps, 'onChange' | 'value'> {
  options: T[]
  value?: T
  identifer: string
  onChange: OnChange<T>
}

export const FilterSelect = <T,>(props: FilterSelectProps<T>): JSX.Element => {
  const { options, onChange, value, identifer, ...rest } = props
  const selectValue = value as any
  const placeholderColor = useColorModeValue('black', 'white')

  const menuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  useOutsideClick({
    ref: menuRef,
    handler: () => onClose(),
  })

  const onClose = () => {
    setIsOpen(false)
    setInput('')
  }

  const onFocus = () => {
    setIsOpen(true)
  }

  const onClick = (option: T) => {
    onChange(option)
  }

  return (
    <Box ref={menuRef}>
      <Input
        onFocus={onFocus}
        {...rest}
        placeholder={selectValue[identifer]}
        value={input}
        onChange={(_event) => setInput(_event.target.value)}
        mb={1}
        _placeholder={{
          opacity: 1,
          color: placeholderColor,
        }}
      />
      <Box
        position="relative"
        sx={{
          '& > *': {
            width: '100%',
          },
        }}
      >
        <Menu isOpen={isOpen}>
          <MenuList w="100%" onClick={onClose}>
            {options
              .filter((option) => {
                const menuOption = option as any
                return menuOption[identifer]
                  .toLowerCase()
                  .includes(input.toLowerCase())
              })
              .map((option) => {
                const menuOption = option as any
                return (
                  <MenuItem
                    onClick={() => onClick(option)}
                    key={menuOption[identifer]}
                  >
                    {menuOption[identifer]}
                  </MenuItem>
                )
              })}
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}

export default FilterSelect

FilterSelect.displayName = 'FilterSelect'
