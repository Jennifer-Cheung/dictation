import React from 'react'
import Container from './Container'
import styles from './NavBar.module.scss'
import Button from './Button'

const NavBar = ({ onPageChange }) => (
  <div className={styles.navBar}>
    <Container className={styles.navBarContainer}>
      <div className={styles.logo}>Dictation</div>
      <Button onClick={() => onPageChange('Do Dictation')} isSmall colour={'primary'}>Do Dictation</Button>
      <Button colour={'primary'} onClick={() => {onPageChange('Make Dictation')}} isSmall>Make Dictation</Button>
    </Container>
  </div>
)

export default NavBar
