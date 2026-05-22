import "./globals.css";
import { CartProvider } from "../context/CartContext";
import SmoothScroll from "../components/SmoothScroll";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export const metadata = {
  title: "Brew & Brush | Art Café",
  description: "Specialty coffee craft and art workspaces blend together. Grab a cup, grab a brush, and start creating.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SmoothScroll>
            <Header />
            <CartDrawer />
            <div style={{ paddingTop: '75px' }}>
              {children}
            </div>
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}

