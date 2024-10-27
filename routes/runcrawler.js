var express = require('express');
const { crawler } = require('../src/servers/crawlerClient');
var router = express.Router();

/* GET users listing. */
router.get('/:param', function(req, res, next) {
  const whichblog = req.params.param;
  const validOptions = ['ethereum', 'protocol', 'coinbase'];
  if (!validOptions.includes(whichblog)) {
    return res.status(400).send('选取错误');
  }
  crawler(whichblog);
  res.send('crawler is running');
});

module.exports = router;
