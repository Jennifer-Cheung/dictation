import React from 'react'
import buttonStyles from './Button.module.scss'
import fileInputStyles from './FileInput.module.scss'

const FileInput = (
  {
    isPrimary = false,
    isSmall = false,
    onChange,
    id,
    onClick
  }
) => (
  <>
    <label
      htmlFor={id}
      className={
        [
          buttonStyles.button,
          isSmall === true ? buttonStyles.small : null,
          isPrimary === true ? buttonStyles.primary : buttonStyles.secondary
        ]
          .filter(name => name !== null)
          .join(' ')
      }
    >
      Open File...
    </label>
    <input
      type="file"
      accept="application/json,.dictation"
      onChange={onChange}
      id={id}
      className={fileInputStyles.hiddenInput}
      onClick={onClick}
    />
  </>

)

export default FileInput
