---
title: Chapter 1 - A layout carved in stone
date: 2016-04-18
---

# [A blog about building a blog][home]

## [Chapter 1 - A layout carved in stone][chapter]

On the [first chapter of this blog](../chapter000.html), I was planning on giving a little visual structure to this current mess. But, thinking better about the aims that I have for the project, turns out that I needed to address first one thing that turned out to be more important.

### The goals

Remember that idea about a “theme switcher” that should allow us to change between the incremental versions of this very blog? Well, this approach would create a lot of garbage around chapters that would not be ready to receive the extra markup or styles that I'd put on each version, killing the experience for visitors and for me, which is a bummer.

Instead of doing it, I thought about a new structure that should be like this: every chapter will have the same layout as when it was conceived, not changing when new chapters arrives, so, navigating to each chapter would show the differences on layout, incrementally. It will be a way cooler and easier to absorb the whole idea about the blog. Also, it will make learning more fun since, whenever you are reading a new chapter, you will start to notice what changed at the time and thinking about the code involved, or at least I hope so.

I’m guessing that perhaps it is not perfectly clear what I’m proposing, but, as I am writing new chapters, it will be easier to understand, so just go with it and eventually, you’ll see what I’m talking about, either because you navigated enough on the blog or because I'm improving my writing skills and actually explaining it in a better way.

### Thinking about the problem

I had a few options to implement in order to allow different layouts on each chapter. One of them would be to only keep the compiled versions of old chapters and evolving the build script and assets, building only the latest chapter (and pages). This would be easier to maintain, but keeping only the compiled chapters would make changes really annoying.

I’ve thought a lot about it, asked for opinions from colleagues at work, tried out some of them and, ultimately, decided to keep the original, raw files that are necessary for building each chapter.

By taking this strategy, I can keep one master script to build chapters preserving their original build logic and guarantee that the layout will be always the same as when written. Let’s see how this goes, I hope that this is a good solution for the future.

One thing that I also gave a lot of thoughts was: should I rename chapter 0 (`posts/chapter_000.md`), move it to the new folder (`chapters`) or should I keep it exactly on the same place and apply the new logic only to the newer chapters?
By one hand, moving it would simplify my master script and make the project more organized. By the other hand, by not doing it, I could keep the project more faithful to the original source and also, it would make me think more about my decisions before actually implementing it, that could have good outcomes.
I guess that I’m going with the first option anyway, since I don’t need to be so strict about it and will keep project easier to understand in comparison to files all around on the wrong places. I’m thinking a lot about the decisions, anyway, and this will not affect the layout of chapters, only its locations.

So, with the strategy decided, it's time to finally build it.

### Bulding it!

To address the goals of this chapter, I needed to preserve the original build structure from chapter 0:

```
var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');

Metalsmith(__dirname)
    .use(markdown())
    .destination('./build')
    .build(err => { if (err) console.log(err) })
```

But also, adding more logic to build chapter 1 with more plugins. Calling `build()` twice, with different plugins/inputs, would totally erase the first build, so it wasn't an option.

If you take a look, the only plugin that is applied to chapter 0 is markdown. I needed to keep this being applied, but not other plugins. I've found [Metalsmith Branch][1], a plugin that allow different pipelines to be applied for different files, based on globing/filtering. In order to properly test the plugin, I've decided to use [Metalsmith Permalinks][2] on newer chapters, so after a little tinkering, I came up with the build script below:

```
var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');
var branch     = require('metalsmith-branch')
var permalinks = require('metalsmith-permalinks')

Metalsmith(__dirname)
  .use(markdown())
  .use(
    branch()
      .pattern('chapters/!(chapter000)*.html')
      .use(permalinks('chapters/:title'))
  )
  .build(err => { if (err) console.log(err) })
```

I've used a [glob complementation][3] (negation) to exclude only the first chapter from the use of permalinks, which is a good strategy in comparison to including all the chapters that I want to apply the permalinks, which will be all of the posterior chapters.
On the next posts, I can use a similar strategy to exclude only the first and second post, which will be to add a range like `[0-1]` on the last `0` of the glob, like `.pattern('chapters/!(chapter00[0-1])*.html')`. It will escalate better.

Also, did you noticed that I removed the `.destination('./build')` part? Turns out that this already was the default destination path, so there's no need to it.

A little gotcha with the permalinks is that you need to apply it on the HTML files, not on the markdown sources. The pages of the blog are not receiving the permalinks yet, but since the only page that I have right now is the index, and I don't want a permalink on the index page, we are good to go for now.

So, in the end, after a lot of searching and thinking, the solution was quite simple.

### Prologue
I don’t know if [Metalsmith](http://www.metalsmith.io/) will be the right choice for this blog, since it requires the whole build to run, what will make the process slower and slower as the blog grows. But, one good thing about it is that I can try to address and solve this problem (or change to another static site generator like [hugo](https://gohugo.io/), why not?). Let’s see how this goes.

About git story, I’m [squashing commits](https://github.com/blog/2141-squash-your-commits) per chapter, so it will be easier to track changes between them when reading the [repository history](https://github.com/rscafi/rscafi.github.io/commits/source).

---

## Change*b*log

### Writing This Chapter I Learned
1. [You can write either _organize_ or _organise_, both are correct and the first one is used mostly on North America](http://grammarist.com/spelling/organise-organize/).
1. [Four new ways to “deploy” my website to GitHub Pages](https://davidxmoody.com/host-any-static-site-with-github-pages/).
1. [Determining the project root path of a node application](http://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application) (even though I didn’t use it).
1. [A way to use a single build script preserving original build for each chapters][1].
1. [How to create permalinks on metalsmith][2].
1. [Complementation and ranges on Glob][3].

### Progress On This Chapter
1. New chapter building structure.
1. A script to rule them all, that will build the whole project, but preserving each chapter’s original build logic.
1. Permalinks! (notice the url?)

### Coming On The Next Chapter
- Assets structure
- [Jade template engine](http://jade-lang.com/)
- Base CSS
- Analytics script
- Header
- Footer

---

April 18, 2016 - by [Ravan Scafi](https://github.com/rscafi) | [View this project on GitHub](https://github.com/rscafi/rscafi.github.io) | [Contact me](mailto:hello@ravan.me)

[home]: ../..
[chapter]: .
[1]: https://github.com/ericgj/metalsmith-branch
[2]: https://github.com/segmentio/metalsmith-permalinks
[3]: http://man7.org/linux/man-pages/man7/glob.7.html
