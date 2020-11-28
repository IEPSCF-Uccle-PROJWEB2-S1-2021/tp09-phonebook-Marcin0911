// This code was heavily inspired from demo-ajax made by ROLAND François.

const express = require('express');
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

class Entry{
  constructor(lastName, firstName, birthDate, phoneNumber, emailAdress) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
    this.emailAdress = emailAdress;
  }
}

const phonebook = [
  new Entry('Gutmanski','Marcin', '09/11/1996', '+32426781596','guma0911@gmail.com')
];

const router = new express.Router();

function requireAcceptsJson(req, res, next) {
  if (req.accepts('json')){
    next();
  }
  else {
    next(createError(406));
  }
}

router.all('*', requireAcceptsJson);

router.get('/', (req, res, next) => {
  res.json({phonebook});
});

router.post('/',
  [
  body('lastName').trim().isLength({min : 3}).escape(),
  body('firstName').trim().isLength({min : 3}).escape(),
  body('birthDate').trim().toDate().isAfter('1900-01-01'),
  body('phoneNumber').trim().isMobilePhone('be-BY'),
  body('emailAddress').trim().isEmail().normalizeEmail(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      next(createError(400));
    }
    else{
      const entry = new Entry(req.body.lastName, req.body.firstName, req.body.birthDate, req.body.phoneNumber, req.body.emailAddress)
      phonebook.push(entry);
      res.status(201);
      res.send("Entry added to phonebook");
    }
  }
);

module.exports = router;
