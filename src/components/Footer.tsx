import React from "react";
import {Link} from 'react-static';

const Footer = () => {
  return (
    <footer>
        <div className='footer-with'>
            Made with love and magic in Berlin
        </div>
        <div className='footer-by'>
            By Tom Nick
        </div>
        <div className="footer-links">
            <a href="https://twitter.com/tomnck">Twitter</a> | <a href="https://github.com/TN1ck">Github</a> | <a href="https://www.linkedin.com/in/tom-nick-50515110b/">LinkedIn</a>
            {' | '}<Link to="/privacy">{'Privacy'}</Link>
        </div>
    </footer>
  );
}

export default Footer;
