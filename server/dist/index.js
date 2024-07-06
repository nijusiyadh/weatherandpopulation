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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
app.use((0, cors_1.default)());
function fetchPopulationData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("FETCHING POPULATION DATA");
            const response = yield axios_1.default.post("https://countriesnow.space/api/v0.1/countries/population/cities", { city });
            const Data = response.data.data;
            return Data;
        }
        catch (error) {
            console.error("Error fetching population data:", error);
            return null;
        }
    });
}
app.get("/population", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const city = (_a = req.query.city) === null || _a === void 0 ? void 0 : _a.toString();
    if (!city) {
        return res.status(400).send("Missing required parameter: city");
    }
    try {
        const populationData = yield fetchPopulationData(city);
        if (populationData) {
            res.send(JSON.stringify(populationData));
        }
        else {
            res.status(500).send("Error fetching population data");
        }
    }
    catch (error) {
        console.error("Error handling population request:", error);
        res.status(500).send("Internal server error");
    }
}));
function fetchForcastData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("FETCHING FORCAST DATA");
            const res = yield axios_1.default.get(`http://api.weatherapi.com/v1/forecast.json?q=${city}&key=dc1e549f76194ae18a594507240407&&days=5`);
            const current = res.data.current;
            const forecast = res.data.forecast.forecastday;
            return { current: current, forecast: forecast };
        }
        catch (error) {
            console.error("Error fetching population data:", error);
            return null;
        }
    });
}
app.get("/population/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const city = (_a = req.query.city) === null || _a === void 0 ? void 0 : _a.toString();
    console.log(city);
    try {
        const forcast = yield fetchForcastData(city);
        // console.log(forcast);
        if (forcast) {
            res.send(JSON.stringify(forcast));
        }
        else {
            res.status(500).send("Error fetching forcast data");
        }
    }
    catch (error) {
        console.error("Error handling forcast request:", error);
        res.status(500).send("Internal server error");
    }
}));
