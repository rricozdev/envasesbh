"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ProcessChecklist from "./ProccesCheckList";

export default function ProcessCard({
  number,
  title,
  description,
  checklist,
  image,
  imageAlt,
  reverse = false,
  priority = false,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-8
        items-stretch
        bg-white
        p-8
        rounded-3xl
        border
        border-primary/10
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* NUMBER */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="lg:col-span-1 flex items-start"
      >
        <span className="text-6xl font-black text-primary/50">{number}</span>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className={`
          lg:col-span-5
          space-y-5
          flex
          flex-col
          justify-center
          ${reverse ? "lg:order-3" : ""}
        `}
      >
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Proceso creativo
          </span>

          <h3 className="text-2xl font-black uppercase leading-tight">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        <ProcessChecklist items={checklist} />
      </motion.div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className={`
          lg:col-span-6
          ${reverse ? "lg:order-2" : ""}
        `}
      >
        <div
          className="
            relative
            w-full
            aspect-video
            overflow-hidden
            rounded-2xl
          "
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={85}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="
              object-cover
              object-center
              md:object-contain
              grayscale
              hover:grayscale-0
              hover:scale-105
              transition-all
              duration-700
            "
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect fill='%23f3f4f6' width='1200' height='675'/%3E%3C/svg%3E"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}
