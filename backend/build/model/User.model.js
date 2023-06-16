"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    date_created: { type: Date, default: Date.now() },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
