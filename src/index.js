const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const notificationsRoutes = require('./routes/notifications');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(bodyParser.json());

app.use('/notifications', notificationsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
