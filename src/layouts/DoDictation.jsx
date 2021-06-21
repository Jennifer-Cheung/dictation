import React, { useState } from 'react'
import Question from '../components/Question'
import styles from '../App.module.scss'
import Button from '../components/Button'
import Timer from '../components/Timer'

const DoDictation = ({ dictation, voice, userValues, setUserValues, allowSubmit, setAllowSubmit }) => {
  const [score, setScore] = useState(null)

  const totalWordsCount = dictation?.words.length

  const submitOnClick = () => {
    let totalScore = 0
    userValues.forEach((value, i) => {
      if (value === dictation.words[i]) {
        totalScore++
      }
    })
    setScore(totalScore)
    setAllowSubmit(false)
  }


  return (
    <>
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
        <Button isPrimary onClick={submitOnClick} disabled={allowSubmit === false}>Submit</Button>
        {
          score !== null && allowSubmit === false
            ? (
              <p className={score / totalWordsCount >= 0.5 ? styles.pass : styles.fail}>
                {score}/{totalWordsCount} ({Math.round(10 * score / totalWordsCount * 100) / 10}%)
              </p>
            )
            : null
        }
      </div>

      <Timer/>
    </>
  )
}

export default DoDictation
