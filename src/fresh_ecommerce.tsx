import { useState } from 'react';
import { ShoppingCart, Leaf, TrendingUp, Award, Clock, Heart, X, Plus, Minus, Search, User, MapPin } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

const products: Product[] = [
  { id: 1, name: 'Organic Tomatoes', price: 4.99, unit: 'lb', category: 'Vegetables', image: '🍅', description: 'Fresh, vine-ripened organic tomatoes', stock: 50 },
  { id: 2, name: 'Fresh Strawberries', price: 6.99, unit: 'pack', category: 'Fruits', image: '🍓', description: 'Sweet and juicy strawberries', stock: 30 },
  { id: 3, name: 'Avocados', price: 3.99, unit: 'each', category: 'Fruits', image: '🥑', description: 'Perfectly ripe Hass avocados', stock: 45 },
  { id: 4, name: 'Baby Spinach', price: 5.49, unit: 'bag', category: 'Vegetables', image: '🥬', description: 'Tender organic baby spinach', stock: 40 },
  { id: 5, name: 'Blueberries', price: 7.99, unit: 'pack', category: 'Fruits', image: '🫐', description: 'Antioxidant-rich blueberries', stock: 25 },
  { id: 6, name: 'Carrots', price: 3.49, unit: 'bunch', category: 'Vegetables', image: '🥕', description: 'Crisp organic carrots', stock: 60 },
  { id: 7, name: 'Bell Peppers', price: 4.49, unit: 'each', category: 'Vegetables', image: '🫑', description: 'Colorful mixed bell peppers', stock: 35 },
  { id: 8, name: 'Bananas', price: 2.99, unit: 'bunch', category: 'Fruits', image: '🍌', description: 'Fresh yellow bananas', stock: 80 },
  { id: 9, name: 'Broccoli', price: 3.99, unit: 'head', category: 'Vegetables', image: '🥦', description: 'Fresh green broccoli crowns', stock: 30 },
  { id: 10, name: 'Apples', price: 5.99, unit: 'lb', category: 'Fruits', image: '🍎', description: 'Crispy Honeycrisp apples', stock: 55 },
  { id: 11, name: 'Lettuce', price: 2.99, unit: 'head', category: 'Vegetables', image: '🥬', description: 'Fresh romaine lettuce', stock: 40 },
  { id: 12, name: 'Oranges', price: 4.99, unit: 'lb', category: 'Fruits', image: '🍊', description: 'Sweet Valencia oranges', stock: 45 }
];

