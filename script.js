// ========================================
// WATCH E-COMMERCE APPLICATION
// Master Level Implementation
// ========================================

class WatchStore {
    constructor() {
        this.products = this.generateProducts();
        this.filteredProducts = [...this.products];
        this.cart = [];
        this.wishlist = [];
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.filters = {
            priceRange: [0, 500000],
            brands: [],
            movements: []
        };
        
        this.init();
    }

    // ========================================
    // DATA GENERATION
    // ========================================
    generateProducts() {
        const categories = ['Luxury', 'Sport', 'Chronograph', 'Dress', 'Smart', 'Vintage'];
        const brands = ['Rolex', 'Omega', 'TAG Heuer', 'Breitling', 'Cartier', 'IWC', 'Patek Philippe', 'Audemars Piguet'];
        const movements = ['Automatic', 'Manual', 'Quartz', 'Digital'];
        
        const watchModels = {
            'Luxury': ['Royal', 'Prestige', 'Grand', 'Elite', 'Premier'],
            'Sport': ['Diver', 'Racer', 'Explorer', 'Navigator', 'Speedmaster'],
            'Chronograph': ['Chrono', 'Tachymeter', 'Flyback', 'Split-Second', 'Moonphase'],
            'Dress': ['Classic', 'Elegance', 'Refined', 'Heritage', 'Tradition'],
            'Smart': ['Connect', 'Digital', 'Tech', 'Fusion', 'Hybrid'],
            'Vintage': ['Retro', 'Heritage', 'Classic', 'Antique', 'Timeless']
        };

        const products = [];
        let id = 1;

        // Generate 100 products
        for (let i = 0; i < 100; i++) {
            const category = categories[i % categories.length];
            const brand = brands[Math.floor(Math.random() * brands.length)];
            const movement = movements[Math.floor(Math.random() * movements.length)];
            const model = watchModels[category][Math.floor(Math.random() * watchModels[category].length)];
            
            // Generate realistic prices based on category
            let basePrice;
            switch(category) {
                case 'Luxury': basePrice = Math.floor(Math.random() * 300000) + 150000; break;
                case 'Sport': basePrice = Math.floor(Math.random() * 100000) + 50000; break;
                case 'Chronograph': basePrice = Math.floor(Math.random() * 150000) + 75000; break;
                case 'Dress': basePrice = Math.floor(Math.random() * 80000) + 40000; break;
                case 'Smart': basePrice = Math.floor(Math.random() * 50000) + 25000; break;
                case 'Vintage': basePrice = Math.floor(Math.random() * 200000) + 100000; break;
                default: basePrice = 50000;
            }

            products.push({
                id: id++,
                name: `${brand} ${model}`,
                category: category,
                brand: brand,
                price: basePrice,
                movement: movement,
                image: this.getWatchImage(category, i),
                description: this.getDescription(category, brand, model),
                features: this.getFeatures(category, movement),
                isNew: Math.random() > 0.7,
                stock: Math.floor(Math.random() * 20) + 1
            });
        }

        return products;
    }

    getWatchImage(category, index) {
        // Using Unsplash with specific watch images
        const watchImages = [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
            'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e',
            'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6',
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
            'https://images.unsplash.com/photo-1622434641406-a158123450f9',
            'https://images.unsplash.com/photo-1611485988300-b7530defb8e2',
            'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7',
            'https://images.unsplash.com/photo-1539874754764-5a96559165b0',
            'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5',
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8'
        ];
        
        const imageIndex = index % watchImages.length;
        return `${watchImages[imageIndex]}?w=600&h=600&fit=crop&auto=format&q=80&sig=${index}`;
    }

