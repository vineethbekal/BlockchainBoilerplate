const express = require('express');
const router = express.Router();

const ledgerController = require('../controllers/ledgerController');

router.get('/query/:id', async (req, res) => { ledgerController.queryCertificate(req, res) });
router.post('/create',  async (req, res) => {ledgerController.createCertificate(req, res) });
router.get('/all', async (req, res) => {ledgerController.getAllCertificates(req, res)});

module.exports = router;
