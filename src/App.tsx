import React, { useState, useEffect } from 'react';
import { User, Gig, Order, Ticket, ChatThread, SellerProfile, Packages, Review, AdminNotification } from './types';
import { 
  PRESEEDED_USERS, 
  PRESEEDED_GIGS, 
  PRESEEDED_REVIEWS, 
  PRESEEDED_ORDERS, 
  PRESEEDED_TICKETS, 
  FAQS 
} from './initialData';
import { PolicyPages } from './components/PolicyPages';
import { SupportSystem } from './components/SupportSystem';
import { SellerRegistration } from './components/SellerRegistration';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderSystem } from './components/OrderSystem';
import { UserSettings } from './components/UserSettings';
import { AboutUs } from './components/AboutUs';
import { GigCreationForm } from './components/GigCreationForm';
import { 
  Globe, 
  Search, 
  ChevronDown, 
  LogOut, 
  Settings, 
  User as UserIcon, 
  ShoppingBag, 
  Shield, 
  SlidersHorizontal,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  ExternalLink,
  Smartphone
} from 'lucide-react';

// Multi-language Translation Dictionaries
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    brand: "SkillTH",
    heroTitle: "Find the perfect freelance services for your business in Pakistan",
    heroSub: "Logo Design, WordPress, SEO Audit, Urdu Translation",
    searchPlaceholder: "Search for any service...",
    searchBtn: "Search",
    popularGigs: "Popular Freelance Gigs",
    startingAt: "Starting at",
    howItWorks: "How It Works",
    support: "Help & Support",
    joinBtn: "Join SkillTH",
    signOut: "Sign Out",
    adminDashboard: "Admin Panel",
    sellerDashboard: "Seller Center",
    myOrders: "My Orders",
    createGig: "Create Gig",
    language: "Language",
    helpline: "Helpline",
    policies: "Policies",
    buyerLabel: "Buyer Mode",
    sellerLabel: "Seller Mode",
    activeCategory: "Category Filter",
    budget: "Budget Range",
    delivery: "Delivery Speed",
    all: "All Categories",
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    myGigs: "My Gigs",
    earnings: "Earnings",
    messages: "Messages",
    settings: "Settings"
  },
  'en-US': {
    brand: "SkillTH",
    heroTitle: "Find the perfect freelance services for your business in Pakistan",
    heroSub: "Logo Design, WordPress, SEO Audit, Urdu Translation",
    searchPlaceholder: "Search for any service...",
    searchBtn: "Search",
    popularGigs: "Our Favorite Gigs - Filtered by Color & Design",
    startingAt: "Starting at",
    howItWorks: "How It Works",
    support: "Help & Support",
    joinBtn: "Join SkillTH",
    signOut: "Sign Out",
    adminDashboard: "Admin Panel",
    sellerDashboard: "Seller Center",
    myOrders: "My Orders",
    createGig: "Create Gig",
    language: "Language",
    helpline: "Helpline",
    policies: "Policies",
    buyerLabel: "Buyer Mode",
    sellerLabel: "Seller Mode",
    activeCategory: "Category Filter",
    budget: "Budget Range",
    delivery: "Delivery Speed",
    all: "All Categories",
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    myGigs: "My Gigs",
    earnings: "Earnings",
    messages: "Messages",
    settings: "Organize Settings"
  },
  'en-GB': {
    brand: "SkillTH",
    heroTitle: "Find the perfect freelance services for your business in Pakistan",
    heroSub: "Logo Design, WordPress, SEO Audit, Urdu Translation",
    searchPlaceholder: "Search for any service...",
    searchBtn: "Search",
    popularGigs: "Our Favourite Gigs - Filtered by Colour & Design",
    startingAt: "Starting at",
    howItWorks: "How It Works",
    support: "Help & Support",
    joinBtn: "Join SkillTH",
    signOut: "Sign Out",
    adminDashboard: "Admin Panel",
    sellerDashboard: "Seller Center",
    myOrders: "My Orders",
    createGig: "Create Gig",
    language: "Language",
    helpline: "Helpline",
    policies: "Policies",
    buyerLabel: "Buyer Mode",
    sellerLabel: "Seller Mode",
    activeCategory: "Category Filter",
    budget: "Budget Range",
    delivery: "Delivery Speed",
    all: "All Categories",
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    myGigs: "My Gigs",
    earnings: "Earnings",
    messages: "Messages",
    settings: "Organise Settings"
  },
  'en-simple': {
    brand: "SkillTH",
    heroTitle: "Find easy and great helper jobs for your work in Pakistan",
    heroSub: "Simple Logos, WordPress Help, Article Writing, Easy Talks",
    searchPlaceholder: "Search for any easy work...",
    searchBtn: "Find",
    popularGigs: "Jobs You Like - Easy Design & Small Help",
    startingAt: "Starts at",
    howItWorks: "How to Use",
    support: "Get Simple Help",
    joinBtn: "Join Here",
    signOut: "Exit",
    adminDashboard: "Admin Controls",
    sellerDashboard: "Seller Center",
    myOrders: "My Buyings",
    createGig: "Make New Job",
    language: "Simple Talk",
    helpline: "Call Us",
    policies: "Our Rules",
    buyerLabel: "Buying Mode",
    sellerLabel: "Working Mode",
    activeCategory: "Job Types",
    budget: "Price Choice",
    delivery: "Time Choice",
    all: "All Work Types",
    welcome: "Hello",
    login: "Sign In",
    signup: "Sign Up",
    myGigs: "My Jobs",
    earnings: "My Money",
    messages: "Talks",
    settings: "Easy Setup"
  },
  ur: {
    brand: "سکل ٹی ایچ",
    heroTitle: "پاکستان میں اپنے کاروبار کے لیے بہترین فری لانس خدمات تلاش کریں",
    heroSub: "لوگو ڈیزائن، ورڈپریس، ایس ای او، اردو ترجمہ",
    searchPlaceholder: "کوئی بھی سروس تلاش کریں...",
    searchBtn: "تلاش کریں",
    popularGigs: "مقبول پاکستانی گگز (Gigs)",
    startingAt: "شروعاتی قیمت",
    howItWorks: "کام کا طریقہ",
    support: "مدد اور سپورٹ",
    joinBtn: "سائن ان کریں",
    signOut: "لاگ آؤٹ",
    adminDashboard: "ایڈمن پینل",
    sellerDashboard: "سیلر ڈیش بورڈ",
    myOrders: "میرے آرڈرز",
    createGig: "نیا گگ بنائیں",
    language: "زبان",
    helpline: "ہیلپ لائن",
    policies: "شرائط و پالیسیاں",
    buyerLabel: "خریدار موڈ",
    sellerLabel: "سیلر موڈ",
    activeCategory: "کیٹیگری فلٹر",
    budget: "بجٹ کی رینج",
    delivery: "ڈلیوری کا وقت",
    all: "تمام کیٹیگریز",
    welcome: "خوش آمدید",
    login: "لاگ ان",
    signup: "سائن اپ",
    myGigs: "میرے گگز",
    earnings: "میری کمائی",
    messages: "پیغامات",
    settings: "سیٹنگز"
  },
  ar: {
    brand: "SkillTH",
    heroTitle: "العثور على خدمات العمل الحر المثالية لعملك في باكستان",
    heroSub: "تصميم شعار ، ووردبريس ، تحسين محركات البحث ، ترجمة أردو",
    searchPlaceholder: "ابحث عن أي خدمة...",
    searchBtn: "بحث",
    popularGigs: "خدمات العمل الحر الشائعة",
    startingAt: "تبدأ من",
    howItWorks: "كيف يعمل",
    support: "المساعدة والدعم",
    joinBtn: "انضم الآن",
    signOut: "تسجيل الخروج",
    adminDashboard: "لوحة التحكم",
    sellerDashboard: "مركز البائع",
    myOrders: "طلباتي",
    createGig: "إنشاء خدمة جديدة",
    language: "اللغة",
    helpline: "خط المساعدة",
    policies: "السياسات",
    buyerLabel: "وضع المشتري",
    sellerLabel: "وضع البائع",
    activeCategory: "تصفية الفئات",
    budget: "نطاق الميزانية",
    delivery: "سرعة التسليم",
    all: "جميع الفئات",
    welcome: "مرحباً",
    login: "تسجيل الدخول",
    signup: "التسجيل",
    myGigs: "خدماتي",
    earnings: "الأرباح",
    messages: "الرسائل",
    settings: "الإعدادات"
  },
  hi: {
    brand: "SkillTH",
    heroTitle: "पाकिस्तान में अपने व्यवसाय के लिए सर्वोत्तम फ्रीलांस सेवाएं खोजें",
    heroSub: "लोगो डिज़ाइन, वर्डप्रेस, एसईओ ऑडिट, उर्दू अनुवाद",
    searchPlaceholder: "किसी भी सेवा की खोज करें...",
    searchBtn: "खोजें",
    popularGigs: "लोकप्रिय फ्रीलांस गिग्स",
    startingAt: "प्रारंभिक मूल्य",
    howItWorks: "कैसे काम करता है",
    support: "सहायता और सहायता",
    joinBtn: "शामिल हों",
    signOut: "साइन आउट",
    adminDashboard: "एडमिन पैनल",
    sellerDashboard: "विक्रेता केंद्र",
    myOrders: "मेरे आदेश",
    createGig: "गिग बनाएं",
    language: "भाषा",
    helpline: "हेल्पलाइन",
    policies: "नीतियां",
    buyerLabel: "क्रेता मोड",
    sellerLabel: "विक्रेता मोड",
    activeCategory: "श्रेणी फ़िल्टर",
    budget: "बजट रेंज",
    delivery: "वितरण गति",
    all: "सभी श्रेणियां",
    welcome: "स्वागत हे",
    login: "लॉग इन",
    signup: "साइन अप",
    myGigs: "मेरे गिग्स",
    earnings: "मेरी कमाई",
    messages: "संदेश",
    settings: "सेटिंग्स"
  },
  fr: {
    brand: "SkillTH",
    heroTitle: "Trouvez les services freelance parfaits pour votre entreprise au Pakistan",
    heroSub: "Design de Logo, WordPress, Audit SEO, Traduction Ourdou",
    searchPlaceholder: "Rechercher un service...",
    searchBtn: "Chercher",
    popularGigs: "Gigs Populaires",
    startingAt: "À partir de",
    howItWorks: "Comment ça marche",
    support: "Aide & Support",
    joinBtn: "S'inscrire",
    signOut: "Se déconnecter",
    adminDashboard: "Panel Admin",
    sellerDashboard: "Centre Vendeur",
    myOrders: "Mes Commandes",
    createGig: "Créer un Gig",
    language: "Langue",
    helpline: "Assistance",
    policies: "Politiques",
    buyerLabel: "Mode Acheteur",
    sellerLabel: "Mode Vendeur",
    activeCategory: "Filtrer les Catégories",
    budget: "Budget",
    delivery: "Délai de livraison",
    all: "Toutes Catégories",
    welcome: "Bienvenue",
    login: "Connexion",
    signup: "Inscription",
    myGigs: "Mes Services",
    earnings: "Revenus",
    messages: "Messages",
    settings: "Paramètres"
  },
  es: {
    brand: "SkillTH",
    heroTitle: "Encuentre los servicios freelance perfectos para su negocio en Pakistán",
    heroSub: "Diseño de Logotipo, WordPress, Auditoría SEO, Traducción al Urdu",
    searchPlaceholder: "Buscar cualquier servicio...",
    searchBtn: "Buscar",
    popularGigs: "Servicios Populares",
    startingAt: "Desde",
    howItWorks: "Cómo funciona",
    support: "Ayuda y Soporte",
    joinBtn: "Unirse",
    signOut: "Cerrar sesión",
    adminDashboard: "Panel de Admin",
    sellerDashboard: "Centro de Vendedor",
    myOrders: "Mis Pedidos",
    createGig: "Crear Servicio",
    language: "Idioma",
    helpline: "Línea de ayuda",
    policies: "Políticas",
    buyerLabel: "Modo Comprador",
    sellerLabel: "Modo Vendedor",
    activeCategory: "Filtro de Categorías",
    budget: "Rango de Presupuesto",
    delivery: "Tiempo de entrega",
    all: "Todas las categorías",
    welcome: "Bienvenido",
    login: "Iniciar sesión",
    signup: "Registrarse",
    myGigs: "Mis Servicios",
    earnings: "Ganancias",
    messages: "Mensajes",
    settings: "Configuración"
  },
  zh: {
    brand: "SkillTH",
    heroTitle: "在巴基斯坦为您的业务寻找完美的自由职业服务",
    heroSub: "标志设计、WordPress、SEO审计、乌尔都语翻译",
    searchPlaceholder: "搜索任何服务...",
    searchBtn: "搜索",
    popularGigs: "热门自由职业服务",
    startingAt: "起价",
    howItWorks: "工作原理",
    support: "帮助与支持",
    joinBtn: "加入我们",
    signOut: "退出登录",
    adminDashboard: "管理员面板",
    sellerDashboard: "卖家中心",
    myOrders: "我的订单",
    createGig: "发布服务",
    language: "语言",
    helpline: "服务热线",
    policies: "政策条款",
    buyerLabel: "买家模式",
    sellerLabel: "卖家模式",
    activeCategory: "分类过滤",
    budget: "预算范围",
    delivery: "交付时间",
    all: "所有分类",
    welcome: "欢迎",
    login: "登录",
    signup: "注册",
    myGigs: "我的服务",
    earnings: "收入",
    messages: "消息",
    settings: "设置"
  },
  tr: {
    brand: "SkillTH",
    heroTitle: "Pakistan'daki işletmeniz için mükemmel freelance hizmetleri bulun",
    heroSub: "Logo Tasarımı, WordPress, SEO Denetimi, Urduca Çeviri",
    searchPlaceholder: "Hizmet arayın...",
    searchBtn: "Ara",
    popularGigs: "Popüler Freelance İlanlar",
    startingAt: "Başlangıç fiyatı",
    howItWorks: "Nasıl Çalışır",
    support: "Destek ve Yardım",
    joinBtn: "Katıl",
    signOut: "Çıkış Yap",
    adminDashboard: "Yönetici Paneli",
    sellerDashboard: "Satıcı Merkezi",
    myOrders: "Siparişlerim",
    createGig: "Hizmet Oluştur",
    language: "Dil",
    helpline: "Destek Hattı",
    policies: "Politikalar",
    buyerLabel: "Alıcı Modu",
    sellerLabel: "Satıcı Modu",
    activeCategory: "Kategori Filtresi",
    budget: "Bütçe Aralığı",
    delivery: "Teslimat Süresi",
    all: "Tüm Kategoriler",
    welcome: "Hoş geldiniz",
    login: "Giriş Yap",
    signup: "Kayıt Ol",
    myGigs: "Hizmetlerim",
    earnings: "Kazançlar",
    messages: "Mesajlar",
    settings: "Ayarlar"
  }
};

