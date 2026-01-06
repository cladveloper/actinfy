import { NextFunction, Request, Response } from 'express';
import { analyzePlayScript } from '../services/gemini.service';
import { AnalyzeRequest } from '../types';
import { AnalysisService } from '../services/analysis.service';

const analysisService = new AnalysisService();
export const analyzeHandler = async (req: Request, res: Response) => {
    // CORS Setup manual si es necesario, o manejado por Google Cloud
    res.set('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const body = req.body as AnalyzeRequest;
        
        if (!body.playText || body.playText.length < 100) {
            res.status(400).json({ error: "El texto es demasiado corto." });
            return;
        }

        const result = await analyzePlayScript(body);
        const newDoc = await analysisService.create({...result, body});
        res.status(201).json({...result, ...newDoc});
        
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const getAnalyzeById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { params } = req;
        const response = await analysisService.getById(params.id);
        if(!response) return next();
        res.json(response);
    } catch(e){
        console.log(e);
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: 'Error en la aplicación.'
            }
        })
    }
}