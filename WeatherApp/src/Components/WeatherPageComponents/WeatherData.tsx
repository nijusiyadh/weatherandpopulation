import RainIcon from "../../assets/rainy-day.png";
import { FaTemperatureHalf } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { FaWind } from "react-icons/fa6";
import WeatherCardContainer from "./WeatherCardContainer";

type weatherForecastrData = {
  current: current;
  forecast: forecastday;
};

type condition = {
  text: string;
  icon: string;
};

type current = {
  temp_c?: number;
  is_day: boolean;
  condition: condition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  forecast: forecastday;
  day: day;
  icon: string;
  status: boolean,
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

export default function WeatherData({
  icon,
  temp_c,
  is_day,
  condition,
  wind_kph,
  humidity,
  feelslike_c,
  forecast,
  day,
  status,
}: current) {
  // console.log(typeof current.temp_c);

  return (
    status ?
    <div className="grow h-full  rounded-lg overflow-hidden gap-2">
      <div className="flex w-full gap-2 justify-between">
        <div className="border-solid border-2 border-white w-[48%] h-[200px] rounded-lg flex items-center justify-center">
          <span className="text-5xl">{temp_c}</span>
          <div className="flex flex-col text-[14px] justify-end pt-3 ml-2 font-medium">
            <span className="">°C | °F</span>
            <span className="w-[70px] ">{condition.text}</span>
          </div>
        </div>
        <div className="border-solid border-2 border-white w-[48%] w-[48%] h-[200px] rounded-lg p-2 flex flex-col items-center justify-between">
          <div className="w-[80px] h-[70px] mb-2 flex items-center justify-start">
            <img className="w-full" src={icon} alt="" />
          </div>
          <div className="bg-white/50 w-full grow rounded-md p-3 flex flex-col justify-between">
            <div className="flex text-black/70 items-center justify-start gap-3 font-medium text-[13px] ">
              <FaTemperatureHalf className="" />
              <p>
                Feel like: <span>{feelslike_c}°C</span>
              </p>
            </div>
            <div className="flex text-black/70 items-center justify-start gap-3 font-medium text-[13px] ">
              <GiWaterDrop className="" />
              <p>
                Humidity: <span>{humidity}%</span>
              </p>
            </div>
            <div className="flex text-black/70 items-center justify-start gap-3 font-medium text-[13px] ">
              <FaWind className="" />
              <p>
                Wind: <span>{wind_kph} km/h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-[62%] mt-6">
        <WeatherCardContainer forecast={forecast} />
      </div>
    </div>
    : <div className= " text-2xl font-bold  grow flex items-center justify-center"> No data Found!,Try Again</div>
  );
}