    getDescription(category, brand, model) {
        const descriptions = {
            'Luxury': `Exquisite ${brand} ${model} timepiece featuring premium materials and exceptional craftsmanship. A symbol of status and refinement.`,
            'Sport': `Rugged ${brand} ${model} designed for adventure. Water-resistant with enhanced durability for active lifestyles.`,
            'Chronograph': `Precision ${brand} ${model} with advanced timing complications. Perfect for professionals who demand accuracy.`,
            'Dress': `Elegant ${brand} ${model} with timeless design. The perfect accessory for formal occasions and business meetings.`,
            'Smart': `Connected ${brand} ${model} combining traditional watchmaking with modern technology. Stay connected in style.`,
            'Vintage': `Classic ${brand} ${model} with heritage design. A collector's piece that celebrates horological history.`
        };
        
        return descriptions[category] || 'Premium timepiece with exceptional quality.';
    }

    getFeatures(category, movement) {
        const baseFeatures = [
            `${movement} Movement`,
            'Sapphire Crystal Glass',
            'Stainless Steel Case',
            '2 Year International Warranty'
        ];

        const categoryFeatures = {
            'Luxury': ['18K Gold Accents', 'Hand-Finished Dial', 'Alligator Leather Strap'],
            'Sport': ['200m Water Resistance', 'Luminous Hands', 'Unidirectional Bezel'],
            'Chronograph': ['Tachymeter Scale', 'Date Display', 'Sub-Dials'],
            'Dress': ['Ultra-Thin Case', 'Roman Numerals', 'Exhibition Case Back'],
            'Smart': ['Heart Rate Monitor', 'GPS Tracking', 'Wireless Charging'],
            'Vintage': ['Domed Crystal', 'Manual Winding', 'Aged Patina Dial']
        };

        return [...baseFeatures, ...(categoryFeatures[category] || [])];
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderProducts();
        this.populateFilters();
        this.updateUI();
    }

