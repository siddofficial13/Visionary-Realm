import express from 'express';
import * as dotenv from  'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();
const configuration = new Configuration({
    organization: "org-JIlbiplRmtdMb1SVkT8sQUB8",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
router.route('/').get((req,res) => {
    res.send('Hello from DALL-E!');
});
router.route('/').post(async (req,res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})
export default router;