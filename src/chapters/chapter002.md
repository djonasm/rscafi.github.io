---
title: Chapter 2
date: 2016-04-28
---

# [A blog about building a blog][home]

## [Chapter 2][chapter]


To add Google Analytics Tracking Script, I've simply appended it to `head` on
`default.jade` layout, using [Plain Text](http://jade-lang.com/reference/plain-text/):
```
  head
    // other tags suppressed
    script.
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-51569123-1', 'auto');
      ga('send', 'pageview');

```

---

## Change*b*log

### Writing This Chapter I Learned
1. Improved my skills on Jade
1. How to use [Metalsmith Layouts][layouts]

### Progress On This Chapter
1. [Jade][jade] layout on blog
1. [Google Analytics](https://analytics.google.com/) script

### Coming On The Next Chapters
- Assets structure
- Base CSS
- Header
- Footer
- A way to reference other pages inside blog

---

[home]: ../..
[chapter]: .
[layouts]: https://github.com/superwolff/metalsmith-layouts
[jade]: http://jade-lang.com/
