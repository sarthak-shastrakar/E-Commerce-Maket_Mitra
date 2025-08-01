    const loadingElement = document.getElementById('loading');
    const productsContainer = document.getElementById('products');
    const errorElement = document.getElementById('error');

    // 100 Dummy Products Data with Live Images
    const dummyProducts = [
        { id: 1, title: "Wireless Bluetooth Headphones", description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.", price: 89.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 2, title: "Smart Fitness Watch", description: "Advanced fitness tracker with heart rate monitor, GPS, and waterproof design.", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 3, title: "Organic Cotton T-Shirt", description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.", price: 24.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", category: "Clothing" },
        { id: 4, title: "Professional Coffee Maker", description: "Programmable coffee maker with built-in grinder and thermal carafe.", price: 149.99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 5, title: "Leather Laptop Bag", description: "Genuine leather laptop bag with multiple compartments and adjustable strap.", price: 79.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 6, title: "Wireless Phone Charger", description: "Fast wireless charging pad compatible with all Qi-enabled devices.", price: 29.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 7, title: "Yoga Mat Premium", description: "Non-slip yoga mat with extra cushioning and eco-friendly materials.", price: 39.99, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", category: "Sports" },
        { id: 8, title: "Stainless Steel Water Bottle", description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.", price: 19.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop", category: "Sports" },
        { id: 9, title: "Gaming Mechanical Keyboard", description: "RGB backlit mechanical keyboard with customizable keys and macro support.", price: 129.99, image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 10, title: "Ceramic Dinner Set", description: "Beautiful 16-piece ceramic dinner set perfect for family meals and entertaining.", price: 89.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 11, title: "Running Shoes", description: "Lightweight running shoes with advanced cushioning and breathable mesh upper.", price: 119.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", category: "Sports" },
        { id: 12, title: "Smartphone Camera Lens Kit", description: "Professional camera lens kit for smartphones including macro, wide-angle, and telephoto lenses.", price: 49.99, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 13, title: "Bamboo Cutting Board Set", description: "Eco-friendly bamboo cutting board set with different sizes for various food prep needs.", price: 34.99, image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 14, title: "Wireless Gaming Mouse", description: "High-precision wireless gaming mouse with customizable DPI and RGB lighting.", price: 69.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 15, title: "Denim Jacket", description: "Classic denim jacket with modern fit and premium quality fabric.", price: 59.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop", category: "Clothing" },
        { id: 16, title: "Essential Oil Diffuser", description: "Ultrasonic essential oil diffuser with LED lights and timer settings.", price: 44.99, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 17, title: "Portable Bluetooth Speaker", description: "Waterproof portable speaker with 360-degree sound and 20-hour battery life.", price: 79.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 18, title: "Memory Foam Pillow", description: "Ergonomic memory foam pillow with cooling gel layer for better sleep.", price: 39.99, image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 19, title: "Sunglasses Polarized", description: "Stylish polarized sunglasses with UV protection and lightweight frame.", price: 49.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 20, title: "Electric Toothbrush", description: "Rechargeable electric toothbrush with multiple cleaning modes and timer.", price: 89.99, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 21, title: "Travel Backpack", description: "Durable travel backpack with multiple compartments and laptop sleeve.", price: 69.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 22, title: "Air Purifier", description: "HEPA air purifier with smart sensors and quiet operation for clean indoor air.", price: 159.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 23, title: "Wireless Earbuds", description: "True wireless earbuds with active noise cancellation and wireless charging case.", price: 129.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 24, title: "Skincare Set", description: "Complete skincare routine set with cleanser, toner, serum, and moisturizer.", price: 79.99, image: "https://images.unsplash.com/photo-1556228578-1055907df827?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 25, title: "Smart Home Hub", description: "Voice-controlled smart home hub compatible with all major smart devices.", price: 99.99, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 26, title: "Resistance Bands Set", description: "Complete resistance bands set with different resistance levels and accessories.", price: 29.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f95609a7?w=400&h=300&fit=crop", category: "Sports" },
        { id: 27, title: "Ceramic Mug Set", description: "Beautiful handcrafted ceramic mug set perfect for coffee and tea lovers.", price: 24.99, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 28, title: "Wireless Car Charger", description: "Fast wireless car charger with automatic clamping and ventilation mount.", price: 39.99, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 29, title: "Hoodie Pullover", description: "Comfortable cotton blend hoodie with kangaroo pocket and adjustable hood.", price: 44.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop", category: "Clothing" },
        { id: 30, title: "LED Desk Lamp", description: "Adjustable LED desk lamp with multiple brightness levels and USB charging port.", price: 34.99, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 31, title: "Protein Powder", description: "Premium whey protein powder with natural flavors and 25g protein per serving.", price: 49.99, image: "https://images.unsplash.com/photo-1593095941301-dc798b83add3?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 32, title: "Tablet Stand", description: "Adjustable tablet stand with 360-degree rotation and foldable design.", price: 19.99, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 33, title: "Canvas Wall Art", description: "Modern abstract canvas wall art perfect for home and office decoration.", price: 59.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 34, title: "Bluetooth Keyboard", description: "Slim wireless keyboard with backlight and multi-device connectivity.", price: 54.99, image: "https://images.unsplash.com/photo-1587829741301-dc79c81f7e72?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 35, title: "Casual Sneakers", description: "Comfortable casual sneakers with breathable fabric and cushioned sole.", price: 79.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop", category: "Sports" },
        { id: 36, title: "Phone Case Protective", description: "Heavy-duty protective phone case with shock absorption and screen protection.", price: 24.99, image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 37, title: "Tea Infuser Set", description: "Stainless steel tea infuser set with different sizes for loose leaf tea.", price: 19.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 38, title: "Fitness Tracker", description: "Basic fitness tracker with step counter, sleep monitor, and heart rate sensor.", price: 69.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 39, title: "Scented Candles Set", description: "Luxury scented candles set with natural soy wax and essential oils.", price: 34.99, image: "https://images.unsplash.com/photo-1602874801006-2bd9c81f7e7a?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 40, title: "Wireless Mouse Pad", description: "Large wireless charging mouse pad with smooth surface and LED indicators.", price: 29.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 41, title: "Baseball Cap", description: "Adjustable baseball cap with embroidered logo and breathable fabric.", price: 19.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 42, title: "Digital Kitchen Scale", description: "Precise digital kitchen scale with tare function and multiple unit measurements.", price: 24.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 43, title: "Power Bank", description: "High-capacity power bank with fast charging and multiple USB ports.", price: 39.99, image: "https://images.unsplash.com/photo-1609592806596-4d1b5e5e6e7e?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 44, title: "Face Mask Set", description: "Hydrating face mask set with different formulas for various skin types.", price: 29.99, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 45, title: "Desk Organizer", description: "Bamboo desk organizer with multiple compartments for office supplies.", price: 34.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 46, title: "Gaming Headset", description: "Professional gaming headset with surround sound and noise-canceling microphone.", price: 89.99, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 47, title: "Slim Fit Jeans", description: "Premium slim fit jeans with stretch fabric and classic five-pocket design.", price: 69.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop", category: "Clothing" },
        { id: 48, title: "Plant Pot Set", description: "Decorative ceramic plant pot set with drainage holes and saucers.", price: 39.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 49, title: "USB Cable Set", description: "Universal USB cable set with multiple connectors and fast charging support.", price: 19.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 50, title: "Aromatherapy Shower Steamers", description: "Natural aromatherapy shower steamers with eucalyptus and lavender scents.", price: 24.99, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop", category: "Health & Beauty" },
        // Additional 50 products (51-100)
        { id: 51, title: "Wireless Charging Stand", description: "Elegant wireless charging stand with adjustable angle and fast charging capability.", price: 34.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 52, title: "Vintage Leather Wallet", description: "Handcrafted vintage leather wallet with RFID blocking and multiple card slots.", price: 45.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 53, title: "Smart LED Light Bulbs", description: "Color-changing smart LED bulbs with voice control and app connectivity.", price: 29.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 54, title: "Insulated Lunch Box", description: "Premium insulated lunch box with multiple compartments and leak-proof design.", price: 32.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 55, title: "Wireless Earphone Case", description: "Protective wireless earphone case with wireless charging and premium materials.", price: 22.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 56, title: "Ergonomic Office Chair", description: "Comfortable ergonomic office chair with lumbar support and adjustable height.", price: 189.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 57, title: "Waterproof Phone Pouch", description: "Universal waterproof phone pouch for swimming, beach, and water sports.", price: 15.99, image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 58, title: "Bluetooth Car Adapter", description: "Wireless Bluetooth car adapter with hands-free calling and music streaming.", price: 27.99, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 59, title: "Silk Pillowcase Set", description: "Luxurious silk pillowcase set for better hair and skin health during sleep.", price: 54.99, image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 60, title: "Portable Phone Stand", description: "Foldable portable phone stand with adjustable angles for desk and travel use.", price: 18.99, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 61, title: "Stainless Steel Cookware Set", description: "Professional stainless steel cookware set with non-stick coating and heat distribution.", price: 129.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 62, title: "Wireless Security Camera", description: "HD wireless security camera with night vision and motion detection alerts.", price: 89.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 63, title: "Compression Workout Leggings", description: "High-performance compression leggings with moisture-wicking fabric and support.", price: 42.99, image: "https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=400&h=300&fit=crop", category: "Sports" },
        { id: 64, title: "Essential Oil Starter Kit", description: "Complete essential oil starter kit with diffuser and 10 popular oil blends.", price: 67.99, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 65, title: "Mechanical Pencil Set", description: "Professional mechanical pencil set with different lead sizes and erasers.", price: 24.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 66, title: "Smart Thermostat", description: "Programmable smart thermostat with WiFi connectivity and energy saving features.", price: 149.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 67, title: "Bamboo Fiber Towel Set", description: "Ultra-soft bamboo fiber towel set with antibacterial properties and quick-dry.", price: 39.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 68, title: "Wireless Gaming Controller", description: "Professional wireless gaming controller with customizable buttons and RGB lighting.", price: 79.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 69, title: "Organic Face Serum", description: "Anti-aging organic face serum with vitamin C and hyaluronic acid.", price: 52.99, image: "https://images.unsplash.com/photo-1556228578-1055907df827?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 70, title: "Adjustable Laptop Stand", description: "Ergonomic adjustable laptop stand with cooling ventilation and portable design.", price: 45.99, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 71, title: "Ceramic Non-Stick Pan", description: "Professional ceramic non-stick pan with even heat distribution and easy cleanup.", price: 49.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 72, title: "Bluetooth Sleep Mask", description: "Comfortable Bluetooth sleep mask with built-in speakers for relaxing music.", price: 34.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 73, title: "Portable Projector", description: "Mini portable projector with HD resolution and wireless connectivity for presentations.", price: 199.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 74, title: "Weighted Blanket", description: "Therapeutic weighted blanket for better sleep and anxiety relief with soft fabric.", price: 79.99, image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 75, title: "Wireless Bike Computer", description: "Advanced wireless bike computer with GPS tracking and performance metrics.", price: 89.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop", category: "Sports" },
        { id: 76, title: "Minimalist Watch", description: "Elegant minimalist watch with leather strap and water-resistant design.", price: 124.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 77, title: "Smart Door Lock", description: "Keyless smart door lock with fingerprint recognition and smartphone app control.", price: 179.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 78, title: "Organic Green Tea Set", description: "Premium organic green tea set with various flavors and antioxidant benefits.", price: 32.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 79, title: "Wireless Charging Pad", description: "Fast wireless charging pad with LED indicators and universal device compatibility.", price: 26.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 80, title: "Memory Foam Bath Mat", description: "Ultra-soft memory foam bath mat with non-slip backing and quick-dry technology.", price: 28.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 81, title: "Bluetooth Shower Speaker", description: "Waterproof Bluetooth shower speaker with suction cup mount and crystal clear sound.", price: 35.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 82, title: "Resistance Loop Bands", description: "Set of resistance loop bands with different resistance levels for home workouts.", price: 19.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f95609a7?w=400&h=300&fit=crop", category: "Sports" },
        { id: 83, title: "Ceramic Coffee Grinder", description: "Manual ceramic coffee grinder with adjustable grind settings for perfect coffee.", price: 42.99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 84, title: "LED Strip Lights", description: "Color-changing LED strip lights with remote control and music sync capability.", price: 29.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 85, title: "Vitamin C Serum", description: "Brightening vitamin C serum with natural ingredients for glowing skin.", price: 38.99, image: "https://images.unsplash.com/photo-1556228578-1055907df827?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 86, title: "Portable Hard Drive", description: "High-capacity portable hard drive with USB 3.0 and compact design for data storage.", price: 89.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 87, title: "Bamboo Cutting Board", description: "Large bamboo cutting board with juice groove and antimicrobial properties.", price: 24.99, image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 88, title: "Wireless Earphone Cleaner", description: "Professional wireless earphone cleaning kit with tools and sanitizing solution.", price: 16.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 89, title: "Yoga Block Set", description: "High-density yoga block set for improved alignment and deeper stretches.", price: 22.99, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", category: "Sports" },
        { id: 90, title: "Smart Water Bottle", description: "Intelligent water bottle with hydration tracking and temperature display.", price: 54.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 91, title: "Organic Hand Cream Set", description: "Nourishing organic hand cream set with shea butter and essential oils.", price: 26.99, image: "https://images.unsplash.com/photo-1556228578-1055907df827?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 92, title: "Wireless Keyboard and Mouse", description: "Ergonomic wireless keyboard and mouse combo with long battery life.", price: 67.99, image: "https://images.unsplash.com/photo-1587829741301-dc79c81f7e72?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 93, title: "Stainless Steel Straws", description: "Reusable stainless steel straws with cleaning brush and carrying case.", price: 14.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 94, title: "Bluetooth Fitness Tracker", description: "Advanced Bluetooth fitness tracker with heart rate monitoring and sleep analysis.", price: 79.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop", category: "Sports" },
        { id: 95, title: "Aromatherapy Car Diffuser", description: "Portable aromatherapy car diffuser with essential oils and USB charging.", price: 23.99, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop", category: "Accessories" },
        { id: 96, title: "Smart Smoke Detector", description: "WiFi-enabled smart smoke detector with smartphone alerts and voice notifications.", price: 89.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 97, title: "Organic Cotton Bedsheet Set", description: "Luxurious organic cotton bedsheet set with deep pockets and wrinkle resistance.", price: 74.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", category: "Home & Kitchen" },
        { id: 98, title: "Wireless Gaming Headset", description: "Professional wireless gaming headset with 7.1 surround sound and noise cancellation.", price: 119.99, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop", category: "Electronics" },
        { id: 99, title: "Natural Lip Balm Set", description: "Organic natural lip balm set with various flavors and moisturizing ingredients.", price: 18.99, image: "https://images.unsplash.com/photo-1556228578-1055907df827?w=400&h=300&fit=crop", category: "Health & Beauty" },
        { id: 100, title: "Smart Garden Kit", description: "Automated smart garden kit for growing herbs and vegetables indoors year-round.", price: 149.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop", category: "Home & Kitchen" }
    ];

    // Function to truncate text
    function truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Function to preload image and prevent blinking
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(src);
            img.onerror = () => resolve('/placeholder.svg?height=150&width=220');
            img.src = src;
        });
    }

    // Function to create product card
    async function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Preload image to prevent blinking
        const validImageUrl = await loadImage(product.image);

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${validImageUrl}" alt="${product.title}" style="opacity: 0; transition: opacity 0.4s ease;" />
                <div class="product-badge">${product.category}</div>
            </div>
            <div class="product-content">
                <div class="product-title">${truncateText(product.title, 400)}</div>
                <div class="product-description">${truncateText(product.description, 600)}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;

        // Smooth image fade-in after card is added to DOM
        setTimeout(() => {
            const img = productCard.querySelector('img');
            if (img) {
                img.style.opacity = '1';
            }
        }, 150);

        return productCard;
    }

    // Load and display products
    async function loadProducts() {
        // Simulate loading time
        setTimeout(async () => {
            loadingElement.style.display = 'none';
            productsContainer.style.display = 'grid';

            // Create cards for all 100 products
            for (let i = 0; i < dummyProducts.length; i++) {
                const product = dummyProducts[i];
                try {
                    const productCard = await createProductCard(product);
                    productsContainer.appendChild(productCard);
                    
                    // Update progress
                    updateLoadingProgress(i + 1);
                    
                    // Add small delay between cards for smooth loading
                    await new Promise(resolve => setTimeout(resolve, 20));
                } catch (error) {
                    console.error('Error creating product card:', error);
                }
            }
        }, 800);
    }

    // Enhanced add to cart function
    function addToCart(productId) {
        const product = dummyProducts.find(p => p.id === productId);
        
        // Create a more elegant notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 1000;
            font-weight: 600;
            font-size: 0.9rem;
            transform: translateX(300px);
            transition: transform 0.4s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        `;
        notification.textContent = `${product ? truncateText(product.title, 20) : 'Product'} added to cart!`;
        
        document.body.appendChild(notification);
        
        // Slide in notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 3000);
    }

    // Add loading progress indicator
    let loadedProducts = 0;
    const totalProducts = 100;

    function updateLoadingProgress(loaded) {
        loadedProducts = loaded;
        const progress = (loadedProducts / totalProducts) * 100;
        
        // Update loading text with progress
        const progressText = loadingElement.querySelector('.loading-text');
        if (progressText && loadingElement.style.display !== 'none') {
            progressText.textContent = `Loading premium products... ${Math.round(progress)}%`;
        }
    }

    // Start loading products when page loads
    window.addEventListener('load', loadProducts)