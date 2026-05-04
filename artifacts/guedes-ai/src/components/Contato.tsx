import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type FormValues = {
  name: string;
  email: string;
  whatsapp: string;
  type: string;
  consent: boolean;
};

export default function Contato() {
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();
  const ct = t.contato;

  const formSchema = z.object({
    name: z.string().min(2, ct.nameError),
    email: z.string().email(ct.emailError),
    whatsapp: z.string().min(8, ct.whatsappError),
    type: z.string().min(1, ct.typeError),
    consent: z.boolean().refine(val => val === true, ct.consentError),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", whatsapp: "", type: "", consent: false },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(data);
    setSuccess(true);
    form.reset();
  };

  return (
    <section id="contato" className="w-full pt-16 md:pt-32 bg-black border-t border-border overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 pb-16 lg:pb-0">
        
        {/* Left: Content & Form */}
        <div className="flex flex-col justify-center lg:justify-start lg:pb-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-4">
              {ct.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {ct.h2}
            </h2>
            <p className="text-lg text-white/50">{ct.p}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center py-12 px-6 bg-card border border-border rounded-2xl text-center">
                <MessageSquare className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">{ct.successTitle}</h3>
                <p className="text-foreground/50 mb-8">{ct.successDesc}</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {ct.successLink}
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-white/50">{ct.nameLabel}</label>
                    <input
                      {...form.register("name")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder={ct.namePlaceholder}
                    />
                    {form.formState.errors.name && <span className="text-[10px] text-red-500">{form.formState.errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-white/50">{ct.emailLabel}</label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder={ct.emailPlaceholder}
                    />
                    {form.formState.errors.email && <span className="text-[10px] text-red-500">{form.formState.errors.email.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/50">{ct.whatsappLabel}</label>
                  <input
                    {...form.register("whatsapp")}
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder={ct.whatsappPlaceholder}
                  />
                  {form.formState.errors.whatsapp && <span className="text-[10px] text-red-500">{form.formState.errors.whatsapp.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/50">{ct.typeLabel}</label>
                  <select
                    {...form.register("type")}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#111111] text-white/50">{ct.typePlaceholder}</option>
                    {ct.typeOptions.map((opt: {value: string, label: string}) => (
                      <option key={opt.value} value={opt.value} className="bg-[#111111] text-white">{opt.label}</option>
                    ))}
                  </select>
                  {form.formState.errors.type && <span className="text-[10px] text-red-500">{form.formState.errors.type.message}</span>}
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    {...form.register("consent")}
                    className="mt-1 flex-shrink-0 w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50"
                  />
                  <div className="flex flex-col gap-1">
                    <label htmlFor="consent" className="text-[10px] leading-tight text-white/50 cursor-pointer">
                      {ct.consentLabel}
                    </label>
                    {form.formState.errors.consent && <span className="text-[10px] text-red-500">{form.formState.errors.consent.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-semibold text-sm px-5 py-4 rounded-xl hover:bg-primary/90 transition-all mt-4 disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {form.formState.isSubmitting ? ct.submitting : ct.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="relative flex items-end justify-center lg:justify-end mt-12 lg:mt-0"
        >
          <div className="w-full max-w-[500px]">
            <img 
              src="/guedes_ai_grande.webp" 
              alt="Professor Luís Guedes" 
              className="w-full h-auto object-contain object-bottom" 
            />
          </div>
        </motion.div>
      </div>

      {/* Full width GUEDES.AI Logo with glitch effect */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 overflow-hidden px-4 sm:px-12 flex justify-center pb-8 sm:pb-12">
        <img 
          src="/GUEDES-AI__COLOR_LOGO.svg" 
          alt="Guedes AI" 
          className="w-full max-w-[1500px] h-auto object-contain opacity-90 animate-glitch"
        />
      </div>
    </section>
  );
}
