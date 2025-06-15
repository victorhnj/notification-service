
const fs = require('fs');
const path = require('path');

const tokensFile = path.join(__dirname, '../../tokens.json');

function loadTokens() {
  if (!fs.existsSync(tokensFile)) {
    return [];
  }

  const data = fs.readFileSync(tokensFile, 'utf-8');
  return JSON.parse(data);
}

function saveTokens(tokens) {
  fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));
}

async function saveToken(userId, token) {
  const tokens = loadTokens();

  // Remove tokens antigos para o mesmo userId
  const filteredTokens = tokens.filter(t => t.userId !== userId);

  filteredTokens.push({
    userId,
    token,
    createdAt: new Date().toISOString(),
  });

  saveTokens(filteredTokens);
}

async function getTokenByUserId(userId) {
  const tokens = loadTokens();
  const userToken = tokens.find(t => t.userId === userId);
  return userToken ? userToken.token : null;
}

module.exports = {
  saveToken,
  getTokenByUserId,
};
