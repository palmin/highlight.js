/*
Language: Astro
Author: Chris Knepper <chris@chrisknepper.com>
Source: https://github.com/chrisknepper/highlightjs-astro
Requires: xml.js, javascript.js, typescript.js, css.js
Description: Astro component files (.astro): an HTML/JSX-superset template with a TypeScript frontmatter fence and embedded <script>/<style> blocks.
Website: https://astro.build
Category: web
*/

/** @type LanguageFn */
export default function (hljs) {
  const FRONTMATTER = {
    begin: /^---$/,
    end: /^---$/,
    beginScope: "punctuation",
    endScope: "punctuation",
    subLanguage: "typescript",
  };
  const JS_COMMENT = {
    scope: "comment",
    begin: /\{\/\*/,
    end: /\*\/\}/,
  };
  const STYLE = {
    scope: "tag",
    begin: /<style(?=\s|>)/,
    end: />/,
    keywords: { name: "style" },
    starts: {
      end: /<\/style>/,
      returnEnd: true,
      subLanguage: "css",
    },
  };
  const SCRIPT = {
    scope: "tag",
    begin: /<script(?=\s|>)/,
    end: />/,
    keywords: { name: "script" },
    starts: {
      end: /<\/script>/,
      returnEnd: true,
      subLanguage: "typescript",
    },
  };
  const EXPRESSION = {
    begin: /\{/,
    end: /\}/,
    subLanguage: "javascript",
  };
  return {
    name: "Astro",
    aliases: ["astro"],
    subLanguage: "xml",
    contains: [FRONTMATTER, JS_COMMENT, STYLE, SCRIPT, EXPRESSION],
  };
}
