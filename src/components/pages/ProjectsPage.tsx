import React from "react";

const projects = [
  {
    name: "Website Redesign",
    description: "A modern redesign for a corporate website with improved UX.",
    link: "#"
  },
  {
    name: "E-commerce Platform",
    description: "A scalable online store with payment integration.",
    link: "#"
  },
  {
    name: "Mobile App",
    description: "A cross-platform mobile app for customer engagement.",
    link: "#"
  }
];

const ProjectsPage = () => (
  <div className="max-w-3xl mx-auto p-8">
    <h2 className="text-2xl font-bold mb-6">Our Projects</h2>
    <div className="grid gap-6">
      {projects.map((project, idx) => (
        <div key={idx} className="bg-white border rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
          <p className="text-gray-700 mb-2">{project.description}</p>
          <a
            href={project.link}
            className="text-blue-600 hover:underline text-sm"
          >
            View Project
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsPage;
