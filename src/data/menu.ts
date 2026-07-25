export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: 'Recommended' | 'Best Sellers' | 'Veg' | 'Non Veg' | 'Beverages' | 'Desserts';
  isAvailable: boolean;
  image?: string;
  isVeg: boolean;
}

export const menuItems: MenuItem[] = [
  // Restaurant 1: Spice Villa (Indian)
  { id: 1, restaurantId: 1, name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken pieces cooked in butter and cream', price: 280, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 2, restaurantId: 1, name: 'Garlic Naan', description: 'Tandoor-baked flatbread topped with garlic and butter', price: 50, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 3, restaurantId: 1, name: 'Dal Makhani', description: 'Slow-cooked black lentils in rich creamy gravy', price: 210, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 4, restaurantId: 1, name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese cubes in spiced onion tomato gravy', price: 240, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 5, restaurantId: 1, name: 'Mango Lassi', description: 'Refreshing sweet yoghurt drink flavored with mango pulp', price: 80, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 6, restaurantId: 1, name: 'Gulab Jamun', description: 'Sweet milk dumplings dipped in hot sugar syrup', price: 70, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 2: Burger Hub (Fast Food)
  { id: 7, restaurantId: 2, name: 'Classic Cheeseburger', description: 'Juicy beef patty, melted cheddar, pickles, lettuce, and secret sauce', price: 180, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 8, restaurantId: 2, name: 'Crispy Veggie Burger', description: 'Crispy vegetable patty, lettuce, tomatoes, and mayonnaise', price: 140, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 9, restaurantId: 2, name: 'Peri Peri French Fries', description: 'Golden crispy fries tossed in spicy peri peri seasoning', price: 110, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 10, restaurantId: 2, name: 'Double Cheese Chicken Burger', description: 'Double crispy chicken patties with double cheddar cheese slices', price: 220, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 11, restaurantId: 2, name: 'Chocolate Milkshake', description: 'Thick shake blended with chocolate ice cream and fresh syrup', price: 120, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 12, restaurantId: 2, name: 'Warm Fudge Brownie', description: 'Dense chocolate brownie served with warm fudge drizzle', price: 90, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 3: Pizza Point (Italian)
  { id: 13, restaurantId: 3, name: 'Margherita Pizza', description: 'Fresh mozzarella cheese, tomato sauce, and basil leaves', price: 290, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 14, restaurantId: 3, name: 'Farmhouse Pizza', description: 'Loaded with onion, capsicum, tomato, mushroom, and mozzarella', price: 380, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 15, restaurantId: 3, name: 'Garlic Breadsticks', description: 'Baked breadsticks seasoned with garlic butter and herbs', price: 130, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 16, restaurantId: 3, name: 'Chicken Golden Delight', description: 'Double barbecue chicken, golden corn, and extra mozzarella cheese', price: 440, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 17, restaurantId: 3, name: 'Coca Cola (330ml)', description: 'Chilled carbonated soft drink', price: 40, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 18, restaurantId: 3, name: 'Tiramisu Cup', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream', price: 150, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 4: Biryani House (Biryani)
  { id: 19, restaurantId: 4, name: 'Chicken Dum Biryani', description: 'Fragrant basmati rice layered with spiced chicken, herbs, and saffron', price: 290, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 20, restaurantId: 4, name: 'Paneer Dum Biryani', description: 'Basmati rice dum cooked with soft paneer cubes and biryani spices', price: 240, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 21, restaurantId: 4, name: 'Mutton Dum Biryani', description: 'Traditional slow-cooked goat meat layered with spiced rice', price: 390, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 22, restaurantId: 4, name: 'Mirchi Ka Salan', description: 'Classic rich peanut and green chilli gravy accompaniment', price: 60, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 23, restaurantId: 4, name: 'Double Ka Meetha', description: 'Sweet bread pudding dessert flavored with cardamom and dry fruits', price: 90, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 24, restaurantId: 4, name: 'Sweet Lassi', description: 'Creamy yoghurt drink blended with sugar', price: 70, category: 'Beverages', isAvailable: true, isVeg: true },

  // Restaurant 5: Healthy Greens (Healthy)
  { id: 25, restaurantId: 5, name: 'Quinoa Avocado Salad', description: 'Tri-color quinoa, ripe avocado, cherry tomatoes, cucumbers with lemon vinaigrette', price: 260, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 26, restaurantId: 5, name: 'Paneer Protein Bowl', description: 'Grilled paneer, brown rice, broccoli, sprouts, and low-fat dressing', price: 240, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 27, restaurantId: 5, name: 'Detox Green Smoothie', description: 'Blended spinach, green apple, cucumber, mint, and coconut water', price: 140, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 28, restaurantId: 5, name: 'Chicken Caesar Salad', description: 'Grilled chicken breast, crisp romaine lettuce, croutons, and Caesar dressing', price: 280, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 29, restaurantId: 5, name: 'Fruit Salad Bowl', description: 'Assorted seasonal fresh cut fruits topped with honey and chia seeds', price: 160, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 6: Szechuan Dragon (Chinese)
  { id: 30, restaurantId: 6, name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with crisp vegetables and soya sauce', price: 170, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 31, restaurantId: 6, name: 'Szechuan Fried Rice Veg', description: 'Spicy fried rice tossed in fiery home-made Szechuan sauce', price: 180, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 32, restaurantId: 6, name: 'Chilli Chicken Dry', description: 'Crispy chicken chunks tossed with capsicum, onion, and green chillies', price: 230, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 33, restaurantId: 6, name: 'Spring Rolls (4 Pcs)', description: 'Crispy wrappers stuffed with seasoned mixed vegetables', price: 130, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 34, restaurantId: 6, name: 'Veg Manchow Soup', description: 'Hot and sour vegetable soup topped with fried noodles', price: 110, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 7: The Daily Grind (Coffee)
  { id: 35, restaurantId: 7, name: 'Classic Cappuccino', description: 'Rich espresso shot topped with thick milk foam and cocoa powder dust', price: 140, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 36, restaurantId: 7, name: 'Chilled Hazelnut Iced Latte', description: 'Espresso poured over ice, hazelnut syrup, and cold milk', price: 170, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 37, restaurantId: 7, name: 'Hot Chocolate', description: 'Rich chocolate blended with steamed warm milk', price: 150, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 38, restaurantId: 7, name: 'Paneer Croissant Sandwich', description: 'Flaky buttery croissant stuffed with grilled paneer and cheese', price: 190, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 39, restaurantId: 7, name: 'Blueberry Muffin', description: 'Soft crumb cake loaded with plump blueberries', price: 110, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 8: Sweet Tooth Bakery (Desserts)
  { id: 40, restaurantId: 8, name: 'Red Velvet Pastry', description: 'Layers of moist red velvet sponge and rich cream cheese frosting', price: 110, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 41, restaurantId: 8, name: 'Chocolate Truffle Cake (Half Kg)', description: 'Decadent chocolate sponge layered with dark chocolate ganache', price: 450, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 42, restaurantId: 8, name: 'Assorted Macarons (6 Pcs)', description: 'Delicate french almond meringue cookies in assorted flavors', price: 280, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 43, restaurantId: 8, name: 'Warm Choco Lava Cup', description: 'Soft chocolate cake with a molten chocolate liquid center', price: 100, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 44, restaurantId: 8, name: 'Cold Coffee with Ice Cream', description: 'Blended cold coffee topped with vanilla scoop', price: 130, category: 'Beverages', isAvailable: true, isVeg: true },

  // Restaurant 9: Dakshin Delights (South Indian)
  { id: 45, restaurantId: 9, name: 'Masala Dosa', description: 'Thin crispy rice crepe stuffed with spiced potato mash and butter', price: 110, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 46, restaurantId: 9, name: 'Idli Vada Combo (2+1)', description: 'Steamed rice cakes and crispy fried lentil donut served with sambar and chutneys', price: 80, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 47, restaurantId: 9, name: 'Rava Onion Dosa', description: 'Crispy semolina crepe studded with chopped green chillies and onions', price: 130, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 48, restaurantId: 9, name: 'Filter Coffee', description: 'Traditional South Indian frothy milk coffee brewed with chicory', price: 40, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 49, restaurantId: 9, name: 'Rava Kesari', description: 'Sweet semolina dessert loaded with ghee and saffron', price: 70, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 10: Wok & Roll (Asian)
  { id: 50, restaurantId: 10, name: 'Pad Thai Noodles Veg', description: 'Flat rice noodles stir-fried with tofu, bean sprouts, peanuts, and tamarind', price: 260, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 51, restaurantId: 10, name: 'Chicken Kung Pao', description: 'Spiced chicken stir-fry with dry chillies, soy, and roasted peanuts', price: 290, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 52, restaurantId: 10, name: 'Thai Green Curry Veg', description: 'Aromatic green curry broth loaded with bamboo shoots, basil, and baby corn', price: 280, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 53, restaurantId: 10, name: 'Steamed Jasmine Rice', description: 'Fragrant steamed white long-grain jasmine rice', price: 130, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 54, restaurantId: 10, name: 'Ice Lemon Tea', description: 'Freshly brewed iced black tea with lemon pulp', price: 90, category: 'Beverages', isAvailable: true, isVeg: true },

  // Add items for Restaurants 11 - 30 to reach ~190-200 menu items.
  // Restaurant 11: Punjab Grill Diner
  { id: 55, restaurantId: 11, name: 'Kadai Paneer', description: 'Cottage cheese cooked in spicy bell pepper and tomato gravy', price: 250, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 56, restaurantId: 11, name: 'Tandoori Roti', description: 'Plain tandoor-baked wheat flour bread', price: 20, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 57, restaurantId: 11, name: 'Butter Naan', description: 'Tandoori flatbread brushed with fresh table butter', price: 40, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 58, restaurantId: 11, name: 'Kadhai Chicken', description: 'Spicy chicken curry prepared in kadhai with crushed spices', price: 290, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 59, restaurantId: 11, name: 'Rasmalai (2 Pcs)', description: 'Soft cottage cheese patties in saffron-infused milk syrup', price: 80, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 12: Taco Loco
  { id: 60, restaurantId: 12, name: 'Crispy Veg Tacos (3 Pcs)', description: 'Hard shell corn tortillas filled with beans, lettuce, cheese, and fresh salsa', price: 180, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 61, restaurantId: 12, name: 'Chicken Quesadilla', description: 'Grilled flour tortilla loaded with spiced chicken and melted cheese blend', price: 220, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 62, restaurantId: 12, name: 'Loaded Nachos Grande', description: 'Corn tortilla chips topped with warm cheese, jalapeños, beans, sour cream', price: 160, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 63, restaurantId: 12, name: 'Mexican Horchata', description: 'Traditional sweetened milk beverage with rice and cinnamon', price: 110, category: 'Beverages', isAvailable: true, isVeg: true },

  // Restaurant 13: Pasta Fresca
  { id: 64, restaurantId: 13, name: 'Penne Arrabbiata Veg', description: 'Pasta in spicy garlic tomato sauce garnished with fresh parsley', price: 280, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 65, restaurantId: 13, name: 'Creamy Fettuccine Alfredo', description: 'Fettuccine pasta in rich butter, cream, and parmesan sauce', price: 320, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 66, restaurantId: 13, name: 'Chicken Carbonara Penne', description: 'Pasta with bacon bits, chicken chunks, egg, and cream sauce', price: 360, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 67, restaurantId: 13, name: 'Cheese Garlic Bread', description: 'Bake slices of bread topped with garlic butter and melted mozzarella', price: 150, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 14: Royal Biryani Corner
  { id: 68, restaurantId: 14, name: 'Veg Hyderabadi Biryani', description: 'Basmati rice slow cooked with mixed garden fresh veggies', price: 220, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 69, restaurantId: 14, name: 'Special Chicken Biryani', description: 'Flavourful basmati rice served with double chicken drumsticks', price: 310, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 70, restaurantId: 14, name: 'Egg Dum Biryani', description: 'Spiced eggs layered with fragrant long-grain basmati rice', price: 240, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 71, restaurantId: 14, name: 'Matka Phirni', description: 'Slow-cooked sweet rice pudding served in earthen matkas', price: 80, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 15: Organic Bowl
  { id: 72, restaurantId: 15, name: 'Superfood Salad Bowl', description: 'Kale, spinach, quinoa, blueberries, almonds, and honey mustard dressing', price: 250, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 73, restaurantId: 15, name: 'Avocado Toast Duo', description: 'Sourdough toast topped with mashed avocado, cherry tomatoes, and seeds', price: 220, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 74, restaurantId: 15, name: 'Orange Carrot Detox Juice', description: 'Fresh cold-pressed juice with carrot, ginger, orange, and turmeric', price: 130, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 75, restaurantId: 15, name: 'Tofu Brown Rice Bowl', description: 'Teriyaki tofu, brown rice, carrots, bell peppers, and sesame seeds', price: 230, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 16: Dim Sum Paradise
  { id: 76, restaurantId: 16, name: 'Veg Crystal Dumplings (4 Pcs)', description: 'Translucent steamed wrappers filled with mixed finely chopped vegetables', price: 160, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 77, restaurantId: 16, name: 'Chicken Schezwan Momos', description: 'Steamed chicken momos tossed in spicy Schezwan sauce', price: 190, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 78, restaurantId: 16, name: 'Fried Cheese Momos (6 Pcs)', description: 'Crispy fried momos packed with cottage cheese and sweet corn', price: 170, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 79, restaurantId: 16, name: 'Peach Iced Tea', description: 'Cold brewed tea flavored with sweet peach extract', price: 90, category: 'Beverages', isAvailable: true, isVeg: true },

  // Restaurant 17: Cafe Mocha
  { id: 80, restaurantId: 17, name: 'Mocha Frappe', description: 'Blended espresso, chocolate chips, vanilla syrup, and cold milk', price: 160, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 81, restaurantId: 17, name: 'Macchiato Espresso', description: 'Short double shot of espresso with a splash of milk foam', price: 120, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 82, restaurantId: 17, name: 'Caramel Croissant', description: 'Baked buttery croissant topped with salted caramel glaze', price: 130, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 83, restaurantId: 17, name: 'Veg Club Sandwich', description: 'Double decker toasted sandwich with tomatoes, cheese, and lettuce', price: 180, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 18: Gelato & More
  { id: 84, restaurantId: 18, name: 'Double Belgian Chocolate Scoop', description: 'Rich premium dark Belgian chocolate gelato', price: 120, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 85, restaurantId: 18, name: 'Alfonso Mango Gelato Scoop', description: 'Sorbet flavored with fresh hand-picked Alfonso mangoes', price: 100, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 86, restaurantId: 18, name: 'Waffle Cone Deluxe', description: 'Crispy fresh baked waffle cone loaded with hazelnut drizzle', price: 140, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 87, restaurantId: 18, name: 'Virgin Mojito', description: 'Fresh lime, mint leaves, carbonated club soda over crushed ice', price: 90, category: 'Beverages', isAvailable: true, isVeg: true },

  // Restaurant 19: Idli Vilas
  { id: 88, restaurantId: 19, name: 'Ghee Podi Idli (10 Pcs)', description: 'Mini steamed idlis coated with hot ghee and spicy gun powder spices', price: 120, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 89, restaurantId: 19, name: 'Crispy Rava Dosa Plain', description: 'Crispy semolina batter crepe served with coconut chutney', price: 110, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 90, restaurantId: 19, name: 'Medhu Vada (2 Pcs)', description: 'Crispy golden fried lentil donuts seasoned with pepper and curry leaves', price: 70, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 91, restaurantId: 19, name: 'Masala Buttermilk', description: 'Chilled churned spiced yoghurt drink with coriander and ginger', price: 40, category: 'Beverages', isAvailable: true, isVeg: true },

  // Restaurant 20: Noodle Fusion
  { id: 92, restaurantId: 20, name: 'Singapore Rice Veg Noodles', description: 'Rice vermicelli noodles stir fried with vegetables, curry powder, soy', price: 210, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 93, restaurantId: 20, name: 'Chicken Chilli Garlic Rice', description: 'Stir fried rice tossed with spicy chicken chunks, garlic, and chillies', price: 240, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 94, restaurantId: 20, name: 'Gobi Manchurian Dry', description: 'Crispy cauliflower florets tossed in sweet and sour soy-garlic sauce', price: 180, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 95, restaurantId: 20, name: 'Sweet Corn Chicken Soup', description: 'Warm comforting soup with egg drops, sweet corn, and chicken shreds', price: 130, category: 'Non Veg', isAvailable: true, isVeg: false },

  // Restaurant 21: Tandoor Palace
  { id: 96, restaurantId: 21, name: 'Chicken Tikka Dry', description: 'Spicy marinated chicken chunks grilled in tandoor oven', price: 260, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 97, restaurantId: 21, name: 'Dal Tadka Special', description: 'Yellow lentils tempered with cumin, garlic, dry red chillies, and ghee', price: 190, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 98, restaurantId: 21, name: 'Malai Kofta', description: 'Deep fried cottage cheese balls in rich cashew nut gravy', price: 230, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 99, restaurantId: 21, name: 'Laccha Paratha', description: 'Layered whole wheat pan baked flaky flatbread', price: 50, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 22: Sub Stop
  { id: 100, restaurantId: 22, name: 'Paneer Tikka Sub (6 inch)', description: 'Freshly baked sub loaded with paneer tikka, veggies, and choice of sauces', price: 160, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 101, restaurantId: 22, name: 'Tandoori Chicken Sub (6 inch)', description: 'Baked sub sandwich filled with spicy tandoori chicken shreds, salads, mayo', price: 190, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 102, restaurantId: 22, name: 'Veggie Delite Sub', description: '6 inch sub sandwich packed with lettuce, tomatoes, cucumbers, capsicum', price: 130, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 103, restaurantId: 22, name: 'Double Chocolate Cookie', description: 'Chewy fresh baked cookie loaded with double chocolate chips', price: 60, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 23: Mama Italian
  { id: 104, restaurantId: 23, name: 'Baked Lasagna Chicken', description: 'Pasta sheets layered with minced chicken sauce, béchamel, and mozzarella', price: 340, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 105, restaurantId: 23, name: 'Pesto Fettuccine Pasta', description: 'Fresh fettuccine pasta tossed in creamy basil pesto sauce with pine nuts', price: 310, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 106, restaurantId: 23, name: 'Bruschetta Pomodoro', description: 'Grilled garlic bread slices topped with chopped seasoned tomatoes', price: 150, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 107, restaurantId: 23, name: 'Panna Cotta Classic', description: 'Sweet thickened cream dessert set in cup served with berry syrup', price: 140, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 24: Hyderabadi Shahi Biryani
  { id: 108, restaurantId: 24, name: 'Chicken Boneless Biryani', description: 'Long grain rice layered with spicy boneless chicken gravy, dum cooked', price: 320, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 109, restaurantId: 24, name: 'Egg Masala Biryani', description: 'Basmati rice flavored with spiced boiled eggs and mint leaves', price: 230, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 110, restaurantId: 24, name: 'Chicken Kabab (6 Pcs)', description: 'Deep fried crispy chicken chunks marinated in south indian spices', price: 210, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 111, restaurantId: 24, name: 'Qubani Ka Meetha', description: 'Traditional Hyderabadi sweet apricot pudding topped with fresh cream', price: 100, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 25: Salad Zone
  { id: 112, restaurantId: 25, name: 'Mediterranean Chickpea Salad', description: 'Boiled chickpeas, cucumbers, bell peppers, olives, feta cheese dressing', price: 210, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 113, restaurantId: 25, name: 'Asian Peanut Noodles Cold', description: 'Cold whole wheat noodles tossed with julienned vegetables and peanut butter sauce', price: 230, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 114, restaurantId: 25, name: 'Watermelon Feta Mint Salad', description: 'Juicy watermelon cubes, fresh mint, crumbed feta with olive oil glaze', price: 170, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 115, restaurantId: 25, name: 'Chia Seed Pudding Bowl', description: 'Vanilla chia seed pudding topped with banana, honey, almond flakes', price: 150, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 26: The Great Wall
  { id: 116, restaurantId: 26, name: 'Veg Fried Rice Double', description: 'Stir fried long rice with beans, carrot, and green onion rings', price: 170, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 117, restaurantId: 26, name: 'Chicken Manchurian Gravy', description: 'Crispy chicken cubes submerged in tangy dark soy-based gravy', price: 230, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 118, restaurantId: 26, name: 'Paneer Chilli Gravy', description: 'Cottage cheese cubes tossed in spicy chinese chilli soy sauce', price: 210, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 119, restaurantId: 26, name: 'Crispy Honey Chilli Potatoes', description: 'Deep fried potato fingers coated in honey, sesame seeds, chilli sauce', price: 160, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 27: Starbucks Coffee
  { id: 120, restaurantId: 27, name: 'Java Chip Frappuccino', description: 'Tall chocolate chip mocha flavored blended coffee drink with whipped cream', price: 280, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 121, restaurantId: 27, name: 'Cold Brew Black Coffee', description: 'Steeped dark roasted coffee grounds served cold over ice', price: 210, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 122, restaurantId: 27, name: 'Caramel Macchiato Latte', description: 'Steamed milk with vanilla syrup, marked with espresso and caramel drizzle', price: 260, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 123, restaurantId: 27, name: 'New York Cheesecake Slice', description: 'Classic buttery graham cracker crust with smooth dense cream cheese', price: 240, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 28: Chocolate Junction
  { id: 124, restaurantId: 28, name: 'Nutella Waffle Deluxe', description: 'Fresh golden waffle loaded with sweet Nutella spreads and hazelnuts', price: 160, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 125, restaurantId: 28, name: 'Double Choco Lava Crepe', description: 'Warm french thin pancake loaded with melted dark chocolate ganache', price: 140, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 126, restaurantId: 28, name: 'Gourmet Chocolate Waffle Cone', description: 'Crisp waffle cone stuffed with double scoops of chocolate ice cream', price: 150, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 127, restaurantId: 28, name: 'Assorted Chocolate Truffles (4 Pcs)', description: 'Handcrafted premium milk and dark chocolate truffle drops', price: 120, category: 'Desserts', isAvailable: true, isVeg: true },

  // Restaurant 29: Sri Krishna Bhavan
  { id: 128, restaurantId: 29, name: 'Plain Dosa', description: 'Paper thin crispy golden rice crepe served with fresh coconut chutney', price: 80, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 129, restaurantId: 29, name: 'Puri Sagu Combo (3 Pcs)', description: 'Golden fried puffed puris served with seasoned potato vegetable sagu', price: 100, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 130, restaurantId: 29, name: 'Bisi Bele Bath Special', description: 'Traditional spicy hot rice, lentil, and vegetable mash cooked in ghee', price: 120, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 131, restaurantId: 29, name: 'Chow Chow Bath Combo', description: 'Sweet Pineapple Sheera paired with savoury Khara Semolina Bath', price: 130, category: 'Veg', isAvailable: true, isVeg: true },

  // Restaurant 30: Sushiland
  { id: 132, restaurantId: 30, name: 'California Roll (8 Pcs)', description: 'Sushi rolls with crab meat sticks, cucumber, avocado, rolled in sesame', price: 380, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 133, restaurantId: 30, name: 'Spicy Salmon Maki Roll', description: 'Spiced fresh raw salmon strips wrapped in seaweed sheet and sushi rice', price: 420, category: 'Best Sellers', isAvailable: true, isVeg: false },
  { id: 134, restaurantId: 30, name: 'Veg Tempura Roll', description: 'Crispy batter fried carrots, squash, asparagus sushi rolls', price: 320, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 135, restaurantId: 30, name: 'Matcha Green Ice Cream', description: 'Refreshing sweet cold ice cream flavored with Japanese green tea powder', price: 160, category: 'Desserts', isAvailable: true, isVeg: true },

  // Extra items to round up to exactly 180 items (adding 2 items per restaurant for some restaurants)
  { id: 136, restaurantId: 1, name: 'Paneer Tikka Kathi Roll', description: 'Layered paratha wrap stuffed with roasted paneer, onion, and spices', price: 160, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 137, restaurantId: 1, name: 'Tandoori Roti Plain', description: 'Whole wheat flatbread baked in clay oven', price: 20, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 138, restaurantId: 2, name: 'Onion Rings Basket', description: 'Crispy batter-fried onion slices served with garlic mayo dip', price: 90, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 139, restaurantId: 2, name: 'Crispy Onion Fries', description: 'Golden French fries topped with crispy onions and hot cheese sauce', price: 130, category: 'Best Sellers', isAvailable: true, isVeg: true },
  { id: 140, restaurantId: 3, name: 'Peppy Paneer Pizza', description: 'Spiced paneer, capsicum, red paprika, and loaded mozzarella', price: 360, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 141, restaurantId: 3, name: 'Pepperoni Classic Pizza', description: 'Generous pepperoni slices topped over cheese layers', price: 450, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 142, restaurantId: 4, name: 'Egg Biryani Special', description: 'Dum cooked basmati rice paired with three boiled eggs', price: 220, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 143, restaurantId: 4, name: 'Raita Premium Bowl', description: 'Chilled yogurt mixed with fresh cucumber, mint, and roasted cumin', price: 40, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 144, restaurantId: 5, name: 'Detox Orange Juice', description: 'Orange, ginger, carrot, cold pressed and unsweetened', price: 120, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 145, restaurantId: 5, name: 'Avocado Protein Toast', description: 'Toast layered with smashed avocado, sprouts, and pumpkin seeds', price: 180, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 146, restaurantId: 6, name: 'Gobi Manchurian Gravy', description: 'Crispy fried cauliflower balls dipped in thick soy garlic gravy', price: 190, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 147, restaurantId: 6, name: 'Chicken Hakka Noodles', description: 'Stir fried noodles mixed with seasoned chicken shreds and egg drops', price: 210, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 148, restaurantId: 7, name: 'Espresso Double Shot', description: 'Pure strong concentrated double shot of arabica beans', price: 100, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 149, restaurantId: 7, name: 'Hot Hazelnut Macchiato', description: 'Hot espresso marked with hazelnut syrup and hot foam', price: 150, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 150, restaurantId: 8, name: 'Vanilla Cupcake Cream', description: 'Soft fluffy vanilla sponge cake topped with buttercream frosting', price: 70, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 151, restaurantId: 8, name: 'Dark Chocolate Cookie', description: 'Chewy fresh baked cookie loaded with dark cocoa chips', price: 60, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 152, restaurantId: 9, name: 'Ghee Paper Dosa', description: 'Super thin large crispy rice crepe with ghee brushings', price: 120, category: 'Recommended', isAvailable: true, isVeg: true },
  { id: 153, restaurantId: 9, name: 'Vada Sambar Bowl', description: 'Crispy lentil donuts submerged in piping hot sambar gravy', price: 60, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 154, restaurantId: 10, name: 'Chilli Garlic Chicken Noodles', description: 'Stir fried noodles with garlic, chicken shards, and hot chillies', price: 280, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 155, restaurantId: 10, name: 'Jasmine Green Tea Cup', description: 'Hot comforting green tea brewed with jasmine buds', price: 80, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 156, restaurantId: 11, name: 'Lassi Punjabi Sweet', description: 'Thick yoghurt shake served with malai layers in glass', price: 80, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 157, restaurantId: 11, name: 'Gulab Jamun (2 Pcs)', description: 'Soft sweet dumplings soaked in cardamon flavored sugar syrup', price: 60, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 158, restaurantId: 12, name: 'Chicken Taco Duo', description: 'Two corn shells filled with seasoned chicken, salsa, and cheese', price: 170, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 159, restaurantId: 12, name: 'Churros with Chocolate Dip', description: 'Crispy fried dough sticks rolled in cinnamon sugar served with warm cocoa', price: 120, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 160, restaurantId: 13, name: 'Bolognese Beef Pasta', description: 'Spaghetti tossed in classic rich tomato-beef sauce', price: 340, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 161, restaurantId: 13, name: 'Tiramisu Pastry Cup', description: 'Traditional Italian sponge layered with coffee cream', price: 130, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 162, restaurantId: 14, name: 'Matka Phirni Sweet', description: 'Grounded rice milk pudding with saffron served cold', price: 70, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 163, restaurantId: 14, name: 'Chicken Seekh Kabab (4 Pcs)', description: 'Minced chicken seasoned with spices, skewers grilled in tandoor', price: 230, category: 'Recommended', isAvailable: true, isVeg: false },
  { id: 164, restaurantId: 15, name: 'Mixed Berries Smoothie', description: 'Blended raspberries, strawberries, yogurt, and honey', price: 160, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 165, restaurantId: 15, name: 'Avocado Quinoa Salad Large', description: 'Diced avocado, premium white quinoa, cucumbers and mint dressing', price: 230, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 166, restaurantId: 16, name: 'Crispy Chili Garlic Wontons', description: 'Deep fried wonton parcels stuffed with mixed veggies tossed in chili oil', price: 150, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 167, restaurantId: 16, name: 'Sweet Corn Veg Soup', description: 'Warm thick comforting sweet corn soup', price: 100, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 168, restaurantId: 17, name: 'Iced Caramel Americano', description: 'Double shot espresso diluted with cold water and caramel logs', price: 140, category: 'Beverages', isAvailable: true, isVeg: true },
  { id: 169, restaurantId: 17, name: 'Chocolate Croissant', description: 'Buttery flaky pastry stuffed with double dark chocolate sticks', price: 120, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 170, restaurantId: 18, name: 'Lemon Mint Sorbet Scoop', description: 'Fat-free dairy-free cold lemon water ice cream', price: 90, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 171, restaurantId: 18, name: 'Tiramisu Gelato Scoop', description: 'Coffee and mascarpone flavored gelato cream', price: 120, category: 'Desserts', isAvailable: true, isVeg: true },
  { id: 172, restaurantId: 19, name: 'Rava Onion Masala Dosa', description: 'Semolina crepe filled with onions and potato mash', price: 120, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 173, restaurantId: 19, name: 'Medu Vada Sambar Dip (2 Pcs)', description: 'Donut vadas dipped inside piping hot south indian lentil stew', price: 70, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 174, restaurantId: 20, name: 'Chicken Hakka Chowmein', description: 'Stir fried noodles tossed with chicken bits and egg', price: 210, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 175, restaurantId: 20, name: 'Spicy Schezwan Veg Noodles', description: 'Noodles stir fried with mixed veggies in fiery Schezwan spices', price: 180, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 176, restaurantId: 21, name: 'Mutton Seekh Kabab (4 Pcs)', description: 'Minced goat meat skewers grilled on clay oven', price: 340, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 177, restaurantId: 21, name: 'Butter Chicken Curry Roll', description: 'Paratha wrap layered with butter chicken gravy and onions', price: 180, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 178, restaurantId: 22, name: 'Chicken Club Double Sub', description: 'Subway roll loaded with roasted chicken breasts, pepperoni, salad', price: 230, category: 'Non Veg', isAvailable: true, isVeg: false },
  { id: 179, restaurantId: 22, name: 'Hashbrown Potato Bites', description: 'Crispy fried potato blocks seasoned with salt and pepper', price: 80, category: 'Veg', isAvailable: true, isVeg: true },
  { id: 180, restaurantId: 23, name: 'Classic Bolognese Lasagna', description: 'Layered flat pasta with beef ragu and béchamel sauce', price: 350, category: 'Non Veg', isAvailable: true, isVeg: false }
];
