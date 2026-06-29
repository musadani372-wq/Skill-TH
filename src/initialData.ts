import { User, Gig, Order, Ticket, Review } from './types';

export const PRESEEDED_USERS: User[] = [
  {
    email: 'tehzeebsherazi3@gmail.com',
    role: 'admin',
    profile: null,
    isBlocked: false,
    joinDate: '2026-06-01',
    warnings: []
  },
  {
    email: 'seller1@skillth.com',
    role: 'seller',
    profile: {
      fullName: 'Muhammad Ali',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      location: 'Pakistan',
      phone: '03001234567',
      cnicNumber: '35201-1234567-1',
      cnicFront: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=150',
      cnicBack: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=150',
      dob: '1995-08-15',
      gender: 'Male',
      title: 'Full Stack Web Developer & Designer',
      skills: 'React, Node.js, Express, UI Design, WordPress',
      bio: 'Expert designer and programmer from Lahore, Pakistan. Delivering top quality services with absolute customer satisfaction.',
      bankAccount: 'PK12ALPH0000001234567890',
      bankName: 'Alfalah Bank',
      accountHolder: 'Muhammad Ali',
      jazzCash: '03001234567',
      easyPaisa: '03001234567'
    },
    isBlocked: false,
    joinDate: '2026-06-02',
    warnings: []
  },
  {
    email: 'seller2@skillth.com',
    role: 'seller',
    profile: {
      fullName: 'Ayesha Khan',
      profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      location: 'Pakistan',
      phone: '03217654321',
      cnicNumber: '42101-7654321-2',
      cnicFront: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=150',
      cnicBack: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=150',
      dob: '1998-11-22',
      gender: 'Female',
      title: 'Expert Content Writer & Translator',
      skills: 'Urdu Content, Article Writing, Creative Writing, Translation',
      bio: 'Professional writer specialized in SEO articles, translations and creative copy tailored for your local and international audiences.',
      bankAccount: 'PK99MEZN0000009876543210',
      bankName: 'Meezan Bank',
      accountHolder: 'Ayesha Khan',
      jazzCash: '03217654321',
      easyPaisa: '03217654321'
    },
    isBlocked: false,
    joinDate: '2026-06-03',
    warnings: []
  },
  {
    email: 'buyer1@skillth.com',
    role: 'buyer',
    profile: null,
    isBlocked: false,
    joinDate: '2026-06-10',
    warnings: []
  }
];

const CATEGORIES = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle",
  "Data"
];

// Specific templates to make gigs look stunning and realistic
const TITLE_TEMPLATES: Record<string, string[]> = {
  "Graphics & Design": [
    "I will design a unique minimal business logo",
    "I will design modern UI/UX for your mobile app",
    "I will create professional social media flyers",
    "I will design high-converting landing pages",
    "I will create custom vector illustrations",
    "I will design elegant brochure and brand identities",
    "I will do professional Photoshop editing and retouching",
    "I will design stunning packaging for your product"
  ],
  "Digital Marketing": [
    "I will manage your professional SEO campaigns",
    "I will set up high-converting Facebook Ads",
    "I will be your social media marketing manager",
    "I will manage your Google Ads PPC campaign",
    "I will perform deep keyword research and strategy",
    "I will design email marketing automation sequences",
    "I will drive organic growth on Instagram",
    "I will optimize your YouTube channel for views"
  ],
  "Writing & Translation": [
    "I will write professional SEO blog articles",
    "I will write highly engaging website sales copy",
    "I will write resume, CV and cover letters",
    "I will translate between English, Urdu, and Arabic",
    "I will proofread and edit your English manuscript",
    "I will write creative scripts for YouTube videos",
    "I will draft legal documents and contracts",
    "I will write captivating product descriptions"
  ],
  "Video & Animation": [
    "I will edit high-quality YouTube videos",
    "I will create professional 2D animated explainer videos",
    "I will edit engaging TikToks, Reels and Shorts",
    "I will design stunning logo intro animations",
    "I will edit cinematic corporate video presentations",
    "I will do motion graphics design for ads",
    "I will create customized whiteboard animations",
    "I will do 3D product animation rendering"
  ],
  "Music & Audio": [
    "I will do professional voiceover in clear Urdu",
    "I will do professional voiceover in deep English",
    "I will produce custom lofi beats for your channel",
    "I will mix and master your audio song track",
    "I will edit and polish your podcast episodes",
    "I will compose acoustic background music",
    "I will create unique sound design and SFX",
    "I will translate and sync audio voice tracks"
  ],
  "Programming & Tech": [
    "I will build a responsive React web application",
    "I will develop custom WordPress sites",
    "I will build RESTful API backends with Express",
    "I will fix bugs in your javascript code",
    "I will develop custom Android applications",
    "I will write python scripts for task automation",
    "I will create complete e-commerce Shopify stores",
    "I will help configure your cloud hosting servers"
  ],
  "Business": [
    "I will write a complete custom business plan",
    "I will provide expert financial consulting",
    "I will provide legal and tax assistance in Pakistan",
    "I will do professional virtual assistant tasks",
    "I will manage your customer support helpline",
    "I will conduct comprehensive market research",
    "I will build automated business Excel trackers",
    "I will provide agile project management consulting"
  ],
  "Lifestyle": [
    "I will be your online personal fitness coach",
    "I will design custom healthy diet meal plans",
    "I will teach you conversational Urdu online",
    "I will provide professional relationship advice",
    "I will teach you basic guitar and piano lessons",
    "I will plan your complete custom travel itinerary",
    "I will provide online astrology reading advice",
    "I will design personalized gaming training guides"
  ],
  "Data": [
    "I will do fast data entry and web research",
    "I will design advanced SQL databases and schemas",
    "I will create stunning PowerBI dashboard charts",
    "I will clean your messy data files using Python",
    "I will build predictive machine learning models",
    "I will perform deep statistical data analysis",
    "I will set up web scraping automation bots",
    "I will do Excel spreadsheet data visualization"
  ]
};

