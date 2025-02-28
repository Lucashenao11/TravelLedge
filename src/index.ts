import express, { Application } from 'express';
import { infoCurso } from './infoCurso';

const app: Application = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

