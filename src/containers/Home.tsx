import React from "react";
import { withSiteData } from "react-static";

import logoImg from "../logo.png";

export default withSiteData(() => (
  <div>
    <h1>
      Hi, I'm Tom.
    </h1>
    <p>
      {`
      I'm a developer by heart and love to create products.
      Currently I work at the Infographics Group as Head of Software Engineering, where we are building next generation tools to bring the world of infographics into the digital age.
      `}
    </p>
    <a href="mailto:tomwanick@gmail.com" className="link">
      {`Get in touch with me`}
    </a>
  </div>
));
