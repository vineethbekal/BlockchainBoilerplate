const fs = require('fs');
const path = require('path');

const getConnectionProfile = () => {
    const ccpPath = path.resolve(__dirname, '..', 'network', 'connection.json');
    const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
    return JSON.parse(ccpJSON);
};

module.exports = {
    getConnectionProfile,
};