import React from 'react'
import appStyles from '../App.module.scss'
import Input from '../components/Input'
import Button from '../components/Button'
import WordInput from '../components/WordInput'
import styles from './CreateDictation.module.scss'

const CreateDictation = () => {
  const [words, setWords] = React.useState([''])
  const [title, setTitle] = React.useState(null)

  const onChange = (value, i) => {
    const newArray = [...words]
    newArray[i] = value
    setWords(newArray)
  }

  const plusBtnOnClick = (i) => {
    let newArray = [...words]
    newArray.splice(i + 1, 0, '')
    setWords(newArray)
  }

  const minusBtnOnClick = (i) => {
    let newArray = [...words]
    newArray.splice(i, 1)
    setWords(newArray)
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Title</h3>
        <Input onChange={(e) => {setTitle(e.target.value)}} value={title}/>
      </div>

      <div>
        <h3>Words</h3>
        <div className={appStyles.questionsContainer}>
          {
            words.map((word, i) => (
              <div className={appStyles.wrapper} key={i}>
                <WordInput
                  i={i}
                  value={word}
                  onChange={onChange}
                  plusBtnOnClick={plusBtnOnClick}
                  minusBtnOnClick={minusBtnOnClick}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className={appStyles.submitRow}>
        <Button isPrimary={true}>Download file</Button>
      </div>
    </div>
  )
}

export default CreateDictation
