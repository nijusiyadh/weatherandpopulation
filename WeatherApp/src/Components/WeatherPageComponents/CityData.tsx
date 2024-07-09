import { FiSearch } from "react-icons/fi";
import DataListContainer from "./DataListContainer";
import { PopulationProps } from "../../Pages/WeatherPage";

type CityDataProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  cityName: string;
  country: string;
  population: PopulationProps[];
  status: boolean;
};

const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let year: number;
let month: number;
let day: number;
let curdate: number;
let hour: number;
let minute: number;
let ampm: string = "";

const getTodaysDate = () => {
  const date = new Date();

  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDay();
  curdate = date.getDate();

  hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  minute = date.getMinutes();
  ampm = date.getHours() > 12 ? "PM" : "AM";
};

getTodaysDate();

setInterval(() => {
  getTodaysDate();
}, 1000);

const CityDataPage = ({
  handleSubmit,
  city,
  setCity,
  cityName,
  country,
  population,
  status,
}: CityDataProps) => {
  return (
    <div className=" w-[40%] h-full rounded-sm flex flex-col gap-6">
      <div className="w-full h-[70px] bg-white/30 rounded-md flex items-center justify-center overflow-hidden">
        <form
          className="w-full h-full flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="City.."
            className="px-4 h-full w-[80%] focus:outline-none active:outline-none text-black"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="w-[20%] bg-black/80 h-full font-sans font-bold flex items-center justify-center placeholder:text-gray-300">
            <FiSearch size={25} className=" hover:text-blue-300" />
          </button>
        </form>
      </div>
      <div className="  bg-cover bg-bottom max-h-[84%]  w-full grow rounded-md  text-black/55 flex flex-col">
        <h1 className="font-bold text-3xl text-black/85">{cityName}</h1>
        <p className="my-1 text-[14px] font-medium">
          {`${days[day]},${curdate} ${months[month]} ${year} | ${hour}:${minute} ${ampm}`}
        </p>

        <div className=" bg-cover w-full  max-h-[99%] overflow-y-auto no-scrollbar  mt-2 rounded-lg p-3 flex flex-col items-start  bg-white/20 ">
          <div className="italic font-bold  mb-2">population details</div>
          {status ? (
            <>
              <DataListContainer title="country" value={country} />
              {population != null
                ? population.map((pop) => (
                    <DataListContainer title={pop.year} value={pop.value} />
                  ))
                : "loading"}
            </>
          ) : (
            <div className="font-bold py-6">No data Found!, Try Again.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDataPage;
