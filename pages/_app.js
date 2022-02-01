import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log('desde app.js');
  
  return <Component {...pageProps} />
}

export default MyApp