const SUB_CATEGORIES: Record<string, string[]> = {
  "Graphics & Design": ["Logo Design", "UI/UX Design", "Social Media Graphics", "Illustrations", "Brand Identity", "Packaging Design"],
  "Digital Marketing": ["SEO", "Social Media Ads", "Social Media Management", "PPC Campaigns", "Email Marketing", "Video Marketing"],
  "Writing & Translation": ["Articles & Blog Posts", "Copywriting", "Resumes & CVs", "Translation", "Proofreading", "Creative Writing"],
  "Video & Animation": ["Video Editing", "2D Animated Explainer", "Short Form Video", "Intros & Outros", "Motion Graphics", "3D Animation"],
  "Music & Audio": ["Voice Over", "Beats & Instrumental", "Mixing & Mastering", "Podcast Editing", "Sound Design", "Audio Syncing"],
  "Programming & Tech": ["Web Development", "WordPress", "API Development", "Bug Fixing", "App Development", "Python Automation"],
  "Business": ["Business Plans", "Financial Consulting", "Legal Assistance", "Virtual Assistant", "Helpline Management", "Market Research"],
  "Lifestyle": ["Fitness Training", "Meal Planning", "Language Lessons", "Life Coaching", "Music Lessons", "Travel Planning"],
  "Data": ["Data Entry", "Database Design", "BI & Dashboards", "Data Cleaning", "Machine Learning", "Data Analysis"]
};

// Generative avatar URLs for visual flavor
const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
];

const GIG_IMAGES: Record<string, string[]> = {
  "Graphics & Design": ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600", "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600"],
  "Digital Marketing": ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600"],
  "Writing & Translation": ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600", "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600"],
  "Video & Animation": ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600", "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=600"],
  "Music & Audio": ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600", "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600"],
  "Programming & Tech": ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600", "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600"],
  "Business": ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"],
  "Lifestyle": ["https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600", "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600"],
  "Data": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600"]
};

const SELLER_NAMES = [
  "Muhammad Ali", "Ayesha Khan", "Zainab Bibi", "Hamza Shah", "Sana Malik",
  "Usman Dar", "Fatima Jamil", "Bilal Ahmed", "Tayyaba Sheikh", "Farhan Rizvi",
  "Hina Butt", "Waqas Qureshi", "Sidra Tul Muntaha", "Kamran Akmal", "Kiran Naz"
];

// Locations for Pakistan and international distribution
const LOCATIONS = [
  "Pakistan", "Pakistan", "Pakistan", "United Kingdom", "United States", "India", "Turkey", "Saudi Arabia"
];

// Languages
const LANGUAGES_LIST = [
  "English", "Urdu", "Arabic", "Spanish", "French", "Hindi", "Chinese", "Turkish"
];

