import { Router, Request, Response } from 'express';
import User from '../models/user';
import Expense from '../models/expense';

const router = Router();

// Ruta para obtener los gastos de un empleado
router.get('/employee/:id/expenses', async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const expenses = await Expense.findAll({ where: { user_id: userId } });
        res.json(expenses);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
});

// Ruta para registrar un nuevo gasto
router.post('/employee/:id/expenses', async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { amount, date } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const tripStartDate = user.trip_start_date;
        const tripEndDate = user.trip_end_date;

        if (new Date(date) < new Date(tripStartDate) || new Date(date) > new Date(tripEndDate)) {
            return res.status(400).send('Expense date is outside the allowed trip dates');
        }

        const newExpense = await Expense.create({
            user_id: userId,
            amount,
            date
        });

        // Actualizar el saldo del usuario
        user.balance -= amount;
        await user.save();

        res.status(201).json(newExpense);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
});

export default router;