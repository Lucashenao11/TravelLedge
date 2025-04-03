"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config/config");
const login_1 = __importDefault(require("./routes/login"));
const manager_1 = __importDefault(require("./routes/manager"));
const employee_1 = __importDefault(require("./routes/employee"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Middleware de autenticación
app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET_JWT_KEY);
            req.session.user = decoded;
        }
        catch (_a) {
            console.warn('Token inválido o expirado');
        }
    }
    next();
});
// Rutas estáticas
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
// Usar routers
app.use('/', login_1.default);
app.use('/', manager_1.default);
app.use('/', employee_1.default);
// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
});
// Iniciar servidor
database_1.default.sync().then(() => {
    app.listen(config_1.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${config_1.PORT}`);
    });
});
