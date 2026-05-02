import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageSquare, Phone, Mail, Linkedin, Globe } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  company: z.string().min(2, "Empresa é obrigatória"),
  type: z.string().min(1, "Selecione um tipo"),
  message: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contato() {
  const [success, setSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      type: "",
      message: "",
    },
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
            CONTATO
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Há muito o que fazer. Vamos juntos.
          </h2>
          <p className="text-lg text-foreground/50">
            Comece com uma conversa.
          </p>
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

            <a href="https://knp.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 py-4 border-b border-border group">
              <Globe className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/40 uppercase tracking-widest mb-1">KNP</span>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">knp.com.br</span>
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
                <h3 className="text-2xl font-bold text-foreground mb-2">Mensagem enviada</h3>
                <p className="text-foreground/50 mb-8">Obrigado pelo contato. Retornarei em breve.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-foreground/50">Nome</label>
                    <input 
                      {...form.register("name")}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Seu nome"
                    />
                    {form.formState.errors.name && <span className="text-[10px] text-red-500">{form.formState.errors.name.message}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-foreground/50">Empresa</label>
                    <input 
                      {...form.register("company")}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Sua empresa"
                    />
                    {form.formState.errors.company && <span className="text-[10px] text-red-500">{form.formState.errors.company.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-foreground/50">Tipo</label>
                  <select 
                    {...form.register("type")}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    <option value="">Selecione o assunto...</option>
                    <option value="Palestra">Palestra</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="Mentoria">Mentoria</option>
                    <option value="Pesquisa">Pesquisa</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {form.formState.errors.type && <span className="text-[10px] text-red-500">{form.formState.errors.type.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-foreground/50">Mensagem</label>
                  <textarea 
                    {...form.register("message")}
                    rows={5}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Como posso ajudar?"
                  />
                  {form.formState.errors.message && <span className="text-[10px] text-red-500">{form.formState.errors.message.message}</span>}
                </div>

                <button 
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-foreground text-background font-medium text-sm px-5 py-3.5 rounded-xl hover:bg-foreground/90 transition-all mt-2 disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {form.formState.isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