export default function FreshKeepEcommerce() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ['All', 'Fruits', 'Vegetables'];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
      setCurrentPage('home');
      setCheckoutData({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
      });
    }, 3000);
  };

  return (
    <div style={styles.app}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <div style={styles.logo} onClick={() => setCurrentPage('home')}>
              <Leaf size={32} color="#16a34a" />
              <span>FreshKeep</span>
            </div>
            
            <nav style={styles.nav}>
              <button 
                style={{...styles.navBtn, ...(currentPage === 'home' && styles.navBtnActive)}}
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
              <button 
                style={{...styles.navBtn, ...(currentPage === 'shop' && styles.navBtnActive)}}
                onClick={() => setCurrentPage('shop')}
              >
                Shop
              </button>
              <button style={styles.navBtn}>About</button>
              <button style={{...styles.navBtn, ...styles.contactBtn}}>Contact</button>
            </nav>

            <div style={styles.headerIcons}>
              <button style={styles.iconBtn}>
                <User size={24} color="#4b5563" />
              </button>
              <button style={styles.iconBtn} onClick={() => setShowCart(true)}>
                <ShoppingCart size={24} color="#4b5563" />
                {getTotalItems() > 0 && (
                  <span style={styles.cartBadge}>{getTotalItems()}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Landing Page */}
      {currentPage === 'home' && (
        <>
          <section style={styles.hero}>
            <div style={styles.container}>
              <h1 style={styles.heroTitle}>Farm-Fresh Delivered</h1>
              <p style={styles.heroSubtitle}>to Your Doorstep</p>
              <p style={styles.heroText}>Premium organic produce picked at peak freshness and delivered within 24 hours</p>
              <div style={styles.heroButtons}>
                <button style={styles.primaryBtn} onClick={() => setCurrentPage('shop')}>
                  Shop Now
                </button>
                <button style={styles.secondaryBtn}>Learn More</button>
              </div>
            </div>
          </section>

          <section style={styles.features}>
            <div style={styles.container}>
              <div style={styles.featuresGrid}>
                <div style={styles.featureCard}>
                  <div style={{...styles.featureIcon, background: '#dcfce7'}}>
                    <Leaf size={32} color="#16a34a" />
                  </div>
                  <h3 style={styles.featureTitle}>100% Organic</h3>
                  <p style={styles.featureText}>Certified organic produce from local farms</p>
                </div>
                <div style={styles.featureCard}>
                  <div style={{...styles.featureIcon, background: '#dbeafe'}}>
                    <Clock size={32} color="#2563eb" />
                  </div>
                  <h3 style={styles.featureTitle}>24hr Delivery</h3>
                  <p style={styles.featureText}>Fresh from farm to table in one day</p>
                </div>
                <div style={styles.featureCard}>
                  <div style={{...styles.featureIcon, background: '#fef3c7'}}>
                    <Award size={32} color="#d97706" />
                  </div>
                  <h3 style={styles.featureTitle}>Premium Quality</h3>
                  <p style={styles.featureText}>Hand-picked at peak ripeness</p>
                </div>
                <div style={styles.featureCard}>
                  <div style={{...styles.featureIcon, background: '#e9d5ff'}}>
                    <TrendingUp size={32} color="#9333ea" />
                  </div>
                  <h3 style={styles.featureTitle}>Best Prices</h3>
                  <p style={styles.featureText}>Direct from farmers, no middlemen</p>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.featuredSection}>
            <div style={styles.container}>
              <h2 style={styles.sectionTitle}>Featured This Week</h2>
              <p style={styles.sectionSubtitle}>Seasonal favorites picked just for you</p>
              <div style={styles.productsGrid}>
                {products.slice(0, 4).map(product => (
                  <div key={product.id} style={styles.productCard}>
                    <div style={styles.productImage}>{product.image}</div>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <p style={styles.productDesc}>{product.description}</p>
                    <div style={styles.productFooter}>
                      <span style={styles.productPrice}>${product.price}</span>
                      <button 
                        style={styles.addToCartBtn}
                        onClick={() => {
                          addToCart(product);
                          setShowCart(true);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <button style={styles.primaryBtn} onClick={() => setCurrentPage('shop')}>
                  View All Products
                </button>
              </div>
            </div>
          </section>

          <section style={styles.ctaSection}>
            <div style={styles.container}>
              <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>Ready to eat healthier?</h2>
              <p style={{fontSize: '1.25rem', marginBottom: '2rem'}}>Join thousands of happy customers enjoying fresh, organic produce</p>
              <button style={styles.ctaBtn} onClick={() => setCurrentPage('shop')}>
                Start Shopping Now
              </button>
            </div>
          </section>
        </>
      )}

      {/* Shop Page */}
      {currentPage === 'shop' && (
        <div style={styles.shopPage}>
          <div style={styles.container}>
            <h1 style={styles.pageTitle}>Our Fresh Selection</h1>
            
            <div style={styles.filterSection}>
              <div style={styles.searchWrapper}>
                <Search size={20} color="#9ca3af" style={{position: 'absolute', left: '12px', top: '12px'}} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
              <div style={styles.categoryButtons}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={selectedCategory === cat ? styles.categoryBtnActive : styles.categoryBtn}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.productsGrid}>
              {filteredProducts.map(product => (
                <div key={product.id} style={styles.productCardShop}>
                  <div style={styles.productHeader}>
                    <div style={styles.productImageLarge}>{product.image}</div>
                    <button 
                      style={styles.favoriteBtn}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart 
                        size={24} 
                        color={favorites.includes(product.id) ? '#ef4444' : '#9ca3af'}
                        fill={favorites.includes(product.id) ? '#ef4444' : 'none'}
                      />
                    </button>
                  </div>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productDesc}>{product.description}</p>
                  <div style={styles.productInfo}>
                    <div>
                      <span style={styles.productPriceLarge}>${product.price}</span>
                      <span style={styles.productUnit}>/{product.unit}</span>
                    </div>
                    <span style={styles.stockInfo}>{product.stock} in stock</span>
                  </div>
                  <button 
                    style={styles.addToCartBtnFull}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={20} />
                    <span style={{marginLeft: '8px'}}>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Page */}
      {currentPage === 'checkout' && (
        <div style={styles.checkoutPage}>
          <div style={styles.container}>
            <h1 style={styles.pageTitle}>Checkout</h1>
            
            {orderPlaced ? (
              <div style={styles.orderSuccess}>
                <div style={{fontSize: '4rem', marginBottom: '1rem'}}>✅</div>
                <h2 style={{fontSize: '2rem', color: '#16a34a', marginBottom: '1rem'}}>Order Placed Successfully!</h2>
                <p style={{fontSize: '1.25rem', color: '#6b7280', marginBottom: '1rem'}}>Your fresh produce will arrive within 24 hours</p>
                <p style={{color: '#9ca3af'}}>Order confirmation has been sent to your email</p>
              </div>
            ) : (
              <div style={styles.checkoutGrid}>
                <div style={styles.checkoutForm}>
                  <h2 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Delivery Information</h2>
                  <form onSubmit={handleCheckout}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Full Name</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                        style={styles.input}
                        placeholder="John Doe"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email</label>
                      <input
                        type="email"
                        required
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                        style={styles.input}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                        style={styles.input}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Delivery Address</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                        style={styles.input}
                        placeholder="123 Main Street, Apt 4B"
                      />
                    </div>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>City</label>
                        <input
                          type="text"
                          required
                          value={checkoutData.city}
                          onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                          style={styles.input}
                          placeholder="New York"
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={checkoutData.zipCode}
                          onChange={(e) => setCheckoutData({...checkoutData, zipCode: e.target.value})}
                          style={styles.input}
                          placeholder="10001"
                        />
                      </div>
                    </div>
                    <button type="submit" style={styles.submitBtn}>
                      Place Order - ${getTotalPrice()}
                    </button>
                  </form>
                </div>

                <div style={styles.orderSummary}>
                  <h2 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Order Summary</h2>
                  <div style={{marginBottom: '1.5rem'}}>
                    {cart.map(item => (
                      <div key={item.id} style={styles.cartItem}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <span style={{fontSize: '2rem'}}>{item.image}</span>
                          <div>
                            <p style={{fontWeight: '600'}}>{item.name}</p>
                            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span style={{fontWeight: 'bold'}}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={styles.summaryTotals}>
                    <div style={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Delivery Fee</span>
                      <span style={{color: '#16a34a', fontWeight: '600'}}>FREE</span>
                    </div>
                    <div style={{...styles.summaryRow, borderTop: '2px solid #e5e7eb', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: 'bold'}}>
                      <span>Total</span>
                      <span style={{color: '#16a34a'}}>${getTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div style={{
        ...styles.cartSidebar,
        transform: showCart ? 'translateX(0)' : 'translateX(100%)'
      }}>
        <div style={styles.cartHeader}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Your Cart ({getTotalItems()})</h2>
          <button style={styles.closeBtn} onClick={() => setShowCart(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div style={styles.cartContent}>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <ShoppingCart size={64} color="#d1d5db" />
              <p style={{color: '#6b7280', fontSize: '1.125rem', marginTop: '1rem'}}>Your cart is empty</p>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItemCard}>
                  <div style={{fontSize: '2.5rem'}}>{item.image}</div>
                  <div style={{flex: 1}}>
                    <h3 style={{fontWeight: 'bold', marginBottom: '4px'}}>{item.name}</h3>
                    <p style={{color: '#16a34a', fontWeight: '600'}}>${item.price}/{item.unit}</p>
                    <div style={styles.quantityControls}>
                      <button style={styles.quantityBtn} onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={16} />
                      </button>
                      <span style={{fontWeight: 'bold'}}>{item.quantity}</span>
                      <button style={styles.quantityBtn} onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={16} />
                      </button>
                      <button 
                        style={{...styles.iconBtn, marginLeft: 'auto', color: '#ef4444'}}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  <div style={{fontWeight: 'bold'}}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div style={styles.cartFooter}>
            <div style={styles.cartTotal}>
              <span>Total:</span>
              <span style={{color: '#16a34a'}}>${getTotalPrice()}</span>
            </div>
            <button 
              style={styles.checkoutBtn}
              onClick={() => {
                setShowCart(false);
                setCurrentPage('checkout');
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {showCart && <div style={styles.overlay} onClick={() => setShowCart(false)}></div>}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerLogo}>
                <Leaf size={28} color="white" />
                <span>FreshKeep</span>
              </div>
              <p style={styles.footerText}>
                Delivering farm-fresh organic produce to your doorstep since 2020.
              </p>
            </div>
            <div>
              <h3 style={styles.footerTitle}>Quick Links</h3>
              <ul style={styles.footerList}>
                <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
                <li><button onClick={() => setCurrentPage('shop')}>Shop</button></li>
                <li><button>About Us</button></li>
                <li><button>Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 style={styles.footerTitle}>Customer Service</h3>
              <ul style={styles.footerList}>
                <li><button>FAQ</button></li>
                <li><button>Shipping Info</button></li>
                <li><button>Returns</button></li>
                <li><button>Privacy Policy</button></li>
              </ul>
            </div>
            <div>
              <h3 style={styles.footerTitle}>Contact Us</h3>
              <ul style={styles.footerList}>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <MapPin size={16} />
                  <span>123 Farm Road, CA 90210</span>
                </li>
                <li>Email: hello@freshkeep.com</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>&copy; 2025 FreshKeep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  header: {
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    flexWrap: 'wrap' as const,
    gap: '1rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#16a34a'
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  navBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#4b5563',
    cursor: 'pointer',
    padding: '0.5rem',
    transition: 'color 0.2s'
  },
  navBtnActive: {
    color: '#16a34a'
  },
  contactBtn: {
    border: '2px solid #d1d5db',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem'
  },
  headerIcons: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'background 0.2s',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartBadge: {
    position: 'absolute' as const,
    top: '-4px',
    right: '-4px',
    background: '#16a34a',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hero: {
    background: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    color: 'white',
    padding: '5rem 0',
    textAlign: 'center' as const
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  heroSubtitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    opacity: 0.95
  },
  heroText: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  },
  primaryBtn: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    background: 'white',
    color: '#16a34a',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  secondaryBtn: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    background: '#15803d',
    color: 'white',
    border: '2px solid white',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  features: {
    padding: '4rem 0',
    background: '#f9fafb'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    transition: 'box-shadow 0.3s'
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem'
  },
  featureTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  featureText: {
    color: '#6b7280'
  },
  featuredSection: {
    padding: '4rem 0',
    background: 'white'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginBottom: '1rem'
  },
  sectionSubtitle: {
    fontSize: '1.25rem',
    color: '#6b7280',
    textAlign: 'center' as const,
    marginBottom: '3rem'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  productCard: {
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  productImage: {
    fontSize: '4rem',
    textAlign: 'center' as const,
    marginBottom: '1rem'
  },
  productName: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  productDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem'
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#16a34a'
  },
  addToCartBtn: {
    padding: '0.5rem 1rem',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  ctaSection: {
    background: 'linear-gradient(to right, #16a34a, #059669)',
    color: 'white',
    padding: '4rem 0',
    textAlign: 'center' as const
  },
  ctaBtn: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    background: 'white',
    color: '#16a34a',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  shopPage: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: '#f9fafb'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center' as const
  },
  filterSection: {
    marginBottom: '2rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchWrapper: {
    position: 'relative' as const,
    flex: '1',
    maxWidth: '400px'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outline: 'none'
  },
  categoryButtons: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const
  },
  categoryBtn: {
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#374151',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  categoryBtnActive: {
    padding: '0.75rem 1.5rem',
    background: '#16a34a',
    color: 'white',
    border: '2px solid #16a34a',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  productCardShop: {
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.5rem',
    paddingBottom: '0.5rem'
  },
  productImageLarge: {
    fontSize: '4rem',
    flex: 1
  },
  favoriteBtn: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0 1.5rem'
  },
  productPriceLarge: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#16a34a'
  },
  productUnit: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  stockInfo: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  addToCartBtnFull: {
    width: 'calc(100% - 3rem)',
    margin: '0 1.5rem 1.5rem',
    padding: '0.75rem',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkoutPage: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: '#f9fafb'
  },
  orderSuccess: {
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '3rem',
    textAlign: 'center' as const
  },
  checkoutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  checkoutForm: {
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outline: 'none'
  },
  submitBtn: {
    width: '100%',
    padding: '1rem',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background 0.2s'
  },
  orderSummary: {
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    height: 'fit-content'
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  summaryTotals: {
    borderTop: '2px solid #e5e7eb',
    paddingTop: '1rem'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    color: '#6b7280'
  },
  cartSidebar: {
    position: 'fixed' as const,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
    zIndex: 200,
    transition: 'transform 0.3s',
    display: 'flex',
    flexDirection: 'column' as const
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '2px solid #e5e7eb'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'background 0.2s'
  },
  cartContent: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '1.5rem'
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 0'
  },
  cartItemCard: {
    display: 'flex',
    gap: '1rem',
    background: '#f9fafb',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '0.5rem'
  },
  quantityBtn: {
    background: '#e5e7eb',
    border: 'none',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartFooter: {
    borderTop: '2px solid #e5e7eb',
    padding: '1.5rem'
  },
  cartTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  checkoutBtn: {
    width: '100%',
    padding: '1rem',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 150
  },
  footer: {
    background: '#1f2937',
    color: 'white',
    padding: '3rem 0'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem'
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  footerText: {
    color: '#9ca3af'
  },
  footerTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  footerList: {
    listStyle: 'none',
    padding: 0
  },
  footerBottom: {
    borderTop: '1px solid #374151',
    marginTop: '2rem',
    paddingTop: '2rem',
    textAlign: 'center' as const,
    color: '#9ca3af'
  }
};
