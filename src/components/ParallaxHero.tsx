import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const backgroundImages = [
  '/rio-sunset-default.jpg',
  '/hero-bg-2.jpg',
  '/hero-bg-3.jpg',
  '/hero-bg-4.jpg'
];

export const ParallaxHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Random initial image
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * backgroundImages.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((current) => 
        current === backgroundImages.length - 1 ? 0 : current + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="relative h-[65vh] overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-full w-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('../assets/rio-sunset-default.jpg')` //`url('${backgroundImages[0]}')`
            }}
          />
        </AnimatePresence>
      </motion.div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Carioca Coastal Club</h1>
          <p className="text-xl md:text-2xl">Barraca experience made easy</p>
        </div>
      </div>
    </div>
  );
};
