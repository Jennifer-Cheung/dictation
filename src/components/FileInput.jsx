import React, { useRef } from 'react'
import buttonStyles from './Button.module.scss'
import fileInputStyles from './FileInput.module.scss'

const FileInput = (
  {
    isPrimary = false,
    isSmall = false,
    onChange,
    label
  }
) => {
  const inputRef = useRef(null)

  const labelOnClick = () => {
    const input = inputRef.current
    if (input !== null) {
      input.click()
    }
  }

  return (
    <>
      <label
        className={
          [
            buttonStyles.button,
            isSmall === true ? buttonStyles.small : null,
            isPrimary === true ? buttonStyles.primary : buttonStyles.secondary
          ]
            .filter(name => name !== null)
            .join(' ')
        }
        onClick={labelOnClick}
      >
        {label}
      </label>
      <input
        type="file"
        accept="application/json,.dictation"
        onChange={(e) => {
          onChange(e)
          e.target.value = null
        }}
        className={fileInputStyles.hiddenInput}
        ref={inputRef}
      />
    </>

  )
}

export default FileInput
