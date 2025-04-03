import express, { Application, Request, Response, NextFunction } from 'express';

// Extending Express Request interface to include session
declare global {
  namespace Express {
    interface Request {
      session?: { user: { id: string; username: string } | null };
    }
  }
}
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { PORT, SECRET_JWT_KEY } from './config/config';
import loginRouter from './routes/login';
import managerRouter from './routes/manager';
import employeeRouter from './routes/employee';
import sequelize from './database';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware de autenticación
app.use((req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_JWT_KEY) as { id: string; username: string };
      req.session.user = decoded;
    } catch {
      console.warn('Token inválido o expirado');
    }
  }
  next();
});

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'pages', 'common', 'home.html'));
});

app.get('/manager', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'pages', 'Manager', 'manager.html'));
});

app.get('/create-employee', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'pages', 'Manager', 'create-employee.html'));
});

app.get('/employee', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'pages', 'Employee', 'employee.html'));
});

// Usar routers
app.use('/', loginRouter);
app.use('/', managerRouter);
app.use('/', employeeRouter);

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
