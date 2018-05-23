import React from 'react';

(window as any).CMS_MANUAL_INIT = true

import CMS, { init } from 'netlify-cms';
import '../../node_modules/netlify-cms/dist/cms.css';


init();

export default () => (<div></div>);
