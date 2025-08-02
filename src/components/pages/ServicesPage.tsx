import React from "react";

const services = [
  { title: "Web Development", description: "Building responsive and modern web applications." },
  { title: "UI/UX Design", description: "Designing user-friendly and beautiful interfaces." },
  { title: "Consulting", description: "Providing expert advice for your digital projects." },
];

const ServicesPage = () => (
  <div className="max-w-3xl mx-auto p-8">
    <h2 className="text-2xl font-bold mb-6">Our Services</h2>
    <div className="grid gap-6">
      {services.map((service, idx) => (
        <div key={idx} className="bg-white border rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-700">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ServicesPage;
