import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const baseURL = "https://dummyjson.com/quotes/random";

const QuoteSlide = () => {
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();
  // const [time,setTime ] = useState<number>(0);

  useEffect(() => {
    const getQuotes = async function () {
      try {
        const response = await axios.get(baseURL);
        setQuote(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getQuotes();

    const intervel = setInterval(() => {
      getQuotes();
    }, 5000);

    return () => clearInterval(intervel);
  }, []);

  if (!quote) return null;

  // function handleClick() {
  //   // history.push('/weather')
  // }

  return (
    <div className="h-screen p-4 bg-bgimg bg-cover relative text-white">
      <div className="absolute  bg-black/50 top-0 left-0 right-0 bottom-0"></div>
      <div className="max-w-[1240px] h-full mx-auto flex flex-col justify-center items-center">
        <div
          key={quote.id}
          className="py-5 px-8 rounded-lg flex flex-col justify-center min-w-[1000px] items-end  bg-black/50 rounded-2xl my-6 "
        >
          <Marquee
            speed={40}
            pauseOnHover
            className="p-7 md:w-[800px] lg:w-[1000px] w-[600px] cursor-pointer"
          >
            <p className=" py-3 font-medium text-3xl font-mono ">
              {quote.quote}
            </p>
          </Marquee>
          <p className="italic font-light text-2xl text-white z-30">
            {"- " + quote.author}
          </p>
        </div>
        {/* <button
          className="text-white z-10 bg-[#1e8bc3] py-3 px-6 rounded-xl font-bold cursor-pointer hover:scale-105"
          onClick={() => navigate("/weather")}
        >
          Weather
        </button> */}
      </div>
    </div>
  );
};

export default QuoteSlide;
