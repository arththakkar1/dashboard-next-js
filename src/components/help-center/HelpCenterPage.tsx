"use client";

import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  LifeBuoy,
  FileText,
  Video,
  Zap,
  ShieldCheck,
  CreditCard,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  UsersRound,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

/* ─── Quick-link cards ─── */
const quickLinks = [
  {
    title: "Getting Started",
    description: "Learn the basics of managing your restaurant dashboard",
    icon: Zap,
    color: "from-primary to-primary-dark",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    href: "#getting-started",
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step guides for all features",
    icon: Video,
    color: "from-violet-500 to-violet-600",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    href: "#tutorials",
  },
  {
    title: "API Documentation",
    description: "Technical docs for integrations and custom setups",
    icon: FileText,
    color: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    href: "#api-docs",
  },
  {
    title: "Account & Billing",
    description: "Manage your subscription, invoices, and payment methods",
    icon: CreditCard,
    color: "from-amber-500 to-amber-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    href: "#billing",
  },
];

/* ─── FAQ categories ─── */
type FaqCategory =
  | "all"
  | "orders"
  | "menu"
  | "reservations"
  | "analytics"
  | "staff"
  | "account";

const faqCategories: {
  value: FaqCategory;
  label: string;
  icon: typeof BookOpen;
}[] = [
  { value: "all", label: "All", icon: BookOpen },
  { value: "orders", label: "Orders", icon: ClipboardList },
  { value: "menu", label: "Menu", icon: UtensilsCrossed },
  { value: "reservations", label: "Reservations", icon: BookOpen },
  { value: "analytics", label: "Analytics", icon: BarChart3 },
  { value: "staff", label: "Staff", icon: UsersRound },
  { value: "account", label: "Account", icon: ShieldCheck },
];

/* ─── FAQ data ─── */
interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: FaqCategory;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "How do I create a new order?",
    answer:
      'Navigate to the Orders page and click the "+ New Order" button in the top-right corner. Fill in the customer details, select menu items, specify quantities, and choose the order type (Dine-in, Takeaway, or Delivery). Click "Create Order" to submit.',
    category: "orders",
  },
  {
    id: 2,
    question: "How can I update or cancel an existing order?",
    answer:
      "Open the Orders page and find the order in the table. Click the order row to view its details. You can modify items, change quantities, or click the cancel button to cancel the order. All changes are saved automatically.",
    category: "orders",
  },
  {
    id: 3,
    question: "How do I add a new dish to the menu?",
    answer:
      'Go to the Menu page and click "+ Add Item". Fill in the dish name, description, price, category (Starters, Main Course, Breads, Biryani, Desserts, Beverages), and optionally upload a photo. Toggle the "Available" switch to make it visible to customers.',
    category: "menu",
  },
  {
    id: 4,
    question: "Can I set different prices for dine-in vs. delivery?",
    answer:
      "Yes! When editing a menu item, you'll find separate price fields for dine-in, takeaway, and delivery. You can set different prices for each channel to account for packaging and delivery costs.",
    category: "menu",
  },
  {
    id: 5,
    question: "How do I manage table reservations?",
    answer:
      'Visit the Reservations page where you can see all upcoming bookings. Click "+ New Reservation" to add one manually. You can set the guest name, party size, date, time, and assign a specific table. The system prevents double-booking automatically.',
    category: "reservations",
  },
  {
    id: 6,
    question: "What do the different reservation statuses mean?",
    answer:
      '"Confirmed" means the booking is accepted. "Pending" reservations await your approval. "Seated" indicates the guest has arrived and is at their table. "Completed" means the dining session is done. "Cancelled" reservations are no longer active.',
    category: "reservations",
  },
  {
    id: 7,
    question: "How do I read the analytics dashboard?",
    answer:
      "The Analytics page shows key metrics including total revenue, order trends, peak hours, top-selling items, and category performance. Use the date filters to compare different periods. Charts are interactive—hover for details and click legends to toggle data series.",
    category: "analytics",
  },
  {
    id: 8,
    question: "Can I export reports from Analytics?",
    answer:
      "Yes, each chart section has an export button that lets you download data as CSV or PDF. You can also schedule automatic weekly or monthly reports to be sent to your email from Settings → Reports.",
    category: "analytics",
  },
  {
    id: 9,
    question: "How do I add or remove a staff member?",
    answer:
      'Go to the Staff page and click "+ Add Staff" to add new team members. Fill in their name, role, contact details, and work schedule. To remove someone, click their profile and select "Deactivate" from the options menu.',
    category: "staff",
  },
  {
    id: 10,
    question: "How are staff roles and permissions managed?",
    answer:
      "Each staff member can be assigned one of several roles: Chef, Waiter, Manager, Host, or Bartender. Managers have full access to all features. Other roles have access limited to relevant sections (e.g., Chefs see kitchen orders, Waiters see table assignments).",
    category: "staff",
  },
  {
    id: 11,
    question: "How do I switch between dark and light mode?",
    answer:
      "Click the sun/moon icon in the top-right corner of the header to toggle between dark and light mode. Your preference is saved automatically and persists across sessions.",
    category: "account",
  },
  {
    id: 12,
    question: "How can I reset my password?",
    answer:
      'Go to Settings → Security and click "Change Password". You\'ll need to enter your current password, then your new password twice for confirmation. Password must be at least 8 characters with at least one number and one special character.',
    category: "account",
  },
];

