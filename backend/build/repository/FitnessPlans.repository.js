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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitnessPlansRepository = void 0;
const db_config_1 = require("../config/db.config");
const FitnessPlan_model_1 = require("../model/FitnessPlan.model");
class FitnessPlansRepository {
    constructor() {
        (0, db_config_1.connect)();
    }
    getFitnessPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            const fitnessPlans = yield FitnessPlan_model_1.FitnessPlanModel.find({});
            console.log('fitnessPlans:::', fitnessPlans);
            return fitnessPlans;
        });
    }
}
exports.FitnessPlansRepository = FitnessPlansRepository;
