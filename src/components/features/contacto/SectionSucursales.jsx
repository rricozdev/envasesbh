import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

const sucursales = [
  {
    id: 1,
    ciudad: "CDMX",
    direccion:
      "Azafrán 380, Granjas México Iztacalco, CP 08400 Ciudad de México, CDMX",
    horario: [
      "Lunes a Jueves: 8:00 AM - 5:00 PM",
      "Viernes: 8:00 AM - 3:30 PM",
      "Sábado y Domingo: Cerrado",
    ],
    contacto: ["5215576576045"],
    whatsapp: "5215576576045",
    maps: "#",
  },
  {
    id: 2,
    ciudad: "Puebla",
    direccion: "Miguel Hidalgo 6155, Col. El Patrimonio, CP 72450, Puebla, Pue",
    horario: [
      "Lunes a Jueves: 8:00 AM - 5:00 PM",
      "Viernes: 8:00 AM - 3:30 PM",
      "Sábado y Domingo: Cerrado",
    ],
    contacto: ["522211460293", "522229126345"],
    whatsapp: "5212211460293",
    maps: "#",
  },
  {
    id: 3,
    ciudad: "Veracruz",
    direccion:
      "Igualdad #1398 entre Arista y Esteban Morales, Unidad Veracruzana, C.P. 91710, Veracruz, México",
    horario: [
      "Lunes a Jueves: 8:00 AM - 5:00 PM",
      "Viernes: 8:00 AM - 3:30 PM",
      "Sábado y Domingo: Cerrado",
    ],
    contacto: ["522295265435"],
    whatsapp: "5212295265435",
    maps: "#",
  },
  {
    id: 4,
    ciudad: "Neza",
    direccion: "Vicente Villada #744, Nezahualcóyotl, México, 57000",
    horario: [
      "Lunes a Jueves: 8:00 AM - 5:00 PM",
      "Viernes: 8:00 AM - 3:30 PM",
      "Sábado y Domingo: Cerrado",
    ],
    contacto: ["525521528498"],
    whatsapp: "5215521528498",
    maps: "#",
  },
  {
    id: 5,
    ciudad: "Querétaro",
    direccion:
      "ARGO Conjunto Industrial Victoria II, Acceso III 52, Bodega17 76100, Benito Juárez, 76120 Santiago de Querétaro, Qro.",
    horario: [
      "Lunes a Jueves: 8:00 AM - 5:00 PM",
      "Viernes: 8:00 AM - 3:30 PM",
      "Sábado y Domingo: Cerrado",
    ],
    contacto: ["524421418651"],
    whatsapp: "5214421418651",
    maps: "#",
  },
  {
    id: 6,
    ciudad: "Guadalajara",
    direccion: "ALMER Avenida 18 de marzo 704 bodega 38, La Nogalera, Guadalajara, Jal.",
    horario: [
      "Lunes a Jueves: 8:00 AM - 5:00 PM",
      "Viernes: 8:00 AM - 3:30 PM",
      "Sábado y Domingo: Cerrado",
    ],
    contacto: ["525563182026"],
    whatsapp: "525563182026",
    maps: "#",
  },
];

export default function SectionSucursales() {
  return (
    <section className="mt-10 md:mt-16">
      <div className="rounded-3xl border border-sky-100 bg-sky-50/40 p-6 md:p-8">
        {/* HEADER */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-xs font-medium text-primary">
              Cobertura y atención especializada
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary mb-2">
            Red de Distribución Estratégica en México
          </h2>

          <p className="text-muted text-sm md:text-base leading-relaxed">
            Contamos con una red de distribuidores autorizados ubicados en
            puntos estratégicos de México para brindarte atención cercana,
            disponibilidad de productos y entregas rápidas.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {sucursales.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border bg-white p-3 hover:border-primary/20 hover:shadow-sm transition-all duration-300 flex flex-col"
            >
              {/* HEADER */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-secondary leading-tight">
                    {item.ciudad}
                  </h3>
                  <p className="text-[10px] text-primary font-medium mt-0.5">
                    Regional
                  </p>
                </div>
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>

              {/* BODY */}
              <div className="space-y-2.5 flex-1">
                {/* DIRECCIÓN */}
                <div className="flex gap-2">
                  <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wide font-bold text-secondary">
                      Dirección
                    </p>
                    <p className="text-xs text-muted leading-tight">
                      {item.direccion}
                    </p>
                  </div>
                </div>

                {/* HORARIO */}
                <div className="flex gap-2">
                  <Clock3 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wide font-bold text-secondary mb-0.5">
                      Horario
                    </p>
                    <div className="space-y-0">
                      {item.horario.map((hora, index) => (
                        <p
                          key={index}
                          className="text-xs text-muted leading-tight"
                        >
                          {hora}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CONTACTO */}
                <div className="flex gap-2">
                  <Phone className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wide font-bold text-secondary mb-0.5">
                      Contacto
                    </p>
                    <div className="space-y-0">
                      {item.contacto.map((telefono, index) => (
                        <a
                          key={index}
                          href={`tel:${telefono}`}
                          className="text-xs text-muted hover:text-primary transition-colors block"
                        >
                          +{telefono}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`https://wa.me/${item.whatsapp}`}
                target="_blank"
                className="mt-3 h-8 w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-primary text-white text-xs font-semibold hover:opacity-90 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
