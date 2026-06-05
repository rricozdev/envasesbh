"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const CATEGORIAS_INTERES = [
  "Agua",
  "Alimentos y Bebidas",
  "Amenidades Hoteleras",
  "Boston",
  "Cosméticos",
  "Especieros",
  "Farmacéuticos",
  "Limpieza",
  "Publicitarios",
  "Tarros y Vitroleros",
  "Tapas, Bombas y Triggers",
];

const MEDIOS_CONTACTO = [
  "Facebook",
  "Google",
  "Instagram",
  "YouTube",
  "Recomendación",
  "Expo",
];

export default function FormContacto() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    productoInteres: "",
    medio: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = `Hola Envases BH 👋

*Nombre:* ${form.nombre}
*Empresa:* ${form.empresa || "No especificada"}
*Teléfono:* ${form.telefono || "No especificado"}
*Email:* ${form.email || "No especificado"}
*Producto de interés:* ${form.productoInteres || "No especificado"}
*Nos conoció por:* ${form.medio || "No especificado"}

*Mensaje:*
${form.mensaje}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank",
    );
    setForm({
      nombre: "",
      empresa: "",
      telefono: "",
      email: "",
      productoInteres: "",
      medio: "",
      mensaje: "",
    });
  };

  const inputClass =
    "w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-secondary text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors";

  const labelClass = "block text-xs font-semibold text-secondary/60 mb-1";

  const selectClass =
    "w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-full">
      {/* NOMBRE + EMPRESA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre</label>
          <input
            name="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Empresa</label>
          <input
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
            className={inputClass}
          />
        </div>
      </div>

      {/* TELÉFONO + EMAIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Teléfono</label>
          <input
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Tu número de teléfono"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Correo Electrónico</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* PRODUCTO DE INTERÉS + MEDIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className={labelClass}>Producto de interés</label>
          <select
            name="productoInteres"
            value={form.productoInteres}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIAS_INTERES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-[60%] -translate-y-1/2 text-muted">
            ▾
          </span>
        </div>
        <div className="relative">
          <label className={labelClass}>¿Cómo nos conociste?</label>
          <select
            name="medio"
            value={form.medio}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Selecciona un medio</option>
            {MEDIOS_CONTACTO.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-[60%] -translate-y-1/2 text-muted">
            ▾
          </span>
        </div>
      </div>

      {/* MENSAJE */}
      <div>
        <label className={labelClass}>
          Mensaje{" "}
          <span className="text-gray-400 italic font-normal">
            (indique tipo de envases y volumen requerido)
          </span>
        </label>

        <textarea
          name="mensaje"
          required
          value={form.mensaje}
          onChange={handleChange}
          rows={6}
          placeholder="Escribe aquí tu consulta..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <p className="text-[11px] text-muted">
        Sus datos serán tratados con confidencialidad. Nunca compartimos su
        información.
      </p>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-primary text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-secondary transition-colors duration-300 cursor-pointer"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
