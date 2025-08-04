// src/data/mock-data.ts

export interface MonthlyData {
  month: string;
  reach: number;
  impressions: number;
  engagement: number;
}

export interface PlatformData {
  platform: string;
  engagement: number;
}

export interface PostData {
  id: string;
  platform: string;
  date: string;
  content: string;
  reach: number;
  engagement: number;
  type: string;
  impressions: number;
}

// New interface for Literacy Data
export interface LiteracyData {
  state: string;
  populationTotal: number;
  populationMales: number;
  populationFemales: number;
  literatesTotal: number;
  literatesMales: number;
  literatesFemales: number;
  literacyRateTotal: number;
  literacyRateMales: number;
  literacyRateFemales: number;
}

// AgeGroup interface for single bar chart
export interface AgeGroup {
  group: string; // e.g., '18-24', '25-34'
  users: number; // Single user count for the group
}

export interface DemographicsData {
  ageGroups: AgeGroup[];
  genderDistribution: { gender: string; users: number }[];
  // Add other demographic data as needed
}

// Mock Data
export const keyMetrics = {
  totalReach: 1850703,
  totalImpressions: 5402007,
  totalEngagement: 258060,
  followerGrowth: 12.4,
};

export const monthlyPerformance: MonthlyData[] = [
  { month: 'Jan', reach: 800000, impressions: 2000000, engagement: 100000 },
  { month: 'Feb', reach: 850000, impressions: 2100000, engagement: 105000 },
  { month: 'Mar', reach: 900000, impressions: 2200000, engagement: 110000 },
  { month: 'Apr', reach: 950000, impressions: 2300000, engagement: 115000 },
  { month: 'May', reach: 1000000, impressions: 2400000, engagement: 120000 },
  { month: 'Jun', reach: 1050000, impressions: 2500000, engagement: 125000 },
  { month: 'Jul', reach: 1100000, impressions: 2600000, engagement: 130000 },
  { month: 'Aug', reach: 1150000, impressions: 2700000, engagement: 135000 },
  { month: 'Sep', reach: 1200000, impressions: 2800000, engagement: 140000 },
  { month: 'Oct', reach: 1250000, impressions: 2900000, engagement: 145000 },
  { month: 'Nov', reach: 1300000, impressions: 3000000, engagement: 150000 },
  { month: 'Dec', reach: 1350000, impressions: 3100000, engagement: 155000 },
];

export const platformEngagement: PlatformData[] = [
  { platform: 'Instagram', engagement: 58 },
  { platform: 'LinkedIn', engagement: 17 },
  { platform: 'Facebook', engagement: 13 },
  { platform: 'Twitter', engagement: 12 },
];

export const recentPosts: PostData[] = [
  { id: '1', platform: 'Instagram', date: '2023-11-15', content: 'New product launch campaign success!', reach: 150000, engagement: 12000, type: 'Image', impressions: 300000 },
  { id: '2', platform: 'Facebook', date: '2023-11-14', content: 'Behind the scenes of our latest project.', reach: 80000, engagement: 5000, type: 'Video', impressions: 160000 },
  { id: '3', platform: 'Twitter', date: '2023-11-13', content: 'Exciting news coming soon! #staytuned', reach: 50000, engagement: 3000, type: 'Text', impressions: 100000 },
  { id: '4', platform: 'LinkedIn', date: '2023-11-12', content: 'Our team is growing! Check out open positions.', reach: 70000, engagement: 4500, type: 'Text', impressions: 140000 },
  { id: '5', platform: 'Instagram', date: '2023-11-11', content: 'Weekend vibes with our community.', reach: 120000, engagement: 9000, type: 'Image', impressions: 240000 },
  { id: '6', platform: 'Facebook', date: '2023-11-10', content: 'Customer success story: How we helped X company.', reach: 95000, engagement: 6000, type: 'Case Study', impressions: 190000 },
  { id: '7', platform: 'Twitter', date: '2023-11-09', content: 'Quick tip for optimizing your social media strategy.', reach: 40000, engagement: 2500, type: 'Text', impressions: 80000 },
  { id: '8', platform: 'LinkedIn', date: '2023-11-08', content: 'Industry insights report now available for download.', reach: 100000, engagement: 7000, type: 'Document', impressions: 200000 },
  { id: '9', platform: 'Instagram', date: '2023-11-07', content: 'A day in the life at ADmyBRAND.', reach: 110000, engagement: 8500, type: 'Video', impressions: 220000 },
  { id: '10', platform: 'Facebook', date: '2023-11-06', content: 'Join our upcoming webinar on digital marketing trends.', reach: 75000, engagement: 4800, type: 'Event', impressions: 150000 },
];