const SELLER_LEVELS: ('New Seller' | 'Level 1' | 'Level 2' | 'Top Rated')[] = [
  'New Seller', 'Level 1', 'Level 2', 'Top Rated'
];

// Let's generate 20 Gigs for each of the 9 categories. Total Gigs = 180 Gigs!
const generatePreseededGigs = (): Gig[] => {
  const gigs: Gig[] = [];
  let idCounter = 1;

  for (const cat of CATEGORIES) {
    const templates = TITLE_TEMPLATES[cat] || ["I will provide expert services in " + cat];
    const subCats = SUB_CATEGORIES[cat] || ["General"];
    const imagesList = GIG_IMAGES[cat] || ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"];

    for (let i = 1; i <= 20; i++) {
      const templateTitle = templates[(i - 1) % templates.length];
      const subCat = subCats[(i - 1) % subCats.length];
      const sellerName = SELLER_NAMES[(i - 1) % SELLER_NAMES.length];
      const sellerEmail = `seller_${cat.replace(/[^a-zA-Z]/g, '').toLowerCase()}_${i}@skillth.com`;
      const level = SELLER_LEVELS[(i - 1) % SELLER_LEVELS.length];

      // Base price starts at 1,000 PKR to 50,000 PKR depending on i
      const basicPrice = Math.floor(1000 + (i * 2450));
      const stdPrice = Math.floor(basicPrice * 1.8);
      const premPrice = Math.floor(basicPrice * 3.2);

      const isFeatured = (idCounter % 9 === 0); // Make some featured!

      gigs.push({
        id: `gig_seeded_${idCounter}`,
        sellerEmail,
        sellerName,
        sellerAvatar: AVATAR_URLS[(i - 1) % AVATAR_URLS.length],
        title: `${templateTitle} - Batch ${i}`,
        description: `Are you looking for top-notch expert services in ${cat} (${subCat})? Look no further! I am a professional freelancer with over 5 years of industry-grade experience. This gig guarantees standard quality, custom solutions, fast delivery times, and 100% active communication. We offer professional support to ensure your product hits high parameters.\n\nWhat you will receive:\n- High speed performance\n- Fully responsive output\n- Detailed analysis documentation\n- Constant updates and premium assets.\n\nLet's coordinate on details before placing your order!`,
        category: cat,
        subCategory: subCat,
        isFeatured,
        packages: {
          basic: {
            title: "Basic Kickstart Pack",
            description: `A starter package designed to launch your core requirements with 1 custom variant and 1 standard concept.`,
            price: basicPrice,
            deliveryTime: Math.max(1, (i % 3) + 1),
            revisions: Math.max(1, i % 5)
          },
          standard: {
            title: "Standard Professional Suite",
            description: `Full implementation with commercial rights, fast feedback loops, high definition source assets, and 2 customized concepts.`,
            price: stdPrice,
            deliveryTime: Math.max(2, (i % 5) + 2),
            revisions: Math.max(2, (i % 7) + 1)
          },
          premium: {
            title: "Ultimate Elite Enterprise Bundle",
            description: `Premium comprehensive solution. VIP live priority support, complete source files, unlimited tweaks, custom animations, and expert documentation.`,
            price: premPrice,
            deliveryTime: Math.max(3, (i % 10) + 3),
            revisions: 99
          }
        },
        requirements: "Please provide detailed files, copy documents, or references of what you expect us to create.",
        requirementsList: [
          { question: "What is your main target audience or brand goal?", type: "text" },
          { question: "Do you have existing style guidelines or files?", type: "file" }
        ],
        images: [
          imagesList[i % imagesList.length],
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
        ],
        status: idCounter % 15 === 0 ? 'Pending Approval' : 'Approved', // Pre-approve most so they are searchable!
        rating: parseFloat((4.2 + (i % 9) * 0.1).toFixed(1)),
        reviewCount: (i * 3) + 2,
        searchTags: [cat.split(' ')[0], subCat.split(' ')[0], "expert", "best"],
        createdAt: `2026-06-${Math.min(28, Math.max(1, i))}`
      });

      // Also let's register the dummy seller inside PRESEEDED_USERS if not exists
      // But we can do that lazily in App.tsx during init!
      idCounter++;
    }
  }

  return gigs;
};

export const PRESEEDED_GIGS: Gig[] = [];

// Setup some mock reviews too
const generatePreseededReviews = (): Record<string, Review[]> => {
  return {};
};

