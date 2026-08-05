import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Moon, Sun, LogOut, Receipt, Shield, Download, CheckCircle2, Sparkles, Power } from 'lucide-react'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { usePlan } from '../../context/PlanContext'
import { generateAndDownloadReceipt } from '../../utils/receiptGenerator'
import DeactivatePlanModal from '../../components/modals/DeactivatePlanModal'

export default function Settings() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { paymentHistory, purchasedPlans, hasActivePlan, cancelPlan } = usePlan()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('profile') // 'profile' | 'billing' | 'account'
  const [name, setName] = useState(user?.name || '')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false)
  const [planToDeactivate, setPlanToDeactivate] = useState(null)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleOpenDeactivateModal = (plan) => {
    setPlanToDeactivate(plan)
    setDeactivateModalOpen(true)
  }

  const handleConfirmDeactivate = (planId) => {
    cancelPlan(planId)
    setPlanToDeactivate(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 select-none">
      {/* Settings Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-theme-heading">
          Settings & Account Management
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-theme-sub mt-1">
          Manage your personal profile, theme preferences, and billing payment history.
        </p>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-soft pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
              : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
          }`}
        >
          <User size={15} />
          <span>Profile & Appearance</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'billing'
              ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
              : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
          }`}
        >
          <Receipt size={15} />
          <span>Payment History & Receipts ({paymentHistory.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'account'
              ? 'bg-brand-500 text-ink-950 shadow-md font-extrabold'
              : 'text-theme-sub hover:text-theme-heading hover:bg-surface'
          }`}
        >
          <Shield size={15} />
          <span>Account & Security</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & APPEARANCE */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-fade-up">
          {/* Profile Card */}
          <form onSubmit={handleSaveProfile} className="rounded-3xl border border-soft bg-elevated p-6 shadow-sm space-y-6">
            <h2 className="font-extrabold text-base text-theme-heading">Personal Details</h2>

            <div className="flex items-center gap-4">
              <Avatar name={name || user?.name || 'User'} size={60} />
              <div>
                <p className="font-extrabold text-base text-theme-heading">{name || user?.name || 'User'}</p>
                <p className="text-xs font-semibold text-theme-sub">{user?.email || 'user@meetsphere.com'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-theme-sub">Display Name</span>
                <div className="flex items-center gap-2 rounded-2xl border border-soft bg-surface px-3.5 py-2.5">
                  <User size={16} className="text-theme-sub shrink-0" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-theme-heading font-semibold"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-theme-sub">Email Address</span>
                <div className="flex items-center gap-2 rounded-2xl border border-soft bg-surface px-3.5 py-2.5 opacity-70">
                  <Mail size={16} className="text-theme-sub shrink-0" />
                  <input
                    value={user?.email || 'user@meetsphere.com'}
                    disabled
                    className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-theme-heading font-semibold"
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-soft">
              {savedSuccess ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Changes saved successfully!
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Theme Preference Card */}
          <div className="rounded-3xl border border-soft bg-elevated p-6 shadow-sm space-y-4">
            <h2 className="font-extrabold text-base text-theme-heading">Theme Preference</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-brand-500 bg-brand-500/15 text-brand-400 shadow-sm font-extrabold'
                    : 'border-soft text-theme-sub hover:bg-surface'
                }`}
              >
                <Moon size={16} /> Dark Mode
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'border-brand-500 bg-brand-500/15 text-brand-600 dark:text-brand-400 shadow-sm font-extrabold'
                    : 'border-soft text-theme-sub hover:bg-surface'
                }`}
              >
                <Sun size={16} /> Light Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYMENT HISTORY & RECEIPT DOWNLOADS */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-fade-up">
          {/* Active Subscription Summary */}
          <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-500/10 via-elevated to-surface p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 font-extrabold text-xs border border-brand-500/30 mb-2">
                <Sparkles size={13} /> Current Subscription Status
              </span>
              <h2 className="font-extrabold text-lg sm:text-xl text-theme-heading">
                {hasActivePlan ? `${purchasedPlans.length} Active Room ${purchasedPlans.length === 1 ? 'Plan' : 'Plans'}` : 'No Active Plan'}
              </h2>
              <p className="text-xs text-theme-sub font-semibold mt-1">
                {hasActivePlan ? 'You can host calls and download official transaction receipts below.' : 'Subscribe to a Room Plan to download receipts and start meetings.'}
              </p>
            </div>
            <button
              onClick={() => navigate('/app/plans')}
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-950 font-extrabold text-xs shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              {hasActivePlan ? 'Add / Upgrade Plan' : 'Subscribe Now'}
            </button>
          </div>

          {/* Active Room Subscriptions list with Deactivate option */}
          {hasActivePlan && (
            <div className="rounded-3xl border border-soft bg-elevated p-6 shadow-sm space-y-4">
              <h2 className="font-extrabold text-base text-theme-heading">Active Room Plan Subscriptions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {purchasedPlans.map((plan) => (
                  <div key={plan.id} className="bg-surface/60 border border-brand-500/30 p-4 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-sm text-theme-heading">{plan.name}</p>
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-bold">👤 {plan.maxHosts} Hosts · 👥 {plan.maxUsers} Users</p>
                    </div>
                    <button
                      onClick={() => handleOpenDeactivateModal(plan)}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-white font-extrabold text-xs border border-rose-500/30 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Power size={13} />
                      <span>Deactivate</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Receipts List */}
          <div className="rounded-3xl border border-soft bg-elevated p-6 shadow-sm space-y-4">
            <h2 className="font-extrabold text-base text-theme-heading">Payment History & Tax Invoices ({paymentHistory.length})</h2>

            {paymentHistory.length === 0 ? (
              <div className="py-12 text-center text-xs font-bold text-theme-sub border border-dashed border-soft rounded-2xl">
                <Receipt size={32} className="mx-auto text-muted mb-2" />
                <p>No billing transactions found yet.</p>
                <p className="text-[11px] font-normal text-slate-400 mt-1">When you purchase a Room Plan, official receipts will be stored here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentHistory.map((rcpt, idx) => (
                  <div
                    key={rcpt.invoiceNumber || idx}
                    className="rounded-2xl border border-soft bg-surface/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-500/40 transition-all shadow-sm"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-sm text-theme-heading">{rcpt.planName}</p>
                        <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase border border-emerald-500/30">
                          {rcpt.status || 'PAID'}
                        </span>
                      </div>
                      <p className="text-xs font-mono font-medium text-theme-sub mt-1">
                        Invoice #{rcpt.invoiceNumber} · {rcpt.date}
                      </p>
                      <p className="text-[11px] text-theme-body font-semibold mt-0.5">
                        Capacity: {rcpt.maxHosts} Hosts · {rcpt.maxUsers} Users · Method: {rcpt.paymentMethod}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-soft">
                      <p className="font-display font-extrabold text-base text-brand-600 dark:text-brand-400">
                        {rcpt.amount}
                      </p>
                      <button
                        onClick={() => generateAndDownloadReceipt(rcpt)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500/15 hover:bg-brand-500 text-brand-600 dark:text-brand-400 hover:text-ink-950 font-extrabold text-xs transition-all border border-brand-500/30 cursor-pointer shadow-sm"
                      >
                        <Download size={14} />
                        <span>Download Receipt</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ACCOUNT & SECURITY */}
      {activeTab === 'account' && (
        <div className="space-y-6 animate-fade-up">
          <div className="rounded-3xl border border-soft bg-elevated p-6 shadow-sm space-y-4">
            <h2 className="font-extrabold text-base text-theme-heading">Session & Security</h2>
            <div className="text-xs text-theme-sub space-y-2">
              <p>Current Active Session: <span className="font-bold text-theme-heading">Web Browser (Windows / Mobile)</span></p>
              <p>Security Protocol: <span className="font-bold text-emerald-400">256-bit WebRTC End-to-End Encryption</span></p>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-500/30 bg-elevated p-6 shadow-sm space-y-3">
            <h2 className="font-extrabold text-sm text-rose-500 uppercase tracking-wider">Log Out</h2>
            <p className="text-xs text-theme-sub font-semibold">
              Sign out of your MeetSphere account on this browser session.
            </p>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <LogOut size={16} />
              <span>Log out from MeetSphere</span>
            </button>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      <DeactivatePlanModal
        open={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        planToDeactivate={planToDeactivate}
        onConfirmDeactivate={handleConfirmDeactivate}
      />
    </div>
  )
}
