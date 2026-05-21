import { ContactForm } from "@/components/common/ContactForm";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Woodrix — Handcrafted Wooden Home Décor Karachi",
  description: "Get in touch with Woodrix. We're based in North Karachi, Pakistan. Custom orders, questions, or just say hi — we'd love to hear from you.",
  openGraph: {
    title: "Contact Woodrix",
    description: "Reach us via WhatsApp, email, or visit our workshop in North Karachi, Pakistan.",
  },
};

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Contact Us</p>
        <h1 className="font-serif text-5xl text-espresso">Let's talk</h1>
        <p className="text-muted-foreground mt-2">Custom orders, questions, or just to say hi — we'd love to hear from you.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <Info icon={<Mail className="h-5 w-5" />} label="Email" value={BRAND.email} />
          <Info icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value={BRAND.whatsapp} />
          <Info icon={<MapPin className="h-5 w-5" />} label="Studio" value="North Karachi, Karachi, Pakistan" />
          <Info icon={<Clock className="h-5 w-5" />} label="Hours" value="Mon–Sat · 10am–7pm PKT" />
          <div className="rounded-xl overflow-hidden border border-sand mt-6 shadow-warm-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14453.454!2d67.04030!3d24.96290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338bca8baa4b5%3A0x3dafc0e03ec92abf!2sNorth%20Karachi%2C%20Karachi%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1716000000000!5m2!1sen!2spk"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Woodrix Workshop — North Karachi"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-surface text-accent rounded-full p-2.5">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-espresso">{value}</p>
      </div>
    </div>
  );
}
