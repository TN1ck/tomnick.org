import showdown from 'showdown';
import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

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
          return leftNew + Prism.highlight(match, Prism.languages.tsx) + right;
        };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      },
    },
  ];
});

const converter = new showdown.Converter({ extensions: ["codehighlight"] });
export default converter;
