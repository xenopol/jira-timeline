import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

import './index.css'
import App from './components/App/container'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={ configureStore() }>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
