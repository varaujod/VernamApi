import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger.js';
import vernamRoutes from './routes/vernamRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs.json', (_req, res) => {
    res.json(swaggerDocument);
});
app.get('/', (_req, res) => {
    res.json({
        status: 'online',
        architecture: 'MSCV',
        docs: 'http://localhost:3000/api-docs',
        service: 'API Cifra de Vernam - IFSP Boituva'
    });
});
app.use(vernamRoutes);
export default app;
