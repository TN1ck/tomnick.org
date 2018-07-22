import * as React from 'react';
import converter from './converter';

export default class Markdown extends React.Component {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(this.props.children)
        }}
      />
    );
  }
}
