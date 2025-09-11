import React, { useState } from "react";
import { motion } from "framer-motion";

interface Feature {
  name: string;
  available: boolean;
}

interface Package {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  recommended?: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  packages: Package[];
}

const PricePackageCards: React.FC = () => {
  const [activeService, setActiveService] = useState<string>("web-development");

  const services: Service[] = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Professional website development services for all your needs",
      packages: [
        {
          name: "Basic",
          price: "$999",
          description: "Perfect for small businesses and startups",
          features: [
            { name: "Up to 5 pages", available: true },
            { name: "Responsive design", available: true },
            { name: "Contact form", available: true },
            { name: "Basic SEO", available: true },
            { name: "CMS integration", available: false },
            { name: "E-commerce functionality", available: false },
          ],
        },
        {
          name: "Standard",
          price: "$2,499",
          description: "Ideal for growing businesses",
          features: [
            { name: "Up to 15 pages", available: true },
            { name: "Responsive design", available: true },
            { name: "Contact form", available: true },
            { name: "Advanced SEO", available: true },
            { name: "CMS integration", available: true },
            { name: "E-commerce functionality", available: false },
          ],
          recommended: true,
        },
        {
          name: "Advanced",
          price: "$4,999",
          description: "For large businesses with complex needs",
          features: [
            { name: "Unlimited pages", available: true },
            { name: "Responsive design", available: true },
            { name: "Contact form", available: true },
            { name: "Advanced SEO", available: true },
            { name: "CMS integration", available: true },
            { name: "E-commerce functionality", available: true },
          ],
        },
      ],
    },
    {
      id: "app-development",
      title: "App Development",
      description: "Mobile application development for iOS and Android",
      packages: [
        {
          name: "Basic",
          price: "$1,499",
          description: "Simple mobile app with core features",
          features: [
            { name: "Single platform (iOS or Android)", available: true },
            { name: "Up to 5 screens", available: true },
            { name: "Basic UI/UX design", available: true },
            { name: "API integration", available: true },
            { name: "Push notifications", available: false },
            { name: "Backend administration", available: false },
          ],
        },
        {
          name: "Standard",
          price: "$3,999",
          description: "Cross-platform app with advanced features",
          features: [
            { name: "Both iOS and Android", available: true },
            { name: "Up to 15 screens", available: true },
            { name: "Advanced UI/UX design", available: true },
            { name: "API integration", available: true },
            { name: "Push notifications", available: true },
            { name: "Backend administration", available: false },
          ],
          recommended: true,
        },
        {
          name: "Advanced",
          price: "$6,999",
          description: "Enterprise-grade application with all features",
          features: [
            { name: "Both iOS and Android", available: true },
            { name: "Unlimited screens", available: true },
            { name: "Premium UI/UX design", available: true },
            { name: "API integration", available: true },
            { name: "Push notifications", available: true },
            { name: "Backend administration", available: true },
          ],
        },
      ],
    },
    {
      id: "video-editing",
      title: "Video Editing",
      description: "Professional video editing services for your content",
      packages: [
        {
          name: "Basic",
          price: "$199",
          description: "For simple video edits and cuts",
          features: [
            { name: "Up to 5 min video", available: true },
            { name: "Cutting and trimming", available: true },
            { name: "Basic transitions", available: true },
            { name: "Color correction", available: true },
            { name: "Sound design", available: false },
            { name: "Motion graphics", available: false },
          ],
        },
        {
          name: "Standard",
          price: "$499",
          description: "For professional video content",
          features: [
            { name: "Up to 15 min video", available: true },
            { name: "Cutting and trimming", available: true },
            { name: "Advanced transitions", available: true },
            { name: "Color grading", available: true },
            { name: "Sound design", available: true },
            { name: "Basic motion graphics", available: true },
          ],
          recommended: true,
        },
        {
          name: "Advanced",
          price: "$999",
          description: "For commercial and professional videos",
          features: [
            { name: "Up to 30 min video", available: true },
            { name: "Cutting and trimming", available: true },
            { name: "Premium transitions", available: true },
            { name: "Advanced color grading", available: true },
            { name: "Professional sound design", available: true },
            { name: "Advanced motion graphics", available: true },
          ],
        },
      ],
    },
    {
      id: "logo-branding",
      title: "Logo & Branding",
      description: "Create a unique identity for your brand",
      packages: [
        {
          name: "Basic",
          price: "$149",
          description: "Simple logo design for startups",
          features: [
            { name: "1 initial concept", available: true },
            { name: "2 revisions", available: true },
            { name: "Vector file", available: true },
            { name: "PNG & JPEG files", available: true },
            { name: "Color variants", available: false },
            { name: "Brand guide", available: false },
          ],
        },
        {
          name: "Standard",
          price: "$349",
          description: "Complete branding package",
          features: [
            { name: "3 initial concepts", available: true },
            { name: "5 revisions", available: true },
            { name: "Vector file", available: true },
            { name: "All file formats", available: true },
            { name: "Color variants", available: true },
            { name: "Basic brand guide", available: true },
          ],
          recommended: true,
        },
        {
          name: "Advanced",
          price: "$699",
          description: "Premium branding with stationery design",
          features: [
            { name: "5 initial concepts", available: true },
            { name: "Unlimited revisions", available: true },
            { name: "Vector file", available: true },
            { name: "All file formats", available: true },
            { name: "Color variants", available: true },
            { name: "Complete brand guide + business card", available: true },
          ],
        },
      ],
    },
    {
      id: "poster-design",
      title: "Poster Design",
      description: "Eye-catching poster designs for any occasion",
      packages: [
        {
          name: "Basic",
          price: "$79",
          description: "Simple poster design",
          features: [
            { name: "1 initial concept", available: true },
            { name: "2 revisions", available: true },
            { name: "Print-ready file", available: true },
            { name: "Source file", available: true },
            { name: "3D mockup", available: false },
            { name: "Multiple sizes", available: false },
          ],
        },
        {
          name: "Standard",
          price: "$149",
          description: "Professional poster design",
          features: [
            { name: "3 initial concepts", available: true },
            { name: "5 revisions", available: true },
            { name: "Print-ready file", available: true },
            { name: "Source file", available: true },
            { name: "3D mockup", available: true },
            { name: "Multiple sizes", available: true },
          ],
          recommended: true,
        },
        {
          name: "Advanced",
          price: "$249",
          description: "Premium poster package",
          features: [
            { name: "5 initial concepts", available: true },
            { name: "Unlimited revisions", available: true },
            { name: "Print-ready file", available: true },
            { name: "Source file", available: true },
            { name: "3D mockup", available: true },
            { name: "Multiple sizes", available: true },
            { name: "Social media adaptation", available: true },
          ],
        },
      ],
    },
  ];

  const currentService = services.find(
    (service) => service.id === activeService
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Services & Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect package for your needs
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="mt-12">
          <div className="flex md:justify-center space-x-4 overflow-x-auto pb-4 px-2 hide-scrollbar">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeService === service.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {currentService?.packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              className={`relative p-8 bg-white border rounded-3xl shadow-2xl flex flex-col transition-all duration-300 hover:shadow-purple-200/60 ${
                pkg.recommended
                  ? "border-2 border-purple-500 ring-2 ring-purple-500/30"
                  : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-xs font-semibold rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {pkg.price}
                  </span>
                </p>
                <p className="mt-2 text-gray-600">{pkg.description}</p>

                <ul className="mt-6 space-y-4">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start group transition"
                    >
                      <div className="flex-shrink-0">
                        {feature.available ? (
                          <motion.svg
                            className="h-6 w-6 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            whileHover={{ scale: 1.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        ) : (
                          <svg
                            className="h-6 w-6 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`ml-3 text-base ${
                          feature.available
                            ? "text-gray-700"
                            : "text-gray-400 line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <motion.button
                  type="button"
                  className={`w-full px-6 py-3 border border-transparent text-base font-medium rounded-2xl shadow-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    pkg.recommended
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:ring-purple-500"
                      : "bg-gray-800 hover:bg-gray-900 focus:ring-gray-500"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PricePackageCards;
