const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const walletPath = path.join(__dirname, "wallet");
const helper = require("../utils/helper");


const ccpPath = helper.buildCCPOrg1();
const channelName = "channel1";
const chaincodeName = "basic";

const org1UserId = "org1UserId";

async function createCertificate(certificate) {
  try {
    const wallet = await helper.buildWallet(Wallets, walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    console.log(certificate.ID , certificate.Color, certificate.Size, certificate.Owner, certificate.AppraisedValue);
    // Submit the createCertificate transaction
    await contract.submitTransaction('CreateAsset', certificate.ID , certificate.Color, certificate.Size, certificate.Owner, certificate.AppraisedValue);

    console.log(`Certificate ${certificate.candidate_name} successfully created`);
    gateway.disconnect();
  } catch (error) {
    console.error(`Failed to create certificate: ${error}`);
    throw error;
  }
}

async function queryCertificate(id) {
  try {
    const wallet = await helper.buildWallet(Wallets, walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    // Evaluate the getCertificateByCandidateName transaction
    const result = await contract.evaluateTransaction('ReadAsset', id);

    console.log(helper.prettyJSONString(result.toString()));

    gateway.disconnect();

    return JSON.parse(result.toString());
  } catch (error) {
    console.error(`Failed to get certificate by candidate name: ${error}`);
    throw error;
  }
}

async function getAllCertificates() {
  try {
    const wallet = await helper.buildWallet(Wallets, walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: org1UserId, discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    // Evaluate the getAllCertificates transaction
    const result = await contract.evaluateTransaction('GetAllAssets');

    console.log(helper.prettyJSONString(result.toString()));
    
    gateway.disconnect();

    return JSON.parse(result.toString());
  } catch (error) {
    console.error(`Failed to get all certificates: ${error}`);
    throw error;
  }
}

module.exports = {
    createCertificate,
    queryCertificate,
    getAllCertificates,
};