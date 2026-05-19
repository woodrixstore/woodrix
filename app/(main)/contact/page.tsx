import { ContactForm } from "@/components/common/ContactForm";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Contact</p>
        <h1 className="font-serif text-5xl text-espresso">Let's talk</h1>
        <p className="text-muted-foreground mt-2">Questions, custom orders, or just to say hi.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <Info icon={<Mail className="h-5 w-5" />} label="Email" value={BRAND.email} />
          <Info icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value={BRAND.whatsapp} />
          <Info icon={<MapPin className="h-5 w-5" />} label="Studio" value="Lahore, Pakistan" />
          <Info icon={<Clock className="h-5 w-5" />} label="Hours" value="Mon–Sat · 10am–7pm PKT" />
          <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-sand mt-6 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Google Map embed placeholder</p>
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
