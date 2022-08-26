import express from 'express';
import { router } from './routes';
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`✔✨ Server started at: http://localhost:${PORT}`));