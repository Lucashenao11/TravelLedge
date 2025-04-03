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
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = require("../config/config");
const router = (0, express_1.Router)();
class Validation {
    static username(username) {
        if (typeof username !== 'string')
            throw new Error('username must be a string');
        if (username.length < 3)
            throw new Error('username must be at least 3 characters long');
    }
    static password(password) {
        if (typeof password !== 'string')
            throw new Error('password must be a string');
        if (password.length < 6)
            throw new Error('password must be at least 6 characters long');
    }
}
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
        Validation.username(username);
        Validation.password(password);
        const existingUser = yield user_1.default.findOne({ where: { username } });
        if (existingUser)
            throw new Error('username already exists');
        const hashedPassword = yield bcrypt_1.default.hash(password, config_1.SALT_ROUNDS);
        const newUser = yield user_1.default.create({
            _id: crypto_1.default.randomUUID(),
            username,
            password: hashedPassword,
            role: 'employee',
            manager_id: managerId,
            balance,
            vacation_days
        });
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
}));
exports.default = router;
