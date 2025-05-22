import React, { createContext, useContext, useEffect, useState } from "react";

const FaqContext = createContext();

export const useFaq = () => useContext(FaqContext);

export const FaqProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const storedFaqs = JSON.parse(localStorage.getItem("faqs")) || [];
    setFaqs(storedFaqs);
  }, []);

  useEffect(() => {
    localStorage.setItem("faqs", JSON.stringify(faqs));
  }, [faqs]);

  const addFaq = (faq) => setFaqs([...faqs, faq]);
  const updateFaq = (index, updatedFaq) => {
    const newFaqs = [...faqs];
    newFaqs[index] = updatedFaq;
    setFaqs(newFaqs);
  };
  const deleteFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  return (
    <FaqContext.Provider value={{ faqs, addFaq, updateFaq, deleteFaq }}>
      {children}
    </FaqContext.Provider>
  );
};
