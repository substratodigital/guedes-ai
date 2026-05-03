import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageSquare, Phone, Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type FormValues = {
  name: string;
  company: string;
  type: string;
  message: string;
};

export default function Contato() {
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();
  const ct = t.contato;

  const formSchema = z.object({
    name:    z.string().min(2, ct.nameError),
    company: z.string().min(2, ct.companyError),
    type:    z.string().min(1, ct.typeError),
    message: z.string().min(10, ct.messageError),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", company: "", type: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(data);
    setSuccess(true);
    form.reset();
  };

  return (
    <section id="contato" className="w-full py-32 px-6 bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
            {ct.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {ct.h2}
          </h2>
          <p className="text-lg text-foreground/50">{ct.p}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <a href="https://wa.me/5511999587672" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 py-4 border-b border-border group">
              <Phone className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/40 uppercase tracking-widest mb-1">WhatsApp</span>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">(11) 99958-7672</span>
              </div>
            </a>

            <a href="mailto:lguedes.sp@gmail.com" className="flex items-center gap-4 py-4 border-b border-border group">
              <Mail className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/40 uppercase tracking-widest mb-1">Email</span>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">lguedes.sp@gmail.com</span>
              </div>
            </a>

            <a href="https://linkedin.com/in/lguedes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 py-4 border-b border-border group">
              <Linkedin className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/40 uppercase tracking-widest mb-1">LinkedIn</span>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">linkedin.com/in/lguedes</span>
              </div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
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
                    <label className="text-xs font-medium text-foreground/50">{ct.nameLabel}</label>
                    <input
                      {...form.register("name")}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder={ct.namePlaceholder}
                    />
                    {form.formState.errors.name && <span className="text-[10px] text-red-500">{form.formState.errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-foreground/50">{ct.companyLabel}</label>
                    <input
                      {...form.register("company")}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder={ct.companyPlaceholder}
                    />
                    {form.formState.errors.company && <span className="text-[10px] text-red-500">{form.formState.errors.company.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-foreground/50">{ct.typeLabel}</label>
                  <select
                    {...form.register("type")}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    <option value="">{ct.typePlaceholder}</option>
                    {ct.typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {form.formState.errors.type && <span className="text-[10px] text-red-500">{form.formState.errors.type.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-foreground/50">{ct.messageLabel}</label>
                  <textarea
                    {...form.register("message")}
                    rows={5}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder={ct.messagePlaceholder}
                  />
                  {form.formState.errors.message && <span className="text-[10px] text-red-500">{form.formState.errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-foreground text-background font-medium text-sm px-5 py-3.5 rounded-xl hover:bg-foreground/90 transition-all mt-2 disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {form.formState.isSubmitting ? ct.submitting : ct.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
