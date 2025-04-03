import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { SALT_ROUNDS } from '../config/config';

const router = Router();

class Validation {
    static username(username: string) {
        if (typeof username !== 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('username must be at least 3 characters long');
    }

    static password(password: string) {
        if (typeof password !== 'string') throw new Error('password must be a string');
        if (password.length < 6) throw new Error('password must be at least 6 characters long');
    }
}

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
        Validation.username(username);
        Validation.password(password);

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) throw new Error('username already exists');

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.create({
            _id: crypto.randomUUID(),
            username,
            password: hashedPassword,
            role: 'employee',
            manager_id: managerId,
            balance,
            vacation_days
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error((err as Error).message);
        res.status(400).send((err as Error).message);
    }
});

export default router;
