import React from "react";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  StarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const Card = () => {
  const cards = [
    {
      title: "Total Sales",
      value: "$12,000",
      trend: "up",
      period: "Last Month",
      icon: <DollarCircleOutlined className="text-xl text-white" />,
      bgFrom: "from-blue-500",
      bgTo: "to-blue-700",
    },
    {
      title: "Total Users",
      value: 27,
      trend: "up",
      period: "Last Month",
      icon: <UserOutlined className="text-xl text-white" />,
      bgFrom: "from-green-400",
      bgTo: "to-green-600",
    },
    {
      title: "Total Orders",
      value: 359,
      trend: "down",
      period: "Last Month",
      icon: <ShoppingCartOutlined className="text-xl text-white" />,
      bgFrom: "from-pink-500",
      bgTo: "to-pink-700",
    },
    
    {
      title: "Total Reviews",
      value: 88,
      trend: "down",
      period: "Last Month",
      icon: <StarOutlined className="text-xl text-white" />,
      bgFrom: "from-yellow-400",
      bgTo: "to-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-xl p-5 text-white w-full shadow-md relative bg-gradient-to-r ${card.bgFrom} ${card.bgTo}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold">{card.title}</p>
              <h2 className="text-3xl font-bold">{card.value}</h2>
              <div className="flex items-center gap-1 opacity-90">
                {card.trend === "up" ? (
                  <ArrowUpOutlined className="text-white" />
                ) : (
                  <ArrowDownOutlined className="text-white" />
                )}
                <span className="text-sm">{card.period}</span>
              </div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-full p-2">
              {card.icon}
            </div>
          </div>

          <div className="absolute bottom-2 right-2 opacity-80">
            <MoreOutlined className="text-white" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
