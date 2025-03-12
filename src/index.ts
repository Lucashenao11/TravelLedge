import express, { Application } from 'express';
import path from 'path';
import loginRouter from './routes/login';
import managerRouter from './routes/manager';
import employeeRouter from './routes/employee';
import sequelize from './database';
import './models/expense'; 

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'common', 'home.html'));
});

app.get('/manager', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'Manager', 'manager.html'));
});

app.get('/create-employee', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'Manager', 'create-employee.html'));
});

app.get('/employee', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'Employee', 'employee.html'));
});

app.use('/', loginRouter);
app.use('/', managerRouter);
app.use('/', employeeRouter);

const PUERTO = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PUERTO, () => {
    console.log('El servidor escucha en el puerto ' + PUERTO);
  });
});

