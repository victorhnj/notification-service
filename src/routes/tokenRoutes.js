
const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/tokens', tokenController.registerToken);

module.exports = router;
