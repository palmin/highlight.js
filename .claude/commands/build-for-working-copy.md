---
allowed-tools:
  - Bash(build highlight.js with specified languages)
  - Bash(copy highlight.min.js to WorkingCopy)
---

Build highlight.js with the languages needed for WorkingCopy and copy to the Git project:

```bash
node tools/build.js xml cpp haskell bash clojure scala java fsharp objectivec ini php dart coffeescript sql latex http makefile ruby apache json css clojure swift nginx csharp markdown diff vim sml javascript lua python yaml go perl stylus erlang vbscript r applescript elixir fortran lisp prolog d kotlin powershell typescript matlab dos erb groovy cmake rust scss elm x86asm armasm asciidoc less dockerfile julia verilog puppet twig vala vhdl autohotkey arduino crystal ocaml coq qml gherkin ada delphi glsl gdscript nim terraform orgmode graphql nix zig tcl

cp build/highlight.min.js $HOME/opgaver/WorkingCopy/Git/Git/highlight.pack.js
```
