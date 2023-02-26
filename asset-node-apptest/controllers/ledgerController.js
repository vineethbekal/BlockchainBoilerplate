const ledgerModel = require('../models/ledgerModel');

exports.queryCertificate = async (req, res) => {
  try {
    const certificateId = req.params.id;
    const certificate = await ledgerModel.queryCertificate(certificateId);
    res.status(200).json(certificate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to query certificate from ledger.' });
  }6
};

exports.createCertificate = async (req, res) => {
  try {
    const certificateData = req.body;
    const result = await ledgerModel.createCertificate(certificateData);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create certificate.' });
  }
};


exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await ledgerModel.getAllCertificates();
    res.status(200).json(certificates);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get all certificates.' });
  }
}