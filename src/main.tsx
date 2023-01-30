import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import IntlProvider from '@/provider/IntlProvider'

ReactDOM.render(
  <StrictMode>
    <IntlProvider defaultLocale='en'>
      <App />
    </IntlProvider>
  </StrictMode>,
  document.getElementById('root'),
)
