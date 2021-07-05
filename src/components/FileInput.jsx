import React, { useRef } from 'react'
import fileInputStyles from './FileInput.module.scss'
import Button from './Button'

const FileInput = (
  {
    color,
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
      <Button
        color={color}
        isSmall={isSmall}
        onClick={labelOnClick}
      >
        {label}
      </Button>
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
