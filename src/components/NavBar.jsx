import React from 'react'
import FileInput from './FileInput'
import Container from './Container'
import styles from './NavBar.module.scss'
import Button from './Button'

const NavBar = ({onFileOpen, onCreateFileBtnClick, onClick}) => (
  <div className={styles.navBar}>
    <Container className={styles.navBarContainer}>
      <div className={styles.logo}>Dictation</div>
      <FileInput onChange={onFileOpen} isSmall isPrimary id={'fileInput'} onClick={onClick}/>
      <Button isPrimary={true} onClick={onCreateFileBtnClick} isSmall={true}>Create a JSON File</Button>
    </Container>
  </div>
)

export default NavBar
