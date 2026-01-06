import { http } from '@google-cloud/functions-framework';
import { analyzeHandler, getAnalyzeById } from './controllers/analyze.controller';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.post('/api/create', analyzeHandler);
app.get('/api/:id', getAnalyzeById);
app.use('/', (req,res) => {
    res.status(404).json({
        statusCode: 404,
        error: {
            message: 'No se encontró la ruta solicitada'
        }
    })
});

/*if (!process.env.K_SERVICE) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}*/

http('analyzePlay', app);