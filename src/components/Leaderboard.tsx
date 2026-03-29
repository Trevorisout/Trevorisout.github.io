import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  uid: string;
  nickname: string;
  xp: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const { profile } = useAuth();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('uid, nickname, xp')
          .order('xp', { ascending: false })
          .limit(100);

        if (error) throw error;
        setLeaders(data || []);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
    fetchLeaders();
    
    // Subscribe to changes in profiles table
    const channel = supabase
      .channel('leaderboard_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchLeaders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-3 md:p-8 max-w-4xl mx-auto pb-28 md:pb-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 text-white mb-6 md:mb-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-5xl font-black mb-2 md:mb-4 flex items-center gap-3 md:gap-4">
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" /> Bảng Xếp Hạng
            </h1>
            <p className="text-indigo-100 text-sm md:text-lg max-w-xl">
              Cạnh tranh điểm XP với các học viên khác. Hoàn thành bài học và mô phỏng để leo lên vị trí cao hơn!
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Star className="w-16 h-16 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Top Học Viên</h2>
          <span className="text-xs md:text-sm font-medium text-slate-500">{leaders.length} người dùng</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {leaders.map((leader, index) => {
            const isCurrentUser = profile?.uid === leader.uid;
            let rankIcon = null;
            
            if (index === 0) rankIcon = <Medal className="w-6 h-6 text-yellow-500" />;
            else if (index === 1) rankIcon = <Medal className="w-6 h-6 text-slate-400" />;
            else if (index === 2) rankIcon = <Medal className="w-6 h-6 text-amber-600" />;
            else rankIcon = <span className="text-slate-400 font-bold w-6 text-center">{index + 1}</span>;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={leader.uid} 
                className={`p-4 md:p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors ${isCurrentUser ? 'bg-indigo-50/50' : ''}`}
              >
                <div className="w-8 md:w-12 flex justify-center items-center">
                  {rankIcon}
                </div>
                
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 truncate flex items-center gap-2">
                    {leader.nickname}
                    {isCurrentUser && (
                      <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded-full font-bold">Bạn</span>
                    )}
                  </h3>
                </div>
                
                <div className="text-right">
                  <p className="text-lg md:text-xl font-black text-indigo-600">{leader.xp.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">XP</p>
                </div>
              </motion.div>
            );
          })}
          
          {leaders.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              Chưa có dữ liệu xếp hạng. Hãy là người đầu tiên!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
