import React from 'react'
import styles from './Button.module.scss'

const Button = (
  {
    colour,
    isSmall = false,
    onClick,
    children,
    disabled
  }
) => {
  const colourStyle = () => {
    switch (colour) {
      case 'primary':
        return styles.primary
      case 'secondary':
        return styles.secondary
      case 'grey':
        return styles.grey
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
          colourStyle()
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
