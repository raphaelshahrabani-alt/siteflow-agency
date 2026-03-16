import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Globe, Zap, Shield, TrendingUp, CheckCircle, Star,
  Phone, Mail, ArrowRight, ChevronDown, Monitor,
  Users, DollarSign, Clock, Award, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PORTFOLIO_ITEMS = [
  {
    title: "Auto Repair Shops",
    description: "Service menus, gallery, quote forms & Google Maps integration",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/agency-portfolio-auto-VUvggvPNL8zi2iqAWuNXRC.webp",
    tag: "Auto & Mechanical",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Restaurants & Cafés",
    description: "Online menus, reservation systems, food photography galleries",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/agency-portfolio-restaurant-9m8dk4nwdHmKEHJ9Guimpc.webp",
    tag: "Food & Hospitality",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Salons & Spas",
    description: "Booking systems, service menus, before/after galleries",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/agency-portfolio-salon-UqVmsYnKdzBiCEEZ5esk4P.webp",
    tag: "Beauty & Wellness",
    color: "from-pink-500 to-rose-600",
  },
];

const PLANS = [
  {
    name: "Professional Website",
    setupFee: 500,
    price: 50,
    description: "Everything your business needs — built once, managed monthly",
    features: [
      "Custom professional website design",
      "Mobile responsive on all devices",
      "Contact & quote request form",
      "Google Maps integration",
      "SEO-ready structure",
      "Monthly content updates",
      "Hosting & security managed",
      "Priority email & phone support",
      "You own your domain & content",
    ],
    highlight: true,
    priceId: "standard" as const,
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discovery Call", description: "We learn about your business, goals, and what makes you unique in your market.", icon: <MessageSquare className="w-6 h-6" /> },
  { step: "02", title: "Design & Build", description: "Our team designs and builds your custom website within 7 business days.", icon: <Monitor className="w-6 h-6" /> },
  { step: "03", title: "Review & Launch", description: "You review, we refine, then we launch your site live with your domain.", icon: <Globe className="w-6 h-6" /> },
  { step: "04", title: "Ongoing Support", description: "Monthly retainer keeps your site updated, secure, and performing.", icon: <Shield className="w-6 h-6" /> },
];

const TESTIMONIALS = [
  { name: "Joe Marchetti", business: "Auto Service Joe & Ralph", quote: "Within 2 weeks of launching our new website, we were getting 3x more quote requests. Best investment we made.", rating: 5, avatar: "JM" },
  { name: "Maria Santos", business: "Bella Salon & Spa", quote: "Our online bookings went through the roof. Clients love being able to book at midnight without calling us.", rating: 5, avatar: "MS" },
  { name: "David Chen", business: "Golden Dragon Restaurant", quote: "Professional, fast, and they actually understand what local businesses need. Highly recommend.", rating: 5, avatar: "DC" },
];

const FAQS = [
  { q: "How long does it take to build my website?", a: "Most websites are live within 5-7 business days after our discovery call. Complex projects with custom features may take 10-14 days." },
  { q: "Do I own my website?", a: "Yes, 100%. You own all the content, design, and domain. If you ever cancel, we hand everything over to you with no strings attached." },
  { q: "What's included in the monthly retainer?", a: "Monthly updates (text, photos, pricing), security monitoring, hosting management, performance optimization, and priority support. You never have to touch the backend." },
  { q: "Can I cancel the monthly retainer?", a: "Yes, anytime — no contracts, no penalties. If you cancel, we hand over all your files, code, and domain. You keep everything you paid for." },
  { q: "What if I'm not happy with the design?", a: "We offer unlimited revisions during the build phase until you're 100% satisfied. Your approval is required before we go live." },
];

const SALES_STEPS = [
  { step: "Step 1 — Find the prospect", content: "Search Google for local businesses in your city with no website or a bad one (slow, ugly, not mobile-friendly). Call them or walk in." },
  { step: "Step 2 — The opener", content: "Say: 'Hi, I build websites for [industry] businesses in [city]. I noticed your site could use some work — I'd love to show you what we can do. Can I send you a quick example?'" },
  { step: "Step 3 — Send this page", content: "Share the link to this page. Let the portfolio, pricing, and testimonials do the talking. Most prospects will pick a plan themselves." },
  { step: "Step 4 — Handle objections", content: "'$500 is too much?' Reply: 'That's less than one new customer — and you'll get dozens.' | 'What about the $50/month?' Reply: 'That covers hosting, updates, and support. Less than a Netflix subscription.' | 'Already have a site?' Reply: 'Let me show you what yours looks like on mobile.' | 'Need to think?' Reply: 'I only take one new client per week.'" },
  { step: "Step 5 — Close & collect", content: "Send them directly to the pricing section. They click, pay $500 setup + first month, and you get notified instantly. Start the discovery call within 24 hours." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", business: "", message: "" });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const contactMutation = trpc.agency.contact.useMutation({
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch within 24 hours.");
      setContactForm({ name: "", email: "", business: "", message: "" });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    },
  });

  const checkoutMutation = trpc.agency.createCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to start checkout";
      toast.error(msg);
    },
  });

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return toast.error("Name and email are required");
    contactMutation.mutate(contactForm);
  };

  const handleCheckout = (planId: "standard") => {
    setSelectedPlan(planId);
    checkoutMutation.mutate({ planId, origin: window.location.origin });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SiteFlow Agency</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#process" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a href="#pricing">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 h-9">
              Get Started
            </Button>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/agency-hero-bg-LJ3hGm3TPiM5wddfnnn4uS.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
              <Zap className="w-3.5 h-3.5" />
              Professional Websites for Local Businesses
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Your Business Deserves a{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Website That Works
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              We build stunning, high-converting websites for local businesses — auto shops, restaurants, salons, and more. Fully managed monthly retainer so you never have to worry about it.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#pricing">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-base font-semibold">
                  See Pricing <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base bg-transparent">
                  View Our Work
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-8 mt-10 pt-10 border-t border-white/10">
              {[["50+", "Sites Launched"], ["4.9★", "Avg. Rating"], ["7 Days", "Avg. Delivery"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{val}</div>
                  <div className="text-sm text-white/50">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/40 border border-white/10">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/agency-portfolio-auto-VUvggvPNL8zi2iqAWuNXRC.webp" alt="Example website" className="w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl overflow-hidden shadow-xl border border-white/10 w-48">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/agency-portfolio-salon-UqVmsYnKdzBiCEEZ5esk4P.webp" alt="Salon website" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white/5 border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-sm text-white/50">
          {["Auto Shops", "Restaurants", "Salons & Spas", "Plumbers", "Dentists", "Lawyers", "Gyms", "Retail Stores"].map((niche) => (
            <span key={niche} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400" /> {niche}
            </span>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Built for Every Local Business</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">We specialize in industries where a professional online presence directly drives revenue.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <div key={item.title} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden h-52">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute top-3 left-3 bg-gradient-to-r ${item.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>{item.tag}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Business Owners Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-6 h-6 text-blue-400" />, title: "Live in 7 Days", desc: "From discovery call to live website in under a week." },
              { icon: <DollarSign className="w-6 h-6 text-green-400" />, title: "No Hidden Fees", desc: "Flat monthly retainer. No surprise invoices, ever." },
              { icon: <Award className="w-6 h-6 text-yellow-400" />, title: "You Own It", desc: "100% ownership of your site, domain, and content." },
              { icon: <TrendingUp className="w-6 h-6 text-purple-400" />, title: "Built to Convert", desc: "Every page is designed to turn visitors into customers." },
              { icon: <Shield className="w-6 h-6 text-blue-400" />, title: "Fully Managed", desc: "We handle updates, security, and hosting every month." },
              { icon: <Users className="w-6 h-6 text-pink-400" />, title: "Local Expertise", desc: "We understand what local customers search for." },
              { icon: <Globe className="w-6 h-6 text-indigo-400" />, title: "SEO Ready", desc: "Built with search engines in mind from day one." },
              { icon: <Zap className="w-6 h-6 text-orange-400" />, title: "Lightning Fast", desc: "Optimized performance scores on all devices." },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-white/60 text-lg">One price. No tiers. No surprises.</p>
        </div>
        <div className="max-w-xl mx-auto">
          {PLANS.map((plan) => (
            <div key={plan.name} className="rounded-2xl border bg-gradient-to-b from-blue-600/20 to-indigo-600/10 border-blue-500/50 shadow-xl shadow-blue-900/30 p-10 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">EVERYTHING INCLUDED</div>
              <h3 className="text-2xl font-bold mb-1 text-center">{plan.name}</h3>
              <p className="text-white/50 text-sm mb-8 text-center">{plan.description}</p>

              {/* Pricing breakdown */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center items-center">
                <div className="text-center">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-1">One-Time Setup</div>
                  <div className="text-5xl font-extrabold">${plan.setupFee}</div>
                </div>
                <div className="text-white/30 text-3xl font-thin hidden sm:block">+</div>
                <div className="text-center">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Monthly Retainer</div>
                  <div className="flex items-end gap-1 justify-center">
                    <span className="text-5xl font-extrabold">${plan.price}</span>
                    <span className="text-white/50 mb-1">/mo</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={checkoutMutation.isPending && selectedPlan === plan.priceId}
                className="w-full py-6 text-base font-semibold bg-blue-600 hover:bg-blue-500 text-white"
              >
                {checkoutMutation.isPending && selectedPlan === plan.priceId ? "Redirecting to checkout..." : `Get Started — $${plan.setupFee} + $${plan.price}/mo`}
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 text-sm mt-8">Cancel the monthly retainer anytime. You always keep your website.</p>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-gradient-to-b from-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60 text-lg">From first call to live website in 4 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-blue-400">{step.icon}</span>
                </div>
                <div className="text-xs font-bold text-blue-400 mb-2">{step.step}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-300">{t.avatar}</div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SALES GUIDE */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Simple Sales Script</h2>
            <p className="text-white/60">Share this page with prospects. Here is how to close the deal.</p>
          </div>
          <div className="space-y-4">
            {SALES_STEPS.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-blue-400 font-bold text-sm mb-2">{item.step}</div>
                <p className="text-white/70">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-semibold">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-gradient-to-b from-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6">Have Questions? Let's Talk.</h2>
            <p className="text-white/60 mb-8">Not ready to pick a plan yet? Send us a message and we'll walk you through everything — no pressure.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70"><Phone className="w-5 h-5 text-blue-400" /><span>(514) 555-0100</span></div>
              <div className="flex items-center gap-3 text-white/70"><Mail className="w-5 h-5 text-blue-400" /><span>hello@siteflowagency.com</span></div>
            </div>
          </div>
          <form onSubmit={handleContact} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
            <input type="text" placeholder="Your Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500" required />
            <input type="email" placeholder="Email Address" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500" required />
            <input type="text" placeholder="Business Name (optional)" value={contactForm.business} onChange={(e) => setContactForm({ ...contactForm, business: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500" />
            <textarea placeholder="Tell us about your business..." value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 resize-none" />
            <Button type="submit" disabled={contactMutation.isPending} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 font-semibold">
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold">SiteFlow Agency</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/30 text-sm">2026 SiteFlow Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
