import React, { useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  DatePicker,
  Space,
  Dropdown,
  Menu,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

const { RangePicker } = DatePicker;

const data = [
  { key: "1", name: "John Doe", email: "john@example.com", amount: 250, date: "2025-05-10" },
  { key: "2", name: "Jane Smith", email: "jane@example.com", amount: 480, date: "2025-05-14" },
  { key: "3", name: "Alex Johnson", email: "alex@example.com", amount: 150, date: "2025-05-18" },
  { key: "4", name: "Emily Brown", email: "emily@example.com", amount: 320, date: "2025-05-01" },
  { key: "5", name: "Michael Scott", email: "michael@example.com", amount: 270, date: "2025-05-05" },
  { key: "6", name: "Dwight Schrute", email: "dwight@example.com", amount: 390, date: "2025-05-03" },
  { key: "7", name: "Pam Beesly", email: "pam@example.com", amount: 180, date: "2025-05-07" },
  { key: "8", name: "Jim Halpert", email: "jim@example.com", amount: 440, date: "2025-05-11" },
  { key: "9", name: "Stanley Hudson", email: "stanley@example.com", amount: 210, date: "2025-05-13" },
  { key: "10", name: "Kevin Malone", email: "kevin@example.com", amount: 160, date: "2025-05-15" },
  { key: "11", name: "Angela Martin", email: "angela@example.com", amount: 300, date: "2025-05-04" },
  { key: "12", name: "Oscar Martinez", email: "oscar@example.com", amount: 290, date: "2025-05-06" },
  { key: "13", name: "Phyllis Vance", email: "phyllis@example.com", amount: 310, date: "2025-05-09" },
  { key: "14", name: "Meredith Palmer", email: "meredith@example.com", amount: 120, date: "2025-05-08" },
  { key: "15", name: "Creed Bratton", email: "creed@example.com", amount: 500, date: "2025-05-12" },
  { key: "16", name: "Ryan Howard", email: "ryan@example.com", amount: 230, date: "2025-05-16" },
  { key: "17", name: "Kelly Kapoor", email: "kelly@example.com", amount: 270, date: "2025-05-17" },
  { key: "18", name: "Toby Flenderson", email: "toby@example.com", amount: 200, date: "2025-05-19" },
  { key: "19", name: "Darryl Philbin", email: "darryl@example.com", amount: 350, date: "2025-05-20" },
  { key: "20", name: "Roy Anderson", email: "roy@example.com", amount: 130, date: "2025-05-02" },
  { key: "21", name: "Jan Levinson", email: "jan@example.com", amount: 480, date: "2025-05-21" },
  { key: "22", name: "David Wallace", email: "david@example.com", amount: 390, date: "2025-05-22" },
  { key: "23", name: "Charles Miner", email: "charles@example.com", amount: 260, date: "2025-05-23" },
  { key: "24", name: "Holly Flax", email: "holly@example.com", amount: 330, date: "2025-05-24" },
  { key: "25", name: "Gabe Lewis", email: "gabe@example.com", amount: 170, date: "2025-05-25" },
  { key: "26", name: "Clark Green", email: "clark@example.com", amount: 210, date: "2025-05-26" },
  { key: "27", name: "Pete Miller", email: "pete@example.com", amount: 140, date: "2025-05-27" },
  { key: "28", name: "Nellie Bertram", email: "nellie@example.com", amount: 260, date: "2025-05-28" },
  { key: "29", name: "Andy Bernard", email: "andy@example.com", amount: 190, date: "2025-05-29" },
  { key: "30", name: "Robert California", email: "robert@example.com", amount: 450, date: "2025-05-30" },
];


const CustomerTable = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [amount, setAmount] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Purchase Amount ($)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const handleFilter = () => {
    let filtered = [...data];

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
    <div className="p-4 mx-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

      <div className="mb-4 flex justify-between flex-wrap">
        <div className="flex-wrap flex gap-3">
          <RangePicker onChange={(dates) => setDateRange(dates)} />
          <InputNumber
            min={0}
            placeholder="Min Amount"
            value={amount}
            onChange={(value) => setAmount(value)}
          />
          <Button type="primary" onClick={handleFilter}>
            Apply Filters
          </Button>
        </div>

        {/* Download Dropdown Button */}
        <Dropdown overlay={downloadMenu} placement="bottomRight" arrow>
          <Button icon={<DownloadOutlined />}>Download</Button>
        </Dropdown>
      </div>

      <div id="customer-table">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
