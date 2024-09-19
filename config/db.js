const mongoose = require('mongoose');

// Função para conectar ao banco de dados MongoDB
const connectDB = async () => {
    try {
        // Tenta se conectar ao MongoDB usando a URI definida nas variáveis de ambiente
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado.'); // Exibe uma mensagem no console indicando sucesso
    } catch (error) {
        // Exibe uma mensagem de erro no console se a conexão falhar
        console.error('Erro ao conectar ao MongoDB:', error);
        // Encerra o processo com um código de status 1 (erro)
        process.exit(1);
    }
};

// Exporta a função de conexão para ser usada em outras partes da aplicação
module.exports = connectDB;
