import {
  render, renderHook, act, screen, waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'

import IntlProvider, {
  useIntl, Locale, allowedLocales,
} from '@/provider/IntlProvider'

import messagesEn from '@/lang/en'
import messagesFr from '@/lang/fr'

const defaultLocale = 'en'
const testKey = 'hello'

function TestComponent({ localeToSet }: { localeToSet: Locale }) {
  const { messages, setLocale } = useIntl()

  return (
    <>
      <h1>{messages[testKey]}</h1>
      <button type="submit" onClick={() => localeToSet && setLocale(localeToSet)}>Set locale button</button>
    </>
  )
}

const renderComponent = (defaultLocaleProvider?: Locale, localeToSet?: Locale) => render(
  <IntlProvider defaultLocale={defaultLocaleProvider ?? defaultLocale}>
    <TestComponent localeToSet={localeToSet ?? defaultLocale} />
  </IntlProvider>,
)

describe('IntlProvider', () => {
  describe('with fake consumer component', () => {
    it(`should use default locale (${defaultLocale})`, async () => {
      renderComponent()

      await waitFor(() => {
        expect(screen.getByText(messagesEn[testKey])).toBeInTheDocument()
      })
    })

    it(`should use props default locale (${allowedLocales[1]})`, async () => {
      renderComponent(allowedLocales[1])

      await waitFor(() => {
        expect(screen.getByText(messagesFr[testKey])).toBeInTheDocument()
      })
    })

    it(`should use props default locale (${allowedLocales[0]}) and update to ${allowedLocales[1]} on setLocale hook called`, async () => {
      renderComponent(allowedLocales[0], allowedLocales[1])

      await waitFor(() => {
        expect(screen.getByText(messagesEn[testKey])).toBeInTheDocument()
      })

      // Set locale to fr
      act(() => {
        screen.getByRole('button').click()
      })

      await waitFor(() => {
        // Displayed text should now be french
        expect(screen.getByText(messagesFr[testKey])).toBeInTheDocument()
      })
    })
  })

  describe('with hook', () => {
    it('should return undefined locale and messages without any setting', async () => {
      const { result } = renderHook(() => useIntl(), {
        wrapper: ({
          children,
        }) => <IntlProvider defaultLocale={defaultLocale}>{children}</IntlProvider>,
      })

      await waitFor(() => {
        expect(result.current.locale).toBe(defaultLocale)
        expect(result.current.messages[testKey]).toBe(messagesEn[testKey])
      })
    })

    it('should return set locale and messages', async () => {
      const { result } = renderHook(() => useIntl(), {
        wrapper: ({
          children,
        }) => <IntlProvider defaultLocale={defaultLocale}>{children}</IntlProvider>,
      })

      // First default english locale
      await waitFor(() => {
        expect(result.current.locale).toBe(defaultLocale)
        expect(result.current.messages[testKey]).toBe(messagesEn[testKey])
      })

      // We set locale to french
      act(() => {
        result.current.setLocale(allowedLocales[1])
      })

      // French locale should be set
      await waitFor(() => {
        expect(result.current.locale).toBe(allowedLocales[1])
        expect(result.current.messages[testKey]).toBe(messagesFr[testKey])
      })
    })
  })
})
