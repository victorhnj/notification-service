const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');   // <- Adicionado dotenv

dotenv.config();                    // <- Carrega as variáveis do .env

const app = express();

const notificationsRoutes = require('./routes/notifications');
const tokenRoutes = require('./routes/tokenRoutes'); // <- Adicionado tokenRoutes
const errorHandler = require('./middlewares/errorHandler');
const { startNotificationConsumer } = require('./consumers/notificationConsumer');

app.use(cors());
app.use(bodyParser.json());

app.use('/notifications', notificationsRoutes);
app.use('/api', tokenRoutes); // <- Registrando rota de tokens

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);

  startNotificationConsumer();
});
