import { Router, Request, Response } from 'express';
import path from 'path';
import User from '../models/user';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    console.log('Resultado de la consulta:', user); // Registrar el resultado de la consulta

    if (user) {
      if (user.role === 'manager') {
        res.sendFile(path.join(__dirname, '../pages/Manager/manager.html'));
      } else if (user.role === 'employee') {
        res.sendFile(path.join(__dirname, '../pages/Employee/employee.html'));
      } else {
        res.status(403).send('Rol de usuario no autorizado');
      }
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error del servidor:', error); 
    res.status(500).send('Error del servidor');
  }
});

export default router;