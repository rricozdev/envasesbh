"use client";

import { motion } from "framer-motion";

export default function SectionContent({
  title,
  subtitle,
  children,
  className = "",
  containerClassName = "",
  align = "center",
  animated = true, // 👈 control global
}) {
  const isCenter = align === "center";

  // 🎬 Animaciones reutilizables
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className={`py-12 px-4 lg:px-0 ${containerClassName} `}>
      <motion.div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 `}
        variants={animated ? staggerContainer : {}}
        initial={animated ? "hidden" : false}
        whileInView={animated ? "visible" : false}
        viewport={{ once: true, margin: "-100px" }} // 👈 dispara antes
      >
        {(title || subtitle) && (
          <motion.div
            variants={animated ? fadeUp : {}}
            className={`max-w-2xl ${
              isCenter ? "mx-auto text-center" : "text-left"
            }`}
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary/90 font-primary leading-tight">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-4 text-sm sm:text-¨gbase lg:text-lg text-gray-600 font-secondary">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          variants={animated ? fadeUp : {}}
          className={`${title || subtitle ? "mt-10" : ""} ${className}`}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
