import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  className?: string;
  href?: string;
}

export const NeuButton: React.FC<ButtonProps> = ({ children, onClick, primary, className = "", href }) => {
  const baseClasses = "px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 outline-none";
  
  // Primary: Pressed orange feel or Flat grey feel?
  // Let's make Primary an "accent" button that looks slightly different
  const styleClasses = primary 
    ? "bg-neu-base text-neu-accent shadow-neu-flat hover:shadow-neu-pressed border border-neu-light/20" 
    : "bg-neu-base text-gray-600 shadow-neu-flat hover:shadow-neu-pressed";

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    // @ts-ignore
    <Component
      {...props}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={`${baseClasses} ${styleClasses} ${className}`}
    >
      {children}
    </Component>
  );
};

export const NeuCard: React.FC<{children: React.ReactNode, className?: string, delay?: number}> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`bg-neu-base rounded-3xl shadow-neu-flat p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};