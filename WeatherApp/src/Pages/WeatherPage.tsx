import { useEffect, useState } from "react";
import WeatherData from "../Components/WeatherPageComponents/WeatherData";
import { PopulationData } from "../Types/PopulationDataTypes";
import axios from "axios";
import CityDataPage from "../Components/WeatherPageComponents/CityData";

type weatherForecastrData = {
  current: current;
  forecast: forecast;
};

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

type forecast = {
  date: string;
  day: day;
};

export type PopulationProps = {
  year: string;
  value: string;
};

const forecastarray: forecast[] = [
  {
    date: "2024-04-23",
    day: {
      maxtemp_c: 22,
      mintemp_c: 22,
      condition: {
        text: "hello",
        icon: "ajlkjfalkjfal",
      },
    },
  },
  {
    date: "2024-05-23",
    day: {
      maxtemp_c: 24,
      mintemp_c: 24,
      condition: {
        text: "hello",
        icon: "ajlkjfalkjfal",
      },
    },
  },
];

function WeatherPage() {
  const [city, setCity] = useState<string>("");

  const [cityName, setCityName] = useState<string>("kochi");

  let CityData: PopulationData;

  const [country, setCountry] = useState<string>("");

  const [population, setPopulation] = useState<PopulationProps[]>();

  const [currTemp, setCurrTemp] = useState<number>(25);

  const [conditionText, setConditionText] = useState<condition>({
    text: "hello",
    icon: "hello",
  });

  const [weatherDataList, setWeatherDataList] =
    useState<weatherForecastrData>();

  let weatherData: weatherForecastrData;

  const [feelslike, setfeelslike] = useState<number>(28);

  const [humidity, setHumidity] = useState<number>(20);

  const [wind, setWind] = useState<number>(6);

  const [populationStatus, setPopulationStatus] = useState<boolean>(false);

  const [weatherStatus, setWeatherStatus] = useState<boolean>(false);

  const [curicon, setCurricon] = useState<string>("");

  const [forecast, setforecast] = useState<forecast[]>(forecastarray);

  const [daysforecast, setdaysforecast] = useState<day[]>({
    maxtemp_c: 24,
    mintemp_c: 24,
    condition: { text: "good", icon: "good" },
  });
  const [isDay, setisDay] = useState<boolean>(false);

  const url = "http://localhost:8000/";

  useEffect(() => {
    fetchData(cityName);
    fetchWeatherData(cityName);
  }, []);

  async function fetchData(city: string) {
    const res = await axios
      .get(`${url}population`, {
        params: {
          city: city,
        },
      })
      .catch((e) => {
        setPopulationStatus(false);
        console.log("error population:" + e);
      });

    if (res.data !== null || undefined) setPopulationStatus(true);
    console.log(res);

    CityData = res.data;
    setPopulation(CityData.populationCounts);
    // console.log(population);
    setCityName(CityData.city);
    setCountry(CityData.country);
  }

  async function fetchWeatherData(city: string) {
    const res = await axios
      .get(`${url}population/weather`, {
        params: {
          city: city,
        },
      })
      .catch((e) => {
        setWeatherStatus(false);
        console.log(e);
      });

    if (res.data !== null || undefined) setWeatherStatus(true);
    // console.log(weatherStatus);

    weatherData = res.data;
    setWeatherDataList(weatherData);
    // console.log(weatherData.forecast);

    setCurrTemp(weatherData.current.temp_c);
    setHumidity(weatherData.current.humidity);
    setWind(weatherData.current.wind_kph);
    setfeelslike(weatherData.current.feelslike_c);
    setConditionText(weatherData.current.condition);
    setCurricon(weatherData.current.condition.icon);
    setisDay(weatherData.current.is_day);
    setforecast(weatherData.forecast);
    setdaysforecast(weatherData.forecast.day);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCityName(city);
    console.log(city);
    fetchData(city);
    fetchWeatherData(city);
    setCity("");
  }

  return (
    <div className=" h-screen flex items-center justify-center text-white bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-[800px] h-[600px] bg-white/50 shadow-lg rounded-lg flex p-6 gap-5">
        {/* <CityData handleSubmit={handleSubmit} city={city} setCity={setCity} cityName={cityName} country={country} population={population} /> */}
        <CityDataPage
          handleSubmit={handleSubmit}
          city={city}
          setCity={setCity}
          cityName={cityName}
          country={country}
          population={population}
          status={populationStatus}
        />
        <WeatherData
          is_day={isDay}
          temp_c={currTemp}
          humidity={humidity}
          condition={conditionText}
          feelslike_c={feelslike}
          wind_kph={wind}
          forecast={forecast}
          day={daysforecast}
          icon={curicon}
          status={weatherStatus}
        />
      </div>
    </div>
  );
}

export default WeatherPage;
