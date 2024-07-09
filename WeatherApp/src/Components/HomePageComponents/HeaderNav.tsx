import { useNavigate } from "react-router-dom";
import weatherLogo  from "../../assets/weather-app.png";

const HeaderNav = () => {
  const navigate = useNavigate();
  return (
    <div className="block px-4  py-6 bg-black/15 text-white w-full fixed z-50">
      <div className="flex justify-between items-center max-w-[1240px] mx-auto">
        <div className="font-bold text-3xl md:text-5xl sm:text-4xl font-thin italic">
          <img src={weatherLogo} className="w-[60px]" alt="" />
        </div>
        <ul className="flex gap-3 font-bold">
          <li
            className="hover:text-[#89c4f4] cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="hover:text-[#89c4f4] cursor-pointer"
            onClick={() => navigate("/weather")}
          >
            City Details
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderNav;
