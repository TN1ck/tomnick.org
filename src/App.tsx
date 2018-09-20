import React from "react";
import { Router, Link } from "react-static";
import { hot } from "react-hot-loader";
//

import Footer from './components/Footer';
import Routes from "react-static-routes";

import "./app.scss";

const App = () => (
  <Router>
    <div>
      <main>
        <nav>
          <Link exact to="/">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/cv">CV</Link>
        </nav>
        <div className="content">
          <Routes />
        </div>
      </main>
      <Footer />
    </div>
  </Router>
);

export default hot(module)(App);
