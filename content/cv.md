# Tom Nick - Curriculum Vitae

I'm a developer by heart and love to create products. I spend a lot of time apart from my job to work on personal projects, many of which are already launched. I believe in self-improvement and always try to get better at my skills and learn new ones.

* <a class="link" href="#tech">Technologies</a>
* <a class="link" href="#work">Work</a>
* <a class="link" href="#education">Education</a>
* <a class="link" href="/projects">Personal Projects</a>

## <a name="tech">Technologies I use and like</a>
<div class="post post--job">
  I try to use the most fitting technologies for a problem, but I also have clear favorites. This list includes things I feel comfortable in, but I'm always open for new ones and try to be up to date with the current advancements.
  <dl>
    <dt>Languages</dt>
    <dd>JavaScript, TypeScript, Node.js, Python, Clojure</dd>
    <dt>Frontend Technologies</dt>
    <dd>React, Redux, MobX, three.js, Webpack, Lodash, react-static</dd>
    <dt>Testing</dt>
    <dd>E2E using Nightwatch.js, Unit Tests using Jest, CI using Travis or Codeship</dd>
    <dt>Backend</dt>
    <dd>Flask, Express, Postgres, Nginx, Ubuntu</dd>
    <dt>DevOps & Deployment</dt>
    <dd>Docker, AWS, Digital Ocean, Netlify</dd>
    <dt>Tracking and Analytics</dt>
    <dd>Prometheus & Telegraf & Graphana, Sentry, Google Analytics</dd>
  </dl>
</div>

## <a name="work">Work</a>
<div class="post post--job">
<div class="post-job-title">
  <time>Early 2018 - Now</time>
  <strong>Head of Software Engineering @ Infographics Group</strong>
</div>
The <a target="_blank" rel="nofollow"
  class="link" href="https:///infographics.group">IGG</a> is a venture capital funded agency for Infographics. It's a mix between agency and startup. In the startup part we try to bring the the know of visual storytelling & data visualization of the IGG into the digital wold by developing ambitious applications that will allow new ways to consume informations.
<br/>
<br/>
Originally I worked for the holding company of the IGG, the KPV. As we mostly developed tools for them, we decided to switch contracts to officially work there.
<ul>
  <li>
  I'm Leading a team of four developers (myself included) creating an internal application. I'm overseeing the whole stack including the Backend, Frontend and DevOps. Tasks include creating tickets, acting as the technology stakeholder and part time product owner.
  </li>
  <li>
    Created a sophisticated presentation tool that is a mix between Adobe After Effects and conventional presentation software like Microsoft Powerpoint. The whole application runs in the browser and was developed for performance as the resulting presentations are the heart of the internally developed application. Remarkable features of this application are a complete animation engine including keyframes, animations and lifetimes. A scene graph including groups and content layers supporting videos, images, text and 3d objects. The whole editing was in real time and the UI and UX allowed a productive workflow. Technologies I used were TypeScript, React, WebGl, three.js and MobX.
  </li>
  <li>
  Implemented a pitch for the <a class="link "target="_blank" rel="nofollow" href="https://www.bmu.de/">ministry of environment</a>. The project needed to be done in about 2 weeks, but needed to be good enough to win the pitch. As I was the only developer for this project, the most difficult part was to choose the correct technologies and implement everything basically on the first try, as there was no possibility to increase the timeframe. The pitch includes scroll activated, custom created charts (with D3 and React and animated with MobX), a parallax header, a tooltip engine, statically rendered pages (Using react-static) and some more nice animations. <a class="link "target="_blank" rel="nofollow" href="https://condescending-johnson-d50af8.netlify.com/">The pitch can be found here</a>. Use Chrome on Desktop for this, the pitch did not include mobile.
  </li>
</ul>
</div>

<div class="post post--job">
<div class="post-job-title">
  <time>Mid 2017 - Early 2018</time>
  <strong>Senior Software Engineer @ KPV Lab</strong>
</div>
KPV Lab is a tech holding partnership founded 2015 in Berlin. It seeded multiple start-ups which are operating in stealth mode - as is the parent entity. Focus is on next-gen software, advanced user-interfaces, realtime interactive visual tools, creating entirely novel solutions, each unprecedented in their field.
<br/>
<br/>
When I joined KPV Lab it was a newly formed team consisting of 5 developers.
<ul>
<li>
  I co-created a WebGl based charting tool with a focus on storytelling. The clue was a timeline with which a non developer could use to create data driven stories. The used technologies were TypeScript, React and Redux and WebGl.
