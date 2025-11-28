
import React, { useState } from 'react';
import { Dumbbell, Eye, EyeOff, Camera, Upload, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Goal, GOALS, AVATARS, TRAINER_PERSONAS } from '../constants';
import { generateAvatarFromPhoto } from '../services/geminiService';

interface AuthViewProps {
  onLogin: (choices: { avatarId: string; goal: Goal; trainerId: string }) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(Object.keys(AVATARS)[0]);
  const [selectedGoal, setSelectedGoal] = useState<Goal>(GOALS[0]);
  const [selectedTrainer, setSelectedTrainer] = useState(TRAINER_PERSONAS[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const result = await generateAvatarFromPhoto(base64);
        // In a real app, we would use the result.traits to configure a custom avatar.
        // For this demo, we'll just pick a random existing avatar to simulate "matching".
        const randomAvatar = Object.keys(AVATARS)[Math.floor(Math.random() * Object.keys(AVATARS).length)];
        setSelectedAvatar(randomAvatar);
        alert(`Analysis Complete! Based on your photo (Gender: ${result.traits.gender}, Hair: ${result.traits.hairColor}), we've matched you with ${AVATARS[randomAvatar].name}!`);
      } catch (error) {
        console.error(error);
        alert("Failed to analyze photo. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-navy-dark to-navy-light">
      <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '0s' }}>
        <div className="inline-flex items-center justify-center bg-navy-light p-4 rounded-full mb-4">
          <Dumbbell className="w-12 h-12 text-neon-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-silver-light">FitVerse</h1>
        <p className="text-silver-dark mt-2">Your Digital Gym Companion</p>
      </div>

      <GlassCard className="w-full max-w-md animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <h2 className="text-2xl font-bold text-center text-silver-light mb-6">Get Started</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin({ avatarId: selectedAvatar, goal: selectedGoal, trainerId: selectedTrainer }); }} className="space-y-6">

          {/* AI Avatar Generation */}
          <div className="bg-navy-dark/50 p-4 rounded-lg border border-white/10">
            <label className="text-sm font-semibold text-silver-dark mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-gold" />
              AI Avatar Match (Optional)
            </label>
            <div className="relative group cursor-pointer">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-silver-dark/30 rounded-lg group-hover:border-neon-gold/50 transition-colors">
                {isAnalyzing ? (
                  <span className="text-neon-gold animate-pulse">Analyzing photo...</span>
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-silver-dark" />
                    <span className="text-sm text-silver-dark">Upload selfie to match avatar</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-silver-dark mb-2 block">1. Choose Your Avatar</label>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(AVATARS).map(([id, avatar]) => (
                <button type="button" key={id} onClick={() => setSelectedAvatar(id)} className={`rounded-lg overflow-hidden border-2 p-1 bg-navy-light transition-all ${selectedAvatar === id ? 'border-neon-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={avatar.progressImages['Build Muscle'][0]} alt={avatar.name} className="w-full h-full object-cover rounded-md" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-silver-dark mb-2 block">2. Choose Your Trainer</label>
            <div className="grid grid-cols-1 gap-3">
              {TRAINER_PERSONAS.map((trainer) => (
                <button
                  type="button"
                  key={trainer.id}
                  onClick={() => setSelectedTrainer(trainer.id)}
                  className={`text-left p-3 rounded-lg border transition-all ${selectedTrainer === trainer.id ? 'bg-navy-light border-neon-gold' : 'border-transparent hover:bg-navy-light/50'}`}
                >
                  <div className="font-bold text-silver-light">{trainer.name}</div>
                  <div className="text-xs text-silver-dark">{trainer.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-silver-dark mb-2 block">3. Select Your Goal</label>
            <select value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value as Goal)} className="w-full p-3 bg-navy-light rounded-lg border border-transparent focus:border-neon-gold outline-none transition-colors">
              {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-silver-dark mb-2 block">4. Login (Demo)</label>
            <input type="email" defaultValue="alex.thorne@fitverse.demo" className="w-full p-3 bg-navy-light rounded-lg border border-transparent focus:border-neon-gold outline-none transition-colors" />
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-neon-gold text-navy-dark font-bold rounded-lg transition-transform duration-200 hover:scale-105 shadow-lg shadow-neon-gold/30">
            Start Your Journey
          </button>
        </form>
      </GlassCard>
    </div>
  );
};

export default AuthView;
