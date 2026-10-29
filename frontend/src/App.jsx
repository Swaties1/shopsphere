
import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 49.99,
    emoji: '🎧',
    color: '#e0e7ff',
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 79.99,
    emoji: '⌚',
    color: '#dcfce7',
  },
  {
    id: 3,
    name: 'Everyday Backpack',
    category: 'Accessories',
    price: 34.99,
    emoji: '🎒',
    color: '#fef3c7',
  },
  {
    id: 4,
    name: 'Coffee Mug',
    category: 'Home',
    price: 12.99,
    emoji: '☕',
    color: '#fce7f3',
  },
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Calculate the total number of items in the cart.
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // Calculate the total price of all items.
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Add a product or increase its quantity.
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  // Remove a product completely from the cart.
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
  }

  // Decrease quantity or remove the product if quantity is one.
  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <a className="logo" href="#home">
          ShopSphere
        </a>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="cart-button"
          type="button"
          onClick={() => setIsCartOpen((open) => !open)}
          aria-expanded={isCartOpen}
          aria-controls="shopping-cart"
        >
          Cart ({cartCount})
        </button>
      </header>

      {/* Shopping cart panel */}
      {isCartOpen && (
        <section
          className="cart-panel"
          id="shopping-cart"
          aria-label="Shopping cart"
        >
          <div className="cart-heading">
            <h2>Your Shopping Cart</h2>

            <button
              type="button"
              className="close-cart"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close shopping cart"
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>

                    <p>
                      €{item.price.toFixed(2)} × {item.quantity}
                    </p>

                    <p className="item-subtotal">
                      Subtotal: €
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <span>Total</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="checkout-button"
                onClick={() =>
                  window.alert(
                    'Checkout will be implemented in a later step.'
                  )
                }
              >
                Proceed to checkout
              </button>
            </>
          )}
        </section>
      )}

      <main>
        {/* Homepage hero */}
        <section className="hero" id="home">
          <p className="eyebrow">WELCOME TO SHOPSPHERE</p>

          <h1>Shopping made simple.</h1>

          <p>
            Discover everyday essentials and find something
            you will love.
          </p>

          <a className="shop-button" href="#products">
            Explore products
          </a>
        </section>

        {/* Product catalogue */}
        <section className="products" id="products">
          <h2>Featured products</h2>

          <p className="section-description">
            Discover our popular everyday essentials.
          </p>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-image"
                  style={{ backgroundColor: product.color }}
                >
                  <span role="img" aria-label={product.name}>
                    {product.emoji}
                  </span>
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <span className="product-price">
                      €{product.price.toFixed(2)}
                    </span>

                    <button
                      className="add-button"
                      type="button"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={() => addToCart(product)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About section */}
        <section className="about" id="about">
          <h2>About ShopSphere</h2>

          <p>
            A modern shopping experience built with reliable
            software and quality in mind.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer>
        © {new Date().getFullYear()} ShopSphere
      </footer>
    </div>
  )
}

export default App
