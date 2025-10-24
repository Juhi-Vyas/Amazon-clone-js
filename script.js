// Product class to create product objects
class Product {
    constructor(id, name, price, description, image, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock;
    }
}

// Shopping Cart class to manage cart operations
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            if (existingItem.quantity + quantity <= product.stock) {
                existingItem.quantity += quantity;
                return true;
            }
            return false;
        } else {
            if (quantity <= product.stock) {
                this.items.push({ product, quantity });
                return true;
            }
            return false;
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item && quantity <= item.product.stock) {
            item.quantity = quantity;
            return true;
        }
        return false;
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    clear() {
        this.items = [];
    }
}

// User class to manage user data
class User {
    constructor(id, name, email, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.orderHistory = [];
    }

    addOrder(order) {
        this.orderHistory.push(order);
    }
}

// Order class to handle order processing
class Order {
    constructor(user, items, total) {
        this.orderId = Math.random().toString(36).substr(2, 9);
        this.user = user;
        this.items = items;
        this.total = total;
        this.date = new Date();
        this.status = 'pending';
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
}

// Product catalog to manage available products
class ProductCatalog {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
    }

    searchProducts(query) {
        return this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    filterByPrice(minPrice, maxPrice) {
        return this.products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }
}

// Example usage
const catalog = new ProductCatalog();
const cart = new ShoppingCart();

// Add sample products
catalog.addProduct(new Product(
    '1',
    'Wireless Headphones',
    99.99,
    'High-quality wireless headphones with noise cancellation',
    'headphones.jpg',
    50
));

catalog.addProduct(new Product(
    '2',
    'Smart Watch',
    199.99,
    'Feature-rich smartwatch with health tracking',
    'smartwatch.jpg',
    30
));

// Create a user
const user = new User(
    '1',
    'John Doe',
    'john@example.com',
    '123 Main St, City, Country'
);

// Event listeners for UI interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add to cart button click handler
    function handleAddToCart(productId, quantity) {
        const product = catalog.products.find(p => p.id === productId);
        if (product) {
            const added = cart.addItem(product, quantity);
            if (added) {
                alert('Product added to cart successfully!');
                updateCartDisplay();
            } else {
                alert('Not enough stock available!');
            }
        }
    }

    // Update cart display
    function updateCartDisplay() {
        const cartTotal = cart.getTotal();
        // Update cart UI elements
        document.getElementById('cart-total').textContent = `$${cartTotal.toFixed(2)}`;
        // Update cart items display
        // ... additional UI update logic
    }

    // Checkout process
    function processCheckout() {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const order = new Order(user, [...cart.items], cart.getTotal());
        user.addOrder(order);
        cart.clear();
        updateCartDisplay();
        alert(`Order placed successfully! Order ID: ${order.orderId}`);
    }
});


