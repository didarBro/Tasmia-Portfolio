"use client";
import React from "react";

interface StatisticsCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg text-white  border-2 border-green-500 border-transparent transform transition-all duration-300 
        hover:scale-105 hover:bg-green-400 hover:shadow-2xl  hover:bg-opacity-80`}
    >
      <div className="flex items-center mb-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl ml-4">{title}</h3>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default StatisticsCard;
