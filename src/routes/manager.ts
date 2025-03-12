import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

router.get('/manager/:id/employees', async (req: Request, res: Response) => {
    const managerId = req.params.id;
    try {
        const employees = await User.findAll({ where: { manager_id: managerId, role: 'employee' } });
        res.json(employees);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
});

router.post('/manager/:id/employees', async (req: Request, res: Response) => {
    const managerId = req.params.id;
    const { username, password, balance, vacation_days } = req.body;

    try {
        const newUser = await User.create({
            username,
            password,
            role: 'employee',
            manager_id: managerId,
            balance,
            vacation_days
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
});

export default router;