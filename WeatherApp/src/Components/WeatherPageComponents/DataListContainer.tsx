import React from "react";

interface DataListContainerProps {
    title: string | number,
    value: string | number,
}

type condition = {
  text: string;
  icon: string;
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

function DataListContainer({title,value}: DataListContainerProps) {
  return (
    <div className=" flex items-end justify-between w-full mt-2 rounded-md w-full h-5 py-4 px-3 items-center font-bold">
      <span>{title}</span>
      <span className=" bg-black/20 py-1 px-3 rounded-lg text-white">
        {value}
      </span>
    </div>
  );
}

export default DataListContainer;
