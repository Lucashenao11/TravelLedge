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
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { username, password } });
        console.log('Resultado de la consulta:', user); // Registrar el resultado de la consulta
        if (user) {
            if (user.role === 'manager') {
                res.sendFile(path_1.default.join(__dirname, '../pages/Manager/manager.html'));
            }
            else if (user.role === 'employee') {
                res.sendFile(path_1.default.join(__dirname, '../pages/Employee/employee.html'));
            }
            else {
                res.status(403).send('Rol de usuario no autorizado');
            }
        }
        else {
            res.status(401).send('Credenciales incorrectas');
        }
    }
    catch (error) {
        console.error('Error del servidor:', error);
        res.status(500).send('Error del servidor');
    }
}));
exports.default = router;