</li>
<li>
  Envisioned and implemented an editing tool for slide based presentations. It was used as a tool for the internal creatives to create stories for the developed platform. The tool had several advanced features like  a live-view that automatically updated, an advanced history feature and a complete visualization of the ongoing CSS transitions. Technologies were TypeScript, React and Redux.
</li>
<li>
  Build the internal website for the <a target="_blank" rel="nofollow"
  class="link" href="https:///infographics.group">infographics group</a>. We used GatsbyJS for this page.
</li>
</ul>
As we mostly developed tools for the Infographics Group, we decided it would make more sense to switch contracts and officially work for them.
</div>

<div class="post post--job">
<div class="post-job-title">
  <time>2015 - Mid 2017</time>
  <strong>Senior Frontend Engineer @ LIQID Investments GmbH</strong>
</div>
I started working at <a class="link" rel="nofollow" targt="_blank" href="https://liqid.de">LIQID</a> as the first employee and was part of the journey from the first line of code to having 100 million assets under management.
<ul>
<li>
Build the complete Frontend Application which includes deciding on the technologies used, working closely with the stakeholder and of course major feature implementation. Technologies used are React, Redux and Webpack.
</li>
<li>
Co-created the sophisticated testing infrastructure. As every customer was worth a lot and the traffic was not that high we needed to make sure to not have a single bug. The testing stack includes unit tests, E2E tests, constant error-observation, continues integration and E2E test observation. To make the E2E deterministic, we used docker containers to spin up the whole backend/frontend and test again a completely new backend. Used technologies were Jest, Nightwatch.js, Docker, Sentry and Codeship.
</li>
<li>Build a PDF reporting tool as a microservice, which was used to generate all monthly/quarterly reports for the customers. Complex charts and long tables were part of the reports. We used React & wkhtmltopdf (now Puppeteer) as the main technologies. The reports were super small in file size, despite including a lot of graphics.</li>
<li>
Created some open source libraries that are still in use in the application: <a class="link" rel="nofollow" targt="_blank" href="https://github.com/LIQIDTechnology/redux-fetchers">redux-fetchers</a> and <a class="link" href="https://github.com/LIQIDTechnology/german-tax-id-validator" rel="nofollow" targt="_blank">german-tax-id-validator</a>
</li>
<li>
Created a newsletter tool used by marketing. We developed an internal tool as other tools didn't allow fast newsletter creation, good enough branding and a resulting small html size. Cool features were a live-view, making sure it works on every esoteric mail client and a small payload to prevent mail cutting in GMail. Technologies used were TypeScript, React and a NodeJS backend.
</li>
</ul>
</div>

<div class="post post--job">
<div class="post-job-title">
  <time>2013 - Sep 2014</time>
  <strong>Working Student @ LIQID Investments GmbH</strong>
</div>
The startup 42reports gave brick and mortar stores realtime analytics using wlan fingerprinting. 42reports provided devices that were easy to setup, a realtime dashboard and the ability to track complete shopping malls using a mesh of routers.
42reports was acquired by <a class="link" rel="nofollow" targt="_blank" href="https://www.dilax.com/">Dilax</a>.
<br/>
<br/>
I started as the first hire and worked on the whole stack in the beginning. After the next hires came, I focused on frontend development, which I did exclusively until I left.
<ul>
  <li>Build the Frontend completely on my own, which included a realtime dashboard were users could see their store analytics.</li>
  <li>Migrated the Frontend from jQuery to AngularJs.</li>
  <li>Due to the need of custom charts, where libraries like nvd3 or c3 weren’t a good choice anymore, I wrote our own charting library using d3 with focus on interactivity, modularity and extensibility. I then used it to create a lot of interactive and animated charts (scatter, bar, line, heat-maps, pie, ...).</li>
  <li>Developed an interactive WebGl-drawer using three.js which was used internally used to mark regions in stores (42reports also did positioning of customers).</li>
</ul>
</div>

## <a name="education">Education</a>

<div class="post post--job">
<div class="post-job-title">
  <time>2011 - 2015</time>
  <strong>Bachelor of Science in Computer Science</strong>
</div>
Finished my bachelors with a grade of 1.8. I got a 1.0 on my bachelor thesis. You can find more information of it under <a class="link" href="/projects">Projects</a>.
<br/>
In university my focus revolved mostly around Machine Learning, AI,Robotics and Application Development.

</div>

<div class="post post--job">
  <div>
    <time>1998 - 2011</time>
    <strong>First & Secondary School</strong>
  </div>
</div>
