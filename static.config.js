import React from "react";
import { reloadRoutes } from "react-static/node";
import path from "path";
import fs from "fs";
import fm from "front-matter";
import showdown from "showdown";
import chokidar from "chokidar";
import slugify from "slugify";
import highlightjs from "highlightjs";
import ExtractTextPlugin from "extract-text-webpack-plugin";

chokidar.watch("./content").on("all", () => reloadRoutes());


showdown.extension("codehighlight", () => {
  function htmlunencode (text) {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  return [
    {
      type: "output",
      filter: (text) => {
        // use new shodown's regexp engine to conditionally parse codeblocks
        const left = "<pre><code\\b[^>]*>";
        const right = "</code></pre>";
        const flags = "g";
        const replacement = (wholeMatch, match, left, right) => {
          // unescape match to prevent double escaping
          match = htmlunencode(match);
          const leftNew = left.replace("<pre>", "<pre class='hljs'>");
          return leftNew + highlightjs.highlightAuto(match).value + right;
        };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      },
    },
  ];
});

const converter = new showdown.Converter({ extensions: ["codehighlight"] });

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require("./webpack.config.js");

export default {
  entry: path.join(__dirname, "src", "index.tsx"),
  getSiteData: () => ({
    title: "Tom Nick | Software Developer",
  }),
  // siteRoot: "https://tomnick.org",
  getRoutes: async () => {
    const postFolder = path.join(__dirname, "content/posts");
    const postsPaths = await new Promise((resolve) => {
      fs.readdir(postFolder, (err, files) => {
        resolve(files);
      });
    });

    const about = await new Promise((resolve) => {
      fs.readFile(path.join(__dirname, "content/about/about.md"), "utf8", (err, text) => {
        const markdown = converter.makeHtml(text);
        resolve(markdown);
      });
    });

    const posts = await Promise.all(
      postsPaths.map((p) => {
        return new Promise((resolve) => {
          fs.readFile(path.join(postFolder, p), "utf8", (err, text) => {
            const frontmattered = fm(text);
            const markdown = converter.makeHtml(frontmattered.body);
            frontmattered.id = slugify(frontmattered.attributes.title, {
              lower: true,
            });
            frontmattered.attributes.date = new Date(frontmattered.attributes.date).toISOString();
            frontmattered.body = markdown;
            resolve(frontmattered);
          });
        });
      }),
    );

    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.attributes.date) - new Date(a.attributes.date);
    });

    const projectsFolder = path.join(__dirname, "content/projects");
    const projectsPaths = await new Promise((resolve) => {
      fs.readdir(projectsFolder, (err, files) => {
        resolve(files);
      });
    });

    const projects = await Promise.all(
      projectsPaths.map((p) => {
        return new Promise((resolve) => {
          fs.readFile(path.join(projectsFolder, p), "utf8", (err, text) => {
            const frontmattered = fm(text);
            const markdown = converter.makeHtml(frontmattered.body);
            // frontmattered.id = slugify(frontmattered.attributes.title, {
            //   lower: true,
            // });
            frontmattered.body = markdown;
            resolve(frontmattered);
          });
        });
      }),
    );

    const sortedProjects = projects.sort((a, b) => {
      return parseInt(b.attributes.year) - parseInt(a.attributes.year);
    });

    return [
      {
        path: "/",
        component: "src/containers/Home",
        getData: () => ({
          about,
        }),
      },
      {
        path: "/projects",
        component: "src/containers/Projects",
        getData: () => ({
          projects: sortedProjects,
        }),
      },
      {
        path: "/admin",
        component: "src/containers/Admin.tsx",
      },
      {
        path: "/blog",
        component: "src/containers/Blog",
        getData: () => ({
          posts: sortedPosts,
        }),
        children: sortedPosts.map((post) => ({
          path: `/${post.id}`,
          component: "src/containers/Post",
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: "src/containers/404",
      },
    ];
  },
  Document: ({ Html, Head, Body, children }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Tom Nick. Developer by heart. Trying to build great products." />

        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#9B9B9B" />
        <meta name="msapplication-TileImage" content="/images/mstile-150x150.png" />
        <meta name="theme-color" content="#9B9B9B" />

      </Head>
      <Body>{children}</Body>
      <script
        dangerouslySetInnerHTML={{
          // make images zoomable
          __html: `
          document.querySelectorAll('.post-image-container').forEach(function (img) {
            img.addEventListener('click', function () {
                this.classList.toggle('post-image-container--zoomed');
            });
          });

          // load fonts async
          var WebFontConfig = {
            google: {
                families: [ 'Roboto:400,700,400italic' ]
            },
            timeout: 3000
          };

          (function(d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
            wf.async = 'true';
            s.parentNode.insertBefore(wf, s);
          })(document);
        ` }}
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58665819-4" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-58665819-4');
        ` }}
      />
    </Html>
  ),
  webpack: (config, { defaultLoaders, stage }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push(".ts", ".tsx");

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias;

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use:
              stage === "dev"
                ? [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
                : ExtractTextPlugin.extract({
                  use: [
                    {
                      loader: "css-loader",
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: false,
                      },
                    },
                    {
                      loader: "sass-loader",
                      options: { includePaths: ["src/"] },
                    },
                  ],
                }),
          },
          defaultLoaders.cssLoader,
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: "babel-loader",
              },
              {
                loader: require.resolve("ts-loader"),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          defaultLoaders.fileLoader,
        ],
      },
    ];

    // small react-static bug, make sure to use their extract text plugin config
    config.plugins.push(
      new ExtractTextPlugin({
        filename: "styles.[hash:8].css",
        disable: stage === "dev",
      }),
    );
    return config;
  },
};
