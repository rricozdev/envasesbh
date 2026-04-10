# Carrito de Cotización — Guía de Integración

## Archivos creados

```
src/
├── context/
│   └── CartContext.js                        ← Estado global (nuevo)
├── lib/
│   └── whatsapp.js                           ← Generador de link WhatsApp (nuevo)
└── components/
    └── features/
        ├── cart/                             ← Carpeta nueva
        │   ├── CartDrawer.jsx
        │   ├── CartItem.jsx
        │   └── CartButton.jsx
        └── productos/
            └── ProductCard.jsx               ← Reemplaza el tuyo
```

---

## Paso 1 — Agregar tu número de WhatsApp en constants.js

En `src/lib/constants.js`, agrega:

```js
export const WHATSAPP_NUMBER = "573001234567"; // Número con código de país, sin +
```

---

## Paso 2 — Envolver la app con CartProvider

En `src/app/layout.js`:

```jsx
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/features/cart/CartDrawer";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <CartDrawer />   {/* ← Siempre presente, se abre/cierra con estado */}
        </CartProvider>
      </body>
    </html>
  );
}
```

---

## Paso 3 — Agregar CartButton en el Header

En `src/components/layout/Header/Navbar.jsx` (o donde tengas los íconos del header):

```jsx
import CartButton from "@/components/features/cart/CartButton";

// Dentro del JSX del header:
<CartButton />
```

---

## Paso 4 — Integrar ProductCard

Reemplaza tu `ProductCard.jsx` con el archivo entregado, o adapta el `handleAgregar` y `yaEnCarrito` a tu componente actual.

La estructura mínima que debe tener cada producto:

```js
{
  id: "prod-001",         // Identificador único (obligatorio)
  nombre: "Envase 500ml", // Nombre a mostrar
  slug: "envase-500ml",   // Para el link /productos/[slug]
  referencia: "ENV-500",  // Referencia interna (opcional)
  imagen: "/img/prod.jpg" // Ruta de imagen (opcional)
}
```

---

## Cómo funciona el flujo completo

1. Usuario navega al catálogo → hace clic en **"Agregar a cotización"**
2. El drawer se abre automáticamente mostrando el producto
3. Puede ajustar cantidades con los botones +/−
4. Al hacer clic en **"Solicitar cotización por WhatsApp"**, se abre WhatsApp con un mensaje preformateado listo para enviar

---

## API del contexto (useCart)

```js
const {
  items,          // Array de productos en el carrito
  isOpen,         // Boolean: drawer abierto/cerrado
  totalItems,     // Suma de todas las cantidades
  addItem,        // (producto) => void  — también abre el drawer
  removeItem,     // (id) => void
  updateCantidad, // (id, cantidad) => void
  clearCart,      // () => void
  openCart,       // () => void
  closeCart,      // () => void
  toggleCart,     // () => void
} = useCart();
```
