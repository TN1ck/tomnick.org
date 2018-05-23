import React from "react";
import { withRouteData } from "react-static";

const About: React.StatelessComponent<{
  about: {
    body: string;
  }
}> = ({about}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: about.body}}/>
  );
}

export default withRouteData(About);
