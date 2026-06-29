import React, { useState, useEffect } from 'react';
import { Gig, Order } from '../types';
import { 
  CreditCard, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  X, 
  RefreshCw, 
  Star,
  Lock,
  Wallet,
  AlertTriangle
} from 'lucide-react';

interface OrderSystemProps {
  isUrdu: boolean;
  gig: Gig | null;
  selectedPackageTier: 'basic' | 'standard' | 'premium' | null;
  buyerEmail: string;
  userOrders: Order[];
  onPlaceOrder: (
    gigId: string,
    gigTitle: string,
    sellerEmail: string,
    packageName: 'Basic' | 'Standard' | 'Premium',
    price: number,
    requirements: string,
    paymentMethodUsed: string
  ) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status'], deliveryNotes?: string) => void;
  onSubmitReview: (orderId: string, rating: number, comment: string) => void;
  onCancelCheckout: () => void;
}

export const OrderSystem: React.FC<OrderSystemProps> = ({
  isUrdu,
  gig,
  selectedPackageTier,
  buyerEmail,
  userOrders,
  onPlaceOrder,
  onUpdateOrderStatus,
  onSubmitReview,
  onCancelCheckout,
}) => {
  // Checkout flow states
  const [requirements, setRequirements] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'JazzCash' | 'EasyPaisa' | 'Bank' | 'Payoneer'>('JazzCash');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Delivery state
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [activeDeliveryOrderId, setActiveDeliveryOrderId] = useState<string | null>(null);

  // Review states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [activeReviewOrderId, setActiveReviewOrderId] = useState<string | null>(null);

  // Render checkout view
  if (gig && selectedPackageTier) {
    const pkg = gig.packages[selectedPackageTier];
    
    // CHANGE 5: Commission Matrix
    // Buyer pays 5% extra commission
    const buyerCommission = pkg.price * 0.05;
    const buyerTotalPaid = pkg.price + buyerCommission;

    // Seller gets 90% (10% deducted commission)
    const sellerCommission = pkg.price * 0.10;
    const sellerEarnings = pkg.price * 0.90;

    // Total platform earning is 15%
    const totalPlatformEarning = buyerCommission + sellerCommission;

    const handleCheckoutSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!requirements.trim()) {
        alert(isUrdu ? 'براہ کرم آرڈر کے لیے اپنی ضروریات درج کریں۔' : 'Please provide work instructions/requirements.');
        return;
      }
      if (!paymentAccount.trim()) {
        alert(isUrdu ? 'براہ کرم ادائیگی کے لیے اپنا اکاؤنٹ نمبر درج کریں۔' : 'Please specify your payment details or account number.');
        return;
      }

      const pName = selectedPackageTier.charAt(0).toUpperCase() + selectedPackageTier.slice(1) as 'Basic' | 'Standard' | 'Premium';
      
      onPlaceOrder(
        gig.id, 
        gig.title, 
        gig.sellerEmail, 
        pName, 
        pkg.price, 
        requirements.trim(),
        paymentMethod
      );

      setRequirements('');
      setPaymentAccount('');
      setCheckoutSuccess(true);
      
      setTimeout(() => {
        setCheckoutSuccess(false);
        onCancelCheckout();
      }, 3000);
    };

    return (
      <div className="max-w-2xl mx-auto bg-white border border-[#e4e5e7] rounded-2xl shadow-lg p-6 md:p-8 my-6 animate-fadeIn">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-xl md:text-2xl font-black text-[#00B22D] flex items-center gap-2">
            <Lock size={20} className="text-[#00B22D]" />
            {isUrdu ? 'آرڈر چیک آؤٹ (سکور پورٹل)' : 'Secure Escrow Checkout'}
          </h2>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border px-2.5 py-1 rounded-lg">
            STH-GATEWAY v4.0
          </span>
        </div>

        {checkoutSuccess ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-[#00B22D]/10 text-[#00B22D] rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {isUrdu ? 'آرڈر کامیابی سے درج ہو گیا ہے!' : 'Order Processed & Escrow Funded!'}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              {isUrdu
                ? 'آپ کی رقم عارضی طور پر سسٹم کے پاس محفوظ ہے۔ کام مکمل ہونے اور آپ کی منظوری کے بعد ہی رقم سیلر کو دی جائے گی۔'
                : 'Buyer funds are safely held in SkillTH trust escrow. Payout releases to the freelancer 7 days after delivery approval.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-xs text-gray-600">
            
            {/* Gig Info */}
            <div className="p-4 bg-gray-50 rounded-xl flex gap-4 items-center border border-gray-100">
              <img 
                src={gig.images[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150'} 
                alt="gig preview" 
                className="w-16 h-16 rounded-lg object-cover border border-gray-200" 
                referrerPolicy="no-referrer"
              />
              <div className="space-y-0.5">
                <span className="text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-emerald-200">
                  {selectedPackageTier} Package
                </span>
                <h4 className="font-bold text-gray-800 line-clamp-1 text-sm mt-1">{gig.title}</h4>
                <p className="text-[11px] text-gray-400 font-medium">Freelancer: <span className="text-gray-600 font-bold">{gig.sellerName}</span></p>
              </div>
            </div>

            {/* CHANGE 5: Price breakdown showing 5% buyer commission and 10% seller commission */}
            <div className="bg-[#f0fdf4] p-5 rounded-2xl border border-emerald-100 space-y-4">
              <h3 className="font-black text-[10px] uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <ShieldCheck size={14} />
                {isUrdu ? 'قیمت اور سیکیورٹی کی تفصیلات' : 'Fiverr-Style Pricing and Commission Audit'}
              </h3>
              
              <div className="space-y-2 border-b border-emerald-100/50 pb-3 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Service Base Price</span>
                  <strong className="text-gray-800">Rs. {pkg.price.toLocaleString()}</strong>
                </div>
                
                {/* 5% Buyer commission */}
                <div className="flex justify-between items-center text-purple-700 font-medium">
                  <span className="flex items-center gap-1">
                    Buyer Platform Service Fee (+5%)
                    <HelpCircle size={12} className="text-purple-400 cursor-help" title="5% platform fee added to escrow" />
                  </span>
                  <strong>+ Rs. {buyerCommission.toLocaleString()}</strong>
                </div>

                <div className="flex justify-between items-center text-gray-400 text-[10px] italic">
                  <span>Seller Deducted Fee (-10% on completion)</span>
                  <span>- Rs. {sellerCommission.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-950">{isUrdu ? 'کل ادائیگی (Escrow Deposit)' : 'Total Secure Deposit'}</span>
                  <strong className="text-emerald-900 font-black text-sm">Rs. {buyerTotalPaid.toLocaleString()}</strong>
                </div>
                
                <div className="flex justify-between text-[10px] text-emerald-600 font-medium pt-1">
                  <span>Freelancer Payout (90%)</span>
                  <span>Rs. {sellerEarnings.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[9px] text-gray-400 font-semibold italic">
                  <span>Total Platform Revenue Earning (15%)</span>
                  <span>Rs. {totalPlatformEarning.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* CHANGE 5: 4 Payment Methods selector in TABS */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                {isUrdu ? 'ادائیگی کا ذریعہ منتخب کریں' : 'Select Secure Funding Channel'}
              </label>
              
              <div className="flex border-b border-gray-200">
                {['JazzCash', 'EasyPaisa', 'Bank', 'Payoneer'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPaymentMethod(tab as any)}
                    className={`flex-1 text-center py-2.5 font-bold text-xs transition-all border-b-2 cursor-pointer ${
                      paymentMethod === tab
                        ? 'border-[#00B22D] text-[#00B22D] bg-[#00B22D]/5 font-extrabold'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment input account */}
            <div className="space-y-1.5">
              <label className="block font-bold text-gray-700">
                {isUrdu ? `${paymentMethod} اکاؤنٹ کی تفصیلات درج کریں *` : `${paymentMethod} Account / Wallet Detail *`}
              </label>
              <input
                type="text"
                required
                placeholder={
                  paymentMethod === 'Bank' 
                    ? "Enter IBAN Number or Bank Account (e.g. PK12MZN...)" 
                    : "Enter Account Number / Mobile Wallet or Email (e.g. 0300-1234567)"
                }
                value={paymentAccount}
                onChange={(e) => setPaymentAccount(e.target.value)}
                className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D] font-mono text-xs bg-white shadow-sm"
              />
            </div>

            {/* Requirements instruction */}
            <div className="space-y-1.5">
              <label className="block font-bold text-gray-700">
                {isUrdu ? 'سیلر کو کام کے لیے ہدایات لکھیں *' : 'Submit Job Instructions for Freelancer *'}
              </label>
              <textarea
                required
                rows={3}
                placeholder={isUrdu ? 'لوگو کا نام، رنگ، برانڈ گائیڈز، وغیرہ...' : 'Enter your specific preferences, links, texts, design notes or source materials...'}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D] bg-white shadow-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2.5 pt-4 border-t border-gray-100 text-xs font-bold">
              <button
                type="button"
                onClick={onCancelCheckout}
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors"
              >
                {isUrdu ? 'کینسل کریں' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl shadow-md transition-all flex items-center gap-1"
              >
                <Lock size={12} />
                {isUrdu ? `ادائیگی کریں (Rs. ${buyerTotalPaid.toLocaleString()})` : `Fund Escrow (Rs. ${buyerTotalPaid.toLocaleString()})`}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // Otherwise tracking dashboard
  return (
    <div className="max-w-4xl mx-auto my-6 space-y-6 animate-fadeIn text-xs">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
          <Wallet size={20} className="text-[#00B22D]" />
          {isUrdu ? 'آرڈرز کی تاریخ اور ٹریکنگ' : 'Contract Escrow Dashboard'}
        </h2>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border px-3 py-1 rounded-lg">
          Live Escrows: {userOrders.length} active
        </span>
      </div>

      {userOrders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-400 italic">
          {isUrdu ? 'آپ کا ابھی تک کوئی آرڈر نہیں ہے۔' : 'No escrow contracts associated with this profile.'}
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((o) => {
            const isBuyer = o.buyerEmail === buyerEmail;
            const percentageComplete =
              o.status === 'Pending' ? 20 : o.status === 'Active' ? 50 : o.status === 'In Revision' ? 75 : 100;

            // CHANGE 5: Payout cleared escrow countdown timer
            let clearsInDaysStr = "";
            let clearsInDays = 7;
            if (o.status === 'Completed' && o.completedAt) {
              const compDate = new Date(o.completedAt);
              // Clears in 7 days
              const releaseDate = new Date(compDate.getTime() + 7 * 24 * 60 * 60 * 1000);
              const now = new Date("2026-06-28T03:04:15-07:00");
              const diffTime = releaseDate.getTime() - now.getTime();
              clearsInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (o.paymentStatus === 'Released') {
                clearsInDaysStr = isUrdu ? "رقم منتقل کر دی گئی ہے ✅" : "Payout Cleared & Released ✅";
              } else if (o.paymentStatus === 'Disputed') {
                clearsInDaysStr = isUrdu ? "ادائیگی منجمد ہے: ایڈمن کا آڈٹ ❄️" : "❄️ Held: Frozen by Admin Audit";
              } else if (clearsInDays > 0) {
                clearsInDaysStr = isUrdu 
                  ? `باقی وقت: ${clearsInDays} دن (ہولڈنگ پیریڈ)` 
                  : `Clears in ${clearsInDays} days (7d holding timer)`;
              } else {
                clearsInDaysStr = isUrdu ? "رقم ریلیز کے لیے تیار ہے" : "Funds Eligible for Release";
              }
            } else if (o.status === 'Cancelled') {
              clearsInDaysStr = isUrdu ? "منسوخ اور واپس فنڈ" : "Cancelled & Fully Refunded to Buyer";
            } else {
              clearsInDaysStr = isUrdu ? "آرڈر مکمل ہونے پر ہولڈ ہوگا" : "Holds in Escrow until completion approval";
            }

            return (
              <div key={o.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  o.status === 'Completed' ? 'bg-emerald-500' :
                  o.status === 'Cancelled' ? 'bg-rose-500' :
                  o.status === 'In Revision' ? 'bg-purple-500' :
                  'bg-blue-500'
                }`}></div>

                {/* Header contract panel */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-50 pb-3">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono select-all">Contract ID: {o.id}</span>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight mt-0.5">{o.gigTitle}</h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span className="text-[9px] bg-gray-50 border px-2 py-0.5 rounded-lg text-gray-600 font-bold uppercase">
                      {o.packageName}
                    </span>
                    <strong className="text-gray-900 font-black text-sm">
                      Rs. {o.price.toLocaleString()}
                    </strong>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                      o.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      o.status === 'Cancelled' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                      o.status === 'In Revision' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                      'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {o.status}
                    </span>
                  </div>
                </div>

                {/* Stepper tracker */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-wider">
                    <span className={percentageComplete >= 20 ? 'text-[#00B22D]' : ''}>1. Escrow Deposited</span>
                    <span className={percentageComplete >= 50 ? 'text-[#00B22D]' : ''}>2. Live Contract Work</span>
                    <span className={percentageComplete >= 75 ? 'text-[#00B22D]' : ''}>3. Delivery Approved</span>
                    <span className={percentageComplete >= 100 ? 'text-[#00B22D]' : ''}>4. Funds Disbursed</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#00B22D] h-full transition-all duration-500"
                      style={{ width: `${percentageComplete}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <span className="block font-black text-gray-400 uppercase text-[9px] tracking-wide mb-1.5">
                      📋 {isUrdu ? 'خریدار کی تفصیلی ضروریات' : 'Client Requirements Instructions'}
                    </span>
                    <p className="italic font-medium text-gray-600">"{o.requirementsSubmitted}"</p>
                  </div>

                  {o.deliveryNotes && (
                    <div className="bg-[#f0fdf4] p-3.5 rounded-xl border border-emerald-100">
                      <span className="block font-black text-emerald-800 uppercase text-[9px] tracking-wide mb-1.5">
                        📦 {isUrdu ? 'سیلر کا ڈلیوری پیغام' : 'Freelancer Work Delivery Note'}
                      </span>
                      <p className="italic text-emerald-950 font-bold leading-relaxed">"{o.deliveryNotes}"</p>
                    </div>
                  )}
                </div>

                {/* Escrow Clearance & Release Timer Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className={o.status === 'Completed' ? 'text-[#00B22D] animate-pulse' : 'text-gray-400'} />
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-black block tracking-wide">
                        Escrow Payout Timeline
                      </span>
                      <strong className="text-gray-800 text-xs block mt-0.5">
                        {clearsInDaysStr}
                      </strong>
                    </div>
                  </div>

                  {/* Financial commission matrix info */}
                  <div className="text-right text-[10px] space-y-0.5 font-medium text-gray-400 border-l sm:border-l-0 pl-3 sm:pl-0">
                    <div>Buyer Paid Extra: <span className="font-mono text-purple-700 font-bold">+Rs. {(o.buyerCommission || (o.price * 0.05)).toLocaleString()} (5% Fee)</span></div>
                    <div>Seller payout gets: <span className="font-mono text-emerald-700 font-bold">Rs. {(o.sellerEarnings || (o.price * 0.9)).toLocaleString()} (90% Paid)</span></div>
                    <div>SkillTH Total Commission: <span className="font-mono text-gray-700 font-bold">Rs. {((o.buyerCommission || (o.price * 0.05)) + (o.commission || (o.price * 0.1))).toLocaleString()} (15%)</span></div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-gray-100 text-[11px] font-bold">
                  <div className="text-gray-400">
                    {isBuyer ? (
                      <div>Role: <strong className="text-[#00B22D]">Buyer</strong> | Communication Channel: <strong className="text-gray-700 font-mono select-all">{o.sellerEmail}</strong></div>
                    ) : (
                      <div>Role: <strong className="text-emerald-700">Seller</strong> | Client Channel: <strong className="text-gray-700 font-mono select-all">{o.buyerEmail}</strong></div>
                    )}
                  </div>

                  {/* Freelancer submits work */}
                  {!isBuyer && (o.status === 'Active' || o.status === 'In Revision') && (
                    <div className="w-full sm:w-auto shrink-0 text-right">
                      {activeDeliveryOrderId === o.id ? (
                        <div className="space-y-2 mt-2 w-full sm:w-[320px]">
                          <textarea
                            required
                            rows={2}
                            placeholder={isUrdu ? 'اپنا ڈلیوری پیغام اور فائل لنکس لکھیں...' : 'State your delivery details, Google Drive assets link, or instructions...'}
                            value={deliveryNotes}
                            onChange={(e) => setDeliveryNotes(e.target.value)}
                            className="w-full text-xs border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#00B22D] bg-white shadow-inner"
                          />
                          <div className="flex justify-end gap-2 text-[10px]">
                            <button
                              onClick={() => setActiveDeliveryOrderId(null)}
                              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg"
                            >
                              {isUrdu ? 'منسوخ' : 'Cancel'}
                            </button>
                            <button
                              onClick={() => {
                                if (!deliveryNotes.trim()) return;
                                onUpdateOrderStatus(o.id, 'Completed', deliveryNotes.trim());
                                setDeliveryNotes('');
                                setActiveDeliveryOrderId(null);
                              }}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
                            >
                              {isUrdu ? 'ڈیلیور کریں' : 'Submit Project Work'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveDeliveryOrderId(o.id)}
                          className="w-full sm:w-auto px-5 py-2 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl shadow-md transition-all"
                        >
                          📦 {isUrdu ? 'کام جمع کروائیں' : 'Submit Delivery for Approval'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Buyer approves and leaves review */}
                  {isBuyer && o.status === 'Completed' && !o.review && (
                    <div className="w-full sm:w-auto shrink-0 text-right">
                      {activeReviewOrderId === o.id ? (
                        <div className="space-y-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 w-full sm:w-[320px]">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold">Rate Freelancer:</span>
                            <div className="flex gap-1 text-amber-400 font-bold text-sm">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  type="button"
                                  key={s}
                                  onClick={() => setReviewRating(s)}
                                  className={`focus:outline-none hover:scale-110 transition-transform ${reviewRating >= s ? 'text-amber-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="text"
                            required
                            placeholder={isUrdu ? 'اپنا ریویو لکھیں (بہت عمدہ کام!)...' : 'Write a brief review (e.g. Splendid code structure!)...'}
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#00B22D] bg-white shadow-inner"
                          />
                          <div className="flex justify-end gap-2 text-[10px]">
                            <button
                              onClick={() => setActiveReviewOrderId(null)}
                              className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                if (!reviewComment.trim()) return;
                                onSubmitReview(o.id, reviewRating, reviewComment.trim());
                                setReviewComment('');
                                setReviewRating(5);
                                setActiveReviewOrderId(null);
                              }}
                              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm"
                            >
                              Approve & Pay
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveReviewOrderId(o.id)}
                          className="w-full sm:w-auto px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md transition-all flex items-center gap-1"
                        >
                          <Star size={13} fill="currentColor" />
                          {isUrdu ? 'منظور کریں اور ریویو دیں' : 'Approve Delivery & Leave Review'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Buyer requests revision */}
                  {isBuyer && o.status === 'Completed' && o.deliveryNotes && !o.review && (
                    <button
                      onClick={() => {
                        onUpdateOrderStatus(o.id, 'In Revision');
                        alert(isUrdu ? 'نظر ثانی کی درخواست بھیج دی گئی ہے۔' : 'Revision request submitted. Freelancer has been notified.');
                      }}
                      className="px-4 py-2 border border-purple-200 hover:bg-purple-50 text-purple-700 rounded-xl transition-colors"
                    >
                      🔄 {isUrdu ? 'نظرثانی کی درخواست کریں' : 'Request Revision'}
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
