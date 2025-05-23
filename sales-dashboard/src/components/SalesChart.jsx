import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { startOfWeek, format } from "date-fns";
import { Button, Dropdown, Menu } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const generateDummyData = () => {
  const start = new Date("2025-05-01");
  const today = new Date();
  const data = [];
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split("T")[0],
      sales: Math.floor(Math.random() * 10000),
    });
  }
  return data;
};

const dummyData = generateDummyData();

const getWeeklyData = (data) => {
  const weeklyMap = {};
  data.forEach(({ date, sales }) => {
    const weekStart = format(startOfWeek(new Date(date), { weekStartsOn: 1 }), "yyyy-MM-dd");
    weeklyMap[weekStart] = (weeklyMap[weekStart] || 0) + sales;
  });

  return Object.entries(weeklyMap).map(([date, sales]) => ({ date, sales }));
};

const SalesChart = () => {
  const today = new Date();
  const [chartType, setChartType] = useState("line");
  const [viewType, setViewType] = useState("daily");
  const [startDate, setStartDate] = useState(new Date("2025-05-01"));
  const [endDate, setEndDate] = useState(today);

  const filteredDailyData = dummyData.filter(({ date }) => {
    const d = new Date(date);
    return d >= startDate && d <= endDate;
  });

  const filteredData = viewType === "daily" ? filteredDailyData : getWeeklyData(filteredDailyData);

  const downloadImage = () => {
    const chartEl = document.getElementById("chart-container");
    html2canvas(chartEl).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "sales-chart.png");
      });
    });
  };

  const downloadCSV = () => {
    const csv = [
      ["Date", "Sales"],
      ...filteredData.map((row) => [row.date, row.sales]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales-data.csv");
  };

  const downloadPDF = () => {
    const chartEl = document.getElementById("chart-container");
    html2canvas(chartEl).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("sales-chart.pdf");
    });
  };

  const downloadMenu = (
    <Menu
      items={[
        { key: "png", label: "Download PNG", onClick: downloadImage },
        { key: "csv", label: "Download CSV", onClick: downloadCSV },
        { key: "pdf", label: "Download PDF", onClick: downloadPDF },
      ]}
    />
  );

  return (
    <div className="bg-white mx-2 md:mx-4 border my-6 sm:my-12 py-4 px-2 sm:px-4 rounded-xl shadow">
      <div className="flex  lg:flex-row flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded text-sm font-medium uppercase bg-blue-600 text-white ml-0">
            Start
          </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            dateFormat="yyyy-MM-dd"
            className="border p-1 rounded"
          />
          <span className="px-3 py-1 rounded text-sm font-medium uppercase bg-blue-600 text-white">
            End
          </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={today}
            dateFormat="yyyy-MM-dd"
            className="border p-1 rounded"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["line", "bar"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 rounded text-sm font-medium uppercase ${
                chartType === type ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {["daily", "weekly"].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-3 py-1 rounded text-sm font-medium uppercase ${
                viewType === type ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <Dropdown overlay={downloadMenu} placement="bottomRight" arrow>
          <Button icon={<DownloadOutlined />}>Download</Button>
        </Dropdown>
      </div>

      <div id="chart-container" className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#1D4ED8" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;