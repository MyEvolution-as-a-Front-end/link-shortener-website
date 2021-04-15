import {useEffect, useRef, useState} from 'react'
import {IoCopyOutline} from 'react-icons/io5'

import {api} from 'services/api'
import styles from 'styles/Home.module.css'

export default function Home(): JSX.Element {
  const [text, setText] = useState('')

  const [isShortener, setIsShortener] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>()

  function clipboard(element: HTMLInputElement) {
    element.select()
    document.execCommand('copy')
  }

  useEffect(() => {
    async function createShortenerLink() {
      try {
        const response = await api.post('shorten', {
          long_url: text,
        })
        setText(response.data?.link)
      } catch (error) {
        console.log(error)
      }
    }
    if (text && isShortener) {
      createShortenerLink()
    }
  }, [isShortener, text])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Crie links atrativos com apenas um clique
      </h2>
      <p>Crie links curtos poderosos e reconhecíveis</p>
      <div className={styles.box}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        {isShortener && (
          <IoCopyOutline
            className={styles.icon}
            onClick={() => clipboard(inputRef.current)}
            size={16}
          />
        )}
      </div>
      <button onClick={() => setIsShortener(true)}>Encurtar</button>
    </div>
  )
}
