import React from 'react';
import AppContainer from '../components/AppContainer';
import { withSiteData } from "react-static";
import About from './Home';

(window as any).CMS_MANUAL_INIT = true

// var PostPreview = createClass({
//   render: function() {
//     var entry = this.props.entry;
//     var image = entry.getIn(['data', 'image']);
//     var bg = this.props.getAsset(image);
//     return h('div', {},
//       h('h1', {}, entry.getIn(['data', 'title'])),
//       h('img', {src: bg.toString()}),
//       h('div', {"className": "text"}, this.props.widgetFor('body'))
//     );
//   }
// });

class AboutPreview extends React.Component{
  componentDidMount() {
    import('../app.scss');
  }
  render() {
    const body = this.props.entry.getIn(['data', 'body']);
    return (
      <AppContainer>
        <About about={{body}}/>
      </AppContainer>
    );
  }
}

class Admin extends React.Component {
  componentDidMount() {
    console.log(this.props);
    import('netlify-cms').then(({default: CMS, init}) => {
      import('../../node_modules/netlify-cms/dist/cms.css').then(() => {
        init();
        // CMS.registerPreviewStyle(csspath);
        CMS.registerPreviewTemplate('single_pages', AboutPreview);
        CMS.registerPreviewTemplate('about', AboutPreview);
        CMS.registerPreviewTemplate('single_pages/about', AboutPreview);
      });
    });
  }
  render() {
    return (
      <div id="nc-root"/>
    );
  }
}

export default withSiteData(Admin);
