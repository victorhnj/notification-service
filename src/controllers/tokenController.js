
const tokenRepository = require('../repositories/tokenRepository');

async function registerToken(req, res, next) {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ message: 'userId e token são obrigatórios.' });
    }

    await tokenRepository.saveToken(userId, token);

    res.status(200).json({ message: 'Token registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar token:', error);
    next(error);
  }
}

module.exports = {
  registerToken,
};
