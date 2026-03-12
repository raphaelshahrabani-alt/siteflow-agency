import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Zap, DollarSign, Wrench, CheckCircle, Star, Phone, MapPin, Clock, Image as ImageIcon, DollarSign as PriceIcon } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Industrial Minimalism Design System
 * Primary: Warm Orange (#ff6b35) | Secondary: Charcoal (#1a1a1a) | Background: Warm White (#fafafa)
 * Typography: Georgia serif for display, system sans-serif for body
 * Layout: Asymmetric grid with generous whitespace and geometric accent lines
 */

export default function Home() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
  });

  const sendQuoteMutation = trpc.quotes.sendQuote.useMutation({
    onSuccess: () => {
      toast.success("Quote request sent! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", vehicle: "" });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send quote request");
    },
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    sendQuoteMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="font-georgia text-xl font-bold text-secondary">Auto Service</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-secondary hover:text-accent transition-colors">Services</a>
            <a href="#pricing" className="text-secondary hover:text-accent transition-colors">Pricing</a>
            <a href="#gallery" className="text-secondary hover:text-accent transition-colors">Gallery</a>
            <a href="#testimonials" className="text-secondary hover:text-accent transition-colors">Reviews</a>
            <a href="#contact" className="text-secondary hover:text-accent transition-colors">Contact</a>
          </div>
          <Button className="bg-accent hover:bg-orange-700 text-white">Get Quote</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/hero-banner-3c4kjk4Ak7yiza9UMyFnTA.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative container py-32 md:py-48">
          <div className="max-w-2xl">
            <h1 className="font-georgia text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Expert Auto Repair Services & Body works
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Your trusted partner for all automotive needs. Quality service, professional care, and expert mechanics.
            </p>
            <div className="flex gap-4">
              <Button className="bg-accent hover:bg-orange-700 text-white px-8 py-6 text-base">
                Our Services
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Geometric Accent Line */}
      <div className="h-1 bg-gradient-to-r from-accent to-transparent"></div>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-georgia text-4xl md:text-5xl font-bold text-secondary mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Oil Change Service */}
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-6 h-64">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/oil-change-service-DwHJ7JVBX4jrVLThTRQt8A.webp"
                  alt="Oil Change Service"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-georgia text-2xl font-bold text-secondary mb-3">Oil Change</h3>
              <p className="text-muted-foreground mb-4">
                Complete oil change service with premium oil and filter replacement
              </p>
              <p className="text-sm text-accent font-semibold">Category: Maintenance</p>
            </div>

            {/* Brake Service */}
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-6 h-64">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/brake-service-F8utg8f8sZ4r6h3pGXrCAH.webp"
                  alt="Brake Service"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-georgia text-2xl font-bold text-secondary mb-3">Brake Service</h3>
              <p className="text-muted-foreground mb-4">
                Professional brake inspection and repair service
              </p>
              <p className="text-sm text-accent font-semibold">Category: Brakes</p>
            </div>

            {/* Tire Replacement */}
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-6 h-64">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/tire-replacement-a6NzLUzHYnZuAWVN4tCaCM.webp"
                  alt="Tire Replacement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-georgia text-2xl font-bold text-secondary mb-3">Tire Replacement</h3>
              <p className="text-muted-foreground mb-4">
                Professional tire installation and balancing service
              </p>
              <p className="text-sm text-accent font-semibold">Category: Tires</p>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-accent hover:bg-orange-700 text-white px-8 py-6 text-base">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Geometric Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-georgia text-4xl md:text-5xl font-bold text-secondary mb-4">
              Service Pricing
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="text-left py-4 px-6 font-georgia text-lg text-secondary">Service</th>
                  <th className="text-left py-4 px-6 font-georgia text-lg text-secondary">Description</th>
                  <th className="text-right py-4 px-6 font-georgia text-lg text-secondary">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-white/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">Oil Change</td>
                  <td className="py-4 px-6 text-muted-foreground">Standard oil change with filter replacement</td>
                  <td className="py-4 px-6 text-right font-semibold text-accent">$49.99</td>
                </tr>
                <tr className="border-b border-border hover:bg-white/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">Brake Service</td>
                  <td className="py-4 px-6 text-muted-foreground">Brake pad replacement and rotor inspection</td>
                  <td className="py-4 px-6 text-right font-semibold text-accent">$129.99</td>
                </tr>
                <tr className="border-b border-border hover:bg-white/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">Tire Replacement</td>
                  <td className="py-4 px-6 text-muted-foreground">Single tire replacement and balancing</td>
                  <td className="py-4 px-6 text-right font-semibold text-accent">$89.99</td>
                </tr>
                <tr className="border-b border-border hover:bg-white/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">Tire Rotation</td>
                  <td className="py-4 px-6 text-muted-foreground">Full tire rotation and balance</td>
                  <td className="py-4 px-6 text-right font-semibold text-accent">$39.99</td>
                </tr>
                <tr className="border-b border-border hover:bg-white/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">Diagnostic</td>
                  <td className="py-4 px-6 text-muted-foreground">Complete vehicle diagnostic scan</td>
                  <td className="py-4 px-6 text-right font-semibold text-accent">$59.99</td>
                </tr>
                <tr className="hover:bg-white/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">Battery Replacement</td>
                  <td className="py-4 px-6 text-muted-foreground">Battery replacement and installation</td>
                  <td className="py-4 px-6 text-right font-semibold text-accent">$99.99</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">*Prices may vary based on vehicle make and model. Contact us for a detailed quote.</p>
          </div>
        </div>
      </section>

      {/* Geometric Accent Line */}
      <div className="h-1 bg-gradient-to-r from-accent to-transparent"></div>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-georgia text-4xl md:text-5xl font-bold text-secondary mb-4">
              Before & After Gallery
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Gallery Item 1 */}
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/gallery-engine-restoration-before-after-Chot9TLFWZ7Qs8A7z3tRaJ.webp"
                alt="Engine Restoration Before and After"
                className="w-full h-full object-cover aspect-video"
              />
              <div className="p-6">
                <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Engine Restoration</h3>
                <p className="text-muted-foreground">Complete engine cleaning and restoration service</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/gallery-transmission-repair-before-after-cfbxCJbMWypCQTWiNFTRwS.webp"
                alt="Transmission Repair Before and After"
                className="w-full h-full object-cover aspect-video"
              />
              <div className="p-6">
                <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Transmission Repair</h3>
                <p className="text-muted-foreground">Professional transmission rebuild and testing</p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/gallery-suspension-work-before-after-WCypftaQE4tWFVFHrwMHu3.webp"
                alt="Suspension Work Before and After"
                className="w-full h-full object-cover aspect-video"
              />
              <div className="p-6">
                <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Suspension Work</h3>
                <p className="text-muted-foreground">Complete suspension system overhaul</p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/gallery-electrical-system-before-after-d5WZkfNCXVrroy9fiBaUoX.webp"
                alt="Electrical System Before and After"
                className="w-full h-full object-cover aspect-video"
              />
              <div className="p-6">
                <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Electrical System</h3>
                <p className="text-muted-foreground">Electrical diagnostics and repairs</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">Upload your own before & after photos to showcase your work!</p>
          </div>
        </div>
      </section>

      {/* Geometric Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-georgia text-4xl md:text-5xl font-bold text-secondary mb-4">
              Why Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Fast Service */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Fast Service</h3>
                  <p className="text-muted-foreground">
                    Quick turnaround times without compromising quality
                  </p>
                </div>
              </div>
            </div>

            {/* Fair Service */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Fair Service</h3>
                  <p className="text-muted-foreground">
                    Transparent pricing with no hidden fees
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Mechanics */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Expert Mechanics</h3>
                  <p className="text-muted-foreground">
                    Certified professionals with years of experience
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Guarantee */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-georgia text-xl font-bold text-secondary mb-2">Quality Guarantee</h3>
                  <p className="text-muted-foreground">
                    We stand behind our work with a satisfaction guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geometric Accent Line */}
      <div className="h-1 bg-gradient-to-r from-accent to-transparent"></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-white relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663404278182/4Sr3CR2PWHJXiWjqTZL7Do/testimonial-background-dzWdbwHnJfmqUmbv8fPMKM.webp')",
            backgroundSize: "cover",
          }}
        ></div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-georgia text-4xl md:text-5xl font-bold text-secondary mb-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Excellent service! Fixed my car quickly and the service was very professional. Highly recommend."
              </p>
              <p className="font-georgia font-bold text-secondary">John Smith</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Been shopping around for a good mechanic and this place was by far the best!"
              </p>
              <p className="font-georgia font-bold text-secondary">Sarah Johnson</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Best auto shop in the area. They took the time to educate me about what to look for in the future."
              </p>
              <p className="font-georgia font-bold text-secondary">Mike Davis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Geometric Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-georgia text-4xl font-bold text-secondary mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-secondary">Address</p>
                    <p className="text-muted-foreground">4810 Ave Walkley, Montreal, Quebec H4V 2M2</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-secondary">Phone</p>
                    <p className="text-muted-foreground">(514) 486-6952</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-secondary">Hours</p>
                    <p className="text-muted-foreground">Monday - Friday: 7:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 8:00 AM - 4:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-border">
              <h3 className="font-georgia text-2xl font-bold text-secondary mb-6">Quick Quote</h3>
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <textarea
                  placeholder="Tell us about your vehicle"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                ></textarea>
                <Button 
                  type="submit"
                  disabled={sendQuoteMutation.isPending}
                  className="w-full bg-accent hover:bg-orange-700 text-white py-3"
                >
                  {sendQuoteMutation.isPending ? "Sending..." : "Get Quote"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-georgia text-lg font-bold mb-4">Auto Service Joe & Ralph</h4>
              <p className="text-white/80">Your trusted auto repair partner since 2010</p>
            </div>
            <div>
              <h4 className="font-georgia text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
                <li><a href="#pricing" className="hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
                <li><a href="#testimonials" className="hover:text-accent transition-colors">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-georgia text-lg font-bold mb-4">Contact Info</h4>
              <p className="text-white/80 mb-2">(514) 486-6952</p>
              <p className="text-white/80">info@autoservicejoeralph.com</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2026 Auto Service Joe & Ralph. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
