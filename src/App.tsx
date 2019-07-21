import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'

import Routes from 'react-static-routes'

import './app.scss'

const App = () => (
  <Router>
    <div>
      <main>
        <nav>
          <Link exact to="/">
            About
          </Link>
          <Link to="/projects">Projects</Link>
        </nav>
        <div className="content">
          <Routes />
        </div>
      </main>
    </div>
  </Router>
)

export default hot(module)(App)
