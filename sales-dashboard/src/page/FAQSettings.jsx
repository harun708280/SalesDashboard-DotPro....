import React, { useState } from "react";
import { Button } from "antd";



import FaqTable from "../components/FaqTable";
import { useFaq } from "../context/FaqContext";
import FaqForm from "../components/FaqForm";

const FAQSettings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const { faqs } = useFaq();

  const handleEdit = (index) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  return (
    <div className="p-4 mx-4  bg-white rounded shadow">
      <div className="flex justify-between flex-wrap items-center mb-4">
        <h2 className="text-xl font-semibold">FAQ Settings</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditingIndex(null);
            setModalVisible(true);
          }}
        >
          Add FAQ
        </Button>
      </div>

      <FaqTable onEdit={handleEdit} />
      <FaqForm
        visible={modalVisible}
        editingIndex={editingIndex}
        initialValues={editingIndex !== null ? faqs[editingIndex] : null}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default FAQSettings;
