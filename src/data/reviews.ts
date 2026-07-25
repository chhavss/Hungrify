export interface ReviewItem {
  id: string;
  restaurantId: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const reviews: ReviewItem[] = [
  // Restaurant 1: Spice Villa
  { id: 'r1', restaurantId: 1, customerName: 'Aarav Sharma', rating: 5, comment: 'Amazing Butter Chicken! The garlic naan was super soft and fresh.', createdAt: '2026-07-20T12:00:00Z' },
  { id: 'r2', restaurantId: 1, customerName: 'Priya Mehta', rating: 4, comment: 'Very good flavor, but slightly oily. Highly recommend the Dal Makhani.', createdAt: '2026-07-22T13:30:00Z' },
  { id: 'r3', restaurantId: 1, customerName: 'Kabir Dev', rating: 5, comment: 'Super fast delivery and authentic Indian spices. Five stars!', createdAt: '2026-07-24T20:15:00Z' },

  // Restaurant 2: Burger Hub
  { id: 'r4', restaurantId: 2, customerName: 'Priya Mehta', rating: 4, comment: 'Classic cheeseburger was amazing. The veggie burger was decent too.', createdAt: '2026-07-21T18:45:00Z' },
  { id: 'r5', restaurantId: 2, customerName: 'Riya Sen', rating: 5, comment: 'The milkshakes are super thick and delicious. Great packaging!', createdAt: '2026-07-23T16:20:00Z' },

  // Restaurant 3: Pizza Point
  { id: 'r6', restaurantId: 3, customerName: 'Aarav Sharma', rating: 4, comment: 'Fresh mozzarella and crispy crust. The farmhouse pizza is loaded.', createdAt: '2026-07-19T21:10:00Z' },
  { id: 'r7', restaurantId: 3, customerName: 'Sanjay Dutt', rating: 3, comment: 'Pizza arrived cold. Taste was okay after reheating.', createdAt: '2026-07-20T22:00:00Z' },

  // Restaurant 4: Biryani House
  { id: 'r8', restaurantId: 4, customerName: 'Rohan Gupta', rating: 5, comment: 'The chicken dum biryani has the perfect blend of spices. Saffron aroma is real.', createdAt: '2026-07-24T13:00:00Z' },
  { id: 'r9', restaurantId: 4, customerName: 'Ananya Roy', rating: 5, comment: 'Best biryani in town! Very large portions, easily serves two.', createdAt: '2026-07-25T12:30:00Z' },

  // Restaurant 5: Healthy Greens
  { id: 'r10', restaurantId: 5, customerName: 'Amit Verma', rating: 5, comment: 'Refreshing quinoa salad. Clean and organic taste. Low fat as promised.', createdAt: '2026-07-23T09:00:00Z' },
  
  // Restaurant 6: Szechuan Dragon
  { id: 'r11', restaurantId: 6, customerName: 'Vikram Malhotra', rating: 4, comment: 'Excellent hakka noodles! Chilli chicken was crispy and spicy.', createdAt: '2026-07-22T19:30:00Z' },

  // Populate other reviews to reach representative seed sample
  { id: 'r12', restaurantId: 7, customerName: 'Nisha Pillai', rating: 4, comment: 'Decent cappuccino. Blueberry muffin was fresh.', createdAt: '2026-07-21T08:30:00Z' },
  { id: 'r13', restaurantId: 8, customerName: 'Kunal Kapoor', rating: 5, comment: 'The Red Velvet pastry is out of this world! Perfect icing.', createdAt: '2026-07-24T15:20:00Z' },
  { id: 'r14', restaurantId: 9, customerName: 'Meera Nair', rating: 5, comment: 'Masala dosa is crispy and served with three amazing chutneys.', createdAt: '2026-07-25T08:15:00Z' },
  { id: 'r15', restaurantId: 10, customerName: 'Aditya Birla', rating: 4, comment: 'Delicious Pad Thai. Perfect peanut crushings.', createdAt: '2026-07-23T20:45:00Z' },
  { id: 'r16', restaurantId: 11, customerName: 'Ishaan Khatter', rating: 4, comment: 'Rich kadai paneer and large soft tandoori rotis.', createdAt: '2026-07-22T14:10:00Z' },
  { id: 'r17', restaurantId: 12, customerName: 'Tara Sutaria', rating: 4, comment: 'Crispy tacos and amazing horchata. Felt like Mexico.', createdAt: '2026-07-23T12:00:00Z' },
  { id: 'r18', restaurantId: 13, customerName: 'Varun Dhawan', rating: 5, comment: 'Very rich Alfredo sauce. Real Italian texture.', createdAt: '2026-07-21T21:40:00Z' },
  { id: 'r19', restaurantId: 14, customerName: 'Kiara Advani', rating: 5, comment: 'Fragrant and spicy. The Matka Phirni was the best ending.', createdAt: '2026-07-25T14:00:00Z' },
  { id: 'r20', restaurantId: 15, customerName: 'Sidharth Malhotra', rating: 4, comment: 'Super healthy protein salad. Clean eating.', createdAt: '2026-07-24T08:45:00Z' },
  { id: 'r21', restaurantId: 16, customerName: 'Janhvi Kapoor', rating: 5, comment: 'Translucent and thin crystal dumplings. Excellent seasoning.', createdAt: '2026-07-22T13:20:00Z' },
  { id: 'r22', restaurantId: 17, customerName: 'Karthik Aaryan', rating: 4, comment: 'Great mocha frappe. Nice cozy packaging.', createdAt: '2026-07-23T17:10:00Z' },
  { id: 'r23', restaurantId: 18, customerName: 'Sara Ali Khan', rating: 5, comment: 'Gelato was extremely smooth and rich in flavor. Highly recommend.', createdAt: '2026-07-24T19:30:00Z' },
  { id: 'r24', restaurantId: 19, customerName: 'Ananya Panday', rating: 5, comment: 'Amazing podi idlis! Super hot and dipped in ghee.', createdAt: '2026-07-25T09:20:00Z' },
  { id: 'r25', restaurantId: 20, customerName: 'Ranveer Singh', rating: 4, comment: 'Spicy noodles, hot chilli garlic rice. Energetic flavors!', createdAt: '2026-07-24T13:40:00Z' },
  { id: 'r26', restaurantId: 21, customerName: 'Deepika Padukone', rating: 5, comment: 'Perfect clay oven smoky tikka chunks. Dal was rich.', createdAt: '2026-07-25T13:10:00Z' },
  { id: 'r27', restaurantId: 22, customerName: 'Alia Bhatt', rating: 4, comment: 'Decent healthy subs. Very fresh greens inside.', createdAt: '2026-07-22T12:00:00Z' },
  { id: 'r28', restaurantId: 23, customerName: 'Ranbir Kapoor', rating: 4, comment: 'Lasagna was layer-perfect. Soft and cheesy.', createdAt: '2026-07-23T21:40:00Z' },
  { id: 'r29', restaurantId: 24, customerName: 'Vicky Kaushal', rating: 5, comment: 'Boneless chicken biryani was rich and tasty. Kababs are super crispy.', createdAt: '2026-07-24T12:30:00Z' },
  { id: 'r30', restaurantId: 25, customerName: 'Katrina Kaif', rating: 4, comment: 'Chickpea salad was crisp and clean. Feta cheese was premium.', createdAt: '2026-07-25T11:20:00Z' },
  { id: 'r31', restaurantId: 26, customerName: 'Tiger Shroff', rating: 4, comment: 'Decent fried rice. Chilli paneer was spiced well.', createdAt: '2026-07-24T18:00:00Z' },
  { id: 'r32', restaurantId: 27, customerName: 'Shraddha Kapoor', rating: 5, comment: 'My daily java chip frappe is always consistent.', createdAt: '2026-07-23T08:15:00Z' },
  { id: 'r33', restaurantId: 28, customerName: 'Kriti Sanon', rating: 5, comment: 'Nutella waffles are extremely crispy and rich in chocolate. Loved it!', createdAt: '2026-07-24T20:30:00Z' },
  { id: 'r34', restaurantId: 29, customerName: 'Ayushmann Khurrana', rating: 5, comment: 'Super pure ghee dosas. Coconut chutney was fresh.', createdAt: '2026-07-25T07:45:00Z' },
  { id: 'r35', restaurantId: 30, customerName: 'Rajkummar Rao', rating: 4, comment: 'California roll was fresh. Good wasabi spread.', createdAt: '2026-07-22T19:15:00Z' }
];
