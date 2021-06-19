import React from 'react'
import styles from './Button.module.scss'

const Button = (
  {
    isPrimary = false,
    isSmall = false,
    onClick,
    children,
    disabled
  }
) => (
  <button
    className={
      [
        styles.button,
        isSmall === true ? styles.small : null,
        isPrimary === true ? styles.primary : styles.secondary
      ]
        .filter(name => name !== null)
        .join(' ')
    }
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
