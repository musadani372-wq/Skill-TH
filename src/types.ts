export interface SellerProfile {
  fullName: string;
  profilePic: string; // Base64 or placeholder URL
  location: string;
  phone?: string;
  cnicNumber: string;
  cnicFront: string; // Base64 or placeholder URL
  cnicBack: string;  // Base64 or placeholder URL
  dob?: string;
  gender?: string;
  title?: string;
  skills: string; // Comma separated list of skill names for backwards compatibility
  skillsList?: { name: string; level: 'Basic' | 'Intermediate' | 'Expert' }[];
  educationList?: { school: string; degree: string; yearFrom: string; yearTo: string }[];
  languagesList?: { name: string; level: string }[];
  bio: string;
  bankAccount: string;
  bankName?: string;
  accountHolder?: string;
  jazzCash: string;
  easyPaisa: string;
}

export interface User {
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  profile: SellerProfile | null;
  isBlocked: boolean;
  joinDate?: string;
  warnings?: string[];
  preferredLanguage?: string;
}

export interface Package {
  title: string;
  description: string;
  price: number;
  deliveryTime: number; // in days
  revisions: number;
}

export interface Packages {
  basic: Package;
  standard: Package;
  premium: Package;
}

export interface Gig {
  id: string;
  sellerEmail: string;
  sellerName: string;
  sellerAvatar: string;
  title: string;
  description: string;
  category: string;
  packages: Packages;
  requirements: string;
  images: string[];
  status: 'Pending' | 'Approved' | 'Rejected' | 'Pending Approval';
  rating: number;
  reviewCount: number;
  subCategory?: string;
  searchTags?: string[];
  faqs?: { question: string; answer: string }[];
  requirementsList?: { question: string; type: 'text' | 'multiple_choice' | 'file'; options?: string[] }[];
  video?: string;
  pdf?: string;
  extraServices?: { name: string; price: number; enabled: boolean }[];
  createdAt?: string;
  isFeatured?: boolean;
  rejectionReason?: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  gigId: string;
  gigTitle: string;
  buyerEmail: string;
  sellerEmail: string;
  packageName: 'Basic' | 'Standard' | 'Premium';
  price: number;
  commission: number; // 10%
  sellerEarnings: number; // 90%
  buyerCommission: number; // 5%
  buyerTotalPaid: number; // Price + 5%
  status: 'Pending' | 'Active' | 'In Revision' | 'Completed' | 'Cancelled';
  requirementsSubmitted: string;
  deliveryNotes: string | null;
  createdAt: string;
  completedAt?: string;
  review: { rating: number; comment: string } | null;
  paymentMethodUsed?: string;
  sellerPayoutMethod?: string;
  payoutAddress?: string;
  paymentStatus?: 'Held' | 'Released' | 'Refunded' | 'Disputed';
  paymentReleaseManually?: boolean;
}

export interface TicketReply {
  sender: string;
  text: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  userEmail: string;
  subject: string;
  category: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  replies: TicketReply[];
  priority?: 'Low' | 'Medium' | 'High';
}

export interface ChatMessage {
  sender: string;
  text: string;
  createdAt: string;
}

export interface ChatThread {
  id: string; // buyerEmail + "_" + sellerEmail
  buyerEmail: string;
  sellerEmail: string;
  messages: ChatMessage[];
}

export interface AdminNotification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
