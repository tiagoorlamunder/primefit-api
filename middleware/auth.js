const jwt = require('jsonwebtoken');

// Middleware para autenticação
const authMiddleware = (req, res, next) => {
  // Obtém o token do cabeçalho 'Authorization', removendo o prefixo 'Bearer '
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica a validade do token usando a chave secreta definida nas variáveis de ambiente
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Armazena os dados decodificados do token no objeto `req` para uso nas próximas etapas
    req.user = decoded;
    // Prossegue para a próxima função no fluxo da aplicação
    next();
  } catch (error) {
    // Retorna erro se o token for inválido ou a verificação falhar
    res.status(401).json({ message: 'Token inválido.' });
  }
};

// Exporta o middleware para ser usado em outras partes da aplicação
module.exports = authMiddleware;
