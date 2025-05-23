import React, { useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  DatePicker,
  Dropdown,
  Menu,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { customerData } from "../Data/customerData";

const { RangePicker } = DatePicker;

const CustomerTable = () => {

  const [filteredData, setFilteredData] = useState(customerData);
  const [amount, setAmount] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  
  //  Table Column 
 
  const columns = [
    { title: "Customer Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Purchase Amount ($)", dataIndex: "amount", key: "amount" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  //  Filtering 
 
  const handleFilter = () => {
    let filtered = [...customerData];

    if (amount) {
      filtered = filtered.filter((item) => item.amount >= amount);
    }

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.date);
        return (
          itemDate.isAfter(start.subtract(1, "day")) &&
          itemDate.isBefore(end.add(1, "day"))
        );
      });
    }

    setFilteredData(filtered);
  };

  
  //  Download CSV
  
  const downloadCSV = () => {
    const csvRows = [
      ["Name", "Email", "Amount", "Date"],
      ...filteredData.map((row) => [row.name, row.email, row.amount, row.date]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "customer-data.csv");
  };

  //  Download PDF
  
  const downloadPDF = () => {
    const table = document.getElementById("customer-table");
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("customer-data.pdf");
    });
  };

  
  //  Download Menu Dropdown
 
  const downloadMenu = (
    <Menu
      items={[
        {
          key: "csv",
          label: "Download CSV",
          onClick: downloadCSV,
        },
        {
          key: "pdf",
          label: "Download PDF",
          onClick: downloadPDF,
        },
      ]}
    />
  );


  return (
    <div className="p-4 bg-white rounded-xl shadow-md mx-2 md:mx-4">
      {/* 🔠 Header */}
      <h2 className=" md:text-2xl font-semibold mb-6 text-gray-800">
        Customer Details
      </h2>

      {/*  Filter & Download Options */}
      <div className="flex flex-col md:flex-row justify-between gap-4 flex-wrap mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap w-full md:w-auto">
          <RangePicker
            className="w-full sm:w-auto"
            onChange={(dates) => setDateRange(dates)}
          />
          <InputNumber
            min={0}
            placeholder="Min Amount"
            value={amount}
            className="w-full sm:w-auto"
            onChange={(value) => setAmount(value)}
          />
          <Button type="primary" className="w-full sm:w-auto" onClick={handleFilter}>
            Apply Filters
          </Button>
        </div>

        {/*  Download Button */}
        <Dropdown overlay={downloadMenu} placement="bottomRight" arrow>
          <Button
            icon={<DownloadOutlined />}
            className="w-full sm:w-auto"
          >
            Download
          </Button>
        </Dropdown>
      </div>

      {/*  Data Table */}
      <div id="customer-table" className="overflow-auto">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          className="min-w-[600px]"
        />
      </div>
    </div>
  );
};

export default CustomerTable;
