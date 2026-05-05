import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Star, Globe, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

// --- DATA ---
const PRODUCTS = [
  {
    id: 1,
    name: "AURA Radiance Serum",
    category: "Treatment",
    price: 85,
    description: "A potent blend of Vitamin C and botanical extracts to brighten and even skin tone globally.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "AURA Cloud Cream",
    category: "Moisturizer",
    price: 65,
    description: "Weightless 24-hour hydration formulated to adapt to varying global climates.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "AURA Purifying Cleanser",
    category: "Cleanser",
    price: 40,
    description: "A gentle, pH-balanced foaming gel that removes urban pollutants and impurities.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "AURA Midnight Elixir",
    category: "Night Care",
    price: 95,
    description: "Cell-renewing night oil rich in antioxidants to repair environmental stress while you sleep.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "AURA Mineral Shield SPF 50",
    category: "Protection",
    price: 55,
    description: "Invisible, reef-safe mineral sun protection suitable for all skin tones worldwide.",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
  }
];

// --- COMPONENTS ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans selection:bg-stone-200">
      
      {/* HEADER */}
      <header className="fixed w-full bg-[#FAFAFA]/90 backdrop-blur-md z-40 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button */}
            <button className="sm:hidden p-2" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex-1 sm:flex-none text-center sm:text-left">
              <a href="#" className="text-2xl font-serif tracking-widest font-medium uppercase text-stone-900">
                Aura <span className="font-light text-stone-500 text-sm tracking-widest block sm:inline sm:ml-2">Global</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex space-x-12">
              <a href="#home" className="text-sm uppercase tracking-wider hover:text-stone-500 transition-colors">Home</a>
              <a href="#collection" className="text-sm uppercase tracking-wider hover:text-stone-500 transition-colors">Collection</a>
              <a href="#about" className="text-sm uppercase tracking-wider hover:text-stone-500 transition-colors">Our Ethos</a>
            </nav>

            {/* Cart Icon */}
            <button className="p-2 relative flex items-center group" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-6 h-6 group-hover:text-stone-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col pt-24 px-6 pb-6">
          <button className="absolute top-6 right-6 p-2" onClick={() => setIsMenuOpen(false)}>
            <X className="w-8 h-8 text-stone-400" />
          </button>
          <nav className="flex flex-col space-y-8 text-2xl font-serif tracking-wide text-center">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#collection" onClick={() => setIsMenuOpen(false)}>Collection</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>Our Ethos</a>
          </nav>
        </div>
      )}

      {/* CART OVERLAY */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-lg font-serif tracking-widest uppercase">Your Bag</h2>
              <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5 text-stone-400 hover:text-stone-800" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-stone-500 text-center mt-12">Your shopping bag is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded bg-stone-100" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-stone-500 text-sm mt-1">${item.price}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm text-stone-500">Qty: {item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-800 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50">
                <div className="flex justify-between mb-4 font-medium">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-stone-900 text-white py-4 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* MAIN CONTENT */}
      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=2000" 
              alt="Skincare application" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/20"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight drop-shadow-sm">
              Radiance <br className="hidden md:block"/> Without Borders.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-light tracking-wide max-w-xl mx-auto drop-shadow-sm">
              Science-backed, globally sourced skincare formulated to awaken your skin's natural vitality, no matter where you are in the world.
            </p>
            <a href="#collection" className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-100 transition-colors group">
              Explore Collection
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* FEATURES BANNER */}
        <div className="bg-stone-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Globe className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="font-medium tracking-wider uppercase text-sm mb-2">Global Shipping</h3>
                <p className="text-stone-400 text-sm font-light">Delivering beauty to over 100 countries.</p>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="font-medium tracking-wider uppercase text-sm mb-2">100% Vegan & Cruelty-Free</h3>
                <p className="text-stone-400 text-sm font-light">Ethically sourced, naturally derived.</p>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="font-medium tracking-wider uppercase text-sm mb-2">Dermatologist Tested</h3>
                <p className="text-stone-400 text-sm font-light">Safe for all skin types and climates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <section id="collection" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest text-stone-500 uppercase">Our Formulations</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-4 text-stone-900">The Essential Five</h2>
            <div className="w-16 h-px bg-stone-300 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 rounded-sm mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur text-stone-900 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-white"
                  >
                    Add to Bag - ${product.price}
                  </button>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs text-stone-500 tracking-wider uppercase">{product.category}</span>
                    <h3 className="text-lg font-serif mt-1">{product.name}</h3>
                  </div>
                  <span className="text-lg font-light">${product.price}</span>
                </div>
                
                <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>
                
                <div className="flex items-center text-stone-400 text-xs">
                  <div className="flex text-yellow-500 mr-2">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  (128 Reviews)
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT INGREDIENTS SECTION */}
        <section id="about" className="bg-stone-100 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-192a6af4e86e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Skincare textures" 
                  className="rounded-sm shadow-xl w-full"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Global Ingredients, Singular Focus.</h2>
                <p className="text-stone-600 mb-6 leading-relaxed font-light text-lg">
                  At AURA, we source the highest quality botanicals and clinically proven active ingredients from around the globe. Our five essential products are designed to simplify your routine while delivering transformative results.
                </p>
                <p className="text-stone-600 leading-relaxed font-light text-lg">
                  Every formula is housed in sustainable, recyclable packaging, ensuring our commitment to your skin's health extends to the health of our planet.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-serif tracking-widest uppercase mb-6">Aura <span className="font-light">Global</span></h2>
              <p className="text-stone-400 max-w-sm font-light text-sm leading-relaxed mb-6">
                Join our global community and discover skincare that respects your skin's natural balance and the environment.
              </p>
              <form className="flex max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-stone-800 text-white px-4 py-3 w-full text-sm outline-none focus:ring-1 focus:ring-stone-500 border border-transparent"
                />
                <button type="button" className="bg-white text-stone-900 px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-stone-200 transition-colors">
                  Join
                </button>
              </form>
            </div>
            
            <div>
              <h3 className="font-medium tracking-widest uppercase text-sm mb-6">Shop</h3>
              <ul className="space-y-4 text-sm text-stone-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sets & Bundles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find a Store</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium tracking-widest uppercase text-sm mb-6">Support</h3>
              <ul className="space-y-4 text-sm text-stone-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 tracking-wider">
            <p>&copy; 2026 AURA Global Skincare. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}