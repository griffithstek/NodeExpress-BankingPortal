const express = require('express');

const router = express.Router();

router.get('/select-log-file', (req, res) =>  res.render('select-log-file'));

module.exports = router;