import styles from './App.module.scss'
import NavBar from './components/NavBar'
import React, { useEffect, useState } from 'react'
import Container from './components/Container'
import DoDictation from './layouts/DoDictation'
import CreateDictation from './layouts/CreateDictation'

// Assuming the browser has at least one voice.
const PRIMARY_VOICE_NAME = 'Google UK English Male'
const LANG = 'en-US'

const App = () => {
  const [voice, setVoice] = useState(null)
  const [dictation, setDictation] = useState(null)

  const [isCreatingFile, setIsCreatingFile] = useState(false)
  const [score, setScore] = useState(null)

  const [userValues, setUserValues] = useState([])

  const onFileOpen = (inputEvent) => {
    if (inputEvent.target.files.length === 0) {
      return
    }

    const file = inputEvent.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = () => {
      /** @type {string} */
      const text = fileReader.result
      const dictation = JSON.parse(text)
      setUserValues(dictation.words.map(() => ''))
      setDictation(dictation)
    }

    fileReader.readAsText(file)

    setScore(null)
  }

  const onCreateFileBtnClick = () => {
    setIsCreatingFile(true)
    setDictation(null)
  }

  const onOpenFileBtnClick = () => {
    setIsCreatingFile(false)
  }

  useEffect(() => {
    const selectVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const primaryVoice = voices.find(voice => voice.name === PRIMARY_VOICE_NAME)
      if (primaryVoice !== undefined) {
        setVoice(primaryVoice)
        return
      }

      const englishVoice = voices.find(voice => voice.lang === LANG)
      if (englishVoice !== undefined) {
        setVoice(englishVoice)
        return
      }

      setVoice(voices[0])
    }

    selectVoice()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = selectVoice
    }
  }, [])


  return (
    <div className={styles.bodyContainer}>
      <NavBar onFileOpen={onFileOpen} onCreateFileBtnClick={onCreateFileBtnClick} onClick={onOpenFileBtnClick}/>

      <Container className={styles.questionsContainer}>
        {dictation !== null
          ? (
            <DoDictation dictation={dictation} voice={voice} userValues={userValues} setUserValues={setUserValues}
                         score={score} setScore={setScore}/>
          )
          : (isCreatingFile === true
              ? <CreateDictation/>
              : <p>Open a dictation file to start the quiz.</p>
          )}
      </Container>
    </div>
  )
}

export default App
