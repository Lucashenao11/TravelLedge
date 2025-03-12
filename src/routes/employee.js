"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const expense_1 = __importDefault(require("../models/expense"));
const router = (0, express_1.Router)();
// Ruta para obtener los gastos de un empleado
router.get('/employee/:id/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const expenses = yield expense_1.default.findAll({ where: { user_id: userId } });
        res.json(expenses);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
// Ruta para registrar un nuevo gasto
router.post('/employee/:id/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { amount, date } = req.body;
    try {
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const tripStartDate = user.trip_start_date;
        const tripEndDate = user.trip_end_date;
        if (new Date(date) < new Date(tripStartDate) || new Date(date) > new Date(tripEndDate)) {
            return res.status(400).send('Expense date is outside the allowed trip dates');
        }
        const newExpense = yield expense_1.default.create({
            user_id: userId,
            amount,
            date
        });
        // Actualizar el saldo del usuario
        user.balance -= amount;
        yield user.save();
        res.status(201).json(newExpense);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
