type WeatherCardProps = {
  day: string;
  tempMax: number;
  tempMin: number;
  status: string;
  icon: string;
};

function WeatherCard({
  day,
  tempMax,
  tempMin,
  status,
  icon,
}: WeatherCardProps) {
  return (
    <div className="bg-white/30 text-black/60  w-full h-[160px] font-mono rounded-lg shadow-sm flex flex-col items-center justify-center">
      <p className="font-light text-[14px] my-1 ">{day}</p>
      <img src={icon} className="w-20 m-0" alt="" />
      <h2 className="font-bold text-[13px]">
        {tempMax}°-{tempMin}°
      </h2>
      <p className="text-[10px] font-bold">{status}</p>
    </div>
  );
}

export default WeatherCard;
