import React, { useState } from 'react';
import { User, Gig, Order, Ticket, SellerProfile, ChatThread, AdminNotification } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Briefcase, 
  DollarSign, 
  LifeBuoy, 
  Settings as SettingsIcon, 
  Check, 
  X, 
  Trash2, 
  Eye, 
  UserX, 
  UserCheck, 
  Phone, 
  Mail, 
  Percent, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  Award,
  BookOpen,
  MessageSquare,
  Star,
  ShieldAlert,
  Clock,
  MessageCircle,
  Sparkles,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  User as UserIcon,
  HelpCircle,
  FileText,
  XCircle
} from 'lucide-react';

interface AdminDashboardProps {
  isUrdu: boolean;
  users: User[];
  gigs: Gig[];
  orders: Order[];
  tickets: Ticket[];
  chats: ChatThread[];
  adminNotifications?: AdminNotification[];
  onMarkNotifAsRead?: (id: string) => void;
  onClearNotifs?: () => void;
  onUpdateTicketStatus?: (ticketId: string, status: Ticket['status']) => void;
  onUpdateTicketPriority?: (ticketId: string, priority: Ticket['priority']) => void;
  onToggleBlockUser: (email: string) => void;
  onDeleteUser: (email: string) => void;
  onSendWarning: (email: string, warningText: string) => void;
  onApproveGig: (id: string) => void;
  onRejectGig: (id: string, reason?: string) => void;
  onToggleFeatureGig: (id: string) => void;
  onRemoveGig: (id: string) => void;
  onForceCompleteOrder: (orderId: string) => void;
  onCancelRefundOrder: (orderId: string) => void;
  onReleasePayment: (orderId: string) => void;
  onHoldPayment: (orderId: string, reason: string) => void;
  onReplyTicket: (ticketId: string, replyText: string) => void;
  onResolveTicket: (ticketId: string) => void;
  onSeedDemoData?: () => void;
}

