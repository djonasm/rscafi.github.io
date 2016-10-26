var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');
var branch     = require('metalsmith-branch')
var permalinks = require('metalsmith-permalinks')
var layouts    = require('metalsmith-layouts')

Metalsmith(__dirname)
  .use(markdown())
  .use(
    branch()
      .pattern('!(chapter00[0-1])*.html')
      .use(layouts({
        'engine': 'pug',
        'default': 'default.pug',
      }))
      .pattern('!(chapter000)*.html')
      .use(permalinks('chapters/:title'))
  )
  .build(err => { if (err) console.log(err) })
