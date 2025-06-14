import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div dir="rtl" className="font-shabnam">
      <Component {...pageProps} />
    </div>
  )
}