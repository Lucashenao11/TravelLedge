import express, { Application } from 'express';
import path from 'path';
import loginRouter from './routes/login';
import sequelize from './database';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'common', 'home.html'));
});

app.use('/', loginRouter);

const PUERTO = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PUERTO, () => {
    console.log('El servidor escucha en el puerto ' + PUERTO);
  });
});

