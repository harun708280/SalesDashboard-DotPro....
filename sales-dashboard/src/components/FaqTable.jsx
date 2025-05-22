import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { useFaq } from "../context/FaqContext";


const FaqTable = ({ onEdit }) => {
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
        <>
          <Button type="link" onClick={() => onEdit(index)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this FAQ?"
            onConfirm={() => deleteFaq(index)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

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
