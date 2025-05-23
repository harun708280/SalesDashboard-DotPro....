import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { useFaq } from "../context/FaqContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const FaqTable = ({ onEdit }) => {
  //  Context Get FAQs and delete function

  const { faqs, deleteFaq } = useFaq();

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: 250,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      width: 400,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, __, index) => (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(index)}
            size="small"
          >
            Edit
          </Button>

          {/* Delete Button with Confirmation */}
          <Popconfirm
            title="Are you sure you want to delete this FAQ?"
            onConfirm={() => deleteFaq(index)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  //  Table

  return (
    <Table
      dataSource={faqs}
      pagination={{ pageSize: 5 }}
      columns={columns}
      scroll={{ x: true }}
      rowKey={(_, index) => index}
    />
  );
};

export default FaqTable;
