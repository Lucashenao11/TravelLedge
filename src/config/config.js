"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_JWT_KEY = exports.SALT_ROUNDS = exports.PORT = void 0;
_a = process.env, _b = _a.PORT, exports.PORT = _b === void 0 ? 3000 : _b, _c = _a.SALT_ROUNDS, exports.SALT_ROUNDS = _c === void 0 ? 10 : _c, _d = _a.SECRET_JWT_KEY, exports.SECRET_JWT_KEY = _d === void 0 ? 'this-is-an-awsome-secret-key' : _d;