type AdminTab = 'overview' | 'users' | 'orders' | 'gigs' | 'earnings' | 'tickets' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isUrdu,
  users,
  gigs,
  orders,
  tickets,
  chats,
  adminNotifications = [],
  onMarkNotifAsRead,
  onClearNotifs,
  onUpdateTicketStatus,
  onUpdateTicketPriority,
  onToggleBlockUser,
  onDeleteUser,
  onSendWarning,
  onApproveGig,
  onRejectGig,
  onToggleFeatureGig,
  onRemoveGig,
  onForceCompleteOrder,
  onCancelRefundOrder,
  onReleasePayment,
  onHoldPayment,
  onReplyTicket,
  onResolveTicket,
  onSeedDemoData,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedUserForView, setSelectedUserForView] = useState<User | null>(null);
  const [selectedGigForView, setSelectedGigForView] = useState<Gig | null>(null);
  const [selectedOrderForView, setSelectedOrderForView] = useState<Order | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState<Record<string, string>>({});
  
  // Local state for actions
  const [warningText, setWarningText] = useState('');
  const [selectedUserEmailForWarning, setSelectedUserEmailForWarning] = useState<string | null>(null);
  const [selectedOrderIdForHold, setSelectedOrderIdForHold] = useState<string | null>(null);
  const [holdReasonText, setHoldReasonText] = useState('');
  const [viewingChatThread, setViewingChatThread] = useState<ChatThread | null>(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  // Admin Payment Settings State (with persistent storage)
  const [jazzCash, setJazzCash] = useState(() => localStorage.getItem('skillth_admin_jazzcash') || '0301-7654321');
  const [easyPaisa, setEasyPaisa] = useState(() => localStorage.getItem('skillth_admin_easypaisa') || '0345-9876543');
  const [bankAccount, setBankAccount] = useState(() => localStorage.getItem('skillth_admin_bank_account') || 'PK00 UNIB 0123 4567 8901');
  const [bankName, setBankName] = useState(() => localStorage.getItem('skillth_admin_bank_name') || 'United Bank Limited');
  const [accountName, setAccountName] = useState(() => localStorage.getItem('skillth_admin_account_name') || 'Tehzeeb Sherazi');
  const [payoneer, setPayoneer] = useState(() => localStorage.getItem('skillth_admin_payoneer') || 'admin@payoneer.com');
  const [paymentTab, setPaymentTab] = useState<'JazzCash' | 'EasyPaisa' | 'Bank' | 'Payoneer'>('JazzCash');

  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('skillth_admin_jazzcash', jazzCash);
      localStorage.setItem('skillth_admin_easypaisa', easyPaisa);
      localStorage.setItem('skillth_admin_bank_account', bankAccount);
      localStorage.setItem('skillth_admin_bank_name', bankName);
      localStorage.setItem('skillth_admin_account_name', accountName);
      localStorage.setItem('skillth_admin_payoneer', payoneer);
      alert('✅ Saved Successfully!');
    } catch (err) {
      alert('❌ Error saving. Please try again.');
    }
  };

  // Calculations for real-time stats
  const totalUsers = users.length;
  const totalSellers = users.filter(u => u.role === 'seller').length;
  const totalBuyers = users.filter(u => u.role === 'buyer').length;
  const activeOrdersCount = orders.filter(o => o.status === 'Active' || o.status === 'Pending' || o.status === 'In Revision').length;
  const pendingGigsCount = gigs.filter(g => g.status === 'Pending Approval' || g.status === 'Pending').length;
  const totalTicketsCount = tickets.length;

  // Platform commissions logic (5% buyer fee + 10% seller fee)
  const totalSellerCommission = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + (o.commission || 0), 0);

  const totalBuyerCommission = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + (o.buyerCommission || 0), 0);

  const totalPlatformEarned = totalSellerCommission + totalBuyerCommission;

  // This month calculations
  const currentMonthStr = new Date().toISOString().substring(0, 7); // YYYY-MM
  const thisMonthEarnings = orders
    .filter(o => o.status === 'Completed' && o.createdAt && o.createdAt.startsWith(currentMonthStr))
    .reduce((sum, o) => sum + (o.commission || 0) + (o.buyerCommission || 0), 0);

  // Today calculations
  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const todayEarnings = orders
    .filter(o => o.status === 'Completed' && o.createdAt && o.createdAt.startsWith(todayStr))
    .reduce((sum, o) => sum + (o.commission || 0) + (o.buyerCommission || 0), 0);

  const handleSendTicketReply = (ticketId: string) => {
    const text = ticketReplyText[ticketId];
    if (!text || !text.trim()) return;
    onReplyTicket(ticketId, text.trim());
    setTicketReplyText(prev => ({ ...prev, [ticketId]: '' }));
    alert('Reply successfully sent to user!');
  };

  const submitWarning = (email: string) => {
    if (!warningText.trim()) return;
    onSendWarning(email, warningText.trim());
    setWarningText('');
    setSelectedUserEmailForWarning(null);
    alert(`Warning warning issued to ${email} successfully!`);
  };

  const submitHoldPayment = (orderId: string) => {
    if (!holdReasonText.trim()) return;
    onHoldPayment(orderId, holdReasonText.trim());
    setHoldReasonText('');
    setSelectedOrderIdForHold(null);
    alert(`Escrow holding locked for order ${orderId}!`);
  };

  const triggerRejectGigWithReason = (gigId: string) => {
    const reason = prompt('Please enter a rejection reason for this Gig (will be displayed to the seller):');
    if (reason === null) return; // user cancelled prompt
    onRejectGig(gigId, reason.trim() || 'Did not meet SkillTH quality guidelines.');
    alert('Gig rejected successfully and reason recorded!');
  };

  const getOrderStatusStyles = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Revision':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const unreadNotifsCount = adminNotifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-xs text-gray-700">
      
      {/* TOP HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <ShieldAlert size={26} className="text-indigo-600" />
            SkillTH Administrator Terminal
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            System Overseer: <strong className="text-indigo-600">tehzeebsherazi3@gmail.com</strong>
          </p>
        </div>

        {/* Real-time Notifications Bell Area */}
        <div className="relative">
          <button 
            onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            className="relative flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl transition-all font-bold"
          >
            <Bell size={15} className={unreadNotifsCount > 0 ? 'animate-bounce' : ''} />
            <span>Notifications</span>
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Notifications Panel */}
          {showNotificationPanel && (
            <div className="absolute right-0 mt-2.5 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden text-xs">
              <div className="bg-indigo-600 text-white p-3.5 flex justify-between items-center font-bold">
                <span className="flex items-center gap-1.5">
                  <Bell size={13} />
                  System Notifications
                </span>
                <div className="flex gap-2">
                  {onClearNotifs && (
                    <button 
                      onClick={onClearNotifs} 
                      className="text-[10px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button onClick={() => setShowNotificationPanel(false)}>
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {adminNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 font-medium">
                    No new notifications in log queue.
                  </div>
                ) : (
                  adminNotifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => onMarkNotifAsRead && onMarkNotifAsRead(n.id)}
                      className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${!n.isRead ? 'bg-indigo-50/30 border-l-4 border-indigo-600' : ''}`}
                    >
                      <p className="text-gray-700 leading-normal font-medium">{n.message}</p>
                      <span className="block text-[9px] text-gray-400 font-mono mt-1">{n.timestamp}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INNER DASHBOARD CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 space-y-2 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm h-fit">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-3">Management Consoles</p>
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'users', label: 'Users Base', icon: Users },
            { id: 'orders', label: 'Orders Escrow', icon: ShoppingBag },
            { id: 'gigs', label: 'Gigs Catalog', icon: Briefcase },
            { id: 'earnings', label: 'Platform Revenue', icon: DollarSign },
            { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy },
            { id: 'settings', label: 'Overseer Accounts', icon: SettingsIcon },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setSelectedUserForView(null);
                  setSelectedGigForView(null);
                  setSelectedOrderForView(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
                {tab.id === 'gigs' && pendingGigsCount > 0 && (
                  <span className="ml-auto bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    {pendingGigsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* MAIN VIEWPORT */}
        <div className="lg:col-span-9 space-y-6">

          {/* ======================================================= OVERVIEW ======================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* REAL-TIME STATS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                
                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Total Users</span>
                    <strong className="text-xl font-black text-gray-800">{totalUsers}</strong>
                    <span className="block text-[10px] text-gray-400 mt-0.5">{totalSellers} sellers · {totalBuyers} buyers</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Active Orders</span>
                    <strong className="text-xl font-black text-gray-800">{activeOrdersCount}</strong>
                    <span className="block text-[10px] text-gray-400 mt-0.5">Under contract</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Total Revenue</span>
                    <strong className="text-xl font-black text-gray-800">Rs. {totalPlatformEarned.toLocaleString()}</strong>
                    <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">5% + 10% Platform fee</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Pending Gigs</span>
                    <strong className="text-xl font-black text-gray-800">{pendingGigsCount}</strong>
                    <span className="block text-[10px] text-rose-500 font-semibold mt-0.5">Requires approval</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <LifeBuoy size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Support Tickets</span>
                    <strong className="text-xl font-black text-gray-800">{totalTicketsCount}</strong>
                    <span className="block text-[10px] text-gray-400 mt-0.5">Customer cases</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">This Month</span>
                    <strong className="text-xl font-black text-gray-800">Rs. {thisMonthEarnings.toLocaleString()}</strong>
                    <span className="block text-[10px] text-indigo-600 font-semibold mt-0.5">Earned YTD</span>
                  </div>
                </div>

              </div>

              {/* DEMO DATA SEED ACTION CARD */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-indigo-900 flex items-center gap-1.5">
                    <Sparkles size={16} />
                    Need test data for Fiverr sorting, search, and pagination limits?
                  </h4>
                  <p className="text-indigo-700/80 leading-normal max-w-xl text-[11px]">
                    Clicking seed will populate 180 fully-formed custom gigs across categories, several verified sellers, client orders, and support tickets to test the platform's heavy limits.
                  </p>
                </div>
                {onSeedDemoData && (
                  <button 
                    onClick={() => {
                      onSeedDemoData();
                      alert('Success: Database seeded with 180 multi-category Gigs, registered sellers, escrow orders, and support tickets!');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow-md font-black flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    Seed 180 Gigs & Orders
                  </button>
                )}
              </div>

              {/* RECENT SYSTEM LOGS */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
                <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                  <Layers size={15} className="text-indigo-600" />
                  Recent Escrow & Account Events
                </h3>
                
                {orders.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 font-medium">
                    No orders have been submitted on this platform yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 font-bold text-gray-800">
                            <span className="font-mono text-indigo-600">{o.id}</span>
                            <span>Ordered by <span className="text-gray-900">{o.buyerEmail}</span></span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-medium">
                            Gig: {o.gigTitle} | Seller: {o.sellerEmail}
                          </p>
                        </div>
                        <div className="text-right">
                          <strong className="block text-gray-900 font-black">Rs. {o.buyerTotalPaid.toLocaleString()}</strong>
                          <span className="text-[9px] bg-indigo-50 text-indigo-700 border px-2 py-0.5 rounded-lg mt-1 inline-block">
                            Comm: Rs. {(o.commission + o.buyerCommission).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ======================================================= USERS BASE ======================================================= */}
          {activeTab === 'users' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm text-gray-900">User Accounts</h3>
                  <p className="text-gray-400 font-medium mt-0.5">Block, delete, and send official platform warnings.</p>
                </div>
                <span className="bg-indigo-50 border text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg">
                  {users.length} Registered Users
                </span>
              </div>

              {users.length === 0 ? (
                <div className="p-16 text-center text-gray-400 font-medium">No registered accounts exist yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px] tracking-wider">
                        <th className="p-4">Profile</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Warnings</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {users.map((u) => (
                        <tr key={u.email} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <img 
                                src={u.profile?.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                                alt="Avatar" 
                                className="w-8 h-8 rounded-full object-cover border" 
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <strong className="text-gray-900 font-bold block">{u.profile?.fullName || u.email.split('@')[0]}</strong>
                                <span className="text-[10px] text-gray-400">{u.profile?.location || 'Pakistan'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-gray-500 select-all">{u.email}</td>
                          <td className="p-4 uppercase tracking-wider text-[9px] font-bold">
                            <span className={`px-2 py-0.5 rounded ${
                              u.role === 'admin' 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                                : u.role === 'seller' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                  : 'bg-blue-50 text-blue-700 border border-blue-100'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {u.warnings && u.warnings.length > 0 ? (
                              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 w-fit">
                                <AlertTriangle size={11} />
                                {u.warnings.length} Warnings
                              </span>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </td>
                          <td className="p-4 font-bold text-[10px]">
                            {u.isBlocked ? (
                              <span className="text-rose-600 flex items-center gap-1">
                                <XCircle size={12} />
                                Blocked
                              </span>
                            ) : (
                              <span className="text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                Active
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1 whitespace-nowrap">
                            <button 
                              onClick={() => setSelectedUserForView(u)}
                              className="px-2.5 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors"
                              title="View Full Profile Details"
                            >
                              <Eye size={12} className="inline mr-1" />
                              Profile
                            </button>
                            <button 
                              onClick={() => onToggleBlockUser(u.email)}
                              className={`px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${
                                u.isBlocked 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                              }`}
                            >
                              {u.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                            <button 
                              onClick={() => setSelectedUserEmailForWarning(u.email)}
                              className="px-2.5 py-1.5 border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors font-bold"
                            >
                              Warn
                            </button>
                            {u.role !== 'admin' && (
                              <button 
                                onClick={() => {
                                  if (confirm(`CRITICAL: Are you absolutely sure you want to delete ${u.email} from the database? This is irreversible.`)) {
                                    onDeleteUser(u.email);
                                    alert('User account deleted.');
                                  }
                                }}
                                className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-200 inline-block"
                                title="Delete Account"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================= ORDERS ESCROW ======================================================= */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm text-gray-900">Orders Escrow Escrow</h3>
                  <p className="text-gray-400 font-medium mt-0.5">Force complete, cancel/refund, or release seller funds manually.</p>
                </div>
                <span className="bg-indigo-50 border text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg">
                  {orders.length} Active Escrows
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="p-16 text-center text-gray-400 font-medium">No order contracts have been initiated yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px] tracking-wider">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Buyer</th>
                        <th className="p-4">Seller</th>
                        <th className="p-4">Gig Detail</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Comm. (15%)</th>
                        <th className="p-4">Escrow Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-mono font-black text-gray-800">{o.id}</td>
                          <td className="p-4 font-mono text-[10px] text-gray-500 max-w-[120px] truncate">{o.buyerEmail}</td>
                          <td className="p-4 font-mono text-[10px] text-gray-500 max-w-[120px] truncate">{o.sellerEmail}</td>
                          <td className="p-4 max-w-[150px] truncate font-bold text-gray-800" title={o.gigTitle}>{o.gigTitle}</td>
                          <td className="p-4 font-black text-gray-900">Rs. {o.price.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="space-y-0.5">
                              <span className="block text-indigo-600 font-bold">Rs. {(o.commission + o.buyerCommission).toLocaleString()}</span>
                              <span className="block text-[9px] text-gray-400 font-medium">Buyer: 5% | Seller: 10%</span>
                            </div>
                          </td>
                          <td className="p-4 text-[10px] font-bold">
                            <span className={`px-2.5 py-1 rounded-full border ${getOrderStatusStyles(o.status)}`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1 whitespace-nowrap">
                            <button 
                              onClick={() => setSelectedOrderForView(o)}
                              className="px-2.5 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors"
                              title="Inspect Requirements & Deliverables"
                            >
                              <Eye size={12} className="inline mr-1" />
                              Inspect
                            </button>
                            {o.status !== 'Completed' && o.status !== 'Cancelled' && (
                              <>
                                <button 
                                  onClick={() => {
                                    if (confirm('Are you sure you want to force complete this order? This will transfer 90% payouts to the seller immediately.')) {
                                      onForceCompleteOrder(o.id);
                                      alert('Order force completed!');
                                    }
                                  }}
                                  className="px-2 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors font-bold"
                                >
                                  Complete
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm('Cancel and refund this order? Full base and buyer commission will be returned to the client.')) {
                                      onCancelRefundOrder(o.id);
                                      alert('Order cancelled and full refund dispatched.');
                                    }
                                  }}
                                  className="px-2 py-1.5 bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-colors font-bold"
                                >
                                  Refund
                                </button>
                              </>
                            )}
                            {o.paymentStatus === 'Held' && (
                              <button 
                                onClick={() => {
                                  if (confirm('Release payment to seller early without waiting for the 7-day clearing lock?')) {
                                    onReleasePayment(o.id);
                                    alert('Escrow payment released directly!');
                                  }
                                }}
                                className="px-2 py-1.5 border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors font-bold"
                              >
                                Release
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================= GIGS CATALOG ======================================================= */}
          {activeTab === 'gigs' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm text-gray-900">Gigs Catalog</h3>
                  <p className="text-gray-400 font-medium mt-0.5">Approve, reject with reasons, promote, or remove active listings.</p>
                </div>
                <span className="bg-indigo-50 border text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg">
                  {gigs.length} Total Gigs
                </span>
              </div>

              {gigs.length === 0 ? (
                <div className="p-16 text-center text-gray-400 font-medium">No services have been published by sellers yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px] tracking-wider">
                        <th className="p-4">#</th>
                        <th className="p-4">Image</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Seller</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                      {gigs.map((g, idx) => (
                        <tr key={g.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-mono text-gray-400">{idx + 1}</td>
                          <td className="p-4">
                            <img 
                              src={g.images && g.images[0] ? g.images[0] : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150'} 
                              alt="Gig Cover" 
                              className="w-12 h-9 rounded-lg object-cover border" 
                            />
                          </td>
                          <td className="p-4 font-bold max-w-[200px] truncate" title={g.title}>{g.title}</td>
                          <td className="p-4 font-mono text-[10px] text-gray-500 truncate" title={g.sellerEmail}>{g.sellerEmail}</td>
                          <td className="p-4 text-gray-500 font-medium">{g.category}</td>
                          <td className="p-4 font-black text-gray-950">Rs. {g.packages.basic.price.toLocaleString()}</td>
                          <td className="p-4 text-gray-400 font-mono text-[10px]">{g.createdAt || '2026-06-28'}</td>
                          <td className="p-4 text-[10px] font-bold">
                            <span className={`px-2 py-0.5 rounded border ${
                              g.status === 'Approved' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : g.status === 'Rejected'
                                  ? 'bg-rose-50 text-rose-700 border-rose-100'
                                  : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                              {g.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1 whitespace-nowrap">
                            <button 
                              onClick={() => setSelectedGigForView(g)}
                              className="px-2 py-1 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors"
                              title="Inspect Gig description & specs"
                            >
                              <Eye size={11} className="inline mr-1" />
                              View
                            </button>
                            {g.status !== 'Approved' && (
                              <button 
                                onClick={() => {
                                  onApproveGig(g.id);
                                  alert('Gig listing is now approved and live on marketplace searches!');
                                }}
                                className="px-2 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors font-bold"
                              >
                                Approve
                              </button>
                            )}
                            {g.status !== 'Rejected' && (
                              <button 
                                onClick={() => triggerRejectGigWithReason(g.id)}
                                className="px-2 py-1 bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-colors font-bold"
                              >
                                Reject
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                onToggleFeatureGig(g.id);
                                alert(g.isFeatured ? 'Gig unfavoured on homepage' : 'Gig successfully featured on homepage banner!');
                              }}
                              className={`px-2 py-1 border rounded-lg transition-colors font-bold ${
                                g.isFeatured 
                                  ? 'bg-purple-100 border-purple-300 text-purple-800' 
                                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {g.isFeatured ? '★ Featured' : '☆ Feature'}
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this Gig listing completely?')) {
                                  onRemoveGig(g.id);
                                  alert('Gig listing permanently removed.');
                                }
                              }}
                              className="p-1 hover:bg-rose-50 text-rose-600 rounded-lg border border-transparent hover:border-rose-200 inline-block"
                              title="Delete Listing"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================= PLATFORM REVENUE / EARNINGS ======================================================= */}
          {activeTab === 'earnings' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* PLATFORM COMMISSION METRICS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Total Platform Earnings</span>
                    <strong className="text-xl font-black text-gray-900">Rs. {totalPlatformEarned.toLocaleString()}</strong>
                    <span className="block text-[10px] text-gray-400 mt-0.5">All-time commissions</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">This Month Earnings</span>
                    <strong className="text-xl font-black text-gray-900">Rs. {thisMonthEarnings.toLocaleString()}</strong>
                    <span className="block text-[10px] text-gray-400 mt-0.5">Updated: YTD</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Today's Platform Earnings</span>
                    <strong className="text-xl font-black text-gray-900">Rs. {todayEarnings.toLocaleString()}</strong>
                    <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">Updated: Real-time</span>
                  </div>
                </div>

              </div>

              {/* REAL-TIME TRANSACTION HISTORY */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
                <div>
                  <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                    <FileText size={15} className="text-indigo-600" />
                    Transaction Audit Ledger
                  </h3>
                  <p className="text-gray-400 font-medium mt-0.5">Full bookkeeping record of all purchase base prices, seller payouts, and platform shares.</p>
                </div>

                {orders.filter(o => o.status === 'Completed').length === 0 ? (
                  <div className="py-12 text-center text-gray-400 font-medium">
                    No transactions have cleared. Purchases must be completed to release commissions and payout logs.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px] tracking-wider">
                          <th className="p-3">Order ID</th>
                          <th className="p-3">Buyer / Seller</th>
                          <th className="p-3">Base Price</th>
                          <th className="p-3">Seller Share (90%)</th>
                          <th className="p-3">Buyer Fee (5%)</th>
                          <th className="p-3 font-bold text-indigo-700">Your Share (15%)</th>
                          <th className="p-3">Settlement Date</th>
                          <th className="p-3 text-right">Escrow status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                        {orders.filter(o => o.status === 'Completed').map(o => (
                          <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-3 font-mono font-black text-gray-900">{o.id}</td>
                            <td className="p-3">
                              <div className="space-y-0.5">
                                <span className="block text-gray-700 text-[10px]">Client: <strong className="font-semibold">{o.buyerEmail}</strong></span>
                                <span className="block text-gray-400 text-[10px]">Freelancer: {o.sellerEmail}</span>
                              </div>
                            </td>
                            <td className="p-3 font-semibold">Rs. {o.price.toLocaleString()}</td>
                            <td className="p-3 text-emerald-600">Rs. {o.sellerEarnings.toLocaleString()}</td>
                            <td className="p-3 text-gray-500">Rs. {o.buyerCommission.toLocaleString()}</td>
                            <td className="p-3 font-black text-indigo-600 bg-indigo-50/10">
                              Rs. {(o.commission + o.buyerCommission).toLocaleString()}
                            </td>
                            <td className="p-3 font-mono text-[10px] text-gray-400">{o.completedAt || o.createdAt}</td>
                            <td className="p-3 text-right">
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-lg">
                                Settled
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ======================================================= SUPPORT TICKETS ======================================================= */}
          {activeTab === 'tickets' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm text-gray-900">Support Center</h3>
                  <p className="text-gray-400 font-medium mt-0.5">Reply to client tickets, update status, and assign severity priority.</p>
                </div>
                <span className="bg-indigo-50 border text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg">
                  {tickets.length} Registered Cases
                </span>
              </div>

              {tickets.length === 0 ? (
                <div className="p-16 text-center text-gray-400 font-medium">No customer support cases have been registered yet.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {tickets.map((t) => (
                    <div key={t.id} className="p-6 space-y-4 hover:bg-gray-50/30 transition-all">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 border px-2 py-0.5 rounded-lg">{t.id}</span>
                            <span className="text-gray-400">·</span>
                            <strong className="text-sm font-black text-gray-900">{t.subject}</strong>
                          </div>
                          <p className="text-[11px] text-gray-400">
                            Requested by <strong className="text-gray-700">{t.userEmail}</strong> | Category: <span className="font-semibold text-gray-500">{t.category}</span> | Registered: <span className="font-mono">{t.createdAt}</span>
                          </p>
                        </div>

                        {/* Status & Priority Selection Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-400 font-bold">Status:</span>
                            <select
                              value={t.status}
                              onChange={(e) => onUpdateTicketStatus && onUpdateTicketStatus(t.id, e.target.value as any)}
                              className="border border-gray-200 py-1 px-2.5 rounded-lg text-[10px] font-black bg-white focus:outline-none"
                            >
                              <option value="Open">🟢 Open</option>
                              <option value="In Progress">🟡 In Progress</option>
                              <option value="Resolved">🔵 Resolved</option>
                              <option value="Closed">🔴 Closed</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-400 font-bold">Priority:</span>
                            <select
                              value={t.priority || 'Medium'}
                              onChange={(e) => onUpdateTicketPriority && onUpdateTicketPriority(t.id, e.target.value as any)}
                              className="border border-gray-200 py-1 px-2.5 rounded-lg text-[10px] font-black bg-white focus:outline-none"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">⚠️ High</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Ticket message body */}
                      <div className="p-4 bg-gray-50 rounded-xl border leading-relaxed text-gray-700 font-medium">
                        {t.message}
                      </div>

                      {/* Ticket replies */}
                      {t.replies && t.replies.length > 0 && (
                        <div className="space-y-2.5 pl-6 border-l-2 border-indigo-100">
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Reply Logs</p>
                          {t.replies.map((rep, rIdx) => (
                            <div key={rIdx} className={`p-3 rounded-xl border text-[11px] ${rep.sender === 'admin' ? 'bg-indigo-50/30 border-indigo-100' : 'bg-gray-50'}`}>
                              <div className="flex justify-between items-center mb-1">
                                <strong className={`font-bold capitalize ${rep.sender === 'admin' ? 'text-indigo-700' : 'text-gray-800'}`}>
                                  {rep.sender === 'admin' ? 'SkillTH Administrator (You)' : rep.sender}
                                </strong>
                                <span className="text-[9px] text-gray-400 font-mono">{rep.createdAt}</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed font-medium">{rep.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Box input form */}
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Type your official response to this client support case..."
                          value={ticketReplyText[t.id] || ''}
                          onChange={(e) => setTicketReplyText(prev => ({ ...prev, [t.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendTicketReply(t.id)}
                          className="flex-1 border border-gray-200 py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-indigo-500 font-medium bg-gray-50/50"
                        />
                        <button
                          onClick={() => handleSendTicketReply(t.id)}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition-colors shrink-0"
                        >
                          Send Response
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================= OVERSEER ACCOUNTS & SETTINGS ======================================================= */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-black text-sm text-gray-900">Admin Payment Settings</h3>
                <p className="text-gray-400 font-medium mt-0.5">Set up the official payment gateway credentials where buyers send deposits and escrow holding payouts are stored.</p>
              </div>

              <form onSubmit={handleSavePaymentSettings} className="p-6 space-y-6">
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                  <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs">Security Advisory</h5>
                    <p className="text-[11px] leading-relaxed mt-0.5 font-medium">
                      All deposit amounts and seller payout locks will route directly via these accounts. Please ensure the information is precise to avoid transaction errors across Pakistan.
                    </p>
                  </div>
                </div>

                {/* TABS HEADER */}
                <div className="flex border-b border-gray-200 mb-4">
                  {['JazzCash', 'EasyPaisa', 'Bank', 'Payoneer'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPaymentTab(tab as any)}
                      className={`flex-1 text-center py-2.5 font-bold text-xs transition-all border-b-2 cursor-pointer ${
                        paymentTab === tab
                          ? 'border-[#00B22D] text-[#00B22D] bg-[#00B22D]/5 font-extrabold'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* TAB CONTENTS */}
                <div className="space-y-4">
                  {paymentTab === 'JazzCash' && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <label className="block font-bold text-gray-600 text-xs">JazzCash Account Number</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 0301-7654321"
                        value={jazzCash} 
                        onChange={(e) => setJazzCash(e.target.value)}
                        className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
                      />
                    </div>
                  )}

                  {paymentTab === 'EasyPaisa' && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <label className="block font-bold text-gray-600 text-xs">EasyPaisa Account Number</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 0345-9876543"
                        value={easyPaisa} 
                        onChange={(e) => setEasyPaisa(e.target.value)}
                        className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
                      />
                    </div>
                  )}

                  {paymentTab === 'Bank' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                      <div className="space-y-1.5">
                        <label className="block font-bold text-gray-600 text-xs">Bank Account Number / IBAN</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. PK00 UNIB 1234 5678 9012"
                          value={bankAccount} 
                          onChange={(e) => setBankAccount(e.target.value)}
                          className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D] font-mono" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-bold text-gray-600 text-xs">Bank Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. United Bank Limited"
                          value={bankName} 
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block font-bold text-gray-600 text-xs">Account Holder Title</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Tehzeeb Sherazi"
                          value={accountName} 
                          onChange={(e) => setAccountName(e.target.value)}
                          className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
                        />
                      </div>
                    </div>
                  )}

                  {paymentTab === 'Payoneer' && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <label className="block font-bold text-gray-600 text-xs">Payoneer Email / Customer ID</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. admin@payoneer.com"
                        value={payoneer} 
                        onChange={(e) => setPayoneer(e.target.value)}
                        className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-2.5 rounded-xl shadow-md transition-colors"
                  >
                    Save Payment Accounts
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>

      </div>

      {/* ======================================================= MODAL: VIEW USER PROFILE ======================================================= */}
      {selectedUserForView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-xs">
            
            <button 
              onClick={() => setSelectedUserForView(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-1"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img 
                src={selectedUserForView.profile?.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 shadow-md shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">
                    {selectedUserForView.profile?.fullName || selectedUserForView.email.split('@')[0]}
                  </h3>
                  <span className="uppercase tracking-wider text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {selectedUserForView.role}
                  </span>
                </div>
                
                <p className="text-gray-500 font-medium flex items-center gap-1.5">
                  <Mail size={13} />
                  <span>{selectedUserForView.email}</span>
                </p>

                {selectedUserForView.profile?.phone && (
                  <p className="text-gray-500 font-medium flex items-center gap-1.5">
                    <Phone size={13} />
                    <span>{selectedUserForView.profile.phone}</span>
                  </p>
                )}

                <div className="flex items-center gap-4 text-gray-400 font-medium text-[11px] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {selectedUserForView.profile?.location || 'Pakistan'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Joined: {selectedUserForView.joinDate || '2026-06-28'}
                  </span>
                </div>
              </div>
            </div>

            {/* SELLER COMPLETE VERIFICATION RECORDS */}
            {selectedUserForView.role === 'seller' && selectedUserForView.profile && (
              <div className="space-y-5 pt-4 border-t border-gray-100">
                <h4 className="font-black text-xs uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                  <ShieldAlert size={14} />
                  Seller Verification & Payout Records
                </h4>

                {/* CNIC numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">CNIC Number</span>
                    <strong className="text-gray-800 font-mono tracking-wider mt-1 block">{selectedUserForView.profile.cnicNumber || 'Unregistered'}</strong>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Financial Setup</span>
                    <div className="text-[10px] space-y-0.5 mt-1 text-gray-700 font-semibold">
                      <p>JazzCash: {selectedUserForView.profile.jazzCash || 'None'}</p>
                      <p>EasyPaisa: {selectedUserForView.profile.easyPaisa || 'None'}</p>
                      {selectedUserForView.profile.bankAccount && (
                        <p className="truncate">Bank: {selectedUserForView.profile.bankName} - {selectedUserForView.profile.bankAccount}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <div className="space-y-1">
                  <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Professional Bio / Overview</span>
                  <p className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-600 leading-relaxed font-semibold">
                    {selectedUserForView.profile.bio}
                  </p>
                </div>

                {/* CNIC Pictures */}
                <div className="space-y-2">
                  <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">National ID Verification Photos</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-gray-400 font-bold">Front Photo</span>
                      <img 
                        src={selectedUserForView.profile.cnicFront || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300'} 
                        alt="CNIC Front" 
                        className="w-full h-32 rounded-xl object-cover border" 
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] text-gray-400 font-bold">Back Photo</span>
                      <img 
                        src={selectedUserForView.profile.cnicBack || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300'} 
                        alt="CNIC Back" 
                        className="w-full h-32 rounded-xl object-cover border" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Warnings list logs */}
            {selectedUserForView.warnings && selectedUserForView.warnings.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <span className="block font-black text-rose-600 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={14} />
                  Warnings Issued List
                </span>
                <div className="space-y-1.5">
                  {selectedUserForView.warnings.map((warn, wIdx) => (
                    <div key={wIdx} className="p-2.5 bg-rose-50/50 text-rose-800 border border-rose-100 rounded-lg flex items-center gap-1.5 font-semibold">
                      <AlertCircle size={12} className="text-rose-500" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedUserForView(null)}
                className="px-5 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl font-bold transition-colors"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================= MODAL: VIEW GIG DETAILS ======================================================= */}
      {selectedGigForView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-xs">
            
            <button 
              onClick={() => setSelectedGigForView(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-1"
            >
              <X size={20} />
            </button>

            <div className="flex gap-4 items-center border-b border-gray-100 pb-4">
              <img 
                src={selectedGigForView.images && selectedGigForView.images[0] ? selectedGigForView.images[0] : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150'} 
                alt="Gig Cover" 
                className="w-16 h-12 rounded-xl object-cover border" 
              />
              <div>
                <h3 className="text-base font-black text-gray-900 leading-tight">{selectedGigForView.title}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Seller: <strong className="text-indigo-600">{selectedGigForView.sellerEmail}</strong> | Category: <span className="font-semibold text-gray-500">{selectedGigForView.category}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Gig Service Description</span>
                <p className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 leading-relaxed font-semibold max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedGigForView.description}
                </p>
              </div>

              {/* Package tier specifications */}
              <div className="space-y-2">
                <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Tier Packages Specs</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['basic', 'standard', 'premium'].map((tier) => {
                    const p = selectedGigForView.packages[tier as 'basic' | 'standard' | 'premium'];
                    if (!p) return null;
                    return (
                      <div key={tier} className="bg-gray-50 border p-3 rounded-xl space-y-1.5">
                        <strong className="block text-[10px] uppercase tracking-wider text-indigo-700 font-black">{tier} Package</strong>
                        <p className="font-bold text-gray-800 line-clamp-2" title={p.title}>{p.title}</p>
                        <p className="text-[10px] text-gray-400 line-clamp-2 leading-normal">{p.description}</p>
                        <div className="pt-1.5 text-gray-900 font-black border-t border-gray-100 text-[11px]">
                          Rs. {p.price.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedGigForView(null)}
                className="px-5 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl font-bold transition-colors"
              >
                Close Gig View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================= MODAL: VIEW ORDER DETAILS ======================================================= */}
      {selectedOrderForView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-xs">
            
            <button 
              onClick={() => setSelectedOrderForView(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-1"
            >
              <X size={20} />
            </button>

            <div className="border-b border-gray-100 pb-4">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border px-2 py-0.5 rounded-lg font-mono">{selectedOrderForView.id}</span>
              <h3 className="text-base font-black text-gray-900 mt-1">{selectedOrderForView.gigTitle}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Buyer Client: <strong className="text-gray-700">{selectedOrderForView.buyerEmail}</strong> | Freelancer Seller: <strong className="text-gray-700">{selectedOrderForView.sellerEmail}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Base Escrow Payment</span>
                  <strong className="text-base font-black text-gray-900">Rs. {selectedOrderForView.price.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Total Client Paid</span>
                  <strong className="text-base font-black text-indigo-600">Rs. {selectedOrderForView.buyerTotalPaid.toLocaleString()}</strong>
                  <span className="block text-[9px] text-gray-400 font-medium">Includes 5% buyer commission</span>
                </div>
              </div>

              {/* Requirements text */}
              <div className="space-y-1.5">
                <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Buyer Submitted Requirements</span>
                <p className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 leading-relaxed font-semibold max-h-36 overflow-y-auto whitespace-pre-wrap">
                  {selectedOrderForView.requirementsSubmitted || 'No special requirements detailed by the buyer.'}
                </p>
              </div>

              {/* Delivery Notes */}
              <div className="space-y-1.5">
                <span className="block text-gray-400 font-bold uppercase text-[9px] tracking-wide">Active Deliverables / Notes</span>
                <p className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 leading-relaxed font-semibold max-h-36 overflow-y-auto whitespace-pre-wrap">
                  {selectedOrderForView.deliveryNotes || 'Seller has not submitted work deliverables for review yet.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedOrderForView(null)}
                className="px-5 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl font-bold transition-colors"
              >
                Close Audit View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================= MODAL: WARNING SUBMIT ======================================================= */}
      {selectedUserEmailForWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            
            <button 
              onClick={() => setSelectedUserEmailForWarning(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-black text-gray-900 flex items-center gap-1.5">
              <AlertTriangle className="text-indigo-600 animate-pulse" size={18} />
              Issue Official System Warning
            </h3>
            
            <p className="text-gray-400 font-medium">
              You are issuing a warning notification to <strong className="text-gray-700">{selectedUserEmailForWarning}</strong>. This warning logs directly inside the user's warning metrics list.
            </p>

            <div className="space-y-1.5">
              <label className="block font-bold text-gray-600">Violation / Warnings Reason text</label>
              <textarea 
                rows={3}
                placeholder="Describe the quality guideline violation or security misconduct reason..."
                value={warningText}
                onChange={(e) => setWarningText(e.target.value)}
                className="w-full border border-gray-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-gray-700"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setSelectedUserEmailForWarning(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => submitWarning(selectedUserEmailForWarning)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
              >
                Dispatch Warning
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
