// ============================================================
// Awards & Reviews Demo Data
// All content is DEMO / SAMPLE / ILLUSTRATIVE for the prototype.
// Replace with real data when available — the `demo` flag
// controls whether "DEMO" badges are shown.
// ============================================================

export interface Award {
  id: string;
  title: string;
  year: number;
  organization: string;
  description: string;
  icon: string;
  demo: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  platform: 'Google' | 'Zomato' | 'Swiggy' | 'EazyDiner';
  review: string;
  visitType: string;
  demo: boolean;
}

// ---------- Sample Awards (DEMO) ----------
export const demoAwards: Award[] = [
  {
    id: 'award-1',
    title: 'Best Contemporary Dining Experience',
    year: 2025,
    organization: 'Sample Restaurant Awards',
    description: 'Recognized in this demo for its contemporary approach to Indian-inspired dining and elevated hospitality.',
    icon: 'Trophy',
    demo: true,
  },
  {
    id: 'award-2',
    title: "Editor's Choice — Romantic Dining",
    year: 2025,
    organization: 'Sample Dining Guide',
    description: "An illustrative recognition highlighting ReNorth's intimate dining experiences and thoughtful presentation.",
    icon: 'Heart',
    demo: true,
  },
  {
    id: 'award-3',
    title: 'Excellence in Culinary Experience',
    year: 2024,
    organization: 'Demo Culinary Awards',
    description: 'Sample recognition celebrating creativity, presentation, and memorable dining experiences.',
    icon: 'ChefHat',
    demo: true,
  },
  {
    id: 'award-4',
    title: 'Top Emerging Restaurant',
    year: 2024,
    organization: 'Illustrative Food & Hospitality Awards',
    description: "A fictional showcase award representing ReNorth's growth and modern approach to hospitality.",
    icon: 'TrendingUp',
    demo: true,
  },
  {
    id: 'award-5',
    title: 'Best Intimate Dining Concept',
    year: 2024,
    organization: 'Sample Dining Review',
    description: "Demo recognition highlighting the restaurant's private dining concept and personalized experiences.",
    icon: 'Sparkles',
    demo: true,
  },
  {
    id: 'award-6',
    title: 'Guest Experience Award',
    year: 2025,
    organization: 'Demo Hospitality Awards',
    description: 'Illustrative recognition focused on service, atmosphere, and guest experience.',
    icon: 'Star',
    demo: true,
  },
];

// ---------- Demo Statistics ----------
export const demoStats = [
  { value: '6+', label: 'Sample Recognitions', demo: true },
  { value: '4.9/5', label: 'Demo Guest Rating', demo: true },
  { value: '500+', label: 'Illustrative Guests Served', demo: true },
  { value: '5', label: 'Years of Culinary Craft', demo: true },
];

