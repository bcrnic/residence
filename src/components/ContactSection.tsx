import { useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: form.name.trim() || null,
      phone: form.phone.trim(),
      message: form.message.trim() || null,
    });
    setLoading(false);

    if (error) {
      toast({ title: t(tr.contact.errorTitle), description: t(tr.contact.errorDesc), variant: "destructive" });
      return;
    }

    toast({ title: t(tr.contact.successTitle), description: t(tr.contact.successDesc) });
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="kontakt" className="py-24 section-dark">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.contact.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-white">
              {t(tr.contact.title)} <span className="gold-gradient-text">{t(tr.contact.titleHighlight)}</span>
            </h2>
            <p className="text-white/50 mt-4 font-body">{t(tr.contact.subtitle)}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" placeholder={t(tr.contact.namePlaceholder)} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors font-body" maxLength={100} />
            <input type="tel" placeholder={t(tr.contact.phonePlaceholder)} required value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors font-body" maxLength={20} />
            <textarea placeholder={t(tr.contact.messagePlaceholder)} rows={4} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none font-body" maxLength={1000} />
            <button type="submit" disabled={loading} className="w-full btn-gold rounded flex items-center justify-center gap-2 disabled:opacity-60 font-body font-medium text-lg">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? t(tr.contact.sending) : t(tr.contact.submit)}
            </button>
          </form>

          <div className="flex flex-col justify-center space-y-8">
            <a href="tel:+381601234567" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest font-body">{t(tr.contact.phone)}</p>
                <p className="text-white text-lg font-medium font-body">+381 60 123 4567</p>
              </div>
            </a>
            <a href="mailto:info@residences.rs" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest font-body">{t(tr.contact.email)}</p>
                <p className="text-white text-lg font-medium font-body">info@residences.rs</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest font-body">{t(tr.contact.location)}</p>
                <p className="text-white text-lg font-medium font-body">Novi Sad, Srbija</p>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-16 max-w-5xl mx-auto rounded-lg overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.8!2d19.842!3d45.2671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b10613de3ad21%3A0x7df1e26f498520f0!2sNovi%20Sad!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs"
              width="100%" height="350"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Lokacija objekta - Novi Sad" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