// Mock data for literacy rates
export const literacyData: LiteracyData[] = [
  {
    state: 'Kerala',
    populationTotal: 33406061,
    populationMales: 16027412,
    populationFemales: 17378649,
    literatesTotal: 30452601,
    literatesMales: 14713537,
    literatesFemales: 15739064,
    literacyRateTotal: 94.00,
    literacyRateMales: 96.11,
    literacyRateFemales: 92.07,
  },
  {
    state: 'Delhi',
    populationTotal: 16787941,
    populationMales: 8987326,
    populationFemales: 7800615,
    literatesTotal: 13916900,
    literatesMales: 7721280,
    literatesFemales: 6195620,
    literacyRateTotal: 86.21,
    literacyRateMales: 90.94,
    literacyRateFemales: 80.76,
  },
  {
    state: 'Maharashtra',
    populationTotal: 112374333,
    populationMales: 58243056,
    populationFemales: 54131277,
    literatesTotal: 96907680,
    literatesMales: 52028917,
    literatesFemales: 44878763,
    literacyRateTotal: 82.34,
    literacyRateMales: 88.38,
    literacyRateFemales: 75.87,
  },
  {
    state: 'Tamil Nadu',
    populationTotal: 72147030,
    populationMales: 36137975,
    populationFemales: 36009055,
    literatesTotal: 58946199,
    literatesMales: 31839800,
    literatesFemales: 27106399,
    literacyRateTotal: 80.09,
    literacyRateMales: 86.77,
    literacyRateFemales: 73.44,
  },
  {
    state: 'West Bengal',
    populationTotal: 91276115,
    populationMales: 46809027,
    populationFemales: 44467088,
    literatesTotal: 69424368,
    literatesMales: 37989682,
    literatesFemales: 31434686,
    literacyRateTotal: 76.26,
    literacyRateMales: 81.69,
    literacyRateFemales: 71.16,
  },
  {
    state: 'Uttar Pradesh',
    populationTotal: 199812341,
    populationMales: 104480510,
    populationFemales: 95331831,
    literatesTotal: 114397555,
    literatesMales: 68102349,
    literatesFemales: 46295206,
    literacyRateTotal: 67.68,
    literacyRateMales: 77.28,
    literacyRateFemales: 57.18,
  },
  {
    state: 'Bihar',
    populationTotal: 104099452,
    populationMales: 54278157,
    populationFemales: 49821295,
    literatesTotal: 52504553,
    literatesMales: 31608023,
    literatesFemales: 20896530,
    literacyRateTotal: 61.80,
    literacyRateMales: 71.20,
    literacyRateFemales: 51.50,
  },
];


export const demographics: DemographicsData = {
  ageGroups: [
    { group: '18-24', users: 35000 },
    { group: '25-34', users: 78000 },
    { group: '35-44', users: 50000 },
    { group: '45-54', users: 22000 },
    { group: '55+', users: 10000 },
  ],
  genderDistribution: [
    { gender: 'Male', users: 60 },
    { gender: 'Female', users: 40 },
  ],
};

export const updateKeyMetrics = () => {
  // Simulate real-time updates by slightly changing values
  keyMetrics.totalReach += Math.floor(Math.random() * 5000) - 2500;
  keyMetrics.totalImpressions += Math.floor(Math.random() * 10000) - 5000;
  keyMetrics.totalEngagement += Math.floor(Math.random() * 500) - 250;
  keyMetrics.followerGrowth = parseFloat((keyMetrics.followerGrowth + (Math.random() * 0.5 - 0.25)).toFixed(1));
};