// ---------- Sample Reviews (DEMO) ----------
export const demoReviews: Review[] = [
  {
    id: 'review-1',
    name: 'Aarav Mehta',
    rating: 5,
    platform: 'Google',
    review: 'Beautiful atmosphere and a really thoughtful dining experience. The presentation was excellent and every course felt carefully prepared.',
    visitType: 'Couple Dinner',
    demo: true,
  },
  {
    id: 'review-2',
    name: 'Riya Sharma',
    rating: 5,
    platform: 'Zomato',
    review: "Loved the intimate atmosphere. The staff were warm and attentive, and the food had a really interesting balance of familiar Indian flavors and modern presentation.",
    visitType: 'Solo Diner',
    demo: true,
  },
  {
    id: 'review-3',
    name: 'Kabir Malhotra',
    rating: 4,
    platform: 'Swiggy',
    review: "The menu was creative and the desserts were excellent. Definitely a place I'd consider for a special evening.",
    visitType: 'Food Enthusiast',
    demo: true,
  },
  {
    id: 'review-4',
    name: 'Ananya Kapoor',
    rating: 5,
    platform: 'EazyDiner',
    review: 'The private dining experience felt very personal. The ambience was elegant without being overly formal.',
    visitType: 'Private Dining',
    demo: true,
  },
  {
    id: 'review-5',
    name: 'Arjun & Meera',
    rating: 5,
    platform: 'Google',
    review: 'We visited for an anniversary dinner and loved the atmosphere. The attention to detail made the evening feel special.',
    visitType: 'Anniversary',
    demo: true,
  },
  {
    id: 'review-6',
    name: 'Neha Verma',
    rating: 5,
    platform: 'Zomato',
    review: 'Beautiful interiors, thoughtful service and very well-presented food. The dessert was the highlight for me.',
    visitType: 'Celebration',
    demo: true,
  },
  {
    id: 'review-7',
    name: 'Rahul Desai',
    rating: 4,
    platform: 'Google',
    review: 'A sophisticated dining experience with an interesting menu. The staff were friendly and knowledgeable.',
    visitType: 'Business Dinner',
    demo: true,
  },
  {
    id: 'review-8',
    name: 'Ishita Shah',
    rating: 5,
    platform: 'EazyDiner',
    review: 'The restaurant has a lovely balance between luxury and comfort. Everything from the table setting to the food presentation felt intentional.',
    visitType: 'Family Dinner',
    demo: true,
  },
  {
    id: 'review-9',
    name: 'Vikram & Tanvi',
    rating: 5,
    platform: 'Zomato',
    review: 'Celebrated our engagement here and the team made it unforgettable. The personalized touches were beyond what we expected.',
    visitType: 'Engagement',
    demo: true,
  },
  {
    id: 'review-10',
    name: 'Sneha Kulkarni',
    rating: 5,
    platform: 'Google',
    review: 'The Sunday brunch was delightful. Live music, great food, and a warm atmosphere that made us feel right at home.',
    visitType: 'Sunday Brunch',
    demo: true,
  },
  {
    id: 'review-11',
    name: 'Aditya Nair',
    rating: 4,
    platform: 'Swiggy',
    review: 'Impressive menu with thoughtful flavor combinations. The service was attentive without being intrusive.',
    visitType: 'First Visit',
    demo: true,
  },
  {
    id: 'review-12',
    name: 'Meera & Karan',
    rating: 5,
    platform: 'EazyDiner',
    review: 'The private dining room was perfect for our small gathering. Every detail was considered, from the lighting to the music.',
    visitType: 'Private Gathering',
    demo: true,
  },
  {
    id: 'review-13',
    name: 'Farhan Ali',
    rating: 5,
    platform: 'Google',
    review: 'A truly memorable evening. The chef came out to explain the inspiration behind each dish — a lovely personal touch.',
    visitType: 'Chef Interaction',
    demo: true,
  },
  {
    id: 'review-14',
    name: 'Pooja & Rohan',
    rating: 5,
    platform: 'Zomato',
    review: 'We came for a birthday celebration and were blown away by the dessert presentation. The team made the evening feel truly special.',
    visitType: 'Birthday',
    demo: true,
  },
  {
    id: 'review-15',
    name: 'Nikhil Bansal',
    rating: 4,
    platform: 'Swiggy',
    review: 'Great ambiance and well-executed dishes. The mocktail pairing was a nice touch that elevated the whole meal.',
    visitType: 'Food Enthusiast',
    demo: true,
  },
  {
    id: 'review-16',
    name: 'Aisha & Dev',
    rating: 5,
    platform: 'Google',
    review: 'The proposal setup was beyond beautiful. Candles, roses, and a personalized dessert — everything was perfect.',
    visitType: 'Proposal',
    demo: true,
  },
];

// ---------- Featured Review ----------
export const featuredReview = {
  quote: 'The experience felt less like simply going out for dinner and more like having an evening designed specifically for us.',
  name: 'Aarav & Meera',
  label: 'Demo Guest Review',
  demo: true,
};

// ---------- Platform Rating Summary (DEMO) ----------
export const platformRatings = [
  { platform: 'Google', rating: 5, demo: true },
  { platform: 'Zomato', rating: 5, demo: true },
  { platform: 'Swiggy', rating: 4, demo: true },
  { platform: 'EazyDiner', rating: 5, demo: true },
];

export const overallRating = {
  value: 4.9,
  label: 'Demo Average Rating',
  demo: true,
};