import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import multiFileSwagger from '../helpers/multiFileSwagger.js';
import authRouter from './authentication/index.js';
import organizationRouter from './organization/index.js';

const router = express.Router();
const dirname = path.resolve();

(async function swaggerDocument() {
  const results = await multiFileSwagger(YAML.load(path.join(dirname, './docs/api.yaml')));
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(results));
  return results;
})();

router.use('/authentication', authRouter);
router.use('/organization', organizationRouter);

export default router;
