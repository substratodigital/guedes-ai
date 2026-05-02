import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full mix-blend-screen opacity-[0.15]"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)",
          filter: "blur(120px)",
          animation: "slow-drift 20s ease-in-out infinite alternate"
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full mix-blend-screen opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.8) 0%, rgba(20,184,166,0) 70%)",
          filter: "blur(120px)",
          animation: "slow-drift 25s ease-in-out infinite alternate-reverse"
        }}
      />
      <div 
        className="absolute top-[20%] left-[30%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full mix-blend-screen opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0) 70%)",
          filter: "blur(120px)",
          animation: "slow-drift 22s ease-in-out infinite alternate"
        }}
      />
    </div>
  );
}
