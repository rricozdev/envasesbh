"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function FormContacto() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = `Hola Envases BH 👋

*Nombre:* ${form.nombre}
*Empresa:* ${form.empresa || "No especificada"}
*Teléfono:* ${form.telefono || "No especificado"}
*Email:* ${form.email || "No especificado"}

*Mensaje:*
${form.mensaje}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank",
    );
  };

  const inputClass =
    "w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-secondary text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors";

  const labelClass = "block text-xs font-semibold text-secondary/60 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-full">
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

      <div>
        <label className={labelClass}>Mensaje</label>

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
