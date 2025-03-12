"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const login_1 = __importDefault(require("./routes/login"));
const manager_1 = __importDefault(require("./routes/manager"));
const employee_1 = __importDefault(require("./routes/employee"));
const database_1 = __importDefault(require("./database"));
require("./models/expense");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Servir archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, 'pages')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'pages', 'common', 'home.html'));
});
app.get('/manager', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'pages', 'Manager', 'manager.html'));
});
app.get('/create-employee', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'pages', 'Manager', 'create-employee.html'));
});
app.get('/employee', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'pages', 'Employee', 'employee.html'));
});
app.use('/', login_1.default);
app.use('/', manager_1.default);
app.use('/', employee_1.default);
const PUERTO = process.env.PORT || 3000;
database_1.default.sync().then(() => {
    app.listen(PUERTO, () => {
        console.log('El servidor escucha en el puerto ' + PUERTO);
    });
});
