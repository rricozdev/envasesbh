import FormContacto from "@/components/features/contacto/FormContacto";
import SectionContent from "@/components/ui/SectionContent";
import {
  EMAIL_VENTAS,
  EMPRESA_CIUDAD,
  EMPRESA_DIRECCION,
  WHATSAPP_NUMBER,
  SUCURSAL_GDL_WHATSAPP,
  SUCURSAL_GDL_FACEBOOK,
} from "@/lib/constants";
import { baseMetadata } from "@/lib/metadata-config";

export const metadata = {
  ...baseMetadata,
  title: "Contáctanos  ",
  description: "Contáctanos por WhatsApp, email o visítanos en nuestra sede.",
};

export default function ContactoPage() {
  return (
    <SectionContent>
      <div className="max-w-6xl mx-auto">
        {/* ENCABEZADO */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
            Póngase en contacto con nosotros
          </h1>

          <p className="text-sm text-muted mt-2">
            Complete el formulario o utilice uno de los métodos de contacto
            alternativos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
          {/* FORMULARIO */}
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm h-full">
            <h2 className="text-base font-bold text-secondary mb-6 uppercase tracking-wide">
              Envíenos su consulta
            </h2>

            <FormContacto />
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col h-full">
            <div className="space-y-4 mb-4">
              <h2 className="text-xs font-bold text-secondary uppercase tracking-widest">
                Otras formas de contacto
              </h2>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.858L.057 23.268a.75.75 0 0 0 .906.919l5.532-1.451A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 0 1-4.953-1.355l-.355-.212-3.684.967.984-3.595-.232-.371A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide">
                    Llámenos
                  </p>

                  <p className="text-sm text-primary font-semibold">
                    +{WHATSAPP_NUMBER}
                  </p>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href={`mailto:${EMAIL_VENTAS}`}
                className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide">
                    Escríbanos
                  </p>

                  <p className="text-sm text-primary font-semibold break-all">
                    {EMAIL_VENTAS}
                  </p>
                </div>
              </a>

              {/* DIRECCIÓN */}
              <div className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide">
                    Visítenos
                  </p>

                  <p className="text-sm text-muted leading-snug">
                    {EMPRESA_DIRECCION}
                  </p>

                  <p className="text-sm text-muted">{EMPRESA_CIUDAD}</p>
                </div>
              </div>
            </div>

            {/* MAPA */}
            <div className="flex-1 min-h-[320px] rounded-2xl overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.3757314338336!2d-99.25958602575179!3d19.56839723633194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21c9ab2ae821f%3A0xbd799cc6d741b65c!2sEnvases%20BH!5e0!3m2!1ses!2sco!4v1778603287566!5m2!1ses!2sco"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        {/* Info sucursal Guadalajara */}
        <div className="mt-8">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
            Sucursal Guadalajara
          </h2>
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-4">
            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${SUCURSAL_GDL_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary transition-colors flex-1"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.858L.057 23.268a.75.75 0 0 0 .906.919l5.532-1.451A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 0 1-4.953-1.355l-.355-.212-3.684.967.984-3.595-.232-.371A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">
                  WhatsApp
                </p>
                <p className="text-sm text-primary font-semibold">
                  +{SUCURSAL_GDL_WHATSAPP}
                </p>
                <p className="text-[10px] text-muted mt-0.5">Número temporal</p>
              </div>
            </a>

            {/* FACEBOOK */}
            <a
              href={SUCURSAL_GDL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary transition-colors flex-1"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">
                  Facebook
                </p>
                <p className="text-sm text-primary font-semibold">
                  Envases BH Guadalajara
                </p>
              </div>
            </a>

            {/* UBICACIÓN */}
            <div className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl flex-1">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">
                  Ubicación
                </p>
                <p className="text-sm text-muted leading-snug">
                  Guadalajara, Jalisco, México
                </p>
                <p className="text-[10px] text-muted mt-0.5">
                  Dirección próximamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContent>
  );
}
