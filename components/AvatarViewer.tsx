
import React from 'react';
import { User, Goal } from '../types';
import { AVATARS, GOAL_COLORS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface AvatarViewerProps {
  user: User;
}

const AvatarViewer: React.FC<AvatarViewerProps> = ({ user }) => {
  const { avatar, goal, progress } = user;

  // Ensure avatarId is valid, fallback to the first available avatar if not
  const validAvatarId = avatar.avatarId in AVATARS ? avatar.avatarId : Object.keys(AVATARS)[0];
  const avatarData = AVATARS[validAvatarId];

  // Get image set based on goal
  const images = avatarData.progressImages[goal as Goal] || avatarData.progressImages['Build Muscle'];
  
  // Calculate level based on progress chunks
  // 3 images: 0-33%, 34-66%, 67-100%
  const chunk = 100 / images.length;
  // Use Math.min to ensure we don't go out of bounds at 100%
  const levelIndex = Math.min(images.length - 1, Math.floor(progress / chunk));
  
  const currentImage = images[levelIndex];
  const goalColor = GOAL_COLORS[goal] || '#FFD700';

  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col items-center justify-center overflow-hidden rounded-xl bg-navy-dark/30 border border-glass-border">
      
      {/* Background Aura Effect - Pulses with the goal color */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
            background: [
                `radial-gradient(circle at center, ${goalColor}20 0%, transparent 50%)`,
                `radial-gradient(circle at center, ${goalColor}40 0%, transparent 60%)`,
                `radial-gradient(circle at center, ${goalColor}20 0%, transparent 50%)`
            ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Tech Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      ></div>

      {/* Main Avatar Character with AnimatePresence for smooth transitions */}
      <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
        <AnimatePresence mode="wait">
            <motion.img 
                key={`${validAvatarId}-${levelIndex}`} // Key triggers animation on image change
                src={currentImage} 
                alt={`${user.name}'s avatar`}
                initial={{ opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    opacity: { duration: 0.3 }
                }}
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
        </AnimatePresence>
      </div>

      {/* Level / Status Badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
         <motion.div 
            className="px-6 py-2 rounded-full bg-navy-dark/90 border border-glass-border backdrop-blur-md text-silver-light font-display text-sm font-bold flex items-center space-x-3 shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={`badge-${levelIndex}`}
         >
            <span style={{ color: goalColor }} className="uppercase tracking-wider">Lvl {levelIndex + 1}</span>
            <div className="w-px h-4 bg-silver-dark/50"></div>
            <span className="text-silver-dark">{avatarData.name}</span>
         </motion.div>
      </div>

    </div>
  );
};

export default AvatarViewer;
