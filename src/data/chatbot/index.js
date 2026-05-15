import { flowGreeting } from "./flow.greeting";
import { flowAgua } from "./flow.agua";
import { flowAlimentos } from "./flow.alimentos";
import { flowCosmeticos } from "./flow.cosmeticos";
import { flowLimpieza } from "./flow.limpieza";
import { flowHoteleria } from "./flow.hoteleria";
import { flowCotizacion } from "./flow.cotizacion";
import { flowBoston } from "./flow.boston";
import { flowTarros } from "./flow.tarros";
import { flowTapas } from "./flow.tapas";
import { flowPublicitarios } from "./flow.publicitarios";
import { flowEspecieros } from "./flow.especieros";

export const chatbotFlow = {
  ...flowGreeting,
  ...flowAgua,
  ...flowAlimentos,
  ...flowCosmeticos,
  ...flowLimpieza,
  ...flowHoteleria,
  ...flowCotizacion,
  ...flowBoston,
  ...flowTarros,
  ...flowTapas,
  ...flowPublicitarios,
  ...flowEspecieros,
};
