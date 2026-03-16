import { CheckCircle, ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "wouter";

const PLAN_NAMES: Record<string, string> = {
  starter: "Starter Plan",
  growth: "Growth Plan",
  premium: "Premium Plan",
};

export default function PaymentSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const planId = params.get("plan") || "growth";
  const planName = PLAN_NAMES[planId] || "Your Plan";

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>

        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            SiteFlow Agency!
          </span>
        </h1>

        <p className="text-white/70 text-lg mb-2">
          Your <strong className="text-white">{planName}</strong> subscription is now active.
        </p>
        <p className="text-white/50 mb-10">
          We've received your payment and will be in touch within 24 hours to schedule your discovery call.
        </p>

        {/* What Happens Next */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-xl font-bold mb-6 text-center">What Happens Next</h2>
          <div className="space-y-5">
            {[
              {
                icon: <Mail className="w-5 h-5 text-blue-400" />,
                title: "Check your email",
                desc: "You'll receive a confirmation email with your subscription details and receipt.",
              },
              {
                icon: <Phone className="w-5 h-5 text-green-400" />,
                title: "We'll call you within 24 hours",
                desc: "Our team will reach out to schedule your discovery call and gather your business information.",
              },
              {
                icon: <Calendar className="w-5 h-5 text-purple-400" />,
                title: "Discovery call & kickoff",
                desc: "We'll discuss your goals, branding, and content. Your website build begins immediately after.",
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-yellow-400" />,
                title: "Live in 7 days",
                desc: "Your professional website will be live and ready to attract customers within one week.",
              },
            ].map((step) => (
              <div key={step.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="font-semibold mb-0.5">{step.title}</div>
                  <div className="text-white/50 text-sm">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 font-semibold">
              Back to Home <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="mailto:hello@siteflowagency.com">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-5 bg-transparent">
              Contact Us
            </Button>
          </a>
        </div>

        <p className="text-white/30 text-sm mt-8">
          Questions? Email us at{" "}
          <a href="mailto:hello@siteflowagency.com" className="text-blue-400 hover:underline">
            hello@siteflowagency.com
          </a>
        </p>
      </div>
    </div>
  );
}
