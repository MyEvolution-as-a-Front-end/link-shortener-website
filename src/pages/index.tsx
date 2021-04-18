import {useRef, useState} from 'react'
import {IoCopyOutline} from 'react-icons/io5'

import {api} from 'services/api'
import styles from 'styles/Home.module.css'

export default function Home(): JSX.Element {
  const [text, setText] = useState('')

  const inputRef = useRef<HTMLInputElement | null>()

  function clipboard(element: HTMLInputElement) {
    element.select()
    document.execCommand('copy')
  }

  async function handleSubmit() {
    const {data} = await api.post('shorten', {
      long_url: text,
    })
    setText(data?.link)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Crie links atrativos <br /> com um clique
      </h2>
      <p>Crie links curtos poderosos e reconhecíveis</p>
      <div className={styles.box}>
        <div className={styles.input}>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          {text && (
            <IoCopyOutline
              className={styles.icon}
              onClick={() => clipboard(inputRef.current)}
              size={18}
            />
          )}
        </div>
        <button className={styles.button} onClick={() => handleSubmit()}>
          Encurtar
        </button>
      </div>
    </div>
  )
}
