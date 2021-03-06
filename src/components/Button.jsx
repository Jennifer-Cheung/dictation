import React from 'react'
import styles from './Button.module.scss'

const Button = (
  {
    color,
    isSmall = false,
    onClick,
    children,
    disabled
  }
) => {
  const colorStyle = () => {
    switch (color) {
      case 'primary':
        return styles.primary
      case 'secondary':
        return styles.secondary
      case 'gray':
        return styles.gray
      case 'danger':
        return styles.danger
      default:
        return null
    }
  }

  return (
    <button
      className={
        [
          styles.button,
          isSmall === true ? styles.small : null,
          colorStyle()
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
}

export default Button
