import axios from "axios";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

app.use(cors());

type populationCounts = {
  year: string;
  value: string;
  sex: string;
  reliabilty: string;
};

type PopulationData = {
  city: string;
  country: string;
  populationCounts: PopulationData[];
};

async function fetchPopulationData(city: string) {
  try {
    console.log("FETCHING POPULATION DATA");

    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/population/cities",
      { city }
    );

    const Data: PopulationData = response.data.data;

    return Data;
  } catch (error) {
    console.error("Error fetching population data:", error);
    return null;
  }
}

app.get("/population", async (req: Request, res: Response) => {
  const city = req.query.city?.toString();

  if (!city) {
    return res.status(400).send("Missing required parameter: city");
  }

  try {
    const populationData = await fetchPopulationData(city);

    if (populationData) {
      res.send(JSON.stringify(populationData));
    } else {
      res.status(500).send("Error fetching population data");
    }
  } catch (error) {
    console.error("Error handling population request:", error);
    res.status(500).send("Internal server error");
  }
});

type condition = {
  text: string;
  icon: string;
};

type current = {
  temp_c: number;
  is_day: boolean;
  condition: condition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
};

type day = {
  maxtemp_c: number;
  mintemp_c: number;
  condition: condition;
};

type forecastday = {
  date: string;
  day: day;
};

async function fetchForcastData(city: string) {
  try {
    console.log("FETCHING FORCAST DATA");

    const res = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=dc1e549f76194ae18a594507240407&&days=5`
    );

    const current: current = res.data.current;
    const forecast: forecastday = res.data.forecast.forecastday;

    return { current: current, forecast: forecast };
  } catch (error) {
    console.error("Error fetching population data:", error);
    return null;
  }
}

app.get("/population/weather", async (req: Request, res: Response) => {
  const city = req.query.city?.toString();
  console.log(city);

  try {
    const forcast = await fetchForcastData(city);

    // console.log(forcast);

    if (forcast) {
      res.send(JSON.stringify(forcast));
    } else {
      res.status(500).send("Error fetching forcast data");
    }
  } catch (error) {
    console.error("Error handling forcast request:", error);
    res.status(500).send("Internal server error");
  }
});
