import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { useFaq } from "../context/FaqContext";


const FaqForm = ({ visible, onClose, editingIndex, initialValues }) => {
  const [form] = Form.useForm();
  const { addFaq, updateFaq } = useFaq();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleFinish = (values) => {
    if (editingIndex !== null) {
      updateFaq(editingIndex, values);
    } else {
      addFaq(values);
    }
    onClose();
  };

  return (
    <Modal
      title={editingIndex !== null ? "Edit FAQ" : "Add FAQ"}
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: "Please enter a question" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answer"
          label="Answer"
          rules={[{ required: true, message: "Please enter an answer" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FaqForm;
