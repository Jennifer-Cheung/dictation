import styles from './App.module.scss'
import NavBar from './components/NavBar'
import React, { useState } from 'react'
import Container from './components/Container'
import DoDictation from './layouts/DoDictation'
import CreateDictation from './layouts/CreateDictation'

const App = () => {
  const [page, setPage] = useState('Home')
  const [time, setTime] = useState(null)

  const onPageChange = (tab) => {
    setPage(tab)
    setTime((new Date()).getTime())
  }

  const pages = {
    'Do Dictation': <DoDictation time={time}/>,
    'Make Dictation': <CreateDictation/>
  }

  return (
    <div className={styles.bodyContainer}>
      <NavBar onPageChange={onPageChange}/>
      <Container className={styles.questionsContainer}>
        {pages[page]}
      </Container>
    </div>
  )
}

export default App
