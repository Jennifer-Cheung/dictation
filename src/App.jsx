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
  const [allowSubmit, setAllowSubmit] = useState(true)

  const [userValues, setUserValues] = useState([])
  const onFileOpen = (inputEvent) => {

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
  }

  const onCreateFileBtnClick = () => {
    setIsCreatingFile(true)
    setDictation(null)
  }

  const onOpenFileBtnClick = () => {
    setIsCreatingFile(false)
    setAllowSubmit(true)
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
                         allowSubmit={allowSubmit} setAllowSubmit={setAllowSubmit}/>
          )
          : (isCreatingFile === true
              ? <CreateDictation/>
              : <p>Open a dictation file to start the quiz.</p>
          )}
      </Container>
      <a href="/logo192.png" download="hi.png">Download image</a>
    </div>
  )
}

export default App
