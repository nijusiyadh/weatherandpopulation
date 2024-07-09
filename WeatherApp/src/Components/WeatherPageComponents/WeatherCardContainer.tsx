import WeatherCard from "./WeatherCard";

type condition = {
  text: string;
  icon: string;
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

function WeatherCardContainer({ forecast }: { forecast: forecast[] }) {
  // forecastarray = forecast.map(val => val);
  console.log(forecast);

  let dateStr: string;
  let day: string;

  function getDayName(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  }

  // const [forecasts,setForecasts ]= useState<forecast[]>(forecastarray);

  // useEffect(() => {
  //   setForecasts(forecast);
  //   console.log(forecasts);
  // })

  return (
    <div className="grid w-full h-fit grid-cols-3 gap-1">
      {forecast.map(
        (val) => (
          (dateStr = val.date),
          (day = getDayName(dateStr)),
          (
            <WeatherCard
              icon={val.day.condition.icon}
              day={day}
              status={val.day.condition.text}
              tempMax={val.day.maxtemp_c}
              tempMin={val.day.mintemp_c}
            />
          )
        )
      )}
    </div>
  );
}

export default WeatherCardContainer;
