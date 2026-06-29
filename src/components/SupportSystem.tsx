import React, { useState } from 'react';
import { Ticket } from '../types';
import { FAQS } from '../initialData';

interface SupportSystemProps {
  isUrdu: boolean;
  currentUserEmail: string | null;
  tickets: Ticket[];
  onSubmitTicket: (subject: string, category: string, message: string) => void;
}

export const SupportSystem: React.FC<SupportSystemProps> = ({
  isUrdu,
  currentUserEmail,
  tickets,
  onSubmitTicket,
}) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    onSubmitTicket(subject, category, message);
    setSubject('');
    setMessage('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const userTickets = tickets.filter(t => t.userEmail === currentUserEmail);

  return (
    <div className="max-w-4xl mx-auto space-y-8 my-6">
      {/* Helpline banner */}
      <div className="bg-gradient-to-r from-[#0a4d2e] to-[#1dbf73] text-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl md:text-2xl font-black mb-2">
          {isUrdu ? 'سکل ٹی ایچ ہیلپ لائن اور سپورٹ' : 'SkillTH Helpline & 24/7 Support'}
        </h2>
        <p className="text-sm text-green-100 mb-4">
          {isUrdu ? 'کسی بھی مسئلے کی صورت میں ہمارے نمائندے سے رابطہ کریں۔' : 'For urgent assistance, billing issues, or disputes, contact us directly:'}
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm font-semibold">
          <div className="bg-white/10 p-3 rounded flex items-center gap-2">
            <span>📞</span>
            <span>0370-8914611</span>
          </div>
          <div className="bg-white/10 p-3 rounded flex items-center gap-2">
            <span>📞</span>
            <span>0322-6389664</span>
          </div>
          <div className="bg-white/10 p-3 rounded flex items-center gap-2">
            <span>✉️</span>
            <span>tehzeebsherazi3@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Ticket form & tracking */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ticket form */}
        <div className="bg-white p-6 rounded-xl border border-[#e4e5e7]">
          <h3 className="font-bold text-lg mb-4 text-[#404145]">
            {isUrdu ? 'سپورٹ ٹکٹ جمع کروائیں' : 'Submit a Support Ticket'}
          </h3>
          {currentUserEmail ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMsg && (
                <div className="p-3 bg-green-50 text-green-700 text-xs rounded border border-green-200">
                  {isUrdu
                    ? 'آپ کا سپورٹ ٹکٹ کامیابی سے رجسٹر ہو گیا ہے۔ ایڈمن جلد جواب دے گا۔'
                    : 'Ticket created successfully! Our support admin will reply shortly.'}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-[#62646a] mb-1">
                  {isUrdu ? 'موضوع / عنوان' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isUrdu ? 'جیسے: ادائیگی کا مسئلہ' : 'e.g. JazzCash payout issue'}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-sm border border-[#dadbdd] py-2 px-3 rounded focus:outline-none focus:border-[#1dbf73]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#62646a] mb-1">
                  {isUrdu ? 'قسم' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm border border-[#dadbdd] py-2 px-3 rounded bg-white focus:outline-none focus:border-[#1dbf73]"
                >
                  <option value="General">{isUrdu ? 'عام سوال (General)' : 'General Query'}</option>
                  <option value="Payments">{isUrdu ? 'ادائیگیاں (Payments)' : 'Payments & Payouts'}</option>
                  <option value="Gigs">{isUrdu ? 'گگز کی منظوری (Gigs)' : 'Gig Verification'}</option>
                  <option value="Disputes">{isUrdu ? 'آرڈر تنازعہ (Disputes)' : 'Order Disputes'}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#62646a] mb-1">
                  {isUrdu ? 'تفصیلات' : 'Detailed Message'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={isUrdu ? 'اپنا مسئلہ تفصیل سے بیان کریں...' : 'Please describe your query or problem...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-sm border border-[#dadbdd] py-2 px-3 rounded focus:outline-none focus:border-[#1dbf73]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1dbf73] text-white py-2.5 rounded font-bold hover:bg-[#19a463] transition-colors"
              >
                {isUrdu ? 'ٹکٹ جمع کریں' : 'Submit Ticket'}
              </button>
            </form>
          ) : (
            <p className="text-sm text-gray-500 italic p-4 text-center bg-gray-50 rounded">
              {isUrdu ? 'سپورٹ ٹکٹ کے لیے براہ کرم پہلے لاگ ان کریں۔' : 'Please log in with Google first to open a support ticket.'}
            </p>
          )}
        </div>

        {/* Tracking list */}
        <div className="bg-white p-6 rounded-xl border border-[#e4e5e7]">
          <h3 className="font-bold text-lg mb-4 text-[#404145]">
            {isUrdu ? 'آپ کے ٹکٹس کی تاریخ' : 'Your Tickets'}
          </h3>
          {currentUserEmail ? (
            userTickets.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                {isUrdu ? 'آپ کا کوئی اوپن ٹکٹ نہیں ہے۔' : 'No tickets opened yet.'}
              </p>
            ) : (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {userTickets.map(t => (
                  <div key={t.id} className="p-4 border border-gray-100 rounded-lg space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{t.subject}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                        {t.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Cat: {t.category}</span>
                      <span>{t.createdAt}</span>
                    </div>
                    <p className="bg-gray-50 p-2 rounded text-gray-600 italic">"{t.message}"</p>
                    {t.replies.length > 0 && (
                      <div className="space-y-2 mt-2 pt-2 border-t border-dashed border-gray-100">
                        <p className="font-bold text-[#1dbf73] text-[10px]">Replies:</p>
                        {t.replies.map((rep, idx) => (
                          <div key={idx} className="bg-green-50/50 p-2 rounded border border-green-100/50">
                            <span className="font-bold capitalize text-green-800">{rep.sender}: </span>
                            <span>{rep.text}</span>
                            <div className="text-[8px] text-gray-400 mt-1">{rep.createdAt}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">
              {isUrdu ? 'ٹکٹس دیکھنے کے لیے لاگ ان کریں۔' : 'Log in to track your submissions.'}
            </p>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-xl border border-[#e4e5e7]">
        <h3 className="font-bold text-xl mb-6 text-center text-[#404145]">
          {isUrdu ? 'اکثر پوچھے گئے سوالات (FAQs)' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-3">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex justify-between items-center text-left py-2 font-bold text-sm text-gray-800 hover:text-[#1dbf73] transition-colors focus:outline-none"
              >
                <span>{isUrdu ? faq.qUrdu : faq.q}</span>
                <span className="text-xs">{expandedFaq === index ? '▲' : '▼'}</span>
              </button>
              {expandedFaq === index && (
                <p className="mt-2 text-xs md:text-sm text-gray-500 pl-2 leading-relaxed bg-[#f9fafb] p-3 rounded">
                  {isUrdu ? faq.aUrdu : faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
