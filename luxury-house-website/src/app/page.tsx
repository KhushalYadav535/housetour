
'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import FrameAnimation from '@/components/FrameAnimation';
import { useState, useEffect } from 'react';

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.2]);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 20);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white overflow-x-hidden">
      {/* Floating Particles Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

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

      {/* Ultra-Luxury Full Screen Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          style={{ scale, opacity, x: springX, y: springY }}
          className="absolute inset-0"
        >
          <div className="w-full h-full">
            <FrameAnimation />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/8 via-transparent to-transparent"></div>
        </motion.div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 h-full flex flex-col justify-end items-center text-center px-6 pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4"
          >
            <span className="text-[10px] tracking-[0.6em] uppercase bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-semibold">
              The Equinox Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight"
            style={{ 
              textShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
            }}
          >
            <span className="block bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              PRECISION
            </span>
            <span className="block mt-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              BY DESIGN
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light backdrop-blur-sm"
          >
            A testament to craftsmanship. Every piece is a mechanical sculpture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-wrap gap-4 items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black text-sm tracking-[0.2em] uppercase shadow-xl shadow-amber-500/30 transition-all duration-300"
            >
              Explore Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.6)', boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 border-2 border-white/20 text-white font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 bg-white/5 backdrop-blur-xl"
            >
              Watch Film
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-10 border-2 border-amber-400/40 rounded-full flex justify-center pt-2 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2.5 bg-gradient-to-b from-amber-300 to-yellow-500 rounded-full"
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
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -12, scale: 1.05, rotateY: 5 }}
                className="text-center p-8 bg-gradient-to-br from-white/10 to-white/2 border border-white/15 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 hover:border-amber-500/30 transition-all duration-500 group"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
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
              </motion.div>
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
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, type: 'spring', stiffness: 90 }}
                whileHover={{ y: -16, rotateX: 5, rotateY: 5 }}
                className="group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="p-10 bg-gradient-to-br from-white/10 to-white/2 border border-white/15 rounded-3xl backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-500 group-hover:border-amber-500/40 group-hover:bg-gradient-to-br from-amber-500/15 to-white/5 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
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

      {/* Ultra-Premium Footer */}
      <footer className="py-24 px-8 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-600/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black tracking-[0.5em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-8 md:mb-0"
            >
              LUXE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm tracking-[0.2em] uppercase"
            >
              © 2025 Luxe Collection. All rights reserved.
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
