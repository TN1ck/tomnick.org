import React from "react";
import { withRouteData } from "react-static";

const About: React.StatelessComponent<{
  about: string
}> = ({about}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: about}}/>
  );
}

export default withRouteData(About);
