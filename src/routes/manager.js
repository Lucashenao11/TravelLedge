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
const router = (0, express_1.Router)();
router.get('/manager/:id/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managerId = req.params.id;
    try {
        const employees = yield user_1.default.findAll({ where: { manager_id: managerId, role: 'employee' } });
        res.json(employees);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
router.post('/manager/:id/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managerId = req.params.id;
    const { username, password, balance, vacation_days } = req.body;
    try {
        const newUser = yield user_1.default.create({
            username,
            password,
            role: 'employee',
            manager_id: managerId,
            balance,
            vacation_days
        });
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
