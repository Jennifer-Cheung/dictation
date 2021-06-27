import React, { useCallback, useEffect, useRef, useState } from 'react'
import Question from '../components/Question'
import styles from '../App.module.scss'
import Button from '../components/Button'
import Timer from '../components/Timer'
import AlertBox from '../components/AlertBox'

const DoDictation = ({ dictation, voice, userValues, setUserValues, score, setScore, setDictation }) => {
  const [remainingTime, setRemainingTime] = useState(null)
  const timeoutIdRef = useRef(null)
  const [isAlert, setIsAlert] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(null)

  const totalWordsCount = dictation?.words.length

  const submitOnClick = useCallback(() => {
    let totalScore = 0
    userValues.forEach((value, i) => {
      if (value === dictation.words[i]) {
        totalScore++
      }
    })
    setScore(totalScore)
    clearTimeout(timeoutIdRef.current)
  }, [dictation, userValues, setScore])

  useEffect(() => {
    setIsCountingDown(false)
    const timeoutId = timeoutIdRef.current
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId)
    }
    setRemainingTime(dictation.time ?? dictation.words.length * 10)
    console.log('dictation changed')
  }, [dictation, setIsCountingDown])

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

  return (
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
}

export default DoDictation
