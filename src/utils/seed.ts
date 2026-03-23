import { Shop, Product, Coupon } from '../models';

const shopsData = [
  {
    name: 'Burger King',
    description: 'Famous flame-grilled burgers since 1954',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    category: 'Burgers'
  },
  {
    name: "McDonald's",
    description: 'Golden arches, happy meals for the whole family',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Burgers'
  },
  {
    name: 'Pizza Hut',
    description: 'Authentic Italian pizza with fresh ingredients',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    category: 'Pizza'
  },
  {
    name: 'Sushi Master',
    description: 'Premium Japanese cuisine and fresh sushi',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    category: 'Sushi'
  },
  {
    name: 'Starbucks',
    description: 'World\'s premier coffeehouse chain',
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    category: 'Coffee'
  },
  {
    name: 'Taco Bell',
    description: 'Mexican-inspired fast food chain',
    rating: 3.9,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    category: 'Mexican'
  },
  {
    name: 'KFC',
    description: 'Finger lickin\' good fried chicken',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
    category: 'Chicken'
  },
  {
    name: 'Subway',
    description: 'Fresh sandwiches made to order',
    rating: 3.9,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400',
    category: 'Sandwiches'
  },
  {
    name: "Domino's Pizza",
    description: 'Hot pizza delivered to your door',
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
    category: 'Pizza'
  },
  {
    name: 'Wendy\'s',
    description: 'Fresh never frozen beef burgers',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Burgers'
  },
  {
    name: 'Five Guys',
    description: 'Cajun seasoned fries and hand-formed burgers',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
    category: 'Burgers'
  },
  {
    name: 'Chipotle',
    description: 'Mexican grill with fresh ingredients',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    category: 'Mexican'
  },
  {
    name: 'Popeyes',
    description: 'Louisiana-style fried chicken',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
    category: 'Chicken'
  },
  {
    name: 'Dunkin\' Donuts',
    description: 'Coffee and donuts run on it',
    rating: 3.8,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',
    category: 'Coffee'
  },
  {
    name: 'Panda Express',
    description: 'American Chinese fast food',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
    category: 'Asian'
  },
  {
    name: 'Papa Johns',
    description: 'Better ingredients, better pizza',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    category: 'Pizza'
  },
  {
    name: 'Little Caesars',
    description: 'Hot-N-Ready pizza for carryout',
    rating: 3.7,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    category: 'Pizza'
  },
  {
    name: 'Arby\'s',
    description: 'We have the meats!',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
    category: 'Sandwiches'
  }
];

