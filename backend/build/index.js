"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = require("./utils/Logger");
const fitness_plans_controller_1 = require("./controller/fitness_plans.controller");
const user_controller_1 = require("./controller/user.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.BACKEND_PORT || 8001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((0, express_pino_logger_1.default)({ logger: Logger_1.logger }));
const fitnessPlanController = new fitness_plans_controller_1.FitnessPlanController;
const userController = new user_controller_1.UserController;
app.get('/', (req, res) => {
    res.send('Your server is running');
});
app.get('/api/fitness_plans', (req, res) => {
    fitnessPlanController.getFitnessPlans().then((data) => res.json(data));
});
app.get('/api/users', (req, res) => {
    userController.getUsers().then((data) => res.json(data));
});
// handling undefined routes
app.use('*', (req, res, next) => {
    res.status(404);
    res.json({ error: 'Not found' });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
