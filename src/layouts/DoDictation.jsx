import React, { useCallback, useEffect, useRef, useState } from 'react'
import Question from '../components/Question'
import styles from '../App.module.scss'
import Button from '../components/Button'
import Timer from '../components/Timer'
import AlertBox from '../components/AlertBox'

// Assuming the browser has at least one voice.
const PRIMARY_VOICE_NAME = 'Google UK English Male'
const LANG = 'en-US'

const DoDictation = ({ time }) => {
  const [voice, setVoice] = useState(null)

  const [dictation, setDictation] = useState(null)
  const [userValues, setUserValues] = useState([])
  const [score, setScore] = useState(null)

  const timeoutIdRef = useRef(null)
  const [remainingTime, setRemainingTime] = useState(null)
  const [isCountingDown, setIsCountingDown] = useState(null)

  const [isAlert, setIsAlert] = useState(false)

  const totalWordsCount = dictation?.words.length

  const onFileOpen = useCallback((inputEvent) => {
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
  }, [])

  useEffect(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'application/json,.dictation')
    input.addEventListener('change', onFileOpen)
    input.style.display = 'none'
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }, [onFileOpen, time])

  const submitOnClick = useCallback(() => {
    if (dictation !== null) {
      setScore(userValues.reduce((totalScore, value, i) => totalScore + (dictation.words[i] === value ? 1 : 0), 0))
      clearTimeout(timeoutIdRef.current)
    }
  }, [dictation, userValues])

  useEffect(() => {
    if (dictation !== null) {
      setIsCountingDown(false)
      const timeoutId = timeoutIdRef.current
      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId)
      }
      setRemainingTime(dictation.time ?? dictation.words.length * 10)
      console.log('dictation changed')
    }
  }, [dictation])

  /*
   * if remaining time is larger than 0, the remaining time is decreased by 1 every 1000 ms. When the remaining time
   * changes, setTimeOut is called again.
   */
  useEffect(() => {
    console.log(remainingTime)
    if (remainingTime === 0 || remainingTime === null) {
      return
    }
    if (isCountingDown) {
      console.log(remainingTime + 'will count down')
      timeoutIdRef.current = setTimeout(() => { setRemainingTime(remainingTime - 1) }, 1000)
    }
  }, [remainingTime, isCountingDown])

  // Specifically for when the time is out to end the test
  useEffect(() => {
    if (remainingTime === 0) {
      submitOnClick()
    }
  }, [remainingTime, submitOnClick])

  useEffect(() => {
    if (dictation !== null) {
      setIsAlert(true)
    } else {setIsAlert(false)}
  }, [dictation])

  const alertBoxBtnOnClick = (btnType) => {
    if (btnType === 'cancel') {
      setDictation(null)
    } else if (btnType === 'yes') {
      setIsCountingDown(true)
    }

    setIsAlert(false)
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
    //isOpenFile is needed because if not, it will try to read the content of the dictation file, which when
    //isOpeningFile is true, is null.
    dictation !== null
      ? (
        <>
          {isAlert
            ? (
              <AlertBox title={dictation.title} btnOnClick={alertBoxBtnOnClick}/>
            )
            : null}

          <h1>{dictation.title}</h1>
          {dictation.words.map((word, i) => (
            <Question
              key={i}
              isCorrect={null}
              placeholder={'Question ' + (i + 1)}
              voice={voice}
              onChange={(newValue) => {
                const newUserValues = [...userValues]
                newUserValues[i] = newValue
                setUserValues(newUserValues)
              }}
              word={word}
              value={userValues[i]}
            />
          ))}
          <div className={styles.submitRow}>
            <Button colour={'primary'} onClick={submitOnClick} disabled={score !== null}>Submit</Button>
            {
              score !== null
                ? (
                  <p className={score / totalWordsCount >= 0.5 ? styles.pass : styles.fail}>
                    {score}/{totalWordsCount} ({Math.round(10 * score / totalWordsCount * 100) / 10}%)
                  </p>
                )
                : null
            }
          </div>
          <Timer remainingTime={remainingTime}/>
        </>
      )
      : null
  )
}

export default DoDictation
