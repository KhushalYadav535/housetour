
'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import FrameAnimation from '@/components/FrameAnimation';
import Background3D from '@/components/Background3D';
import { useState, useEffect } from 'react';

const AnimatedText = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const characters = text.split('');
  
  return (
    <div className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            opacity: 0, 
            y: 50, 
            rotateX: -90,
            scale: 0.5
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
          whileHover={{
            y: -8,
            scale: 1.2,
            color: '#fbbf24',
            textShadow: '0 0 30px rgba(245, 158, 11, 0.8)'
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

const TiltCard = ({ stat, i }: { stat: any, i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: i * 0.15, type: 'spring', stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative text-center p-8 bg-gradient-to-br from-white/10 to-white/2 border border-white/15 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 hover:border-amber-500/30 transition-colors duration-500 group"
    >
      <div style={{ transform: "translateZ(50px)" }}>
        <motion.div
          animate={{ 
            textShadow: ['0 0 0px rgba(245, 158, 11, 0)', '0 0 30px rgba(245, 158, 11, 0.5)', '0 0 0px rgba(245, 158, 11, 0)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-3"
        >
          {stat.value}
        </motion.div>
        <div className="text-xs tracking-[0.3em] uppercase text-gray-400 group-hover:text-amber-300 transition-colors duration-300">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureTiltCard = ({ feature, i }: { feature: any, i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: i * 0.2, type: 'spring', stiffness: 90 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group"
    >
      <div className="p-10 bg-gradient-to-br from-white/10 to-white/2 border border-white/15 rounded-3xl backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-500 group-hover:border-amber-500/40 group-hover:bg-gradient-to-br from-amber-500/15 to-white/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10" style={{ transform: "translateZ(60px)" }}>
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6"
            style={{ backgroundSize: '200% 200%' }}
          >
            {feature.num}
          </motion.div>
          <h3 className="text-3xl font-black mb-6 text-white group-hover:text-amber-200 transition-colors duration-300">{feature.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);
  const y = useTransform(scrollY, [0, 700], [0, 200]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.4]);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 40);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { stiffness: 80, damping: 25 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white overflow-x-hidden">
      {/* WebGL 3D Background */}
      <Background3D />

      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-black tracking-[0.4em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
            >
              LUXE
            </motion.div>
            <div className="hidden md:flex items-center gap-12">
              {['Collection', 'Craftsmanship', 'Legacy', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  href="#"
                  className="text-xs tracking-[0.25em] uppercase text-gray-400 hover:text-amber-300 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-none text-black font-bold text-sm tracking-[0.15em] uppercase shadow-xl shadow-amber-500/20 transition-all duration-300"
              >
                Reserve Now
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* ULTRA-PREMIUM Full Screen Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-transparent to-yellow-600/20 z-10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundSize: '300% 300%',
          }}
        />

        {/* Main Animation Container */}
        <motion.div 
          style={{ scale, opacity, x: springX, y: springY }}
          className="absolute inset-0"
        >
          {/* Glow Effect Behind Animation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-r from-amber-400/40 via-yellow-400/25 to-amber-400/40 rounded-full blur-3xl"></div>
          
          <div className="w-full h-full relative z-20">
            <FrameAnimation />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/15 z-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent z-40"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-50 h-full flex flex-col justify-end items-center text-center px-6 pb-36"
        >
          {/* Limited Edition Badge */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, type: 'spring', stiffness: 100 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-5 px-8 py-3 border border-amber-400/40 rounded-full backdrop-blur-xl bg-white/8 shadow-2xl shadow-amber-500/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></span>
              <span className="text-[10px] tracking-[0.5em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-bold">
                LIMITED EDITION • 240 PIECES
              </span>
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4"
          >
            <span className="text-[10px] tracking-[0.8em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-semibold">
              THE EQUINOX COLLECTION
            </span>
          </motion.div>

          {/* Main Heading - PRECISION */}
          <motion.div
            className="mb-2"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none"
                style={{ 
                  textShadow: '0 0 80px rgba(245, 158, 11, 0.5), 0 0 150px rgba(245, 158, 11, 0.2)',
                }}
            >
              <AnimatedText 
                text="PRECISION" 
                className="block bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent"
                delay={0.8}
              />
            </h1>
          </motion.div>

          {/* Main Heading - BY DESIGN */}
          <motion.div
            className="mb-10"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none"
                style={{ 
                  textShadow: '0 0 60px rgba(245, 158, 11, 0.4)',
                }}
            >
              <AnimatedText 
                text="BY DESIGN" 
                className="block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                delay={1.5}
              />
            </h1>
          </motion.div>

          {/* Description Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="mb-14"
          >
            <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-light backdrop-blur-sm px-6">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                A testament to the dying art of craftsmanship. Every piece is a mechanical sculpture that breathes life into architecture.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-amber-300/90"
              >
                Finished by hand with techniques usually reserved for the finest horology.
              </motion.span>
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="flex flex-wrap gap-8 items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 100px rgba(245, 158, 11, 0.7)' }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: ['0 0 0px rgba(245, 158, 11, 0)', '0 0 80px rgba(245, 158, 11, 0.5)', '0 0 0px rgba(245, 158, 11, 0)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="px-16 py-6 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black text-base tracking-[0.3em] uppercase shadow-2xl shadow-amber-500/50 transition-all duration-300 rounded-3xl border-4 border-amber-400/50"
            >
              Explore Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, borderColor: 'rgba(245, 158, 11, 0.9)', boxShadow: '0 0 60px rgba(245, 158, 11, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="px-16 py-6 border-2 border-white/30 text-white font-black text-base tracking-[0.3em] uppercase transition-all duration-300 bg-white/8 backdrop-blur-xl rounded-3xl"
            >
              Watch Film
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1.5 }}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-5">
              <span className="text-[10px] tracking-[0.5em] uppercase text-gray-500">Scroll to Discover</span>
              <motion.div
                animate={{ y: [0, 18, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-20 border-2 border-amber-400/60 rounded-full flex justify-center pt-6 backdrop-blur-xl bg-white/5"
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="w-2 h-6 bg-gradient-to-b from-amber-300 to-yellow-500 rounded-full shadow-lg shadow-amber-400/50"
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Ultra-Premium Stats Section */}
      <section className="py-24 px-8 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-yellow-500/3 to-amber-600/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '240', label: 'Animated Frames' },
              { value: '100%', label: 'Handcrafted' },
              { value: '∞', label: 'Timeless Legacy' },
              { value: '24', label: 'Carat Gold' }
            ].map((stat, i) => (
              <TiltCard key={stat.label} stat={stat} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Luxury Craftsmanship Section */}
      <section className="py-40 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.08),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80, rotateY: -20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
            >
              <span className="text-xs tracking-[0.5em] uppercase bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-bold mb-6 block">
                01 • The Architecture
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
                Redefined
                <br />
                <span className="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
                  For Eternity
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Where every bridge and beam is visible. Finished by hand with techniques 
                usually reserved for the finest craftsmanship.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Premium Materials', desc: 'Precision-engineered from the finest materials' },
                  { title: 'Meticulous Finish', desc: 'Every part meticulously finished by hand' },
                  { title: 'Timeless Design', desc: 'Built to last for generations' }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.2 }}
                    whileHover={{ x: 8 }}
                    className="border-l-4 border-amber-500/50 pl-6 py-2 group"
                  >
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 80, rotateY: 20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 80 }}
              className="relative"
            >
              <div className="absolute -inset-12 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 rounded-3xl blur-3xl"></div>
              <div className="relative aspect-square bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
                <div className="text-gray-500 text-xs tracking-[0.4em] uppercase font-bold relative z-10">
                  VISUAL MASTERY
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ultra-Premium Features Grid */}
      <section className="py-40 px-8 bg-gradient-to-b from-black via-slate-950 to-black border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs tracking-[0.5em] uppercase bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-bold mb-6 block">
              Mastery
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              In Every Detail
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                num: '01',
                title: 'Precision', 
                desc: 'Every line, every curve calculated to perfection.' 
              },
              { 
                num: '02',
                title: 'Craftsmanship', 
                desc: 'Hand-finished with techniques passed down.' 
              },
              { 
                num: '03',
                title: 'Legacy', 
                desc: 'Built to stand the test of time.' 
              }
            ].map((feature, i) => (
              <FeatureTiltCard key={feature.title} feature={feature} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Luxury CTA Section */}
      <section className="py-40 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/15 via-yellow-500/10 to-amber-600/15"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          >
            <span className="text-xs tracking-[0.5em] uppercase bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-bold mb-8 block">
              Limited to 240 Pieces Worldwide
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight">
              Join the Waitlist
            </h2>
            <p className="text-gray-300 text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
              The first edition is now open for reservations. Secure your place in history.
            </p>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 100px rgba(245, 158, 11, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ['0 0 0px rgba(245, 158, 11, 0)', '0 0 60px rgba(245, 158, 11, 0.5)', '0 0 0px rgba(245, 158, 11, 0)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="px-24 py-8 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black text-xl tracking-[0.3em] uppercase shadow-2xl shadow-amber-500/50 transition-all duration-500 rounded-3xl border-4 border-amber-400/30"
            >
              Reserve Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ULTRA-PREMIUM 3D FOOTER */}
      <footer className="py-32 px-8 border-t border-white/10 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 via-transparent to-amber-600/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.1),transparent_60%)]"></div>
        
        {/* Floating Particles in Footer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40 - Math.random() * 40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 2 + Math.random(), 1],
              }}
              transition={{
                duration: 4 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: -20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: 'spring', stiffness: 80 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-4xl font-black tracking-[0.6em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                     style={{ textShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}>
                  LUXE
                </div>
              </motion.div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                A testament to the dying art of craftsmanship. Every piece is a mechanical sculpture that breathes life into architecture.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
                  <motion.a
                    key={social}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -6, scale: 1.1 }}
                    href="#"
                    className="px-4 py-2 border border-white/20 rounded-full text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-amber-300 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 80 }}
              className="space-y-6"
            >
              <h3 className="text-sm tracking-[0.4em] uppercase bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-bold">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {['Collection', 'Craftsmanship', 'Legacy', 'Atelier', 'Contact'].map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-300 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 80 }}
              className="space-y-6"
            >
              <h3 className="text-sm tracking-[0.4em] uppercase bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-bold">
                Stay Updated
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Get exclusive early access and stay informed about product updates, events, and more.
              </p>
              <div className="space-y-3">
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.6)' }}
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-2xl text-black font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-black tracking-[0.5em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
            >
              LUXE
            </motion.div>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {['Privacy', 'Terms', 'Cookies'].map((link, i) => (
                <motion.a
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ color: '#fbbf24' }}
                  href="#"
                  className="text-gray-500 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="text-gray-500 text-xs tracking-[0.2em] uppercase"
            >
              © 2025 Luxe Collection. All rights reserved.
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
