import React from 'react';
import { Link } from "react-static";
import Footer from './Footer';

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <main>
          <nav>
            <Link exact to="/">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Blog</Link>
          </nav>
          <div className="content">
            {this.props.children}
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default AppContainer;
