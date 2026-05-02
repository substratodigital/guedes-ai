import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  company: z.string().min(2, "Empresa é obrigatória"),
  demandType: z.string().min(1, "Selecione o tipo de demanda"),
  message: z.string().min(10, "Mensagem muito curta")
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contato() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      demandType: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormData) => {
    // Simulate API call
    console.log("Form data:", data);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Text Left */}
          <div className="flex-1 space-y-8">
            <h2 className="font-mono text-4xl md:text-6xl font-bold text-foreground leading-tight">
              HÁ MUITO O QUE FAZER.<br/>
              <span className="text-primary">VAMOS JUNTOS!</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-serif italic">
              Comecemos com um café.
            </p>

            <div className="space-y-6 pt-8">
              <a href="https://wa.me/5511999587672" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-foreground hover:text-[#25D366] transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-sm mr-4 group-hover:border-[#25D366] transition-colors">
                  <FaWhatsapp className="w-6 h-6" />
                </div>
                (11) 99958-7672
              </a>
              <a href="mailto:lguedes.sp@gmail.com" className="flex items-center text-lg text-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-sm mr-4 group-hover:border-primary transition-colors">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                lguedes.sp@gmail.com
              </a>
              <a href="https://linkedin.com/in/lguedes/" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-foreground hover:text-[#0A66C2] transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-sm mr-4 group-hover:border-[#0A66C2] transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </div>
                linkedin.com/in/lguedes/
              </a>
              <a href="https://knp.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-foreground hover:text-[#00C896] transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-sm mr-4 group-hover:border-[#00C896] transition-colors">
                  <FaGlobe className="w-5 h-5" />
                </div>
                knp.com.br
              </a>
            </div>
          </div>

          {/* Form Right */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
            <div className="bg-card p-8 border border-card-border rounded-sm relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-[#00C896]" />
              
              {isSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-[#00C896]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-mono text-foreground">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">Retornaremos o contato em breve.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-primary hover:underline font-mono text-sm"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-2">Nome completo</label>
                    <input 
                      {...form.register("name")}
                      className="w-full bg-background border border-input px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Seu nome"
                    />
                    {form.formState.errors.name && <span className="text-destructive text-xs mt-1 block">{form.formState.errors.name.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-2">Empresa</label>
                    <input 
                      {...form.register("company")}
                      className="w-full bg-background border border-input px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Sua organização"
                    />
                    {form.formState.errors.company && <span className="text-destructive text-xs mt-1 block">{form.formState.errors.company.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-2">Tipo de demanda</label>
                    <div className="relative">
                      <select 
                        {...form.register("demandType")}
                        className="w-full bg-background border border-input px-4 py-3 rounded-sm text-foreground appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      >
                        <option value="">Selecione...</option>
                        <option value="palestra">Palestra</option>
                        <option value="consultoria">Consultoria</option>
                        <option value="mentoria">Mentoria</option>
                        <option value="pesquisa">Pesquisa</option>
                        <option value="outro">Outro</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▼</div>
                    </div>
                    {form.formState.errors.demandType && <span className="text-destructive text-xs mt-1 block">{form.formState.errors.demandType.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-2">Mensagem</label>
                    <textarea 
                      {...form.register("message")}
                      className="w-full bg-background border border-input px-4 py-3 rounded-sm text-foreground h-32 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Como posso ajudar?"
                    />
                    {form.formState.errors.message && <span className="text-destructive text-xs mt-1 block">{form.formState.errors.message.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 clipped-corner hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-50"
                    data-testid="button-submit-contact"
                  >
                    {form.formState.isSubmitting ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}