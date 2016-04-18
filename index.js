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
