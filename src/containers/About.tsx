import React from "react";
import { withRouteData } from "react-static";

export default withRouteData(({cvHtml}: {cvHtml: string}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: cvHtml}} />
  );
});