/* ─── Contact options ─── */
const contactOptions = [
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    icon: MessageCircle,
    action: "Start Chat",
    availability: "Available 24/7",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Phone Support",
    description: "Speak directly with a support specialist",
    icon: Phone,
    action: "+91 1800-123-4567",
    availability: "Mon–Sat, 9 AM – 9 PM IST",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Email Us",
    description: "Get a response within 24 hours",
    icon: Mail,
    action: "support@spicekitchen.in",
    availability: "Response within 24 hrs",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

/* ─── Helpful tips ─── */
const tips = [
  "Use keyboard shortcut ⌘K (Ctrl+K) to quickly search anywhere in the dashboard.",
  "You can collapse the sidebar for more workspace by clicking the arrow button.",
  "Pin your most-used menu items to the top for faster order entry.",
  "Set up automatic table assignment for walk-in customers in Settings → Reservations.",
  "Enable push notifications to stay updated on new orders even when the tab is in the background.",
];

/* ════════════════════════════════════════════════════════════════ */

export default function HelpCenterPage() {
  usePageMeta("Help Center", "Find answers and get support");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  /* Filtered FAQs */
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 min-w-0">
      {/* ─── Hero / Search ─── */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary-dark to-indigo-700 p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-60" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <LifeBuoy className="h-4 w-4" />
            Help Center
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            How can we help you?
          </h1>
          <p className="text-white/75 text-base md:text-lg">
            Search our knowledge base or browse categories below
          </p>

          {/* Search */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers…"
              className="w-full rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 pl-12 pr-4 py-3.5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-0.5"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.iconBg} mb-3`}
              >
                <link.icon className={`h-5 w-5 ${link.iconColor}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-muted-foreground flex-1">
                {link.description}
              </p>
              <div className="flex items-center gap-1 mt-3 text-sm font-medium text-primary opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h2>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {faqCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 ${
                    isExpanded
                      ? "border-primary/30 bg-card shadow-md shadow-primary/5"
                      : "border-border bg-card hover:border-primary/20"
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`text-sm font-medium ${
                        isExpanded ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {faq.question}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-4">
                      <div className="border-t border-border pt-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-muted-foreground">
                            Was this helpful?
                          </span>
                          <button className="text-xs font-medium text-primary hover:underline">
                            Yes
                          </button>
                          <button className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline">
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-4 text-center">
              <Search className="h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">
                No results found
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Try a different search term or browse a different category. You
                can also contact our support team for help.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Contact Support ─── */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Contact Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactOptions.map((opt) => (
            <div
              key={opt.title}
              className="flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-primary/20"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${opt.bg} mb-4`}
              >
                <opt.icon className={`h-5 w-5 ${opt.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {opt.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {opt.description}
              </p>
              <div className="mt-auto">
                <p className="text-sm font-medium text-foreground">
                  {opt.action}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {opt.availability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pro Tips ─── */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          💡 Pro Tips
        </h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-4">
              <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section className="rounded-2xl border border-border bg-card p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Still need help?
        </h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          Our support team is always ready to assist you. Reach out and we'll
          get back to you as soon as possible.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary/80 hover:-translate-y-0.5">
            <ExternalLink className="h-4 w-4" />
            Visit Knowledge Base
          </button>
        </div>
      </section>
    </div>
  );
}
