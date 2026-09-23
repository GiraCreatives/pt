import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

/* ── Partículas de fundo para o Splash ── */
const SPLASH_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 6,
  dur: 4 + Math.random() * 4,
}));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Tempo aumentado para uma experiência mais imersiva
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setContentVisible(true), 100);
    }, 4500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={contentVisible ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

      <AnimatePresence>
        {showSplash && (
          <motion.div
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF6F0] overflow-hidden"
          >
            {/* 1. Partículas flutuantes (Bolinhas) */}
            {SPLASH_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full opacity-20"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: "#6d1e08",
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* 2. Brilho de fundo (Glow) */}
            <motion.div 
              className="absolute w-[500px] h-[500px] rounded-full bg-[#e3c28a]/20 blur-[120px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 3. Logo 3D com Efeito de Brilho (Shine) */}
            <motion.div
              initial={{ rotateY: -35, rotateX: 20, opacity: 0, scale: 0.9 }}
              animate={{ 
                rotateY: [ -20, 20, -20 ],
                rotateX: [ 10, -10, 10 ],
                opacity: 1, 
                scale: 1
              }}
              transition={{ 
                opacity: { duration: 1.5 },
                scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
              className="relative flex flex-col items-center"
            >
              <h1 className="flex flex-col items-center leading-[0.8] select-none relative">
                {/* Efeito de Brilho que passa por cima do texto */}
                <motion.div 
                  className="absolute inset-0 z-10 w-full h-full"
                  style={{
                    background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    pointerEvents: "none"
                  }}
                  animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <span 
                  className="font-serif italic text-8xl md:text-9xl text-[#6d1e08]"
                  style={{ 
                    textShadow: `
                      1px 1px 0px #4a1405, 2px 2px 0px #4a1405, 
                      3px 3px 0px #4a1405, 4px 4px 0px #4a1405, 
                      10px 25px 50px rgba(79, 44, 26, 0.4)
                    `,
                    transform: "translateZ(60px)"
                  }}
                >
                  Gira
                </span>
                
                <span 
                  className="font-sans text-[12px] uppercase tracking-[1.5em] mt-8 text-[#4f2c1a] font-bold opacity-70"
                  style={{ transform: "translateZ(100px)" }}
                >
                  Creatives
                </span>
              </h1>
            </motion.div>

            {/* Linha de carregamento refinada no rodapé */}
            <div className="absolute bottom-20 w-40 h-[1px] bg-[#6d1e08]/10 overflow-hidden">
              <motion.div 
                className="h-full bg-[#6d1e08]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;