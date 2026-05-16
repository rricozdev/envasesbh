import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { navLinks } from "@/config/nav.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const products = [
    { name: "Botellas PET", href: "/productos" },
    {
      name: "Potes & Recipientes",
      href: "/productos?categoria=Tarros+y+Vitroleros",
    },
    { name: "Tarros Especiales", href: "/productos?categoria=Boston" },
    { name: "Etiquetado", href: "/servicios#etiquetado" },
    { name: "Pigmentación", href: "/servicios#pigmentacion" },
  ];

  const contactInfo = [
    {
      type: "email",
      name: "Email",
      value: "info@envasesbh.com",
      href: "mailto:info@envasesbh.com",
      icon: Mail,
    },
    {
      type: "phone",
      name: "Teléfono",
      value: "+52 (155) 5824 7722",
      href: "tel:+5215558247722",
      icon: Phone,
    },
    {
      type: "whatsapp",
      name: "WhatsApp",
      value: "+52 (155) 5824 8471",
      href: "https://wa.me/5215558248471",
      icon: MessageCircle,
    },
    {
      type: "address",
      name: "Dirección",
      value:
        "Callejón México Nuevo #1, Col. México Nuevo, Atizapán, Edo. de México",
      href: "#",
      icon: MapPin,
    },
  ];

  const legalLinks = [
    { name: "Política de Privacidad", href: "/legal/privacidad" },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      Icon: Facebook,
      href: "https://facebook.com/envasesbh",
    },
    {
      name: "Instagram",
      Icon: Instagram,
      href: "https://www.instagram.com/envasesbh",
    },
    {
      name: "YouTube",
      Icon: Youtube,
      href: "https://youtube.com/@davidambe5803",
    },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* MAIN FOOTER CONTENT */}
      <div className="border-b border-gray-700 px-4 py-16 md:py-20 lg:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* COLUMNA 1: LOGO & ESLOGAN */}
            <div className="flex flex-col justify-start">
              {/* Logo */}
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src="/logo-bh-3.png"
                  alt="Envases BH"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>

              {/* Eslogan */}
              <h3 className="mb-3 font-heading text-lg font-semibold text-primary">
                Tu Distribuidor & Fabricante de Envases PET
              </h3>

              {/* Propuesta de valor */}
              <p className="mb-6 text-sm font-body leading-relaxed text-gray-300">
                25+ años de experiencia en distribución y manufactura de envases
                PET de calidad. Acceso inmediato a catálogo amplio + opciones de
                personalización sin cambiar de proveedor.
              </p>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialMedia.map((social) => {
                  const Icon = social.Icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 hover:bg-opacity-80 hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* COLUMNA 2: NAVEGACIÓN */}
            <div>
              <h4 className="mb-6 font-heading text-lg font-semibold text-white">
                Explorar
              </h4>
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-body text-gray-300 transition-colors duration-300 hover:text-primary"
                  >
                    {link.name
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Link>
                ))}
              </nav>
            </div>

            {/* COLUMNA 3: PRODUCTOS & SERVICIOS */}
            <div>
              <h4 className="mb-6 font-heading text-lg font-semibold text-white">
                Productos & Servicios
              </h4>
              <nav className="space-y-3">
                {products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="block text-sm font-body text-gray-300 transition-colors duration-300 hover:text-primary"
                  >
                    {product.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* COLUMNA 4: CONTACTO */}
            <div>
              <h4 className="mb-6 font-heading text-lg font-semibold text-white">
                Contacto
              </h4>
              <div className="space-y-4">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <div key={contact.type} className="flex gap-3">
                      <span className="flex-shrink-0 text-primary mt-0.5">
                        <Icon size={20} />
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase text-gray-400">
                          {contact.name}
                        </p>
                        {contact.type === "address" ? (
                          <p className="text-sm font-body text-gray-300 leading-relaxed">
                            {contact.value}
                          </p>
                        ) : (
                          <a
                            href={contact.href}
                            className="text-sm font-body text-gray-300 transition-colors duration-300 hover:text-primary"
                          >
                            {contact.value}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="px-4 py-6 lg:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
            {/* Copyright */}
            <div className="text-center text-sm font-body text-gray-400 md:text-left">
              <p>
                © {currentYear}{" "}
                <span className="font-semibold text-white">Envases BH</span>.
                Todos los derechos reservados.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Soluciones & Creatividad en Empaques PET
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs font-body text-gray-400 md:justify-end">
              {legalLinks.map((link) => (
                <div key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Border */}
          <div className="mt-6 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
            <p>
              Diseñado y desarrollado por{" "}
              <a
                href="https://www.linkedin.com/in/ricardo-ricoz/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-primary"
              >
                OrbitUI
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
