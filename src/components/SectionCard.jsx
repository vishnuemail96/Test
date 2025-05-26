import React from "react";

const SectionCard = ({ title, children }) => (
  <div className="w-full py-10 px-5 bg-white shadow-md rounded-md mb-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

export default SectionCard;
