import styled from 'styled-components'
import { useIntl } from '@/provider/IntlProvider'

import { APP_NAME } from '@/env'

const Container = styled.div`
background-color: red;
`

export default () => {
  const { messages, setLocale, locale } = useIntl()

  return (
    <Container>
      <h1>{APP_NAME}</h1>
      <div>
        {messages.hello}
        <div>
          <button type="submit" onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}>Change locale</button>
        </div>
      </div>
    </Container>
  )
}
