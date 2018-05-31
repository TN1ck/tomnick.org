import React from "react";
import { withRouteData } from "react-static";

export default withRouteData(({privacyHtml}: {privacyHtml: string}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: privacyHtml}} />
  );
});
