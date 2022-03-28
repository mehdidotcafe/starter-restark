import App from './App'

const renderApp = () => <App />

describe('App', () => {
  it('should render', () => {
    expect(renderApp()).toBeTruthy()
  })
})
