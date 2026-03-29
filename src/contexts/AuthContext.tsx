import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  uid: string;
  nickname: string;
  xp: number;
  completedLessons: string[];
  lessonScores?: Record<string, number>;
}

interface AuthContextType {
  user: any;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (nickname: string) => Promise<void>;
  updateProgress: (xpToAdd: number, lessonId?: string, scorePercentage?: number) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUid = localStorage.getItem('engine_learner_uid');
        if (storedUid) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('uid', storedUid)
            .maybeSingle();

          if (data && !error) {
            setProfile(data);
          } else {
            localStorage.removeItem('engine_learner_uid');
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const signIn = async (nickname: string) => {
    try {
      setLoading(true);
      
      // Check if user already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('nickname', nickname)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Supabase fetch error:", fetchError);
        if (fetchError.message.includes('relation "public.profiles" does not exist')) {
          throw new Error('Bảng "profiles" chưa được tạo trong Supabase. Vui lòng chạy mã SQL khởi tạo.');
        }
        throw fetchError;
      }

      if (existingUser) {
        localStorage.setItem('engine_learner_uid', existingUser.uid);
        setProfile(existingUser);
        return;
      }

      // Create new user if not exists
      const newUid = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        
      const newProfile: UserProfile = {
        uid: newUid,
        nickname,
        xp: 0,
        completedLessons: [],
        lessonScores: {}
      };

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([newProfile]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        if (insertError.message.includes('relation "public.profiles" does not exist')) {
          throw new Error('Bảng "profiles" chưa được tạo trong Supabase. Vui lòng chạy mã SQL khởi tạo.');
        }
        throw insertError;
      }

      localStorage.setItem('engine_learner_uid', newUid);
      setProfile(newProfile);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (xpToAdd: number, lessonId?: string, scorePercentage?: number) => {
    if (!profile) return;
    
    try {
      const updatedProfile = { ...profile };
      updatedProfile.xp += xpToAdd;
      
      if (lessonId) {
        if (!updatedProfile.completedLessons.includes(lessonId)) {
          updatedProfile.completedLessons = [...updatedProfile.completedLessons, lessonId];
        }
        
        if (scorePercentage !== undefined) {
          updatedProfile.lessonScores = {
            ...(updatedProfile.lessonScores || {}),
            [lessonId]: Math.max((updatedProfile.lessonScores?.[lessonId] || 0), scorePercentage)
          };
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('uid', profile.uid);

      if (error) throw error;
      
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('engine_learner_uid');
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user: profile, profile, loading, signIn, updateProgress, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
