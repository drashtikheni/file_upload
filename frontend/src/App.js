import React from 'react'
import { Provider } from 'react-redux'

import './App.css'
import { store } from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './presentation/routing'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Toaster position="top-right" />
        <Router>
          <Routing />
        </Router>
      </Provider>
    </div>
  )
}

export default App