    cacheDOM() {
        // Search
        this.searchInput = document.getElementById('searchInput');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        
        // Navigation
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.cartBtn = document.getElementById('cartBtn');
        this.wishlistBtn = document.getElementById('wishlistBtn');
        
        // Toolbar
        this.sortSelect = document.getElementById('sortSelect');
        this.filterToggle = document.getElementById('filterToggle');
        this.viewBtns = document.querySelectorAll('.view-btn');
        this.collectionTitle = document.getElementById('collectionTitle');
        this.productCount = document.getElementById('productCount');
        
        // Filter Panel
        this.filterPanel = document.getElementById('filterPanel');
        this.closeFilters = document.getElementById('closeFilters');
        this.minPriceInput = document.getElementById('minPrice');
        this.maxPriceInput = document.getElementById('maxPrice');
        this.priceRange = document.getElementById('priceRange');
        this.maxPriceLabel = document.getElementById('maxPriceLabel');
        this.brandFilters = document.getElementById('brandFilters');
        this.movementFilters = document.getElementById('movementFilters');
        this.resetFilters = document.getElementById('resetFilters');
        
        // Products
        this.productsGrid = document.getElementById('productsGrid');
        this.noResults = document.getElementById('noResults');
        
        // Cart
        this.cartSidebar = document.getElementById('cartSidebar');
        this.closeCart = document.getElementById('closeCart');
        this.cartItems = document.getElementById('cartItems');
        this.cartCount = document.getElementById('cartCount');
        this.cartItemCount = document.getElementById('cartItemCount');
        this.cartTotal = document.getElementById('cartTotal');
        this.checkoutBtn = document.getElementById('checkoutBtn');
        this.wishlistCount = document.getElementById('wishlistCount');
        
        // Modal
        this.modal = document.getElementById('quickViewModal');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.closeModal = document.getElementById('closeModal');
        this.modalBody = document.getElementById('modalBody');
        
        // Toast
        this.toastContainer = document.getElementById('toastContainer');
        
        // Loading
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    bindEvents() {
        // Search
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Categories
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryChange(e.target.dataset.category));
        });
        
        // Sort
        this.sortSelect.addEventListener('change', (e) => this.handleSort(e.target.value));
        
        // View Toggle
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e.target.dataset.view));
        });
        
        // Filters
        this.filterToggle.addEventListener('click', () => this.toggleFilterPanel());
        this.closeFilters.addEventListener('click', () => this.toggleFilterPanel());
        this.priceRange.addEventListener('input', (e) => this.handlePriceChange(e.target.value));
        this.minPriceInput.addEventListener('change', () => this.applyFilters());
        this.maxPriceInput.addEventListener('change', () => this.applyFilters());
        this.resetFilters.addEventListener('click', () => this.resetAllFilters());
        
        // Cart
        this.cartBtn.addEventListener('click', () => this.toggleCart());
        this.closeCart.addEventListener('click', () => this.toggleCart());
        this.checkoutBtn.addEventListener('click', () => this.handleCheckout());
        
        // Wishlist
        this.wishlistBtn.addEventListener('click', () => this.showWishlist());
        
        // Modal
        this.closeModal.addEventListener('click', () => this.closeQuickView());
        this.modalOverlay.addEventListener('click', () => this.closeQuickView());
        
        // Close panels on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.filterPanel.classList.remove('active');
                this.cartSidebar.classList.remove('active');
                this.modal.classList.remove('active');
                this.searchSuggestions.classList.remove('active');
            }
        });
    }

    // ========================================
    // SEARCH FUNCTIONALITY
    // ========================================
    handleSearch(query) {
        if (query.length === 0) {
            this.searchSuggestions.classList.remove('active');
            this.filteredProducts = this.products;
            this.applyFilters();
            return;
        }

        if (query.length < 2) return;

        const searchResults = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        );

        this.showSearchSuggestions(searchResults.slice(0, 5));
        this.filteredProducts = searchResults;
        this.applyFilters();
    }

    showSearchSuggestions(results) {
        if (results.length === 0) {
            this.searchSuggestions.classList.remove('active');
            return;
        }

        this.searchSuggestions.innerHTML = results.map(product => `
            <div class="suggestion-item" onclick="watchStore.selectProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <div style="font-weight: 600; font-size: 14px;">${product.name}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">${product.category} • ₹${this.formatPrice(product.price)}</div>
                </div>
            </div>
        `).join('');

        this.searchSuggestions.classList.add('active');
    }

    selectProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            this.showQuickView(product);
            this.searchSuggestions.classList.remove('active');
            this.searchInput.value = '';
        }
    }

    // ========================================
    // CATEGORY & FILTERING
    // ========================================
    handleCategoryChange(category) {
        this.currentCategory = category;
        
        // Update UI
        this.categoryBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter products
        if (category === 'all') {
            this.filteredProducts = [...this.products];
            this.collectionTitle.textContent = 'All Watches';
        } else {
            this.filteredProducts = this.products.filter(p => p.category === category);
            this.collectionTitle.textContent = `${category} Watches`;
        }
        
        this.applyFilters();
    }

    populateFilters() {
        // Brand filters
        const brands = [...new Set(this.products.map(p => p.brand))].sort();
        this.brandFilters.innerHTML = brands.map(brand => `
            <div class="filter-option">
                <input type="checkbox" id="brand-${brand}" value="${brand}" onchange="watchStore.handleBrandFilter('${brand}', this.checked)">
                <label for="brand-${brand}">${brand}</label>
            </div>
        `).join('');

        // Movement filters
        const movements = [...new Set(this.products.map(p => p.movement))].sort();
        this.movementFilters.innerHTML = movements.map(movement => `
            <div class="filter-option">
                <input type="checkbox" id="movement-${movement}" value="${movement}" onchange="watchStore.handleMovementFilter('${movement}', this.checked)">
                <label for="movement-${movement}">${movement}</label>
            </div>
        `).join('');
    }

    handleBrandFilter(brand, checked) {
        if (checked) {
            this.filters.brands.push(brand);
        } else {
            this.filters.brands = this.filters.brands.filter(b => b !== brand);
        }
        this.applyFilters();
    }

    handleMovementFilter(movement, checked) {
        if (checked) {
            this.filters.movements.push(movement);
        } else {
            this.filters.movements = this.filters.movements.filter(m => m !== movement);
        }
        this.applyFilters();
    }

    handlePriceChange(value) {
        this.maxPriceInput.value = value;
        this.maxPriceLabel.textContent = `₹${this.formatPrice(value)}`;
        this.filters.priceRange[1] = parseInt(value);
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.filteredProducts];

        // Price filter
        filtered = filtered.filter(p => 
            p.price >= this.filters.priceRange[0] && 
            p.price <= this.filters.priceRange[1]
        );

        // Brand filter
        if (this.filters.brands.length > 0) {
            filtered = filtered.filter(p => this.filters.brands.includes(p.brand));
        }

        // Movement filter
        if (this.filters.movements.length > 0) {
            filtered = filtered.filter(p => this.filters.movements.includes(p.movement));
        }

        this.renderProducts(filtered);
    }

    resetAllFilters() {
        // Reset price
        this.minPriceInput.value = 0;
        this.maxPriceInput.value = 500000;
        this.priceRange.value = 500000;
        this.maxPriceLabel.textContent = '₹5,00,000';
        this.filters.priceRange = [0, 500000];

        // Reset checkboxes
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => cb.checked = false);
        this.filters.brands = [];
        this.filters.movements = [];

        this.applyFilters();
        this.showToast('Filters reset', 'success');
    }

    toggleFilterPanel() {
        this.filterPanel.classList.toggle('active');
    }

    // ========================================
    // SORTING
    // ========================================
    handleSort(sortType) {
        let sorted = [...this.filteredProducts];

        switch(sortType) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'newest':
                sorted = sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew));
                break;
        }

        this.renderProducts(sorted);
    }

    // ========================================
    // VIEW TOGGLE
    // ========================================
    handleViewChange(view) {
        this.currentView = view;
        this.viewBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        if (view === 'list') {
            this.productsGrid.classList.add('list-view');
            document.querySelectorAll('.product-card').forEach(card => card.classList.add('list-view'));
        } else {
            this.productsGrid.classList.remove('list-view');
            document.querySelectorAll('.product-card').forEach(card => card.classList.remove('list-view'));
        }
    }

    // ========================================
    // PRODUCT RENDERING
    // ========================================
    renderProducts(products = this.filteredProducts) {
        this.productCount.textContent = `${products.length} Products`;

        if (products.length === 0) {
            this.productsGrid.innerHTML = '';
            this.noResults.style.display = 'block';
            return;
        }

        this.noResults.style.display = 'none';

        const isInWishlist = (id) => this.wishlist.some(item => item.id === id);

        this.productsGrid.innerHTML = products.map(product => `
            <div class="product-card ${this.currentView === 'list' ? 'list-view' : ''}">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    ${product.isNew ? '<span class="product-badge">New</span>' : ''}
                    <button class="wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}" onclick="watchStore.toggleWishlist(${product.id})">
                        <svg width="20" height="20" fill="${isInWishlist(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                    <button class="quick-view-btn" onclick="watchStore.showQuickView(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        Quick View
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-specs">${product.movement} Movement • ${product.brand}</div>
                    <div class="product-price">₹${this.formatPrice(product.price)}</div>
                    <button class="add-to-cart-btn" onclick="watchStore.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // ========================================
    // CART FUNCTIONALITY
    // ========================================
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
                this.showToast(`${product.name} quantity updated`, 'success');
            } else {
                this.showToast('Maximum stock reached', 'error');
                return;
            }
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
            this.showToast(`${product.name} added to cart`, 'success');
        }

        this.updateCart();
        this.updateUI();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
        this.updateUI();
        this.showToast('Item removed from cart', 'success');
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(i => i.id === productId);
        if (!item) return;

        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        if (newQuantity > item.stock) {
            this.showToast('Maximum stock reached', 'error');
            return;
        }

        item.quantity = newQuantity;
        this.updateCart();
        this.updateUI();
    }

    updateCart() {
        if (this.cart.length === 0) {
            this.cartItems.innerHTML = `
                <div class="empty-cart">
                    <svg width="60" height="60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <p>Your cart is empty</p>
                </div>
            `;
            this.checkoutBtn.disabled = true;
        } else {
            this.cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category}</div>
                        <div class="cart-item-price">₹${this.formatPrice(item.price)}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="watchStore.updateQuantity(${item.id}, -1)">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn" onclick="watchStore.updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="remove-item" onclick="watchStore.removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
            this.checkoutBtn.disabled = false;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.textContent = `₹${this.formatPrice(total)}`;
    }

    toggleCart() {
        this.cartSidebar.classList.toggle('active');
    }

    handleCheckout() {
        if (this.cart.length === 0) return;
        
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showToast(`Order placed successfully! Total: ₹${this.formatPrice(this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}`, 'success');
            this.cart = [];
            this.updateCart();
            this.updateUI();
            this.toggleCart();
        }, 1500);
    }

    // ========================================
    // WISHLIST FUNCTIONALITY
    // ========================================
    toggleWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const index = this.wishlist.findIndex(item => item.id === productId);
        
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showToast(`${product.name} removed from wishlist`, 'success');
        } else {
            this.wishlist.push(product);
            this.showToast(`${product.name} added to wishlist`, 'success');
        }

        this.updateUI();
        this.renderProducts();
    }

    showWishlist() {
        if (this.wishlist.length === 0) {
            this.showToast('Your wishlist is empty', 'error');
            return;
        }

        this.filteredProducts = [...this.wishlist];
        this.collectionTitle.textContent = 'My Wishlist';
        this.renderProducts();
        this.showToast(`Showing ${this.wishlist.length} wishlist items`, 'success');
    }

    // ========================================
    // QUICK VIEW MODAL
    // ========================================
    showQuickView(product) {
        // Handle both object and JSON string
        const productData = typeof product === 'string' ? JSON.parse(product) : product;
        
        const isInWishlist = this.wishlist.some(item => item.id === productData.id);

        this.modalBody.innerHTML = `
            <div class="modal-product">
                <div>
                    <img src="${productData.image}" alt="${productData.name}" class="modal-image">
                </div>
                <div class="modal-details">
                    <div class="product-category">${productData.category}</div>
                    <h2>${productData.name}</h2>
                    <div class="product-price">₹${this.formatPrice(productData.price)}</div>
                    <p class="modal-description">${productData.description}</p>
                    
                    <div class="product-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${productData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button class="add-to-cart-btn" style="flex: 1;" onclick="watchStore.addToCart(${productData.id}); watchStore.closeQuickView();">
                            Add to Cart
                        </button>
                        <button class="icon-btn ${isInWishlist ? 'active' : ''}" onclick="watchStore.toggleWishlist(${productData.id}); watchStore.showQuickView(${JSON.stringify(productData).replace(/"/g, '&quot;')});">
                            <svg width="24" height="24" fill="${isInWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.modal.classList.add('active');
    }

    closeQuickView() {
        this.modal.classList.remove('active');
    }

    // ========================================
    // UI UPDATES
    // ========================================
    updateUI() {
        this.cartCount.textContent = this.cart.length;
        this.cartItemCount.textContent = this.cart.length;
        this.wishlistCount.textContent = this.wishlist.length;
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    formatPrice(price) {
        return new Intl.NumberFormat('en-IN').format(price);
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' 
            ? '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
            : '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;

        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastSlideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }
}

// ========================================
// INITIALIZE APPLICATION
// ========================================
let watchStore;

document.addEventListener('DOMContentLoaded', () => {
    watchStore = new WatchStore();
    console.log('🎉 ChronoLux Watch Store Initialized');
    console.log(`📦 ${watchStore.products.length} premium timepieces loaded`);
});