import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export const ParallaxHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="h-full w-full bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
      </motion.div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Site</h1>
          <p className="text-xl md:text-2xl">Discover amazing items below</p>
        </div>
      </div>
    </div>
  );
};
