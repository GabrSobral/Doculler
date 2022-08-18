import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '../components/elements/TextEditor/style.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