const productsData: Record<string, Array<{ name: string; description: string; price: number; category: string; image: string }>> = {
  'Burger King': [
    { name: 'Whopper', description: 'Flame-grilled beef patty with fresh toppings', price: 8.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300' },
    { name: 'Chicken Whopper', description: 'Grilled chicken with crispy lettuce', price: 7.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
    { name: 'Onion Rings', description: 'Crispy golden onion rings', price: 3.49, category: 'Sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300' },
    { name: 'Fries', description: 'Golden crispy fries', price: 2.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' }
  ],
  "McDonald's": [
    { name: 'Big Mac', description: 'Two all-beef patties special sauce', price: 7.49, category: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300' },
    { name: 'McChicken', description: 'Crispy chicken sandwich', price: 5.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300' },
    { name: 'McFlurry Oreo', description: 'Creamy soft serve with Oreo', price: 4.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300' },
    { name: 'Coca-Cola', description: 'Refreshing soft drink', price: 2.49, category: 'Drinks', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300' }
  ],
  'Pizza Hut': [
    { name: 'Pepperoni Pizza', description: 'Classic pepperoni with mozzarella', price: 14.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
    { name: 'Margherita Pizza', description: 'Fresh tomatoes mozzarella basil', price: 12.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
    { name: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 4.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?w=300' },
    { name: 'Caesar Salad', description: 'Fresh romaine with caesar dressing', price: 6.99, category: 'Salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300' }
  ],
  'Sushi Master': [
    { name: 'Salmon Nigiri', description: 'Fresh salmon on seasoned rice', price: 6.99, category: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300' },
    { name: 'Dragon Roll', description: 'Eel cucumber topped with avocado', price: 14.99, category: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300' },
    { name: 'Miso Soup', description: 'Traditional Japanese soup', price: 3.99, category: 'Soups', image: 'https://images.unsplash.com/photo-1560677809-e6d1b0d3ef43?w=300' },
    { name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 4.99, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300' }
  ],
  'Starbucks': [
    { name: 'Caramel Frappuccino', description: 'Blended coffee with caramel', price: 5.95, category: 'Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300' },
    { name: 'Caffe Latte', description: 'Espresso with steamed milk', price: 4.95, category: 'Coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300' },
    { name: 'Blueberry Muffin', description: 'Fresh baked with blueberries', price: 3.95, category: 'Desserts', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300' },
    { name: 'Iced Americano', description: 'Espresso with cold water over ice', price: 3.95, category: 'Coffee', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300' }
  ],
  'Taco Bell': [
    { name: 'Crunchy Taco', description: 'Seasoned beef in crispy shell', price: 2.99, category: 'Tacos', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' },
    { name: 'Burrito Supreme', description: 'Loaded burrito with all toppings', price: 6.99, category: 'Burritos', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' },
    { name: 'Nachos Supreme', description: 'Cheese nachos with toppings', price: 5.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300' },
    { name: 'Mexican Pizza', description: 'Crispy pizza with Mexican flavors', price: 5.49, category: 'Pizza', image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300' }
  ],
  'KFC': [
    { name: 'Original Recipe Chicken', description: '11 herbs and spices', price: 8.99, category: 'Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300' },
    { name: 'Zinger Box', description: 'Spicy chicken with sides', price: 11.99, category: 'Chicken', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300' },
    { name: 'Mashed Potatoes', description: 'Creamy mashed with gravy', price: 3.49, category: 'Sides', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300' },
    { name: 'Coleslaw', description: 'Creamy cabbage slaw', price: 2.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1625938145744-533e82e83f15?w=300' }
  ],
  'Subway': [
    { name: 'Italian BMT', description: 'Salami pepperoni ham', price: 7.99, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300' },
    { name: 'Turkey Sub', description: 'Lean turkey breast', price: 7.49, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=300' },
    { name: 'Cookies', description: 'Fresh baked chocolate chip', price: 2.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300' },
    { name: 'Chipotle Sauce', description: 'Spicy chipotle sauce', price: 0.50, category: 'Extras', image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=300' }
  ],
  "Domino's Pizza": [
    { name: 'Cheese Pizza', description: 'Classic cheese pizza', price: 12.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300' },
    { name: 'Meat Lovers Pizza', description: 'Pepperoni sausage ham bacon', price: 17.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
    { name: 'Garlic Dipping Sauce', description: 'Perfect for pizza', price: 1.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?w=300' },
    { name: 'Buffalo Chicken Kickers', description: 'Spicy buffalo wings', price: 7.99, category: 'Chicken', image: 'https://images.unsplash.com/photo-1608039829572-26d7db5cf68f?w=300' }
  ],
  "Wendy's": [
    { name: 'Dave\'s Double', description: 'Two fresh beef patties', price: 7.79, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
    { name: 'Spicy Chicken Sandwich', description: 'Crispy spicy chicken fillet', price: 5.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300' },
    { name: 'Frosty', description: 'Chocolate or vanilla frosty', price: 2.89, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300' },
    { name: 'Baconator', description: 'Double beef with bacon', price: 8.49, category: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300' }
  ],
  'Five Guys': [
    { name: 'Little Burger', description: 'Single patty burger', price: 6.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300' },
    { name: 'Cajun Fries', description: 'Seasoned with cajun spices', price: 3.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' },
    { name: 'Bacon Cheese Dog', description: 'Hot dog with bacon and cheese', price: 5.99, category: 'Hot Dogs', image: 'https://images.unsplash.com/photo-1612392062126-30cc122d5284?w=300' },
    { name: 'Milkshake', description: 'Hand-spun vanilla chocolate or strawberry', price: 4.99, category: 'Drinks', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' }
  ],
  'Chipotle': [
    { name: 'Burrito Bowl', description: 'Rice beans meat salsa cheese', price: 11.25, category: 'Mexican', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' },
    { name: 'Chicken Tacos', description: 'Three tacos with chicken', price: 10.25, category: 'Tacos', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' },
    { name: 'Chips and Guacamole', description: 'Fresh made guacamole', price: 3.75, category: 'Sides', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300' },
    { name: 'Sofrita Burrito', description: 'Burrito with sofritas', price: 11.25, category: 'Mexican', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' }
  ],
  'Popeyes': [
    { name: 'Spicy Chicken Sandwich', description: 'Cajun spiced crispy chicken', price: 7.99, category: 'Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300' },
    { name: '8 Piece Chicken Tenders', description: 'Hand-breaded chicken tenders', price: 9.99, category: 'Chicken', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300' },
    { name: 'Cajun Fries', description: 'Seasoned curly fries', price: 2.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' },
    { name: 'Biscuit', description: 'Buttery flaky biscuit', price: 1.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300' }
  ],
  "Dunkin' Donuts": [
    { name: 'Boston Kreme Donut', description: 'Filled with Boston cream', price: 1.99, category: 'Donuts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300' },
    { name: 'Iced Latte', description: 'Espresso with cold milk', price: 4.49, category: 'Coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300' },
    { name: 'Breakfast Sandwich', description: 'Egg cheese and bacon on bagel', price: 4.99, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=300' },
    { name: 'Hash Browns', description: 'Crispy potato hash browns', price: 2.49, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' }
  ],
  'Panda Express': [
    { name: 'Orange Chicken', description: 'Crispy chicken in sweet orange sauce', price: 10.20, category: 'Asian', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300' },
    { name: 'Beijing Beef', description: 'Crispy beef with vegetables', price: 10.20, category: 'Asian', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300' },
    { name: 'Chow Mein', description: 'Stir-fried noodles with vegetables', price: 7.40, category: 'Noodles', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300' },
    { name: 'Fried Rice', description: 'Steamed rice with egg and vegetables', price: 7.40, category: 'Rice', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' }
  ],
  'Papa Johns': [
    { name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza', price: 13.00, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
    { name: 'The Works Pizza', description: 'Pepperoni sausage mushrooms peppers', price: 15.00, category: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
    { name: 'Garlic Parmesan Wings', description: 'Crispy wings with garlic sauce', price: 9.00, category: 'Chicken', image: 'https://images.unsplash.com/photo-1608039829572-26d7db5cf68f?w=300' },
    { name: 'CinnaStix', description: 'Cinnamon sugar breadsticks', price: 5.00, category: 'Desserts', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300' }
  ],
  'Little Caesars': [
    { name: 'Pepperoni Pizza', description: 'Hot-N-Ready pepperoni pizza', price: 8.00, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300' },
    { name: 'Crazy Bread', description: 'Breadsticks with garlic butter', price: 3.50, category: 'Sides', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?w=300' },
    { name: 'Cheese Pizza', description: 'Classic cheese pizza', price: 7.00, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
    { name: 'Italian Cheese Bread', description: 'Breadsticks with cheese', price: 4.50, category: 'Sides', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?w=300' }
  ],
  "Arby's": [
    { name: 'Roast Beef Classic', description: 'Slow-roasted beef sandwich', price: 6.99, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300' },
    { name: 'Classic Turkey Sandwich', description: 'Sliced turkey with fixings', price: 6.49, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=300' },
    { name: 'Mozzarella Moons', description: 'Fried cheese sticks', price: 4.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300' },
    { name: 'Jalapeno Bites', description: 'Crispy jalapeno poppers', price: 4.99, category: 'Sides', image: 'https://images.unsplash.com/photo-1608039829572-26d7db5cf68f?w=300' }
  ]
};

const couponsData = [
  {
    code: 'SAVE10',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderAmount: 20,
    maxUses: 500,
    isActive: true
  },
  {
    code: 'SAVE20',
    discountType: 'percentage' as const,
    discountValue: 20,
    minOrderAmount: 50,
    maxUses: 200,
    isActive: true
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed' as const,
    discountValue: 5,
    minOrderAmount: 30,
    maxUses: 100,
    isActive: true
  }
];

export const seedDatabase = async (): Promise<void> => {
  try {
    const shopsCount = await Shop.countDocuments();
    if (shopsCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('Seeding database...');

    const shops = await Shop.insertMany(shopsData);
    console.log(`Created ${shops.length} shops`);

    const productsToInsert: Array<{ name: string; description: string; price: number; image: string; category: string; shop: typeof shops[0] }> = [];

    shops.forEach(shop => {
      const shopProducts = productsData[shop.name];
      if (shopProducts) {
        shopProducts.forEach(product => {
          productsToInsert.push({
            ...product,
            shop: shop._id as any
          });
        });
      }
    });

    const products = await Product.insertMany(productsToInsert);
    console.log(`Created ${products.length} products`);

    const coupons = await Coupon.insertMany(couponsData);
    console.log(`Created ${coupons.length} coupons`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
