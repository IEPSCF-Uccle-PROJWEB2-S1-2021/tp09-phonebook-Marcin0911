// This code was heavily inspired from demo-ajax made by ROLAND François.

const express = require('express');

const router = new express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('phonebook', { title: 'Phonebook' });
});

module.exports = router;
