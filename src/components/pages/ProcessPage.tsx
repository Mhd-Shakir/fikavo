import React from "react";

const steps = [
  { step: "1. Consultation", detail: "We discuss your needs and goals." },
  { step: "2. Planning", detail: "We create a project plan and timeline." },
  { step: "3. Development", detail: "We build and iterate on your solution." },
  { step: "4. Delivery", detail: "We launch and support your project." },
];

const ProcessPage = () => (
  <div className="max-w-2xl mx-auto p-8">
    <h2 className="text-2xl font-bold mb-6">Our Process</h2>
    <ol className="space-y-4 list-decimal list-inside">
      {steps.map((item, idx) => (
        <li key={idx}>
          <span className="font-semibold">{item.step}</span>
          <div className="text-gray-700 ml-4">{item.detail}</div>
        </li>
      ))}
    </ol>
  </div>
);

export default ProcessPage;
