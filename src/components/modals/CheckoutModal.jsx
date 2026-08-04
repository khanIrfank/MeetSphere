import { useState } from 'react'
import { X, Check, ShieldCheck, CreditCard, QrCode, Building, Lock, ArrowRight, Sparkles, CheckCircle2, Download, AlertCircle } from 'lucide-react'
import { usePlan } from '../../context/PlanContext'
import { useAuth } from '../../context/AuthContext'
import { generateAndDownloadReceipt } from '../../utils/receiptGenerator'

export default function CheckoutModal() {
  const { checkoutModalOpen, setCheckoutModalOpen, targetPlanForCheckout, upgradePlan, billingCycle, setBillingCycle } = usePlan()
  const { user } = useAuth()

  const [step, setStep] = useState('summary') // 'summary' | 'payment' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi') // 'upi' | 'card' | 'netbanking' | 'paypal'

  // Input states & validation errors
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [paypalEmail, setPaypalEmail] = useState('')

  const [errorMsg, setErrorMsg] = useState('')
  const [activeReceipt, setActiveReceipt] = useState(null)

  if (!checkoutModalOpen || !targetPlanForCheckout) return null

  const isYearly = billingCycle === 'yearly'
  const priceDisplay = isYearly ? targetPlanForCheckout.yearlyPriceDisplay + '/yr' : targetPlanForCheckout.priceDisplay + '/mo'

  // Validate form fields before initiating payment
  const handleValidateAndPay = () => {
    setErrorMsg('')

    if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI ID (e.g. username@upi or 9876543210@ybl)')
        return
      }
    } else if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s+/g, '').length < 12) {
        setErrorMsg('Please enter a valid 16-digit Card Number')
        return
      }
      if (!cardExpiry.trim() || !cardExpiry.includes('/')) {
        setErrorMsg('Please enter Card Expiry Date (MM/YY)')
        return
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        setErrorMsg('Please enter a valid 3-digit CVV code')
        return
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        setErrorMsg('Please select your Bank for Net Banking')
        return
      }
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail.trim() || !paypalEmail.includes('@')) {
        setErrorMsg('Please enter your valid PayPal Email Address')
        return
      }
    }

    // Clear errors and proceed to processing
    setErrorMsg('')
    setStep('processing')

    // Create receipt object
    const newReceipt = {
      invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      planId: targetPlanForCheckout.id,
      planName: targetPlanForCheckout.name,
      amount: priceDisplay,
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'PAID',
      maxHosts: targetPlanForCheckout.maxHosts,
      maxUsers: targetPlanForCheckout.maxUsers,
      customerName: user?.name || 'MeetSphere Host',
    }

    setActiveReceipt(newReceipt)

    // Simulate 2s secure gateway processing
    setTimeout(() => {
      // INSTANT ACTIVATION: Activate plan and save receipt IMMEDIATELY upon payment success!
      upgradePlan(targetPlanForCheckout.id, newReceipt)
      setStep('success')
    }, 2000)
  }

  const handleDownloadReceiptClick = () => {
    if (activeReceipt) {
      generateAndDownloadReceipt(activeReceipt)
    }
  }

  const handleClose = () => {
    setCheckoutModalOpen(false)
    setStep('summary')
    setErrorMsg('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-up select-none">
      <div className="bg-[#12141c] text-white border border-white/15 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-surface/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-500 text-ink-950 font-bold">
              <Sparkles size={15} />
            </span>
            <span className="font-extrabold text-sm sm:text-base">
              {step === 'success' ? 'Subscription Receipt' : 'Upgrade Room Plan'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {step === 'success' && (
              <button
                onClick={handleDownloadReceiptClick}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/20 text-brand-400 hover:bg-brand-500 hover:text-ink-950 font-extrabold text-xs transition-all border border-brand-500/30 cursor-pointer"
              >
                <Download size={14} />
                <span>Receipt</span>
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 scrollbar-custom">
          {/* STEP 1: SUMMARY */}
          {step === 'summary' && (
            <div className="space-y-4">
              {/* Selected Plan Summary Card */}
              <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-500/10 via-elevated to-surface p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold bg-brand-500 text-ink-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {targetPlanForCheckout.badge}
                    </span>
                    <h3 className="font-extrabold text-lg sm:text-xl text-white mt-1">
                      {targetPlanForCheckout.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {targetPlanForCheckout.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-extrabold text-brand-400">{priceDisplay}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      {isYearly ? 'Billed annually' : 'Billed monthly'}
                    </p>
                  </div>
                </div>

                {/* Capacity Badges */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
                  <div className="flex-1 bg-black/40 rounded-xl p-2.5 text-center border border-white/5">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Co-Hosts</p>
                    <p className="text-sm font-extrabold text-brand-400">{targetPlanForCheckout.maxHosts} Hosts</p>
                  </div>
                  <div className="flex-1 bg-black/40 rounded-xl p-2.5 text-center border border-white/5">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Max Capacity</p>
                    <p className="text-sm font-extrabold text-brand-400">{targetPlanForCheckout.maxUsers.toLocaleString()} Users</p>
                  </div>
                </div>
              </div>

              {/* Billing Cycle Toggle Switch */}
              <div className="flex items-center justify-between bg-surface/60 border border-white/10 rounded-2xl p-3">
                <div>
                  <p className="text-xs font-bold text-white">Billing Cycle</p>
                  <p className="text-[11px] text-slate-400 font-medium">Save 20% on yearly subscription</p>
                </div>
                <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      !isYearly ? 'bg-brand-500 text-ink-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isYearly ? 'bg-brand-500 text-ink-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Yearly (-20%)
                  </button>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <p className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Plan Highlights</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {targetPlanForCheckout.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <Check size={14} className="text-brand-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => setStep('payment')}
                className="w-full py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD & FORM VALIDATION */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Select Payment Method</p>
                <p className="text-xs font-extrabold text-brand-400">{priceDisplay}</p>
              </div>

              {/* Error Alert Box */}
              {errorMsg && (
                <div className="flex items-center gap-2.5 bg-rose-500/15 border border-rose-500/40 p-3 rounded-xl text-xs text-rose-300 animate-fade-up">
                  <AlertCircle size={16} className="text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => { setPaymentMethod('upi'); setErrorMsg('') }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-brand-500 bg-brand-500/15 text-brand-400 font-bold'
                      : 'border-white/10 bg-surface/50 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <QrCode size={22} className="mb-1" />
                  <span className="text-xs">UPI / GPay / PhonePe</span>
                </button>

                <button
                  onClick={() => { setPaymentMethod('card'); setErrorMsg('') }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-brand-500 bg-brand-500/15 text-brand-400 font-bold'
                      : 'border-white/10 bg-surface/50 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <CreditCard size={22} className="mb-1" />
                  <span className="text-xs">Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => { setPaymentMethod('netbanking'); setErrorMsg('') }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-brand-500 bg-brand-500/15 text-brand-400 font-bold'
                      : 'border-white/10 bg-surface/50 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Building size={22} className="mb-1" />
                  <span className="text-xs">Net Banking</span>
                </button>

                <button
                  onClick={() => { setPaymentMethod('paypal'); setErrorMsg('') }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-brand-500 bg-brand-500/15 text-brand-400 font-bold'
                      : 'border-white/10 bg-surface/50 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Lock size={22} className="mb-1" />
                  <span className="text-xs">PayPal / International</span>
                </button>
              </div>

              {/* Payment Input Fields */}
              {paymentMethod === 'upi' && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Enter VPA / UPI ID</span>
                    <span className="text-[10px] text-rose-400 font-bold">*Required</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="username@upi or 9876543210@ybl"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-black/40 text-xs text-white placeholder-slate-500 outline-none transition-colors ${
                      errorMsg ? 'border-rose-500/60 focus:border-rose-500' : 'border-white/15 focus:border-brand-500'
                    }`}
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>Card Number</span>
                      <span className="text-[10px] text-rose-400 font-bold">*Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4532 •••• •••• 8892"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-black/40 text-xs text-white placeholder-slate-500 outline-none transition-colors mt-1 ${
                        errorMsg ? 'border-rose-500/60' : 'border-white/15 focus:border-brand-500'
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        placeholder="08/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-black/40 text-xs text-white placeholder-slate-500 outline-none transition-colors mt-1 ${
                          errorMsg ? 'border-rose-500/60' : 'border-white/15 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-black/40 text-xs text-white placeholder-slate-500 outline-none transition-colors mt-1 ${
                          errorMsg ? 'border-rose-500/60' : 'border-white/15 focus:border-brand-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-xs text-white outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="" className="bg-[#12141c]">-- Choose your Bank --</option>
                    <option value="HDFC" className="bg-[#12141c]">HDFC Bank</option>
                    <option value="ICICI" className="bg-[#12141c]">ICICI Bank</option>
                    <option value="SBI" className="bg-[#12141c]">State Bank of India</option>
                    <option value="AXIS" className="bg-[#12141c]">Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300">PayPal Email</label>
                  <input
                    type="email"
                    placeholder="user@paypal.com"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* Security Shield Banner */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-surface/40 p-2.5 rounded-xl border border-white/5">
                <ShieldCheck size={16} className="text-brand-400 shrink-0" />
                <span>256-bit SSL Encrypted Payment • Instant Activation</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setStep('summary')}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleValidateAndPay}
                  className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay {priceDisplay} Now</span>
                  <Lock size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING LOADER */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
                <Lock size={24} className="absolute text-brand-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Processing Payment...</h3>
                <p className="text-xs text-slate-400 mt-1">Activating room capacity on secure servers</p>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION & RECEIPT DOWNLOAD */}
          {step === 'success' && (
            <div className="py-4 flex flex-col items-center justify-center text-center space-y-4 animate-fade-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/40 shadow-xl">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-white">Payment Successful!</h3>
                <p className="text-xs text-brand-400 font-extrabold mt-1">
                  {targetPlanForCheckout.name} is INSTANTLY ACTIVE
                </p>
              </div>

              <div className="w-full bg-surface/60 border border-white/10 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Invoice Number</span>
                  <span className="font-mono font-bold text-white">{activeReceipt?.invoiceNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Plan Name</span>
                  <span className="font-bold text-white">{targetPlanForCheckout.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Allowed Co-Hosts</span>
                  <span className="font-bold text-brand-400">{targetPlanForCheckout.maxHosts} Hosts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Max Room Capacity</span>
                  <span className="font-bold text-brand-400">{targetPlanForCheckout.maxUsers.toLocaleString()} Users</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2 font-bold">
                  <span className="text-slate-400">Amount Paid</span>
                  <span className="text-white text-sm">{priceDisplay}</span>
                </div>
              </div>

              <div className="w-full flex items-center gap-2 pt-2">
                <button
                  onClick={handleDownloadReceiptClick}
                  className="flex-1 py-3 rounded-2xl border border-brand-500/40 bg-brand-500/10 hover:bg-brand-500 hover:text-ink-950 text-brand-400 font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={16} />
                  <span>Download Receipt</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  Start Using {targetPlanForCheckout.name}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
