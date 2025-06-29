import express, { json } from 'express';
import { StatusCodes } from 'http-status-codes';
import router from './api/index.js';
import config from './config/index.js';
import sequelize from './data-access/connection.js';

const app = express();

app.use(json());

app.use('/api', router);

app.use((err, req, res, next) => {
  res.status(err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message
  });
});
const { port } = config.app;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch(e => {
    console.log(e.message);
  });

export default app;
