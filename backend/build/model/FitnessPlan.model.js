"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitnessPlanModel = void 0;
const mongoose_1 = require("mongoose");
const FitnessPlanSchema = new mongoose_1.Schema({
    fitness_plan_id: { type: String, required: true },
    fitness_plan_name: { type: String, required: true },
    date_created: { type: Date, default: Date.now() },
    created_by: { type: String, required: true },
});
exports.FitnessPlanModel = (0, mongoose_1.model)('FitnessPlan', FitnessPlanSchema);