export const PRESEEDED_REVIEWS: Record<string, Review[]> = {};

// Preseeded Orders
export const PRESEEDED_ORDERS: Order[] = [];

export const PRESEEDED_TICKETS: Ticket[] = [];

export const FAQS = [
  {
    q: 'How does SkillTH work for Buyers and Sellers in Pakistan?',
    qUrdu: 'SkillTH پاکستان میں خریداروں اور فروخت کنندگان کے لیے کیسے کام کرتا ہے؟',
    a: 'SkillTH functions like Fiverr but with localized Pakistani features. Buyers browse gigs, make payments simulated with EasyPaisa/JazzCash, and track orders. Sellers register with CNIC, set up packages, and receive earnings directly in their Bank, JazzCash, or EasyPaisa accounts.',
    aUrdu: 'سکل ٹی ایچ فائور کی طرح کام کرتا ہے لیکن اس میں مقامی پاکستانی خصوصیات ہیں۔ خریدار گگز کو براؤز کرتے ہیں، ایزی پیسہ/جاز کیش سے فرضی ادائیگی کرتے ہیں اور آرڈرز کو ٹریک کرتے ہیں۔ فروخت کنندگان اپنے شناختی کارڈ (CNIC) کے ساتھ رجسٹر ہوتے ہیں، پیکجز بناتے ہیں اور اپنی رقم براہ راست بینک، جاز کیش یا ایزی پیسہ میں حاصل کرتے ہیں۔'
  },
  {
    q: 'Why is my CNIC card number and photos required to sell?',
    qUrdu: 'فروخت کرنے کے لیے میرا شناختی کارڈ نمبر اور تصاویر کیوں ضروری ہیں؟',
    a: 'To maintain extreme trust and absolute safety on SkillTH, we verify every seller’s identity using their CNIC (Computerized National Identity Card) before they can create or offer gigs. This ensures all freelancers are verified citizens and prevents scams.',
    aUrdu: 'سکل ٹی ایچ پر مکمل بھروسہ اور حفاظت کو برقرار رکھنے کے لیے، ہم ہر سیلر کی شناخت ان کے شناختی کارڈ (CNIC) کے ذریعے تصدیق کرتے ہیں۔ اس سے یہ یقینی بنتا ہے کہ تمام فری لانسرز تصدیق شدہ شہری ہیں اور دھوکہ دہی سے بچا جا سکتا ہے۔'
  },
  {
    q: 'How much platform fee is deducted on transactions?',
    qUrdu: 'لین دین پر کتنی پلیٹ فارم فیس کٹوتی ہوتی ہے؟',
    a: 'SkillTH charges a transparent 10% platform commission on each completed order. Additionally, buyers pay a 5% platform service fee on top of the gig price. For example, on a Rs. 1,000 gig, the buyer pays Rs. 1,050 and the seller receives Rs. 900, generating a total of 15% platform earnings.',
    aUrdu: 'سکل ٹی ایچ ہر مکمل ہونے والے آرڈر پر سیلر سے 10 فیصد اور خریدار سے اضافی 5 فیصد فیس وصول کرتا ہے۔ مثال کے طور پر، 1,000 روپے کی گگ پر، خریدار 1,050 روپے ادا کرتا ہے اور سیلر کو 900 روپے ملتے ہیں، جس سے مجموعی طور پر 15 فیصد پلیٹ فارم کی آمدنی بنتی ہے۔'
  },
  {
    q: 'Can I withdraw my earnings directly to JazzCash or EasyPaisa?',
    qUrdu: 'کیا میں اپنی رقم براہ راست جاز کیش یا ایزی پیسہ میں نکلوا سکتا ہوں؟',
    a: 'Yes! Sellers can set up their Bank Accounts, JazzCash numbers, or EasyPaisa accounts. Once an order is marked as Completed and has cleared the 7-day holding escrow, the verified funds can be requested for instant payout through any of these channels.',
    aUrdu: 'جی ہاں! فروخت کنندگان اپنے بینک اکاؤنٹ، جاز کیش یا ایزی پیسہ اکاؤنٹ کو سیٹ اپ کر سکتے ہیں۔ آرڈر مکمل ہونے اور 7 دن کا ہولڈنگ پیریڈ ختم ہونے کے بعد، رقم جاز کیش یا ایزی پیسہ میں منتقل کی جا سکتی ہے۔'
  }
];
