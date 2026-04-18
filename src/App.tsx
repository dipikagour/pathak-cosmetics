import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Star, ChevronRight, Truck, ShieldCheck, ArrowRight, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from './data';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setOrderComplete(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setOrderComplete(true);
      setCartItems([]);
      setTimeout(() => {
        setOrderComplete(false);
        setIsCartOpen(false);
      }, 5000);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFBF9] font-sans text-[#331A21] selection:bg-[#EBD1CE] selection:text-[#331A21] overflow-x-hidden relative">
      
      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#FFFBF9] shadow-2xl transition-transform duration-500 ease-in-out transform flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-[#331A21]/10 bg-[#FAF1EE]">
            <h2 className="font-serif text-2xl text-[#6B2132]">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-[#331A21] hover:text-[#6B2132] transition">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {orderComplete ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-[#6B2132]/10 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} className="text-[#6B2132]" />
                </div>
                <h3 className="font-serif text-2xl text-[#6B2132]">Order Confirmed!</h3>
                <p className="text-[#665359]">Thank you for shopping with Pathak Cosmetics.<br/>Your Cash on Delivery (COD) order has been placed.</p>
                <button onClick={() => setIsCartOpen(false)} className="px-6 py-3 bg-[#6B2132] text-white tracking-[2px] uppercase text-xs hover:bg-[#501624] transition mt-6">
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#665359]">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="uppercase tracking-[2px] text-xs">Your bag is empty</p>
                <button onClick={() => setIsCartOpen(false)} className="px-6 py-3 border border-[#331A21] text-[#331A21] tracking-[2px] uppercase text-xs hover:bg-[#331A21] hover:text-white transition mt-4">
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-4 border border-[#331A21]/5 bg-white shadow-sm">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded-sm" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase tracking-[2px] text-[#A68F94]">{item.product.category}</p>
                          <h4 className="font-serif text-base text-[#331A21] mt-1">{item.product.name}</h4>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-[#A68F94] hover:text-[#6B2132] transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#331A21]/20 rounded-sm">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="px-2 py-1 hover:bg-[#FAF1EE] text-[#665359]"><Minus size={14}/></button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="px-2 py-1 hover:bg-[#FAF1EE] text-[#665359]"><Plus size={14}/></button>
                        </div>
                        <span className="font-semibold text-[#6B2132]">₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!orderComplete && cartItems.length > 0 && (
            <div className="p-6 bg-[#FAF1EE] border-t border-[#331A21]/10">
              <div className="space-y-3 mb-6 text-sm text-[#665359]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartTotal > 999 ? 'Free' : '₹99'}</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-[#6B2132] pt-4 border-t border-[#331A21]/10">
                  <span>Total</span>
                  <span>₹{cartTotal + (cartTotal > 999 ? 0 : 99)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-[#6B2132] text-white text-xs font-bold uppercase tracking-[2px] hover:bg-[#501624] transition-colors shadow-lg shadow-[#6B2132]/30 flex flex-col items-center justify-center gap-1"
              >
                <span>Confirm Order via C.O.D.</span>
                <span className="text-[10px] font-normal tracking-normal text-white/80 capitalize">Cash on Delivery Available</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Announcement Bar */}
      <div className="bg-[#6B2132] text-[#FFFBF9] py-2 text-center text-xs w-full tracking-[2px] uppercase">
        Free Shipping & COD on orders over ₹999
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#FFFBF9]/90 backdrop-blur-md border-b border-[#331A21]/10 shadow-sm shadow-[#331A21]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#331A21] hover:text-[#6B2132] p-2 transition">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto">
              <a href="#" className="font-serif text-3xl text-[#6B2132] italic">
                Pathak
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-10">
              <a href="#" className="text-xs uppercase tracking-[2px] text-[#331A21] hover:text-[#6B2132] transition">Shop All</a>
              <a href="#" className="text-xs uppercase tracking-[2px] text-[#331A21] hover:text-[#6B2132] transition">Skincare</a>
              <a href="#" className="text-xs uppercase tracking-[2px] text-[#331A21] hover:text-[#6B2132] transition">Makeup</a>
              <a href="#" className="text-xs uppercase tracking-[2px] text-[#331A21] hover:text-[#6B2132] transition">Story</a>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-[#331A21] hover:text-[#6B2132] transition"><Search size={22} strokeWidth={1.5} /></button>
              <button className="text-[#331A21] hover:text-[#6B2132] transition"><User size={22} strokeWidth={1.5} /></button>
              <button onClick={() => setIsCartOpen(true)} className="text-[#331A21] hover:text-[#6B2132] transition relative flex items-center group">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#6B2132] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile Cart */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsCartOpen(true)} className="text-[#331A21] hover:text-[#6B2132] transition relative p-2">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#6B2132] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FFFBF9] border-b border-[#331A21]/10 shadow-lg">
            <div className="px-6 py-8 space-y-6">
              <a href="#" className="block text-sm uppercase tracking-[2px] text-[#331A21]">Shop All</a>
              <a href="#" className="block text-sm uppercase tracking-[2px] text-[#331A21]">Skincare</a>
              <a href="#" className="block text-sm uppercase tracking-[2px] text-[#331A21]">Makeup</a>
              <a href="#" className="block text-sm uppercase tracking-[2px] text-[#331A21]">Story</a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Elegant Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 lg:h-[650px] grid grid-cols-1 lg:grid-cols-2 lg:gap-16 pt-10 pb-16 lg:py-0">
          <div className="flex flex-col justify-center relative z-10 lg:py-20 mb-12 lg:mb-0">
            <h2 className="text-[#A68F94] text-xs uppercase tracking-[4px] mb-4">New Collection</h2>
            <h1 className="font-serif text-5xl md:text-[80px] leading-[1.05] mb-8 text-[#6B2132]">
              Timeless<br/>Beauty
            </h1>
            <p className="text-[15px] text-[#665359] max-w-[400px] leading-[1.8] mb-10 font-sans">
              Experience the luxury of botanical formulations. Indulge your skin with our finest artisanal collections made for modern rituals.
            </p>
            <div>
              <a href="#collection" className="inline-flex items-center justify-center px-10 py-4 bg-[#6B2132] text-white text-xs uppercase tracking-[2px] hover:bg-[#501624] transition-colors shadow-lg shadow-[#6B2132]/20">
                Explore The Range
              </a>
            </div>
          </div>
          
          <div className="relative h-[450px] lg:h-full lg:flex lg:items-center">
            <div className="w-full h-full lg:h-[85%] relative z-10 overflow-hidden shadow-2xl shadow-[#6B2132]/10 rounded-tl-[80px] rounded-br-[80px]">
               <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80"
                  alt="Elegant cosmetic composition"
                />
            </div>
            {/* Decorative Element */}
            <div className="absolute w-[80%] h-[80%] border-2 border-[#D4B5B0] rounded-tl-[80px] rounded-br-[80px] top-[15%] right-[-10px] z-[5] lg:block hidden"></div>
          </div>
        </section>

        {/* Features Pre-footer */}
        <section className="border-y border-[#EBD1CE] py-10 mt-6 bg-[#FAF1EE]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="flex flex-col items-center">
                <Truck className="h-7 w-7 text-[#6B2132] mb-3" strokeWidth={1.5} />
                <h3 className="text-xs font-bold text-[#331A21] uppercase tracking-[2px]">Free Shipping</h3>
                <p className="mt-1 text-sm text-[#665359]">On all orders over ₹999</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-7 w-7 flex items-center justify-center font-serif text-[#6B2132] mb-3 text-2xl">₹</div>
                <h3 className="text-xs font-bold text-[#331A21] uppercase tracking-[2px]">Cash on Delivery</h3>
                <p className="mt-1 text-sm text-[#665359]">Pay securely at your doorstep</p>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-7 w-7 text-[#6B2132] mb-3" strokeWidth={1.5} />
                <h3 className="text-xs font-bold text-[#331A21] uppercase tracking-[2px]">100% Authentic</h3>
                <p className="mt-1 text-sm text-[#665359]">Guaranteed original products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-[#6B2132]">Shop By Category</h2>
            <div className="w-16 h-0.5 bg-[#D4B5B0] mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {CATEGORIES.map((category) => (
              <a key={category.id} href="#" className="group relative block overflow-hidden bg-[#FAF1EE] aspect-[4/5] rounded-xl shadow-sm">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#331A21]/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-lg font-serif text-white tracking-[1px]">
                    {category.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-white/60 mx-auto mt-2 transition-all duration-300 group-hover:w-16"></div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section id="collection" className="bg-[#FAF1EE] py-20 lg:py-28 border-t border-[#EBD1CE]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 text-center lg:text-left gap-4">
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif text-[#6B2132]">Current Favorites</h2>
                <p className="mt-3 text-sm text-[#665359]">Our most loved formulations.</p>
              </div>
              <a href="#" className="inline-flex items-center text-xs uppercase tracking-[2px] font-medium text-[#6B2132] hover:text-[#501624] transition border-b border-[#6B2132] pb-1">
                View All Products
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="group flex flex-col text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#EBD1CE]">
                  <div className="w-full aspect-square bg-[#FAF1EE] overflow-hidden relative">
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-[#FFFBF9] text-[#6B2132] px-3 py-1 text-[10px] font-bold uppercase tracking-[1px] z-10 rounded-full shadow-sm">
                        New
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute top-4 right-4 bg-[#6B2132] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[1px] z-10 rounded-full shadow-sm">
                        Sale
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow p-6">
                    <p className="text-[10px] text-[#A68F94] uppercase tracking-[2px] mb-2">{product.category}</p>
                    <h3 className="font-serif text-xl text-[#331A21] mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center text-[#D4B5B0] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "text-[#6B2132]" : ""} />
                      ))}
                      <span className="text-xs text-[#A68F94] ml-2">({product.reviews})</span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center space-x-3 mb-6">
                        <span className="text-lg font-bold text-[#6B2132]">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-[#A68F94] line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      
                      <button 
                          onClick={() => addToCart(product)}
                          className="w-full py-3.5 bg-[#FFFBF9] border border-[#6B2132] text-xs font-semibold uppercase tracking-[1.5px] text-[#6B2132] hover:bg-[#6B2132] hover:text-white transition-colors rounded-lg flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={16} /> Add To Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#331A21] text-[#FFFBF9] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-3xl text-[#EBD1CE] italic mb-6">Pathak</h3>
            <p className="text-white/70 text-sm leading-[1.8] mb-8">
              Elevating everyday beauty with premium, thoughtfully crafted formulas that honor your skin. Discover the art of Indian aesthetic rituals.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-[#EBD1CE] mb-8">Shop</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Skincare</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Makeup</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Hair Care</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Fragrance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-[#EBD1CE] mb-8">Help</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Returns Policy</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition">Cash on Delivery Info</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-[#EBD1CE] mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="leading-[1.6]">
                123 Beauty Avenue,<br/>Mumbai, MH 400001
              </li>
              <li>
                <a href="mailto:hello@pathakcosmetics.com" className="hover:text-white transition">hello@pathakcosmetics.com</a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-white transition">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 tracking-[1px] uppercase">
          <p>&copy; {new Date().getFullYear()} Pathak Cosmetics.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
