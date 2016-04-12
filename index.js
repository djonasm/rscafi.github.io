var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');

Metalsmith(__dirname)
    .use(markdown())
    .destination('./build')
    .build(err => { if (err) console.log(err) })
