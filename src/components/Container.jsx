import React from 'react'
import styles from './Container.module.scss'

const Container = ({ className = null, children }) => (
  <div
    className={
      [
        styles.container,
        className
      ]
        .filter(name => name !== null)
        .join(' ')
    }>
    {children}
  </div>
)

export default Container
