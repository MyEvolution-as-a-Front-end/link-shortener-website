import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4/',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
})
