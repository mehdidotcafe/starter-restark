import {
  PropsWithChildren, useContext, useEffect, useState, createContext,
} from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'

// First locale is the default locale
export const allowedLocales = ['en', 'fr'] as const
export const defaultLocale = allowedLocales[0]
export type Locale = typeof allowedLocales[number]

export type IntlMessages = Record<string, string>
type IntlContextType = {
  readonly locale: Locale,
  readonly messages: IntlMessages,
  readonly setLocale: (locale: Locale) => void
}
type IntlContextProps = {
  readonly defaultLocale?: Locale
}

const getDefaultLocale = (): Locale => {
  const locale = navigator.language.split('-')[0]
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return allowedLocales.includes(locale as any) ? (locale as Locale) : allowedLocales[0]
}

export const IntlContext = createContext<IntlContextType>({} as IntlContextType)

export default ({
  defaultLocale = getDefaultLocale(),
  children,
}: PropsWithChildren<IntlContextProps>) => {
  const [messages, setMessages] = useState<IntlMessages>()
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    import(`../lang/${locale}.json`).then(setMessages)
  }, [locale])

  return messages ? (
    <ReactIntlProvider locale={locale} messages={messages}>
      <IntlContext.Provider value={{ locale, messages, setLocale }}>
        {children}
      </IntlContext.Provider>
    </ReactIntlProvider>
  ) : null
}

export const useIntl = () => useContext(IntlContext)
