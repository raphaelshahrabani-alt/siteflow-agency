import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Wrench, Disc, Flame, Droplets, CircleDot, Activity,
  Truck, ClipboardCheck, Phone, Mail, Clock, MapPin,
  CheckCircle, ArrowRight, Wifi, Accessibility, MessageSquare,
  ChevronDown, Shield, DollarSign, ThumbsUp, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    icon: <Activity className="w-7 h-7" />,
    title: "Engine Diagnostics",
    description: "Check engine light, oil light, TPMS, no-start diagnosis — we find the root cause fast.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: <Disc className="w-7 h-7" />,
    title: "Brake Repair",
    description: "Brake pads, rotors, calipers, and brake fluid service. Your safety is our priority.",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  {
    icon: <CircleDot className="w-7 h-7" />,
    title: "Tire Services",
    description: "Tire installation, balancing, alignment, used tires — all makes and models.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "Oil Change",
    description: "Conventional and synthetic oil changes with multi-point inspection included.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Suspension & Steering",
    description: "Shocks, struts, wheel alignment, steering components — smooth ride guaranteed.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: <Flame className="w-7 h-7" />,
    title: "Exhaust & Muffler",
    description: "Muffler repair, exhaust pipe replacement, catalytic converter service.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Roadside Assistance",
    description: "Stranded? We tow you straight to our shop. Available 7 days a week.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: <ClipboardCheck className="w-7 h-7" />,
    title: "Vehicle Inspection",
    description: "Safety inspections, pre-purchase checks, hybrid & EV diagnostics.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

const WHY_US = [
  {
    icon: <Clock className="w-6 h-6 text-orange-400" />,
    title: "Open 7 Days a Week",
    desc: "Mon–Sat 8AM–6PM and Sundays 9:30AM–5PM. We work around your schedule, not the other way.",
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-blue-400" />,
    title: "Honest Expert Advice",
    desc: "Our team listens, cares, and delivers straight answers — no upsells, no surprises.",
  },
  {
    icon: <Truck className="w-6 h-6 text-green-400" />,
    title: "We Tow You In",
    desc: "Need a tow? We've got you covered with roadside assistance straight to our shop.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-yellow-400" />,
    title: "We Save You Money",
    desc: "Fair, transparent pricing on every job. We work to save you costs without cutting corners.",
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    title: "Trusted by Montrealers",
    desc: "Serving the greater Montreal area with quality auto care the community can count on.",
  },
  {
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    title: "Fast Turnaround",
    desc: "Efficient service so you're back on the road as quickly as possible.",
  },
];

const HOURS = [
  { day: "Monday", hours: "8:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "8:00 AM – 6:00 PM" },
  { day: "Wednesday", hours: "8:00 AM – 6:00 PM" },
  { day: "Thursday", hours: "8:00 AM – 6:00 PM" },
  { day: "Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 6:00 PM" },
  { day: "Sunday", hours: "9:30 AM – 5:00 PM" },
];

const SERVICE_OPTIONS = [
  "Engine Diagnostics",
  "Brake Repair",
  "Tire Services",
  "Oil Change",
  "Suspension & Steering",
  "Exhaust & Muffler",
  "Roadside Assistance",
  "Vehicle Inspection",
  "Other",
];

export default function GarageSite() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const contactMutation = trpc.agency.contact.useMutation({
    onSuccess: () => {
      toast.success("Quote request sent! We'll call you within 24 hours.");
      setForm({ name: "", phone: "", service: "", message: "" });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to send request";
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error("Name and phone number are required");
    contactMutation.mutate({
      name: form.name,
      email: `${form.phone}@noreply.com`,
      business: "New York Garage",
      message: `Service: ${form.service || "Not specified"}\n\n${form.message}`,
    });
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight">New York Garage</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest leading-tight">Montréal</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#why-us" className="hover:text-white transition-colors">About</a>
            <a href="#hours" className="hover:text-white transition-colors">Hours</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a href="tel:5148842528">
            <Button className="bg-orange-600 hover:bg-orange-500 text-white text-sm px-5 h-9 gap-2">
              <Phone className="w-3.5 h-3.5" />
              (514) 884-2528
            </Button>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(234,88,12,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(220,38,38,0.10)_0%,_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open Today · {today === "Sunday" ? "9:30 AM – 5:00 PM" : "8:00 AM – 6:00 PM"}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Montreal's{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Trusted Auto
              </span>{" "}
              Repair Shop
            </h1>

            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
              Expert repairs, honest pricing, and 7-day service — because car trouble doesn't follow a schedule. Towing available straight to our shop.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a href="tel:5148842528">
                <Button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-6 text-base font-semibold gap-2">
                  <Phone className="w-4 h-4" />
                  Call (514) 884-2528
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base bg-transparent gap-2">
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-0 border border-white/10 rounded-2xl overflow-hidden bg-white/5 divide-x divide-white/10">
              {[
                ["7 Days", "Open Every Week"],
                ["All Makes", "& Models"],
                ["Towing", "Available"],
                ["Free", "Estimates"],
              ].map(([val, label]) => (
                <div key={label} className="flex-1 min-w-[80px] px-6 py-4 text-center">
                  <div className="text-xl font-bold text-orange-400">{val}</div>
                  <div className="text-xs text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-gradient-to-b from-transparent to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              From quick diagnostics to full repairs — we handle it all under one roof.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`rounded-2xl border p-6 ${service.bg} hover:scale-[1.02] transition-transform duration-200 cursor-default`}
                onClick={() => setOpenService(openService === i ? null : i)}
              >
                <div className={`mb-4 ${service.color}`}>{service.icon}</div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contact">
              <Button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-5 font-semibold gap-2">
                Request a Service Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-6">
                About New York Garage
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                We Stand Out With{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Longer Hours
                </span>{" "}
                & 7-Day Service
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                At New York Garage, we go beyond the standard shop. Our team listens, cares, and delivers honest, expert advice — every time. Whether you need a quick oil change or a complex engine repair, we treat your vehicle like our own.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Need a tow? We've got you covered with roadside assistance straight to our shop. We work hard to save you costs without compromising quality.
              </p>
              {/* Amenity badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Accessibility className="w-4 h-4" />, label: "Accessible Parking" },
                  { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" },
                  { icon: <MessageSquare className="w-4 h-4" />, label: "ASL Proficient" },
                  { icon: <CheckCircle className="w-4 h-4" />, label: "No Steps / Stairs" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-sm text-white/70">
                    <span className="text-orange-400">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {WHY_US.map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors">
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOURS & CONTACT */}
      <section id="hours" className="py-24 bg-gradient-to-b from-[#111] to-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Hours & Contact</h2>
            <p className="text-white/50 text-lg">Open 7 days a week to keep you moving.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Hours Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Business Hours
              </h3>
              <div className="space-y-3">
                {HOURS.map(({ day, hours }) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-2 border-b border-white/5 last:border-0 ${today === day ? "text-orange-400 font-semibold" : "text-white/70"}`}
                  >
                    <span className="text-sm flex items-center gap-2">
                      {today === day && <div className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                      {day}
                    </span>
                    <span className="text-sm">{hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <a href="tel:5148842528" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Phone</div>
                    <div className="font-semibold">(514) 884-2528</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Location</div>
                    <div className="font-semibold">Serving Greater Montréal Area</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div id="contact">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-2">Request a Free Quote</h3>
                <p className="text-white/40 text-sm mb-6">We'll call you within 24 hours to discuss your needs.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors"
                    required
                  />
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      <option value="" className="bg-[#1a1a1a]">Select a Service</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  </div>
                  <textarea
                    placeholder="Describe your issue (optional)..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white py-5 font-semibold text-base gap-2"
                  >
                    {contactMutation.isPending ? "Sending..." : (
                      <>Send Quote Request <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-700">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold mb-1">Car trouble? We're open today.</h2>
            <p className="text-white/80">Call us or stop by — no appointment needed for most services.</p>
          </div>
          <a href="tel:5148842528">
            <Button className="bg-white text-orange-700 hover:bg-white/90 px-8 py-5 font-bold text-base gap-2 whitespace-nowrap">
              <Phone className="w-4 h-4" />
              (514) 884-2528
            </Button>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-bold">New York Garage</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Montréal</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Expert auto repair with honest pricing and 7-day service. Serving the greater Montréal area.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/40">Services</h4>
              <ul className="space-y-2 text-sm text-white/50">
                {["Engine Diagnostics", "Brake Repair", "Tire Services", "Oil Change", "Roadside Assistance", "Vehicle Inspection"].map((s) => (
                  <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            {/* Hours */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/40">Hours</h4>
              <div className="space-y-1.5 text-sm text-white/50">
                <div className="flex justify-between"><span>Mon – Sat</span><span>8:00 AM – 6:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>9:30 AM – 5:00 PM</span></div>
              </div>
              <div className="mt-5 space-y-2">
                <a href="tel:5148842528" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm transition-colors">
                  <Phone className="w-4 h-4" /> (514) 884-2528
                </a>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <MapPin className="w-4 h-4" /> Serving Greater Montréal
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
            <p>© 2026 New York Garage. All rights reserved.</p>
            <p>
              Website by{" "}
              <a href="/" className="text-orange-400 hover:text-orange-300 transition-colors">SiteFlow Agency</a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
