import React from 'react'
import styles from './Input.module.scss'

const Input = ({placeholder = null, value, onChange, error = false, success = false, className = null}) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={[
      styles.input,
      error !== false ? styles.error : null,
      success !== false ? styles.success : null,
      className
    ].filter(name => name !== null).join(' ')}
  />
)

export default Input