const LANGUAGES_SUPPORTED = [
  { code: 'en-US', label: '🇺🇸 English (US)', dir: 'ltr' },
  { code: 'en-GB', label: '🇬🇧 English (UK)', dir: 'ltr' },
  { code: 'en-simple', label: '🌍 English (Simple)', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ur', label: 'اردو (Urdu)', dir: 'rtl' },
  { code: 'ar', label: 'عربي (Arabic)', dir: 'rtl' },
  { code: 'hi', label: 'हिंदी (Hindi)', dir: 'ltr' },
  { code: 'fr', label: 'Français (French)', dir: 'ltr' },
  { code: 'es', label: 'Español (Spanish)', dir: 'ltr' },
  { code: 'zh', label: '中文 (Chinese)', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe (Turkish)', dir: 'ltr' }
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

const SUB_CATEGORIES_MAP: Record<string, string[]> = {
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

export default function App() {
  // --- FIX 2: REMOVE FAKE/DEMO DATA BY DEFAULT ---
  // If not previously initialized or cleaned, reset to ensure database starts completely empty/clean.
  // Gigs, reviews, orders, tickets, and non-admin users must be completely empty until registered.
  if (!localStorage.getItem('skillth_cleaned_v5_pure')) {
    localStorage.removeItem('skillth_users');
    localStorage.removeItem('skillth_gigs');
    localStorage.removeItem('skillth_reviews');
    localStorage.removeItem('skillth_orders');
    localStorage.removeItem('skillth_tickets');
    localStorage.removeItem('skillth_chats');
    localStorage.removeItem('skillth_curr_user');
    localStorage.setItem('skillth_cleaned_v5_pure', 'true');
  }

  // --- Core Persistent Database States ---
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('skillth_users');
    // Start clean with only the designated administrator
    return saved ? JSON.parse(saved) : [
      {
        email: 'tehzeebsherazi3@gmail.com',
        role: 'admin',
        profile: null,
        isBlocked: false,
        joinDate: '2026-06-01',
        warnings: []
      }
    ];
  });

  const [gigs, setGigs] = useState<Gig[]>(() => {
    const saved = localStorage.getItem('skillth_gigs');
    return saved ? JSON.parse(saved) : []; // Starts 100% empty and clean
  });

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('skillth_reviews');
    return saved ? JSON.parse(saved) : {}; // Starts 100% empty and clean
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('skillth_orders');
    return saved ? JSON.parse(saved) : []; // Starts 100% empty and clean
  });

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('skillth_tickets');
    return saved ? JSON.parse(saved) : []; // Starts 100% empty and clean
  });

  const [chats, setChats] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('skillth_chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('skillth_curr_user');
    return saved ? JSON.parse(saved) : null;
  });

  // CHANGE 1: Multi-language selector state
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    return localStorage.getItem('skillth_lang') || 'en';
  });

  // CHANGE 2: Account dropdown state
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false);

  // CHANGE 3: Expanded Fiverr-like Search Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterSubCategory, setFilterSubCategory] = useState<string>('All');
  const [filterDeliveryTime, setFilterDeliveryTime] = useState<string>('Anytime');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [filterSellerLevel, setFilterSellerLevel] = useState<string>('All');
  const [filterLanguage, setFilterLanguage] = useState<string>('Any');
  const [filterLocation, setFilterLocation] = useState<string>('Any');
  const [sortBy, setSortBy] = useState<string>('Best Selling');

  // CHANGE 4: Separate page Pagination variables (minimum 20 Gigs per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gigsPerPage = 20;

  const [searchFocused, setSearchFocused] = useState(false);
  const [heroSearchFocused, setHeroSearchFocused] = useState(false);

  // Active View router
  const [currentView, setCurrentViewRaw] = useState<'home' | 'gig_detail' | 'checkout' | 'orders' | 'support' | 'policies' | 'seller_onboarding' | 'seller_dashboard' | 'admin_dashboard' | 'user_settings' | 'about'>('home');
  const [viewHistory, setViewHistory] = useState<string[]>(['home']);

  const setCurrentView = (view: typeof currentView) => {
    setViewHistory(prev => {
      if (view === 'home') {
        return ['home'];
      }
      if (prev[prev.length - 1] === view) {
        return prev;
      }
      return [...prev, view];
    });
    setCurrentViewRaw(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updated = [...viewHistory];
      updated.pop(); // remove current view
      const prevView = (updated[updated.length - 1] || 'home') as typeof currentView;
      setViewHistory(updated);
      setCurrentViewRaw(prevView);
    } else {
      setCurrentViewRaw('home');
      setViewHistory(['home']);
    }
  };

  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);
  const [selectedPackageTier, setSelectedPackageTier] = useState<'basic' | 'standard' | 'premium' | null>(null);

  // Web Audio API Sound Generator for Real-time Admin Notifications
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.log('AudioContext not allowed or not supported yet:', e);
    }
  };

  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(() => {
    const saved = localStorage.getItem('skillth_admin_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const handleMarkNotifAsRead = (id: string) => {
    setAdminNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isRead: true } : n);
      localStorage.setItem('skillth_admin_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearNotifs = () => {
    setAdminNotifications([]);
    localStorage.removeItem('skillth_admin_notifications');
  };

  // Authentication popups
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const [typedEmail, setTypedEmail] = useState('');

  // Gig creation inside Seller Dashboard
  const [showGigForm, setShowGigForm] = useState(false);

  // Direct Message overlay state
  const [activeChatSellerEmail, setActiveChatSellerEmail] = useState<string | null>(null);
  const [chatInputText, setChatInputText] = useState('');

  // ----------------- SYNCHRONIZATION WITH LOCALSTORAGE -----------------
  useEffect(() => {
    localStorage.setItem('skillth_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('skillth_gigs', JSON.stringify(gigs));
  }, [gigs]);

  useEffect(() => {
    localStorage.setItem('skillth_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('skillth_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('skillth_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('skillth_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('skillth_curr_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // CHANGE 1: Automatically persist language and toggle RTL direction
  useEffect(() => {
    localStorage.setItem('skillth_lang', selectedLanguage);
    const langObj = LANGUAGES_SUPPORTED.find(l => l.code === selectedLanguage);
    if (langObj) {
      document.documentElement.dir = langObj.dir;
    }
  }, [selectedLanguage]);

  // Translate shorthand helper
  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;
  const isRTL = selectedLanguage === 'ur' || selectedLanguage === 'ar';

  // Handle category sub-bar click
  const handleCategoryTabClick = (cat: string | null) => {
    setFilterCategory(cat || 'All');
    setFilterSubCategory('All');
    setCurrentPage(1);
    setCurrentView('home');
  };

  // Reset pagination on filter adjustments
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, filterSubCategory, filterDeliveryTime, minPrice, maxPrice, filterSellerLevel, filterLanguage, filterLocation, sortBy, searchQuery]);

  // ----------------- AUTHENTICATION FLOWS -----------------
  const handleGoogleLogin = (emailAddress: string) => {
    if (!emailAddress.trim().toLowerCase().endsWith('@gmail.com')) {
      alert(isRTL ? 'براہ کرم درست جی میل ایڈریس درج کریں۔' : 'Please enter a valid Gmail address (@gmail.com).');
      return;
    }

    const emailLower = emailAddress.trim().toLowerCase();

    // Admin login
    if (emailLower === 'tehzeebsherazi3@gmail.com') {
      const adminUser: User = {
        email: emailLower,
        role: 'admin',
        profile: null,
        isBlocked: false,
        joinDate: '2026-06-01',
        warnings: []
      };
      
      if (!users.some(u => u.email === emailLower)) {
        setUsers(prev => [...prev, adminUser]);
      }
      setCurrentUser(adminUser);
      setShowAuthModal(false);
      setCurrentView('admin_dashboard');
      return;
    }

    const existing = users.find(u => u.email === emailLower);
    if (existing) {
      if (existing.isBlocked) {
        alert("Your account has been suspended. Contact support@skillth.com");
        return;
      }
      setCurrentUser(existing);
      setShowAuthModal(false);
      setShowRoleSelect(true); // Never skip selection screen after login
    } else {
      // New user registration
      const newUser: User = {
        email: emailLower,
        role: 'buyer', // default role initially
        profile: null,
        isBlocked: false,
        joinDate: new Date().toISOString().split('T')[0],
        warnings: []
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setShowAuthModal(false);
      setShowRoleSelect(true); // Prompts role selection screen
    }
  };

  const handleRoleSelect = (role: 'buyer' | 'seller') => {
    if (!currentUser) return;
    setShowRoleSelect(false);

    const targetUser = users.find(u => u.email === currentUser.email);
    if (role === 'buyer') {
      const updated = { ...currentUser, role: 'buyer' as const, profile: targetUser?.profile || null };
      setUsers(prev => prev.map(u => u.email === currentUser.email ? updated : u));
      setCurrentUser(updated);
      setCurrentView('home');
    } else {
      // Join as Seller - complete profile check
      const hasCompleteProfile = !!(targetUser?.profile && targetUser.profile.fullName);
      
      if (hasCompleteProfile) {
        const updated = { ...currentUser, role: 'seller' as const, profile: targetUser.profile };
        setUsers(prev => prev.map(u => u.email === currentUser.email ? updated : u));
        setCurrentUser(updated);
        setCurrentView('seller_dashboard');
      } else {
        const updated = { ...currentUser, role: 'seller' as const, profile: null };
        setUsers(prev => prev.map(u => u.email === currentUser.email ? updated : u));
        setCurrentUser(updated);
        setCurrentView('seller_onboarding');
      }
    }
  };

  const handleSellerOnboardingSubmit = (profile: SellerProfile) => {
    if (!currentUser) return;
    const updatedUser: User = {
      ...currentUser,
      role: 'seller',
      profile: profile
    };
    setUsers(prev => prev.map(u => u.email === currentUser.email ? updatedUser : u));
    setCurrentUser(updatedUser);
    setCurrentView('seller_dashboard');
    alert(isRTL ? 'سیلر پروفائل کامیابی سے رجسٹر ہو گئی! اب آپ گگ بنا سکتے ہیں۔' : 'Freelancer profile verified! You can now publish your Gigs.');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setHeaderDropdownOpen(false);
    setCurrentView('home');
  };

  // ----------------- SANDBOX SEED DATA ENGINES -----------------
  const handleSeedDemoData = () => {
    // Inject dynamic 180 Gigs, users and orders for Fiverr-style paging & filter evaluations
    setUsers(PRESEEDED_USERS);
    setGigs(PRESEEDED_GIGS);
    setReviews(PRESEEDED_REVIEWS);
    setOrders(PRESEEDED_ORDERS);
    setTickets(PRESEEDED_TICKETS);
    alert('Sandbox populated successfully with 180 Gigs across 9 categories (20 per category), realistic reviews, active escrows, and preseeded test sellers!');
  };

  // ----------------- ADMIN DASHBOARD POWER HANDLERS -----------------
  const handleToggleBlockUser = (email: string) => {
    const updated = users.map(u => {
      if (u.email === email) {
        const isBlocked = !u.isBlocked;
        return { ...u, isBlocked };
      }
      return u;
    });
    setUsers(updated);
    
    const target = updated.find(u => u.email === email);
    if (target?.isBlocked) {
      alert(`✅ User ${email} has been suspended successfully.`);
    } else {
      alert(`✅ User ${email} has been unsuspended successfully.`);
    }

    if (currentUser?.email === email && target?.isBlocked) {
      handleSignOut();
      alert("Your account has been suspended. Contact support@skillth.com");
    }
  };

  const handleDeleteUser = (email: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?\nThis cannot be undone."
    );
    if (!confirmed) return;

    setUsers(prev => prev.filter(u => u.email !== email));
    if (currentUser?.email === email) {
      handleSignOut();
    }
    alert("✅ User deleted successfully");
  };

  const handleSendWarning = (email: string, warningText: string) => {
    setUsers(prev => prev.map(u => {
      if (u.email === email) {
        const currentWarnings = u.warnings || [];
        return {
          ...u,
          warnings: [...currentWarnings, warningText]
        };
      }
      return u;
    }));
    alert(`Warning sent successfully to ${email}`);
  };

  const handleApproveGig = (id: string) => {
    const gig = gigs.find(g => g.id === id);
    if (!gig) return;

    setGigs(prev => prev.map(g => g.id === id ? { ...g, status: 'Approved', rejectionReason: undefined } : g));
    alert(`✅ Gig Approved Successfully!\n📧 Email notification sent to seller (${gig.sellerEmail})`);
  };

  const handleRejectGig = (id: string, reason: string) => {
    const gig = gigs.find(g => g.id === id);
    if (!gig) return;

    setGigs(prev => prev.map(g => g.id === id ? { ...g, status: 'Rejected', rejectionReason: reason } : g));
    alert(`✅ Gig Rejected Successfully!\n📧 Email notification with reason: "${reason}" sent to seller (${gig.sellerEmail})`);
  };

  const handleToggleFeatureGig = (id: string) => {
    setGigs(prev => prev.map(g => g.id === id ? { ...g, isFeatured: !g.isFeatured } : g));
  };

  const handleRemoveGig = (id: string) => {
    setGigs(prev => prev.filter(g => g.id !== id));
    alert("✅ Gig removed successfully");
  };

  const handleForceCompleteOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Completed',
          completedAt: new Date().toISOString().split('T')[0],
          paymentStatus: 'Released' as const
        };
      }
      return o;
    }));
  };

  const handleCancelRefundOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Cancelled',
          paymentStatus: 'Refunded' as const
        };
      }
      return o;
    }));
  };

  const handleReleasePayment = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentStatus: 'Released' as const,
          paymentReleaseManually: true
        };
      }
      return o;
    }));
  };

  const handleHoldPayment = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentStatus: 'Disputed' as const
        };
      }
      return o;
    }));
    alert(`Escrow holding locked: ${reason}`);
  };

  const handleReplyTicket = (ticketId: string, replyText: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          replies: [...t.replies, { sender: 'admin', text: replyText, createdAt: new Date().toISOString().split('T')[0] }]
        };
      }
      return t;
    }));
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'Closed' as const };
      }
      return t;
    }));
  };

  const handleUpdateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  const handleUpdateTicketPriority = (ticketId: string, priority: Ticket['priority']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, priority } : t));
  };

  // ----------------- GIG CREATION FORM -----------------
  const handleCreateGigSubmit = (gigData: Partial<Gig>) => {
    if (!currentUser) return;

    const newGig: Gig = {
      id: `gig-${Date.now()}`,
      sellerEmail: currentUser.email,
      sellerName: currentUser.profile?.fullName || currentUser.email.split('@')[0],
      sellerAvatar: currentUser.profile?.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      title: gigData.title || '',
      description: gigData.description || '',
      category: gigData.category || 'Graphics & Design',
      subCategory: gigData.subCategory || '',
      searchTags: gigData.searchTags || [],
      packages: (gigData.packages as Packages) || {
        basic: { title: 'Basic Startup pack', description: 'Core work deliverables', price: 1500, deliveryTime: 3, revisions: 3 },
        standard: { title: 'Standard Pro Suite', description: 'Complete custom assets with revisions', price: 5000, deliveryTime: 5, revisions: 5 },
        premium: { title: 'Premium Elite Enterprise', description: 'Comprehensive delivery with source files & support', price: 12000, deliveryTime: 10, revisions: 99 }
      },
      requirements: gigData.requirements || '',
      requirementsList: gigData.requirementsList,
      faqs: gigData.faqs,
      images: gigData.images && gigData.images.length > 0 ? gigData.images : ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'],
      video: gigData.video,
      pdf: gigData.pdf,
      extraServices: gigData.extraServices,
      status: 'Pending Approval', // Default state for admin validation
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGigs(prev => [newGig, ...prev]);
    setShowGigForm(false);
    alert(isRTL 
      ? 'آپ کا گگ کامیابی سے جمع ہو گیا ہے۔ ایڈمن کی منظوری کے بعد لائیو ہوگا۔' 
      : 'Gig published! Awaiting Administrator approval before going live on search engines.'
    );
  };

  // ----------------- CHAT COMMUNICATION ENGINE -----------------
  const handleSendDirectMessage = () => {
    if (!currentUser || !activeChatSellerEmail || !chatInputText.trim()) return;

    const threadId = `${currentUser.email}_${activeChatSellerEmail}`;
    const newMessage = {
      sender: currentUser.role === 'seller' ? 'seller' : 'buyer',
      text: chatInputText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const existingThread = chats.find(c => c.id === threadId);
    if (existingThread) {
      setChats(prev => prev.map(c => {
        if (c.id === threadId) {
          return {
            ...c,
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      }));
    } else {
      const newThread: ChatThread = {
        id: threadId,
        buyerEmail: currentUser.email,
        sellerEmail: activeChatSellerEmail,
        messages: [newMessage]
      };
      setChats(prev => [...prev, newThread]);
    }

    setChatInputText('');

    // Simulated responsive automated freelancer dialogue response
    setTimeout(() => {
      const autoReply = {
        sender: 'seller',
        text: isRTL 
          ? 'السلام علیکم! آپ کا پیغام مل گیا ہے۔ میں جلد ہی آپ کو مکمل تفصیلات فراہم کروں گا۔ شکریہ!'
          : 'Assalamu Alaikum! Thanks for your message. I am looking over your job instructions and will respond shortly with custom options. Thanks!',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChats(prev => prev.map(c => {
        if (c.id === threadId) {
          return {
            ...c,
            messages: [...c.messages, autoReply]
          };
        }
        return c;
      }));
    }, 2000);
  };

  const activeChatThread = chats.find(
    c => (c.buyerEmail === currentUser?.email && c.sellerEmail === activeChatSellerEmail) || 
         (c.sellerEmail === currentUser?.email && c.buyerEmail === activeChatSellerEmail)
  );

  // ----------------- SUPPORT GATES -----------------
  const handleAddTicket = (subject: string, category: string, message: string) => {
    if (!currentUser) return;
    const newTkt: Ticket = {
      id: `tkt-${Date.now()}`,
      userEmail: currentUser.email,
      subject,
      category,
      message,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      replies: [
        {
          sender: 'system',
          text: 'Ticket generated. Lead operator Tehzeeb Sherazi has been assigned.',
          createdAt: new Date().toISOString().split('T')[0]
        }
      ]
    };
    setTickets(prev => [newTkt, ...prev]);
  };

  // ----------------- TRANSACTION PLACE ORDER -----------------
  const handlePlaceOrder = (
    gigId: string,
    gigTitle: string,
    sellerEmail: string,
    packageName: 'Basic' | 'Standard' | 'Premium',
    price: number,
    requirementsText: string,
    paymentMethodUsed: string
  ) => {
    if (!currentUser) return;
    
    // Buyer extra 5%
    const buyerCommission = price * 0.05;
    const buyerTotalPaid = price + buyerCommission;
    
    // Seller gets 90% (10% platform deduction)
    const commission = price * 0.10;
    const sellerEarnings = price * 0.90;

    const newOrder: Order = {
      id: `STH-ORD-${Date.now().toString().slice(-4)}`,
      gigId,
      gigTitle,
      buyerEmail: currentUser.email,
      sellerEmail,
      packageName,
      price,
      commission,
      buyerCommission,
      buyerTotalPaid,
      sellerEarnings,
      status: 'Active',
      requirementsSubmitted: requirementsText,
      deliveryNotes: null,
      createdAt: new Date().toISOString().split('T')[0],
      review: null,
      paymentMethodUsed,
      sellerPayoutMethod: 'JazzCash',
      payoutAddress: '0300-1234567',
      paymentStatus: 'Held'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Create Admin Notification
    const buyerName = currentUser.profile?.fullName || currentUser.email.split('@')[0];
    const sellerObj = users.find(u => u.email === sellerEmail);
    const sellerName = sellerObj?.profile?.fullName || sellerEmail.split('@')[0];
    const notifMsg = `New Order! Buyer: ${buyerName} ordered ${gigTitle} from Seller: ${sellerName}. Amount: Rs.${price}. Your commission: Rs.${buyerCommission}`;

    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      message: notifMsg,
      timestamp: new Date().toLocaleString(),
      isRead: false
    };

    setAdminNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('skillth_admin_notifications', JSON.stringify(updated));
      return updated;
    });

    // Play notification tone
    playNotificationSound();

    // Send email to tehzeebsherazi3@gmail.com
    console.log(`[EMAIL SENDING OUTBOX] Message sent to tehzeebsherazi3@gmail.com.\nSubject: SkillTH - New Order Placed!\nBody:\n${notifMsg}`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status'], deliveryText?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          deliveryNotes: deliveryText || o.deliveryNotes,
          completedAt: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : o.completedAt
        };
      }
      return o;
    }));
  };

  const handleSubmitReview = (orderId: string, rating: number, comment: string) => {
    if (!currentUser) return;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Completed',
          review: { rating, comment }
        };
      }
      return o;
    }));

    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      const gigId = targetOrder.gigId;
      const newRev: Review = {
        id: `rev-${Date.now()}`,
        reviewerName: currentUser.profile?.fullName || currentUser.email.split('@')[0],
        rating,
        comment,
        createdAt: new Date().toISOString().split('T')[0]
      };

      const updatedRevs = {
        ...reviews,
        [gigId]: [...(reviews[gigId] || []), newRev]
      };
      setReviews(updatedRevs);

      // Recalculate average rating for Gigs
      const allGrevs = updatedRevs[gigId] || [];
      const sum = allGrevs.reduce((s, r) => s + r.rating, 0);
      const avg = parseFloat((sum / allGrevs.length).toFixed(1));

      setGigs(prev => prev.map(g => {
        if (g.id === gigId) {
          return {
            ...g,
            rating: avg,
            reviewCount: allGrevs.length
          };
        }
        return g;
      }));
    }
  };

  // ----------------- FILTER LOGIC (FIVERR MATRIX) -----------------
  const filteredGigs = gigs.filter(g => {
    // Only approved gigs appear in the marketplace
    if (g.status !== 'Approved') return false;

    // Category filter
    if (filterCategory !== 'All' && g.category !== filterCategory) return false;

    // Sub Category filter
    if (filterSubCategory !== 'All' && g.subCategory !== filterSubCategory) return false;

    // Budget filters
    if (g.packages.basic.price < minPrice || g.packages.basic.price > maxPrice) return false;

    // Delivery Time filter
    if (filterDeliveryTime !== 'Anytime') {
      const days = g.packages.basic.deliveryTime;
      if (filterDeliveryTime === 'Express 24H' && days > 1) return false;
      if (filterDeliveryTime === 'Up to 3 days' && days > 3) return false;
      if (filterDeliveryTime === 'Up to 7 days' && days > 7) return false;
    }

    // Text search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = g.title.toLowerCase().includes(q);
      const descMatch = g.description.toLowerCase().includes(q);
      const tagsMatch = g.searchTags?.some(t => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagsMatch) return false;
    }

    // Seller lookup for Location and Languages and Levels
    const seller = users.find(u => u.email === g.sellerEmail);
    
    // Seller Level filter
    if (filterSellerLevel !== 'All') {
      // Seeded mock levels logic (or default matches)
      const mockLevel = g.id.startsWith('gig_seeded_') ? 'Level 2' : 'New Seller';
      if (filterSellerLevel !== mockLevel) return false;
    }

    // Language filter
    if (filterLanguage !== 'Any') {
      if (seller?.profile?.languagesList) {
        const hasLang = seller.profile.languagesList.some(l => l.name.toLowerCase() === filterLanguage.toLowerCase());
        if (!hasLang) return false;
      }
    }

    // Location filter
    if (filterLocation !== 'Any') {
      const sLocation = seller?.profile?.location || 'Pakistan';
      if (!sLocation.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.packages.basic.price - b.packages.basic.price;
    }
    if (sortBy === 'Price: High to Low') {
      return b.packages.basic.price - a.packages.basic.price;
    }
    if (sortBy === 'Newest') {
      return b.id.localeCompare(a.id);
    }
    if (sortBy === 'Top Rated') {
      return b.rating - a.rating;
    }
    // Best Selling by default (reviewCount desc)
    return b.reviewCount - a.reviewCount;
  });

  // CHANGE 4: Slice into 20 per page pagination
  const startIndex = (currentPage - 1) * gigsPerPage;
  const paginatedGigs = sortedGigs.slice(startIndex, startIndex + gigsPerPage);
  const totalPages = Math.ceil(sortedGigs.length / gigsPerPage);

  const selectedGig = gigs.find(g => g.id === selectedGigId);
  const activeOrderFiltered = orders.filter(
    o => o.buyerEmail === currentUser?.email || o.sellerEmail === currentUser?.email
  );

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#404145] font-sans flex flex-col justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* HEADER NAVBAR */}
      <nav className="h-[80px] bg-white border-b border-[#e4e5e7] flex items-center justify-between px-4 md:px-8 flex-shrink-0 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <div
            onClick={() => { setCurrentView('home'); handleCategoryTabClick(null); }}
            className="text-2xl md:text-3xl font-black text-black tracking-tighter cursor-pointer flex items-center gap-0.5 hover:opacity-90 select-none"
          >
            SkillTH<span className="text-[#00B22D]">.</span>
          </div>

          {/* Search bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
              className="w-[280px] lg:w-[400px] border border-[#dadbdd] py-2 px-4 rounded-xl focus:outline-none focus:border-[#00B22D] text-xs bg-gray-50/50 font-bold"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#222325] text-white px-3.5 rounded-lg text-[10px] font-bold hover:bg-black transition-colors">
              {t.searchBtn}
            </button>

            {/* AUTO-SUGGESTIONS DROPDOWN */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-gray-100 font-bold text-[11px] text-gray-700 max-h-[250px] overflow-y-auto">
                {searchQuery === '' ? (
                  <div className="p-3 space-y-1.5">
                    <div className="text-[10px] uppercase font-black tracking-wider text-gray-400 mb-1">Popular Searches</div>
                    <div className="grid grid-cols-1 gap-1">
                      {["Logo Design", "WordPress", "SEO", "Video Editing", "Content Writing", "Social Media", "App Development"].map((term) => (
                        <div
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setSearchFocused(false);
                          }}
                          className="px-2.5 py-1.5 hover:bg-[#00B22D]/5 hover:text-[#00B22D] rounded-lg cursor-pointer transition-colors text-left flex items-center gap-1.5"
                        >
                          🔍 <span>{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-1 space-y-1">
                    {/* Matching popular searches */}
                    {["Logo Design", "WordPress", "SEO", "Video Editing", "Content Writing", "Social Media", "App Development"]
                      .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((term) => (
                        <div
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setSearchFocused(false);
                          }}
                          className="px-3 py-2 hover:bg-[#00B22D]/5 hover:text-[#00B22D] rounded-lg cursor-pointer transition-colors text-left flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1.5">🔍 {term}</span>
                          <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-extrabold">Popular Search</span>
                        </div>
                      ))}

                    {/* Matching Gig Titles */}
                    {gigs
                      .filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 5)
                      .map((g) => (
                        <div
                          key={g.id}
                          onClick={() => {
                            setSearchQuery(g.title);
                            setSearchFocused(false);
                          }}
                          className="px-3 py-2 hover:bg-[#00B22D]/5 hover:text-[#00B22D] rounded-lg cursor-pointer transition-colors text-left flex items-center gap-1.5 text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                          📄 <span>{g.title}</span>
                        </div>
                      ))}

                    {/* Empty suggestions case */}
                    {["Logo Design", "WordPress", "SEO", "Video Editing", "Content Writing", "Social Media", "App Development"].filter(term => term.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 &&
                     gigs.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <div className="p-3 text-center text-gray-400 font-bold text-[10px]">No matches found</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-3.5 font-bold text-xs">
          
          <button onClick={() => { setCurrentView('about'); setHeaderDropdownOpen(false); }} className="hover:text-[#00B22D] text-gray-500 transition-colors">
            About Us
          </button>
          <button onClick={() => { setCurrentView('policies'); setHeaderDropdownOpen(false); }} className="hover:text-[#00B22D] text-gray-500 transition-colors hidden sm:block">
            {t.policies}
          </button>
          <button onClick={() => { setCurrentView('support'); setHeaderDropdownOpen(false); }} className="hover:text-[#00B22D] text-gray-500 transition-colors">
            {t.support}
          </button>

          {/* CHANGE 1: Dropdown Multi-language Selector in Header */}
          <div className="relative flex items-center gap-1.5 border border-gray-200 px-2.5 py-1.5 rounded-xl bg-gray-50 text-gray-700">
            <Globe size={13} className="text-gray-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent focus:outline-none text-[11px] font-bold cursor-pointer"
            >
              {LANGUAGES_SUPPORTED.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-900 bg-white">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* CHANGE 2: Account Login / Signup / Dropdown menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setHeaderDropdownOpen(!headerDropdownOpen)}
                className="flex items-center gap-2 border border-gray-200 hover:border-gray-300 p-1.5 pr-2.5 rounded-full bg-white select-none transition-all"
              >
                <img 
                  src={currentUser.profile?.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                  alt="Avatar" 
                  className="w-7 h-7 rounded-full object-cover border" 
                  referrerPolicy="no-referrer"
                />
                <span className="hidden md:inline text-[11px] text-gray-600 font-bold max-w-[100px] truncate">
                  {currentUser.profile?.fullName || currentUser.email.split('@')[0]}
                </span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {/* Dynamic Role Dropdown Container */}
              {headerDropdownOpen && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn text-xs text-gray-700 font-semibold overflow-hidden`}>
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                    <span className="block text-[10px] text-gray-400 uppercase font-black tracking-wide">Logged in as</span>
                    <strong className="text-gray-800 font-bold block truncate mt-0.5">{currentUser.email}</strong>
                    <span className="inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded">
                      {currentUser.role} mode
                    </span>
                  </div>

                  {/* ADMIN SPECIAL ACTION */}
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => { setCurrentView('admin_dashboard'); setHeaderDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2 border-b border-gray-100 bg-indigo-50/10"
                    >
                      <Shield size={14} className="text-indigo-600" />
                      <span>{t.adminDashboard}</span>
                    </button>
                  )}

                  {/* SELLER DROPDOWN OPTIONS */}
                  {currentUser.role === 'seller' && (
                    <>
                      <button
                        onClick={() => { setCurrentView('seller_dashboard'); setHeaderDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <SlidersHorizontal size={13} className="text-gray-400" />
                        <span>Seller Dashboard</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('seller_dashboard'); setHeaderDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Briefcase size={13} className="text-gray-400" />
                        <span>{t.myGigs}</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('orders'); setHeaderDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <ShoppingBag size={13} className="text-gray-400" />
                        <span>Client Orders</span>
                      </button>
                    </>
                  )}

                  {/* BUYER DROPDOWN OPTIONS */}
                  {currentUser.role === 'buyer' && (
                    <>
                      <button
                        onClick={() => { setCurrentView('orders'); setHeaderDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <ShoppingBag size={13} className="text-gray-400" />
                        <span>{t.myOrders}</span>
                      </button>
                    </>
                  )}

                  {/* GENERAL OPTIONS */}
                  <button
                    onClick={() => { setCurrentView('support'); setHeaderDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <UserIcon size={13} className="text-gray-400" />
                    <span>Messages & Chat</span>
                  </button>

                  <button
                    onClick={() => { setCurrentView('user_settings'); setHeaderDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Settings size={13} className="text-gray-400" />
                    <span>{t.settings}</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 transition-colors flex items-center gap-2 border-t border-gray-100"
                  >
                    <LogOut size={13} className="text-rose-500" />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 border border-[#00B22D] text-[#00B22D] hover:bg-[#00B22D] hover:text-white rounded-xl transition-all font-black shadow-sm"
              >
                {t.joinBtn}
              </button>
              {/* Dev shortcut helper */}
              <button
                onClick={() => { setTypedEmail('tehzeebsherazi3@gmail.com'); setShowAuthModal(true); }}
                className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-xl text-[10px] font-black"
              >
                Admin Gateway
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
      <div className="p-3 bg-white border-b border-[#e4e5e7] block md:hidden relative">
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setHeroSearchFocused(true)}
            onBlur={() => setTimeout(() => setHeroSearchFocused(false), 250)}
            className="w-full border border-[#dadbdd] py-2 px-4 rounded-xl focus:outline-none focus:border-[#00B22D] text-xs bg-gray-50 font-bold"
          />

          {/* MOBILE AUTO-SUGGESTIONS DROPDOWN */}
          {heroSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-gray-100 font-bold text-[11px] text-gray-700 max-h-[220px] overflow-y-auto">
              {searchQuery === '' ? (
                <div className="p-3 space-y-1.5">
                  <div className="text-[10px] uppercase font-black tracking-wider text-gray-400 mb-1">Popular Searches</div>
                  <div className="grid grid-cols-1 gap-1">
                    {["Logo Design", "WordPress", "SEO", "Video Editing", "Content Writing", "Social Media", "App Development"].map((term) => (
                      <div
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setHeroSearchFocused(false);
                        }}
                        className="px-2.5 py-1.5 hover:bg-[#00B22D]/5 hover:text-[#00B22D] rounded-lg cursor-pointer transition-colors text-left flex items-center gap-1.5"
                      >
                        🔍 <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-1 space-y-1">
                  {/* Matching popular searches */}
                  {["Logo Design", "WordPress", "SEO", "Video Editing", "Content Writing", "Social Media", "App Development"]
                    .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((term) => (
                      <div
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setHeroSearchFocused(false);
                        }}
                        className="px-3 py-2 hover:bg-[#00B22D]/5 hover:text-[#00B22D] rounded-lg cursor-pointer transition-colors text-left flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">🔍 {term}</span>
                        <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-extrabold">Popular</span>
                      </div>
                    ))}

                  {/* Matching Gig Titles */}
                  {gigs
                    .filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 5)
                    .map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          setSearchQuery(g.title);
                          setHeroSearchFocused(false);
                        }}
                        className="px-3 py-2 hover:bg-[#00B22D]/5 hover:text-[#00B22D] rounded-lg cursor-pointer transition-colors text-left flex items-center gap-1.5 text-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        📄 <span>{g.title}</span>
                      </div>
                    ))}

                  {/* Empty suggestions case */}
                  {["Logo Design", "WordPress", "SEO", "Video Editing", "Content Writing", "Social Media", "App Development"].filter(term => term.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 &&
                   gigs.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="p-3 text-center text-gray-400 font-bold text-[10px]">No matches found</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CATEGORIES NAVIGATION SUB BAR */}
      <div className="h-[45px] bg-white border-b border-[#e4e5e7] flex items-center justify-start md:justify-center overflow-x-auto space-x-6 px-4 text-[11px] font-black text-[#62646a] flex-shrink-0 scrollbar-none whitespace-nowrap">
        <span
          onClick={() => handleCategoryTabClick(null)}
          className={`cursor-pointer pb-1.5 transition-all ${filterCategory === 'All' ? 'text-[#00B22D] border-b-2 border-[#00B22D] scale-105' : 'hover:text-[#00B22D]'}`}
        >
          {t.all}
        </span>
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            onClick={() => handleCategoryTabClick(cat)}
            className={`cursor-pointer pb-1.5 transition-all ${filterCategory === cat ? 'text-[#00B22D] border-b-2 border-[#00B22D] scale-105' : 'hover:text-[#00B22D]'}`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl w-full mx-auto">
        
        {currentView !== 'home' && (
          <button 
            onClick={navigateBack}
            className="flex items-center gap-1.5 text-[#00B22D] hover:text-[#008000] font-black text-xs mb-6 transition-all bg-white border border-gray-200 hover:border-[#00B22D] px-4 py-2 rounded-xl shadow-xs cursor-pointer select-none"
          >
            ← Back
          </button>
        )}
        
        {/* VIEW 1: HOME MARKETPLACE */}
        {currentView === 'home' && (
          <div className="space-y-6">
            
            {/* Elegant Hero Banner */}
            <div className="bg-[#0a4d2e] text-white rounded-2xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-center min-h-[160px] md:min-h-[200px] shadow-md">
              <div className="relative z-10 max-w-2xl space-y-3">
                <h1 className="text-xl md:text-3xl font-black tracking-tight leading-tight">
                  {t.heroTitle}
                </h1>
                <p className="text-[11px] md:text-xs text-green-100/90 font-medium italic">
                  🚀 {t.heroSub}
                </p>
                
                {/* Fast tag search list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span onClick={() => setSearchQuery('Logo')} className="text-[9px] cursor-pointer border border-white/20 hover:border-white/50 rounded-full px-2.5 py-1 bg-white/10 font-bold transition-all">Logo Design</span>
                  <span onClick={() => setSearchQuery('WordPress')} className="text-[9px] cursor-pointer border border-white/20 hover:border-white/50 rounded-full px-2.5 py-1 bg-white/10 font-bold transition-all">WordPress</span>
                  <span onClick={() => setSearchQuery('SEO')} className="text-[9px] cursor-pointer border border-white/20 hover:border-white/50 rounded-full px-2.5 py-1 bg-white/10 font-bold transition-all">SEO Expert</span>
                  <span onClick={() => setSearchQuery('Urdu')} className="text-[9px] cursor-pointer border border-white/20 hover:border-white/50 rounded-full px-2.5 py-1 bg-white/10 font-bold transition-all">Urdu Translation</span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 hidden md:block">
                <svg width="240" height="240" viewBox="0 0 200 200">
                  <circle cx="150" cy="150" r="120" stroke="white" fill="transparent" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* CHANGE 3: COMPREHENSIVE FIVERR-STYLE SEARCH FILTERS BAR */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs font-semibold text-gray-700 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                  <SlidersHorizontal size={14} className="text-[#00B22D]" />
                  Advanced Fiverr Search Optimization Filters
                </span>
                <span className="text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border">
                  Showing {sortedGigs.length} filtered results
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3.5">
                
                {/* Category Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => { setFilterCategory(e.target.value); setFilterSubCategory('All'); }}
                    className="w-full border border-gray-200 p-2 rounded-xl text-[11px] bg-white focus:outline-none"
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Sub Category Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">Sub-Category</label>
                  <select
                    value={filterSubCategory}
                    onChange={(e) => setFilterSubCategory(e.target.value)}
                    disabled={filterCategory === 'All'}
                    className="w-full border border-gray-200 p-2 rounded-xl text-[11px] bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="All">All Subcategories</option>
                    {filterCategory !== 'All' && SUB_CATEGORIES_MAP[filterCategory]?.map(sc => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                  </select>
                </div>

                {/* Delivery Time Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">Delivery Speed</label>
                  <select
                    value={filterDeliveryTime}
                    onChange={(e) => setFilterDeliveryTime(e.target.value)}
                    className="w-full border border-gray-200 p-2 rounded-xl text-[11px] bg-white focus:outline-none"
                  >
                    <option value="Anytime">Anytime</option>
                    <option value="Express 24H">Express (24 Hours)</option>
                    <option value="Up to 3 days">Up to 3 Days</option>
                    <option value="Up to 7 days">Up to 7 Days</option>
                  </select>
                </div>

                {/* Budget Min Price input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">Min Price (Rs)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full border border-gray-200 p-1.5 rounded-xl text-[11px] bg-white focus:outline-none"
                  />
                </div>

                {/* Budget Max Price input */}
                <div className="space-y-1 col-span-2">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-wider">
                    <span>Max Budget (Rs)</span>
                    <strong className="text-emerald-600">Rs {maxPrice.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#00B22D] cursor-pointer mt-1"
                  />
                </div>

                {/* Seller Level */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">Seller Level</label>
                  <select
                    value={filterSellerLevel}
                    onChange={(e) => setFilterSellerLevel(e.target.value)}
                    className="w-full border border-gray-200 p-2 rounded-xl text-[11px] bg-white focus:outline-none"
                  >
                    <option value="All">All Levels</option>
                    <option value="New Seller">New Seller</option>
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Top Rated">Top Rated</option>
                  </select>
                </div>

                {/* Sort By Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-200 p-2 rounded-xl text-[11px] bg-white focus:outline-none"
                  >
                    <option value="Best Selling">Best Selling</option>
                    <option value="Newest">Newest</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Top Rated">Top Rated</option>
                  </select>
                </div>

              </div>

              {/* Extra Location and Language row for completeness */}
              <div className="flex flex-wrap gap-4 pt-1 border-t border-gray-50 justify-between items-center text-[11px]">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 font-bold">Freelancer Country:</span>
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="border rounded-lg p-1 bg-white text-gray-700"
                    >
                      <option value="Any">Any Country</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 font-bold">Seller Language:</span>
                    <select
                      value={filterLanguage}
                      onChange={(e) => setFilterLanguage(e.target.value)}
                      className="border rounded-lg p-1 bg-white text-gray-700"
                    >
                      <option value="Any">Any Language</option>
                      <option value="English">English</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>
                </div>

                {(searchQuery || filterCategory !== 'All' || filterSubCategory !== 'All' || filterDeliveryTime !== 'Anytime' || minPrice > 0 || maxPrice < 50000 || filterSellerLevel !== 'All' || filterLanguage !== 'Any' || filterLocation !== 'Any') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCategory('All');
                      setFilterSubCategory('All');
                      setFilterDeliveryTime('Anytime');
                      setMinPrice(0);
                      setMaxPrice(50000);
                      setFilterSellerLevel('All');
                      setFilterLanguage('Any');
                      setFilterLocation('Any');
                      setSortBy('Best Selling');
                    }}
                    className="text-red-500 hover:underline cursor-pointer font-bold text-[10px] uppercase tracking-wide bg-red-50 border border-red-100 px-3 py-1.5 rounded-xl"
                  >
                    Reset Search Parameters
                  </button>
                )}
              </div>
            </div>

            {/* Gigs Catalog Section */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-black text-[#404145]">
                {t.popularGigs} {filterCategory !== 'All' && `in ${filterCategory}`}
              </h2>

              {paginatedGigs.length === 0 ? (
                <div className="p-10 md:p-16 text-center bg-white rounded-2xl border border-gray-200 space-y-5 max-w-2xl mx-auto shadow-sm animate-fadeIn">
                  <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl">
                    📁
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-gray-800">No Gigs Available</h3>
                    <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                      There are currently no active freelance service listings in this category. You can be the first to create one or seed the sandbox testing database!
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center pt-2">
                    {currentUser?.role === 'seller' ? (
                      <button
                        onClick={() => setCurrentView('seller_dashboard')}
                        className="px-5 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        ➕ Create My First Gig
                      </button>
                    ) : currentUser?.role === 'admin' ? (
                      <button
                        onClick={handleSeedDemoData}
                        className="px-5 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        ⚡ Populate Database (Seed 180 Gigs)
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (currentUser) {
                            setCurrentView('seller_onboarding');
                          } else {
                            setShowAuthModal(true);
                          }
                        }}
                        className="px-5 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        🚀 Join as Freelance Seller
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterCategory('All');
                        setFilterSubCategory('All');
                        setFilterDeliveryTime('Anytime');
                        setMinPrice(0);
                        setMaxPrice(50000);
                        setFilterSellerLevel('All');
                        setFilterLanguage('Any');
                        setFilterLocation('Any');
                      }}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-extrabold rounded-xl cursor-pointer transition-all"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedGigs.map((g) => {
                      const mockLevel = g.id.startsWith('gig_seeded_') ? 'Level 2' : 'New Seller';
                      return (
                        <div
                          key={g.id}
                          onClick={() => { setSelectedGigId(g.id); setSelectedPackageTier('basic'); setCurrentView('gig_detail'); }}
                          className="bg-white border border-[#dadbdd] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between hover:border-[#00B22D]"
                        >
                          <div>
                            {/* Visual banner */}
                            <div className="h-36 bg-gray-100 relative overflow-hidden flex items-center justify-center font-bold text-xs text-gray-400 uppercase tracking-wider">
                              <img 
                                src={g.images[0]} 
                                alt="thumbnail" 
                                className="object-cover h-full w-full group-hover:scale-105 transition-all duration-500" 
                                referrerPolicy="no-referrer"
                              />
                              {g.isFeatured && (
                                <span className="absolute top-2.5 left-2.5 bg-yellow-400 text-yellow-950 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow border border-yellow-200 flex items-center gap-0.5 animate-pulse">
                                  ★ Featured
                                </span>
                              )}
                              <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[8px] font-bold px-2 py-0.5 rounded-md">
                                {g.category}
                              </span>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1.5">
                                  <img 
                                    src={g.sellerAvatar} 
                                    alt="avatar" 
                                    className="w-5.5 h-5.5 rounded-full object-cover border" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <span className="text-[11px] font-bold text-gray-800 line-clamp-1">{g.sellerName}</span>
                                </div>
                                <span className="text-[8px] bg-gray-50 border px-1.5 py-0.5 rounded text-gray-400 font-bold uppercase">{mockLevel}</span>
                              </div>

                              <p className="text-[12px] font-bold text-gray-900 group-hover:text-[#00B22D] transition-colors leading-tight line-clamp-2">
                                {g.title}
                              </p>

                              {/* Ratings */}
                              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                <span>★</span>
                                <span>{g.rating}</span>
                                <span className="text-gray-300 font-medium">({g.reviewCount})</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="p-4 pt-2.5 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <span className="text-[9px] text-[#b5b6ba] uppercase font-black tracking-wider">{t.startingAt}</span>
                            <span className="font-extrabold text-gray-900 text-xs">Rs. {g.packages.basic.price.toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CHANGE 4: Bottom Pagination indicators (min 20 gigs per page) */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-8">
                      <button 
                        disabled={currentPage === 1}
                        onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                        className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-black rounded-lg disabled:opacity-40"
                      >
                        ← Previous Page
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                          className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                            currentPage === page 
                              ? 'bg-[#00B22D] text-white shadow' 
                              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button 
                        disabled={currentPage === totalPages}
                        onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                        className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-black rounded-lg disabled:opacity-40"
                      >
                        Next Page →
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Helpline Section */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                  <Smartphone size={16} className="text-[#00B22D]" />
                  Need Help or Verification Assistance?
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Call or WhatsApp our 24/7 designated support helpline channels: <span className="font-mono text-gray-800 font-bold">0370-8914611</span> / <span className="font-mono text-gray-800 font-bold">0322-6389664</span>.
                </p>
              </div>
              <button onClick={() => setCurrentView('support')} className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border text-[#00B22D] font-extrabold rounded-xl text-xs shrink-0 transition-colors">
                Contact Operators
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: GIG DETAIL PAGE */}
        {currentView === 'gig_detail' && selectedGig && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs font-extrabold text-gray-500 hover:text-[#00B22D] flex items-center gap-1 transition-all"
            >
              ← Back to Listings
            </button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#00B22D]">
                    {selectedGig.category} {selectedGig.subCategory && `> ${selectedGig.subCategory}`}
                  </span>
                  <h1 className="text-xl md:text-3xl font-black text-gray-900 mt-1 leading-tight">
                    {selectedGig.title}
                  </h1>
                </div>

                {/* Seller overview card */}
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <img 
                    src={selectedGig.sellerAvatar} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-full object-cover border" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-gray-900 text-sm">{selectedGig.sellerName}</span>
                      <span className="text-[8px] bg-green-50 text-green-800 font-black px-1.5 py-0.5 rounded border border-green-200 uppercase">Verified Citizen</span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono font-medium">{selectedGig.sellerEmail}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setShowAuthModal(true);
                        return;
                      }
                      setActiveChatSellerEmail(selectedGig.sellerEmail);
                    }}
                    className="ml-auto text-xs font-black bg-[#00B22D]/5 hover:bg-[#00B22D]/10 px-4 py-2 rounded-xl transition-all text-[#00B22D] border border-[#00B22D]/20"
                  >
                    💬 Chat
                  </button>
                </div>

                {/* Gig Banner image */}
                <div className="bg-gray-100 h-[260px] md:h-[360px] rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center text-gray-400 uppercase tracking-widest text-xs font-bold border border-gray-200">
                  <img 
                    src={selectedGig.images[0]} 
                    alt="gig portfolio" 
                    className="object-cover h-full w-full" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Gig Description */}
                <div className="space-y-3">
                  <h3 className="font-black text-base border-b pb-2 text-gray-900">About This Gig</h3>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {selectedGig.description}
                  </p>
                </div>

                {/* Seller Bio snippet */}
                {users.find(u => u.email === selectedGig.sellerEmail)?.profile && (
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-3">
                    <h4 className="font-black text-xs text-gray-800 uppercase tracking-wide">Meet The Freelancer</h4>
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedGig.sellerAvatar} 
                        alt="avatar" 
                        className="w-12 h-12 rounded-full object-cover border" 
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">{selectedGig.sellerName}</span>
                        <span className="text-xs text-gray-400">Location: {users.find(u => u.email === selectedGig.sellerEmail)?.profile?.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic bg-white p-3.5 rounded-xl border border-gray-100">
                      "{users.find(u => u.email === selectedGig.sellerEmail)?.profile?.bio}"
                    </p>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="font-black text-base border-b pb-2 text-gray-900">Reviews & Feedback</h3>
                  {reviews[selectedGig.id]?.length > 0 ? (
                    <div className="space-y-4">
                      {reviews[selectedGig.id].map((rev) => (
                        <div key={rev.id} className="border-b border-gray-100 pb-4 space-y-1.5 text-xs">
                          <div className="flex justify-between items-center font-bold text-gray-800">
                            <span>{rev.reviewerName}</span>
                            <span className="text-amber-500 font-extrabold">★ {rev.rating}</span>
                          </div>
                          <p className="text-gray-500 italic">"{rev.comment}"</p>
                          <span className="text-[9px] text-gray-400 block font-medium">{rev.createdAt}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No reviews received for this gig yet.</p>
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Package selection widget */}
              <div className="space-y-6 animate-fadeIn text-xs">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md sticky top-24">
                  
                  {/* Package tab selector */}
                  <div className="grid grid-cols-3 text-center font-bold border-b select-none">
                    {(['basic', 'standard', 'premium'] as const).map((tier) => (
                      <div
                        key={tier}
                        onClick={() => setSelectedPackageTier(tier)}
                        className={`py-4 cursor-pointer capitalize transition-all ${selectedPackageTier === tier ? 'border-b-2 border-[#00B22D] text-[#00B22D] bg-[#f1fbf6]/25 font-black' : 'text-gray-400 hover:bg-gray-50'}`}
                      >
                        {tier}
                      </div>
                    ))}
                  </div>

                  {/* Selected Package details */}
                  {(() => {
                    const activeTier = selectedPackageTier || 'basic';
                    const activePkg = selectedGig.packages[activeTier];
                    return (
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-black text-xs text-gray-900 uppercase tracking-wide">{activePkg.title}</h4>
                          <span className="text-base font-black text-[#00B22D]">Rs. {activePkg.price.toLocaleString()}</span>
                        </div>
                        
                        <p className="text-gray-500 leading-relaxed">
                          {activePkg.description}
                        </p>
                        
                        <div className="flex justify-between text-[10px] text-gray-400 font-black border-t border-b border-gray-100 py-3 uppercase">
                          <span>⏱️ {activePkg.deliveryTime} Days Delivery</span>
                          <span>🔄 {activePkg.revisions === 99 ? 'Unlimited' : `${activePkg.revisions} Revisions`}</span>
                        </div>

                        <button
                          onClick={() => {
                            if (!currentUser) {
                              setShowAuthModal(true);
                              return;
                            }
                            if (currentUser.isBlocked) {
                              alert('Your profile has been locked.');
                              return;
                            }
                            setCurrentView('checkout');
                          }}
                          className="w-full bg-[#00B22D] hover:bg-[#008000] text-white py-3 rounded-xl font-black transition-all shadow shadow-[#00B22D]/20 flex items-center justify-center gap-1.5"
                        >
                          Checkout Package (Rs. {activePkg.price.toLocaleString()})
                        </button>
                      </div>
                    );
                  })()}

                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: SECURE CHECKOUT ESCROW PORTAL */}
        {currentView === 'checkout' && selectedGig && (
          <OrderSystem
            isUrdu={isRTL}
            gig={selectedGig}
            selectedPackageTier={selectedPackageTier || 'basic'}
            buyerEmail={currentUser?.email || ''}
            userOrders={orders}
            onPlaceOrder={(gId, gT, sE, pN, pr, req, pM) => {
              handlePlaceOrder(gId, gT, sE, pN, pr, req, pM);
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSubmitReview={handleSubmitReview}
            onCancelCheckout={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 4: MY ORDERS TRACKING */}
        {currentView === 'orders' && currentUser && (
          <OrderSystem
            isUrdu={isRTL}
            gig={null}
            selectedPackageTier={null}
            buyerEmail={currentUser.email}
            userOrders={activeOrderFiltered}
            onPlaceOrder={() => {}}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSubmitReview={handleSubmitReview}
            onCancelCheckout={() => {}}
          />
        )}

        {/* VIEW 5: HELP SUPPORT / FAQs */}
        {currentView === 'support' && (
          <SupportSystem
            isUrdu={isRTL}
            currentUserEmail={currentUser?.email || null}
            tickets={tickets}
            onSubmitTicket={handleAddTicket}
          />
        )}

        {/* VIEW 6: POLICIES */}
        {currentView === 'policies' && (
          <PolicyPages
            isUrdu={isRTL}
            onClose={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 7: SELLER ONBOARDING REGISTRATION FORM */}
        {currentView === 'seller_onboarding' && currentUser && (
          <SellerRegistration
            isUrdu={isRTL}
            onSubmit={handleSellerOnboardingSubmit}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 7.5: ADMIN DASHBOARD (CHANGE 6) */}
        {currentView === 'admin_dashboard' && currentUser && currentUser.role === 'admin' && (
          <AdminDashboard
            isUrdu={isRTL}
            users={users}
            gigs={gigs}
            orders={orders}
            tickets={tickets}
            chats={chats}
            adminNotifications={adminNotifications}
            onMarkNotifAsRead={handleMarkNotifAsRead}
            onClearNotifs={handleClearNotifs}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onUpdateTicketPriority={handleUpdateTicketPriority}
            onToggleBlockUser={handleToggleBlockUser}
            onDeleteUser={handleDeleteUser}
            onSendWarning={handleSendWarning}
            onApproveGig={handleApproveGig}
            onRejectGig={handleRejectGig}
            onToggleFeatureGig={handleToggleFeatureGig}
            onRemoveGig={handleRemoveGig}
            onForceCompleteOrder={handleForceCompleteOrder}
            onCancelRefundOrder={handleCancelRefundOrder}
            onReleasePayment={handleReleasePayment}
            onHoldPayment={handleHoldPayment}
            onReplyTicket={handleReplyTicket}
            onResolveTicket={handleResolveTicket}
            // Passing seeding function so tester can populate database in admin settings/overview
            onSeedDemoData={handleSeedDemoData}
          />
        )}

        {/* VIEW 7.7: USER SETTINGS */}
        {currentView === 'user_settings' && currentUser && (
          <UserSettings
            currentUser={currentUser}
            onUpdateUser={(updated) => {
              setCurrentUser(updated);
              setUsers(prev => prev.map(u => u.email === updated.email ? updated : u));
            }}
            onBack={() => setCurrentView('home')}
            selectedLanguage={selectedLanguage}
            onLanguageChange={(lang) => setSelectedLanguage(lang)}
          />
        )}

        {/* VIEW 7.8: ABOUT US */}
        {currentView === 'about' && (
          <AboutUs
            isUrdu={selectedLanguage === 'ur'}
            onBack={navigateBack}
          />
        )}

        {/* VIEW 8: SELLER DASHBOARD & GIGS MANAGE */}
        {currentView === 'seller_dashboard' && currentUser && currentUser.role === 'seller' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Warnings Alert Panel if any warnings present */}
            {currentUser.warnings && currentUser.warnings.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs font-semibold space-y-1.5">
                <strong className="block text-rose-950 font-black">⚠️ Official Admin Warning Warning Notice:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  {currentUser.warnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-gray-800">
                  {isRTL ? 'سیلر اکاؤنٹ ڈیش بورڈ' : 'Freelancer Activity Hub'}
                </h2>
                <p className="text-xs text-gray-500">
                  {isRTL ? 'اپنی مصنوعات، آمدنی اور آرڈرز کو کنٹرول کریں۔' : 'Manage your gig proposals, review completed payouts, and audit client files.'}
                </p>
              </div>
              <button
                onClick={() => setShowGigForm(!showGigForm)}
                className="mt-3 md:mt-0 px-4 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl font-black text-xs transition-colors shadow-sm"
              >
                {showGigForm ? '✕ Close Gig Creator' : `＋ ${t.createGig}`}
              </button>
            </div>

            {/* Quick seller stat row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center shadow-sm">
                <span className="block text-[10px] uppercase font-black text-gray-400">Total Cleared Earnings</span>
                <span className="text-xl font-black text-[#00B22D] block mt-1">
                  Rs. {orders.filter(o => o.sellerEmail === currentUser.email && o.status === 'Completed' && o.paymentStatus === 'Released').reduce((sum, o) => sum + o.sellerEarnings, 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center shadow-sm">
                <span className="block text-[10px] uppercase font-black text-gray-400">Pending Escrow Holds</span>
                <span className="text-xl font-black text-purple-700 block mt-1">
                  Rs. {orders.filter(o => o.sellerEmail === currentUser.email && o.status === 'Completed' && o.paymentStatus === 'Held').reduce((sum, o) => sum + o.sellerEarnings, 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center shadow-sm">
                <span className="block text-[10px] uppercase font-black text-gray-400">Active Contracts</span>
                <span className="text-xl font-black text-blue-700 block mt-1">
                  {orders.filter(o => o.sellerEmail === currentUser.email && (o.status === 'Active' || o.status === 'In Revision')).length}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center shadow-sm">
                <span className="block text-[10px] uppercase font-black text-gray-400">Verification Quality</span>
                <span className="text-xs font-black text-green-700 bg-green-50 px-2.5 py-1 rounded-full inline-block mt-2 border border-green-200">
                  Citizenship Audit Verified
                </span>
              </div>
            </div>

            {/* GIG CREATION FORM */}
            {showGigForm && (
              <GigCreationForm
                isUrdu={isRTL}
                currentUser={currentUser}
                onCancel={() => setShowGigForm(false)}
                onSubmit={handleCreateGigSubmit}
              />
            )}

            {/* List Gigs created by the seller */}
            <div className="space-y-4">
              <h3 className="font-black text-base text-gray-800">My Gigs Status Panel</h3>
              
              {gigs.filter(g => g.sellerEmail === currentUser.email).length === 0 ? (
                <div className="bg-white border border-dashed rounded-2xl p-10 text-center text-gray-400">
                  You have not published any gigs yet. Click "Create Gig" above to launch your first service!
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {gigs.filter(g => g.sellerEmail === currentUser.email).map((g) => (
                    <div key={g.id} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-2.5 relative shadow-sm hover:shadow-md transition-all">
                      <span className={`absolute top-4 right-4 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                        g.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 
                        g.status === 'Rejected' ? 'bg-red-50 text-red-800 border border-red-200' : 
                        'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                      }`}>
                        {g.status}
                      </span>
                      <h4 className="font-bold text-gray-900 pr-20 line-clamp-2">{g.title}</h4>
                      <span className="text-[10px] text-gray-400 block font-bold">Category: {g.category} {g.subCategory ? `> ${g.subCategory}` : ''}</span>
                      
                      <div className="flex justify-between items-center pt-3 border-t text-[11px]">
                        <span className="text-gray-400 font-bold">Base Package:</span>
                        <strong className="text-[#00B22D] font-black">Rs. {g.packages.basic.price.toLocaleString()}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Seller active order track portal link */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-800">Track and Deliver Work Orders</h4>
                <p className="text-xs text-gray-500">View detailed buyer briefs, exchange messages, and submit complete zip work or Google drive files.</p>
              </div>
              <button
                onClick={() => setCurrentView('orders')}
                className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-extrabold rounded-xl text-xs shrink-0 transition-all flex items-center gap-1"
              >
                Go to Order Contract Tracker →
              </button>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#e4e5e7] px-4 md:px-8 py-6 text-[10px] text-gray-400 flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 mt-12 font-semibold">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <span className="text-base font-black text-black select-none">SkillTH<span className="text-[#00B22D]">.</span></span>
          <span>© 2026 SkillTH Pakistan Marketplace Inc.</span>
          <button onClick={() => setCurrentView('about')} className="hover:underline text-[#00B22D] font-extrabold">About Us</button>
          <button onClick={() => setCurrentView('policies')} className="hover:underline">Privacy Policy</button>
          <button onClick={() => setCurrentView('policies')} className="hover:underline">Terms of Service</button>
          <button onClick={() => setCurrentView('policies')} className="hover:underline">Refund Policy</button>
        </div>
        
        <div className="flex flex-wrap items-center gap-5 justify-center">
          <div>
            <span className="font-bold text-gray-500">24/7 Helpline Support: </span>
            <span className="font-mono text-gray-700 font-bold select-all">0370-8914611 / 0322-6389664</span>
          </div>
          <div>
            <span className="font-bold text-gray-500">Dual-Script System: </span>
            <span className="bg-[#f1fbf6] text-[#0a4d2e] font-extrabold px-2 py-0.5 rounded border border-green-200">ACTIVE</span>
          </div>
        </div>
      </footer>

      {/* --- MODAL 1: GOOGLE SIMULATED AUTHENTICATION --- */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative border border-gray-100">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold focus:outline-none"
            >
              ✕
            </button>
            
            <div className="text-center space-y-1.5">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Google Account Sign In</h2>
              <p className="text-gray-500 text-xs">
                Log in securely using Google simulated credentials
              </p>
            </div>

            {/* Fast login helpers */}
            <div className="space-y-2.5 border border-indigo-100 p-3.5 rounded-2xl bg-indigo-50/40 text-[11px] font-bold">
              <span className="block text-[9px] uppercase font-black text-indigo-900 tracking-wider">Simulated Sandbox Accounts:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleGoogleLogin('musadani372@gmail.com')}
                  className="bg-white hover:bg-gray-50 text-[10px] font-black py-2 px-2.5 rounded-xl border border-indigo-200 text-left text-gray-700 truncate"
                >
                  👤 Buyer Account
                </button>
                <button
                  type="button"
                  onClick={() => handleGoogleLogin('tehzeebsherazi3@gmail.com')}
                  className="bg-white hover:bg-gray-50 text-[10px] font-black py-2 px-2.5 rounded-xl border border-indigo-200 text-left text-gray-700 truncate"
                >
                  🔑 Admin Account
                </button>
              </div>
            </div>

            {/* Simulated Email Log in */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGoogleLogin(typedEmail);
              }}
              className="space-y-4 text-xs font-bold"
            >
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-black text-gray-400">Enter Gmail Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. buyer@gmail.com"
                  value={typedEmail}
                  onChange={(e) => setTypedEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#00B22D]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all bg-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Authorize Gmail Account</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ROLE SELECTION POPUP --- */}
      {showRoleSelect && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl p-8 space-y-6 relative text-center border border-gray-100">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-1">Welcome to SkillTH!</h2>
              <p className="text-gray-500 text-xs font-semibold">Please select your primary access role below</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
              <div
                onClick={() => handleRoleSelect('buyer')}
                className="border border-gray-200 hover:border-[#00B22D] hover:bg-emerald-50/20 rounded-2xl p-5 cursor-pointer transition-all duration-200 group flex flex-col items-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#00B22D]/5 group-hover:bg-[#00B22D] flex items-center justify-center mb-3 transition-all duration-200 text-xl group-hover:scale-110">
                  🛒
                </div>
                <h3 className="font-extrabold text-gray-800 mt-1 group-hover:text-[#00B22D]">I want to Buy</h3>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">Browse & Order Gigs</p>
              </div>

              <div
                onClick={() => handleRoleSelect('seller')}
                className="border border-gray-200 hover:border-[#00B22D] hover:bg-emerald-50/20 rounded-2xl p-5 cursor-pointer transition-all duration-200 group flex flex-col items-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#00B22D]/5 group-hover:bg-[#00B22D] flex items-center justify-center mb-3 transition-all duration-200 text-xl group-hover:scale-110">
                  💼
                </div>
                <h3 className="font-extrabold text-gray-800 mt-1 group-hover:text-[#00B22D]">I want to Sell</h3>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">Register & Publish Gigs</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING CHAT OVERLAY SCREEN --- */}
      {activeChatSellerEmail && currentUser && (
        <div className="fixed bottom-6 right-6 w-[310px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col justify-between h-[380px] animate-fadeIn text-xs">
          
          {/* Header */}
          <div className="bg-[#0a4d2e] text-white p-3.5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00B22D] animate-ping"></span>
              <span>Chat with {activeChatSellerEmail.split('@')[0]}</span>
            </div>
            <button
              onClick={() => setActiveChatSellerEmail(null)}
              className="text-white hover:text-gray-300 font-bold focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* Logs */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50/80 text-[11px]">
            {activeChatThread?.messages.map((m, idx) => {
              const isMe = (currentUser.role === 'seller' && m.sender === 'seller') ||
                (currentUser.role !== 'seller' && m.sender === 'buyer');
              return (
                <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2.5 rounded-2xl max-w-[85%] font-medium leading-relaxed ${isMe ? 'bg-[#00B22D] text-white shadow-sm rounded-tr-none' : 'bg-white border text-gray-700 shadow-xs rounded-tl-none'}`}>
                    {m.text}
                  </div>
                  <span className="text-[8px] text-gray-400 mt-1 px-1">{m.createdAt}</span>
                </div>
              );
            })}
            {(!activeChatThread || activeChatThread.messages.length === 0) && (
              <div className="text-center text-gray-400 italic py-16 px-4">
                No messaging history. State your deliverables requirement parameters or query about details.
              </div>
            )}
          </div>

          {/* Tray */}
          <div className="p-3 border-t border-gray-100 flex gap-1.5 bg-white shrink-0 font-bold">
            <input
              type="text"
              placeholder="Type message here..."
              value={chatInputText}
              onChange={(e) => setChatInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendDirectMessage();
              }}
              className="flex-grow border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#00B22D]"
            />
            <button
              onClick={handleSendDirectMessage}
              className="bg-[#00B22D] hover:bg-[#008000] text-white px-4 rounded-xl transition-colors shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
