import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Rocket } from "lucide-react";

const stats = [
  {
    number: "150+",
    label: "Projects Delivered",
    icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    number: "50+",
    label: "Happy Clients",
    icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    number: "100%",
    label: "Success Rate",
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

 function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="py-4 sm:pt-10 md:pt-0 border-t border-gray-200"
    > 
      

      <motion.div
        role="list"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {stats.map((stat, index) => (
          <motion.div
            role="listitem"
            key={stat.label}
            variants={item}
            whileHover={{ y: -5, scale: 1.05 }}
            className="h-full text-center p-4 sm:p-5 rounded-2xl backdrop-blur-sm border border-transparent flex flex-col items-center"
          >
            <div className="flex justify-center items-center mb-2 text-purple-600">
              {stat.icon}
            </div>

            <motion.div
              className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
              }}
            >
              {stat.number}
            </motion.div>

            <div className="text-xs sm:text-sm text-gray-600 tracking-wide mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default StatsSection;