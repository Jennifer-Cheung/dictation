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
) => (
  <button
    className={
      [
        styles.button,
        isSmall === true ? styles.small : null,
        colour === 'primary' ? styles.primary : colour === 'secondary' ? styles.secondary : styles.grey
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
