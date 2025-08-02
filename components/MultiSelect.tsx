"use client"
import React, { useRef, useMemo, useState } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'

interface Option {
  label: string
  value: string
}

interface IBasicSelectProps {
  options: Option[]
  placeholder?: string
  onChange: (options: Option[]) => void
  selectedValues: string[]
}

const MultiSelect = ({ options, placeholder, onChange, selectedValues }: IBasicSelectProps) => {
  const getFilteredOptions = (selectedItems: Option[], inputValue: string) => {
    return options.filter(
      (option) =>
        !selectedItems.some((item) => item.value === option.value) &&
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  const [inputValue, setInputValue] = useState('')
  const [selectedItems, setSelectedItems] = useState<Option[]>(
    options.filter((option) => selectedValues.includes(option.value))
  )

  const items = useMemo(() => getFilteredOptions(selectedItems, inputValue), [selectedItems, inputValue])
  const inputRef = useRef<HTMLInputElement>(null)

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection<Option>({
    selectedItems,
    onStateChange({ selectedItems: newItems, type }) {
      if (
        type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace ||
        type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete ||
        type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace ||
        type === useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem
      ) {
        if (newItems) setSelectedItems(newItems)
      }
    },
  })

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox<Option>({
    items,
    itemToString: (item) => (item ? item.label : ''),
    selectedItem: null,
    inputValue,
    defaultHighlightedIndex: 0,
    stateReducer(_, actionAndChanges) {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return { ...changes, isOpen: true, highlightedIndex: 0 }
        default:
          return changes
      }
    },
    onStateChange({ inputValue: newValue, type, selectedItem: newItem }) {
      if (
        type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
        type === useCombobox.stateChangeTypes.ItemClick ||
        type === useCombobox.stateChangeTypes.InputBlur
      ) {
        if (newItem) {
          const newSelected = [...selectedItems, newItem]
          setSelectedItems(newSelected)
          setInputValue('')
          onChange(newSelected)
        }
      } else if (type === useCombobox.stateChangeTypes.InputChange && typeof newValue === 'string') {
        setInputValue(newValue)
      }
    },
  })

  return (
    <div className="w-full shadow-md">
      <div className="flex flex-col gap-1 relative">
        <div
          className="bg-white flex gap-2 items-center flex-wrap p-1 px-4 rounded-md border border-gray-200 min-h-[44px] relative cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {selectedItems.map((item, index) => (
            <div
              key={item.value}
              className="flex items-center rounded-md mr-1 min-h-[32px] h-[32px] text-sm bg-neutral-100"
              {...getSelectedItemProps({ selectedItem: item, index })}
            >
              <span className="ml-1 mr-1 text-primary">{item.label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeSelectedItem(item)
                  onChange(selectedItems.filter((i) => i.value !== item.value))
                }}
                className="text-xs bg-primary w-5 min-h-[32px] h-[32px] flex items-center justify-center rounded-tr rounded-br"
              >
               ✕
              </button>
            </div>
          ))}

          <input
            ref={inputRef}
            placeholder={selectedItems.length > 0 ? '' : placeholder}
            className="flex-1 min-w-[80px] h-[32px] text-sm outline-none bg-transparent"
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
        {selectedItems.length > 0 && (
            <button
              className="text-sm text-gray-600 font-semibold hover:underline hover:text-primary"
              onClick={() => {
                setSelectedItems([])
                onChange([])
              }}
            >
              Clear
            </button>
          )}
        </div>
        <ul
         className={`absolute top-full w-full bg-white shadow-md rounded-md max-h-80 overflow-y-auto p-0 z-10 list-none ${
            isOpen && items.length ? 'block' : 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                key={item.value}
                className={`px-3 py-2 text-sm cursor-pointer text-primary ${
                  highlightedIndex === index ? 'bg-neutral-200' : 'bg-white'
                }`}
                {...getItemProps({ item, index })}
              >
                {item.label}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default MultiSelect
