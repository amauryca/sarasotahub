// Sarasota Community Events Database
const eventsDatabase = [
  // January Events
  {
    id: 1,
    name: "Sarasota Film Festival Opening Night",
    category: "Cultural",
    date: "2026-01-30",
    time: "6:00 PM",
    location: "Burns Court Cinema, Sarasota",
    contact: "(941) 364-9514",
    description: "Opening night celebration of the international film festival",
    details: "Join us for screenings, networking, and celebration of cinema"
  },

  // February Events
  {
    id: 2,
    name: "Sarasota Winter Craft Fest",
    category: "Cultural",
    date: "2026-02-07",
    time: "10:00 AM",
    location: "Centennial Park, Sarasota",
    contact: "(941) 365-5454",
    description: "Outdoor craft fair featuring local artisans",
    details: "Browse handmade crafts, food vendors, and live music"
  },
  {
    id: 3,
    name: "Free Community Health Screening Day",
    category: "Health",
    date: "2026-02-14",
    time: "9:00 AM",
    location: "Sarasota County Health Department",
    contact: "(941) 861-2900",
    description: "Free health screenings for all residents",
    details: "Blood pressure, cholesterol, BMI, and flu shots available"
  },
  {
    id: 4,
    name: "Kids Skateboard Competition",
    category: "Recreation",
    date: "2026-02-21",
    time: "1:00 PM",
    location: "Skate Park, downtown Sarasota",
    contact: "(941) 861-6200",
    description: "Youth skateboarding competition and clinic",
    details: "All skill levels welcome. Registration required."
  },

  // March Events
  {
    id: 5,
    name: "Job Fair 2026",
    category: "Education",
    date: "2026-03-05",
    time: "10:00 AM",
    location: "Sarasota Convention Center",
    contact: "(941) 309-7600",
    description: "Hundreds of employers looking to hire",
    details: "Bring resumes. Free workshops on job interview skills"
  },
  {
    id: 6,
    name: "Sarasota Farmers Market Grand Opening",
    category: "Community",
    date: "2026-03-10",
    time: "8:00 AM",
    location: "Fifth Avenue, downtown Sarasota",
    contact: "(941) 861-6200",
    description: "Fresh produce and local goods",
    details: "Open every Saturday from 8am-1pm year-round"
  },
  {
    id: 7,
    name: "Spring Nature Walk - Myakka River",
    category: "Recreation",
    date: "2026-03-15",
    time: "9:00 AM",
    location: "Myakka River State Park",
    contact: "(941) 361-6511",
    description: "Guided nature walk with wildlife viewing",
    details: "Moderate difficulty, about 2 hours. Free with park admission"
  },
  {
    id: 8,
    name: "Community Education Workshop Series",
    category: "Education",
    date: "2026-03-20",
    time: "2:00 PM",
    location: "Sarasota Central Library",
    contact: "(941) 861-1110",
    description: "Free workshops on financial literacy, technology, and more",
    details: "Topics change weekly. Registration recommended"
  },

  // April Events
  {
    id: 9,
    name: "Sarasota Bay Cleanup Day",
    category: "Community",
    date: "2026-04-04",
    time: "8:00 AM",
    location: "Multiple beach locations",
    contact: "(941) 349-1922",
    description: "Community volunteer effort to clean local waterways",
    details: "Tools and gloves provided. All ages welcome"
  },
  {
    id: 10,
    name: "Easter Celebration in the Park",
    category: "Recreation",
    date: "2026-04-09",
    time: "10:00 AM",
    location: "Centennial Park",
    contact: "(941) 861-6200",
    description: "Family-friendly Easter egg hunt and activities",
    details: "Egg hunts by age group, face painting, food"
  },
  {
    id: 11,
    name: "Art Therapy Workshop",
    category: "Health",
    date: "2026-04-16",
    time: "3:00 PM",
    location: "Sarasota Community Alliance",
    contact: "(941) 951-8811",
    description: "Free art therapy session for stress relief",
    details: "All supplies provided. Limited to 20 participants"
  },
  {
    id: 12,
    name: "Entrepreneurs Meetup",
    category: "Education",
    date: "2026-04-22",
    time: "5:30 PM",
    location: "Innovation Hub Sarasota",
    contact: "(941) 927-9494",
    description: "Network with other entrepreneurs and business owners",
    details: "Light refreshments provided"
  },

  // May Events
  {
    id: 13,
    name: "Memorial Day Parade",
    category: "Community",
    date: "2026-05-25",
    time: "10:00 AM",
    location: "Main Street, Sarasota",
    contact: "(941) 861-6200",
    description: "Community parade honoring veterans",
    details: "Festivities all day. Free parking at select locations"
  },
  {
    id: 14,
    name: "Senior Wellness Fair",
    category: "Health",
    date: "2026-05-10",
    time: "9:00 AM",
    location: "Sarasota Senior Friendship Centers",
    contact: "(941) 953-2050",
    description: "Health resources and activities for seniors",
    details: "Free wellness checks, fitness classes, resource booths"
  },
  {
    id: 15,
    name: "Youth Basketball League Start",
    category: "Sports",
    date: "2026-05-15",
    time: "4:00 PM",
    location: "Multiple gymnasiums",
    contact: "(941) 861-6200",
    description: "Summer basketball league for youth ages 8-18",
    details: "Registration deadline April 30"
  },

  // June Events
  {
    id: 16,
    name: "Summer Reading Challenge Kickoff",
    category: "Education",
    date: "2026-06-01",
    time: "2:00 PM",
    location: "Sarasota Central Library",
    contact: "(941) 861-1110",
    description: "Kids summer reading program launch",
    details: "Sign up now for free summer books and prizes"
  },
  {
    id: 17,
    name: "Community Concert Series - Summer",
    category: "Cultural",
    date: "2026-06-05",
    time: "7:00 PM",
    location: "Centennial Park Amphitheater",
    contact: "(941) 365-5454",
    description: "Live music performances every Friday night",
    details: "Bring chairs or blankets. Concessions available"
  },
  {
    id: 18,
    name: "Sarasota Pride Celebration",
    category: "Community",
    date: "2026-06-20",
    time: "12:00 PM",
    location: "Burns Avenue, downtown Sarasota",
    contact: "(941) 365-1900",
    description: "Community celebration of diversity and inclusion",
    details: "Parade, entertainment, food, and resources"
  },
  {
    id: 19,
    name: "Free Summer Movie Nights",
    category: "Recreation",
    date: "2026-06-12",
    time: "8:30 PM",
    location: "Centennial Park",
    contact: "(941) 861-6200",
    description: "Outdoor movie screenings every Friday",
    details: "Bring your family. Concessions available"
  },

  // July Events
  {
    id: 20,
    name: "Independence Day Celebration",
    category: "Community",
    date: "2026-07-04",
    time: "4:00 PM",
    location: "Lido Key Beach",
    contact: "(941) 861-5000",
    description: "Fireworks, music, and family activities",
    details: "Arrive early for good viewing spots"
  },
  {
    id: 21,
    name: "Youth Job Training Program",
    category: "Education",
    date: "2026-07-08",
    time: "9:00 AM",
    location: "CareerSource Suncoast",
    contact: "(941) 309-7600",
    description: "Summer job training for high school students",
    details: "Free program with job placement assistance"
  },
  {
    id: 22,
    name: "Water Safety Workshop for Kids",
    category: "Health",
    date: "2026-07-18",
    time: "10:00 AM",
    location: "Siesta Key Beach",
    contact: "(941) 861-2900",
    description: "Swimming and water safety lessons",
    details: "Ages 5-12. Free workshop"
  },

  // August Events
  {
    id: 23,
    name: "Back to School Fair",
    category: "Education",
    date: "2026-08-01",
    time: "10:00 AM",
    location: "Sarasota Convention Center",
    contact: "(941) 861-6300",
    description: "School supplies, immunizations, and resource booths",
    details: "Free supplies for low-income families"
  },
  {
    id: 24,
    name: "Community Resource Fair",
    category: "Community",
    date: "2026-08-15",
    time: "1:00 PM",
    location: "Centennial Park",
    contact: "(941) 861-6200",
    description: "Meet local nonprofits and service providers",
    details: "Free resources, activities, and information"
  },

  // September Events
  {
    id: 25,
    name: "Labor Day Celebration",
    category: "Community",
    date: "2026-09-07",
    time: "11:00 AM",
    location: "Centennial Park",
    contact: "(941) 861-6200",
    description: "Community celebration of workers",
    details: "BBQ, entertainment, family activities"
  },
  {
    id: 26,
    name: "Health & Wellness Expo",
    category: "Health",
    date: "2026-09-12",
    time: "9:00 AM",
    location: "Sarasota Memorial Hospital",
    contact: "(941) 917-9000",
    description: "Health screenings and wellness resources",
    details: "Free health checks, fitness demonstrations"
  },
  {
    id: 27,
    name: "Volunteer Orientation",
    category: "Community",
    date: "2026-09-20",
    time: "10:00 AM",
    location: "Sarasota County Volunteer Center",
    contact: "(941) 341-9500",
    description: "Learn about volunteer opportunities",
    details: "Open to anyone interested in giving back"
  },

  // October Events
  {
    id: 28,
    name: "Fall Festival Downtown",
    category: "Cultural",
    date: "2026-10-03",
    time: "10:00 AM",
    location: "Main Street, Sarasota",
    contact: "(941) 365-5454",
    description: "Fall celebration with crafts, food, and entertainment",
    details: "Family-friendly activities all day"
  },
  {
    id: 29,
    name: "Halloween Trick-or-Treat Safety",
    category: "Community",
    date: "2026-10-25",
    time: "2:00 PM",
    location: "Fire Station downtown",
    contact: "(941) 861-5000",
    description: "Trick-or-treat safety tips and costume ideas",
    details: "Fire safety education for kids"
  },
  {
    id: 30,
    name: "Fall Farmers Market continues",
    category: "Community",
    date: "2026-10-10",
    time: "8:00 AM",
    location: "Fifth Avenue",
    contact: "(941) 861-6200",
    description: "Seasonal produce and fall items",
    details: "Every Saturday through November"
  },

  // November Events
  {
    id: 31,
    name: "Thanksgiving Food Drive",
    category: "Community",
    date: "2026-11-15",
    time: "10:00 AM",
    location: "Sarasota Food Bank",
    contact: "(941) 330-9505",
    description: "Help provide Thanksgiving meals to families in need",
    details: "Donations needed. Volunteers welcome"
  },
  {
    id: 32,
    name: "Sarasota Film Festival",
    category: "Cultural",
    date: "2026-11-20",
    time: "Various",
    location: "Multiple theaters",
    contact: "(941) 364-9514",
    description: "International film festival celebration",
    details: "Screenings and events all month"
  },
  {
    id: 33,
    name: "Holiday Market Opens",
    category: "Community",
    date: "2026-11-01",
    time: "10:00 AM",
    location: "Main Street, Sarasota",
    contact: "(941) 365-5454",
    description: "Holiday shopping with local vendors",
    details: "Open through December 24"
  },

  // December Events
  {
    id: 34,
    name: "Holiday Lights Festival",
    category: "Cultural",
    date: "2026-12-01",
    time: "6:00 PM",
    location: "Centennial Park",
    contact: "(941) 861-6200",
    description: "Winter holiday celebration with lights",
    details: "Nightly through January 1"
  },
  {
    id: 35,
    name: "Holiday Toy Drive",
    category: "Community",
    date: "2026-12-05",
    time: "9:00 AM",
    location: "Multiple locations",
    contact: "(941) 951-8811",
    description: "Community toy donation for families in need",
    details: "Drop-off locations throughout Sarasota"
  },
  {
    id: 36,
    name: "New Year's Eve Celebration",
    category: "Community",
    date: "2026-12-31",
    time: "8:00 PM",
    location: "Downtown Sarasota",
    contact: "(941) 861-6200",
    description: "Community celebration to ring in the new year",
    details: "Fireworks at midnight"
  },

  // Recurring/Ongoing Events
  {
    id: 37,
    name: "Weekly Farmers Market",
    category: "Community",
    date: "2026-01-09",
    time: "8:00 AM",
    location: "Fifth Avenue, downtown Sarasota",
    contact: "(941) 861-6200",
    description: "Fresh produce and local goods every Saturday",
    details: "Year-round market"
  },
  {
    id: 38,
    name: "Community Exercise Class",
    category: "Health",
    date: "2026-01-06",
    time: "9:00 AM",
    location: "Centennial Park",
    contact: "(941) 861-6200",
    description: "Free fitness classes for all ages",
    details: "Monday, Wednesday, Friday mornings"
  },
  {
    id: 39,
    name: "Library Story Time",
    category: "Education",
    date: "2026-01-08",
    time: "10:30 AM",
    location: "Sarasota Central Library",
    contact: "(941) 861-1110",
    description: "Children's story hour and activities",
    details: "Tuesday and Thursday mornings"
  },
  {
    id: 40,
    name: "Free Legal Clinic",
    category: "Education",
    date: "2026-01-15",
    time: "2:00 PM",
    location: "Legal Aid Society of Sarasota",
    contact: "(941) 955-3354",
    description: "Free legal consultation for low-income residents",
    details: "First Thursday of each month"
  }
];
