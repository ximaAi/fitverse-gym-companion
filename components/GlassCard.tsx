import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-lg border border-glass-border rounded-2xl shadow-lg p-6 transition-all duration-300 hover:border-white/40 ${className}`}
      // FIX: The style property is now merged to allow for customization like animation delays.
      style={{ animation: 'fadeIn 0.5s ease-out forwards', ...style }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
