import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  Wrench, 
  ChevronRight,
  Trophy,
  Activity,
  Box,
  Settings,
  LogOut,
  ArrowLeft,
  Puzzle,
  Medal
} from 'lucide-react';
import AcademicLearning from './components/AcademicLearning';
import EngineSimulator2D from './components/EngineSimulator2D';
import DiagramAssembly2D from './components/DiagramAssembly2D';
import EngineAssembly3D from './components/EngineAssembly3D';
import Leaderboard from './components/Leaderboard';
import SignIn from './components/SignIn';
import { cn } from './lib/utils';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Tab = 'dashboard' | 'learn' | 'simulate' | 'simulate-2d' | 'assemble-2d' | 'assemble-3d' | 'leaderboard';

function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { profile, signOut } = useAuth();
  
  const xp = profile?.xp || 0;
  const completedLessons = profile?.completedLessons || [];

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: 'learn', label: 'Học tập', icon: BookOpen },
    { id: 'simulate', label: 'Mô phỏng', icon: Cpu },
    { id: 'leaderboard', label: 'Xếp hạng', icon: Medal },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[#1a2333] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 text-white mb-8 md:mb-12 shadow-2xl">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs mb-6 md:mb-8 border border-orange-500/30">
                  ⚡ Chương trình Công Nghệ 101
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 md:mb-6">
                  Chào mừng, <span className="text-orange-500">{profile?.nickname}</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                  Nền tảng học tập tương tác kết hợp lý thuyết và mô phỏng 3D trực quan. 
                  Bắt đầu hành trình khám phá cơ khí của bạn ngay hôm nay.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button 
                    onClick={() => setActiveTab('learn')}
                    className="px-6 md:px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    <BookOpen className="w-5 h-5" /> Tiếp tục học
                  </button>
                  <button 
                    onClick={() => setActiveTab('simulate')}
                    className="px-6 md:px-8 py-3.5 bg-slate-700 hover:bg-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-600"
                  >
                    <Cpu className="w-5 h-5" /> Mở phòng thí nghiệm
                  </button>
                </div>
              </div>
              {/* Abstract background elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                { label: 'Tiến độ khóa học', value: `${completedLessons.length} / 9 bài`, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Kinh nghiệm (XP)', value: `${xp} XP`, icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-50' },
                { label: 'Thực hành mô phỏng', value: '3 Mô-đun', icon: Wrench, color: 'text-green-500', bg: 'bg-green-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-2xl font-black text-slate-900 mb-6 md:mb-8">Lối tắt nhanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <button 
                onClick={() => setActiveTab('simulate-2d')}
                className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-left text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <Cpu className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 opacity-80" />
                  <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-4">Động cơ 2.5D Viewer</h3>
                  <p className="text-indigo-100/80 mb-6 md:mb-8 max-w-sm text-sm md:text-base">Khám phá cấu tạo động cơ từ 6 góc nhìn khác nhau với thông số thực.</p>
                  <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all text-sm md:text-base">
                    Khám phá ngay <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              </button>

              <button 
                onClick={() => setActiveTab('assemble-3d')}
                className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-left text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <Wrench className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 opacity-80" />
                  <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-4">Lắp ráp Động cơ 3D</h3>
                  <p className="text-orange-100/80 mb-6 md:mb-8 max-w-sm text-sm md:text-base">Trải nghiệm lắp ráp từng chi tiết động cơ trong môi trường 3D tương tác.</p>
                  <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all text-sm md:text-base">
                    Bắt đầu lắp ráp <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              </button>
            </div>
          </div>
        );
      case 'learn':
        return <AcademicLearning />;
      case 'simulate':
        return (
          <div className="p-4 md:p-8 max-w-7xl mx-auto text-center pb-24 md:pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Phòng thí nghiệm Mô phỏng</h1>
            <p className="text-slate-500 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">Áp dụng kiến thức lý thuyết vào thực hành. Chọn một chế độ mô phỏng dưới đây để bắt đầu khám phá.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { id: 'simulate-2d', title: 'Mô phỏng Động cơ 2.5D', desc: 'Quan sát cấu tạo và chuyển động của động cơ từ 6 góc nhìn. Tương tác với bướm ga và vòng tua máy.', icon: Cpu, color: 'bg-indigo-500' },
                { id: 'assemble-2d', title: 'Lắp ráp Sơ đồ 2D', desc: 'Nối các bộ phận để hoàn thiện các hệ thống: Nhiên liệu, Làm mát, Bôi trơn, Đánh lửa, Phanh.', icon: Activity, color: 'bg-emerald-500' },
                { id: 'assemble-3d', title: 'Lắp ráp Động cơ 3D', desc: 'Thực hành lắp ráp các chi tiết máy theo đúng trình tự trong không gian 3D trực quan.', icon: Wrench, color: 'bg-orange-500' },
              ].map((item) => (
                <div key={item.id} className={cn(
                  "bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all group",
                  item.id === 'assemble-2d' && "hidden md:block"
                )}>
                  <div className={cn("h-48 flex items-center justify-center text-white", item.color)}>
                    <item.icon className="w-16 h-16 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-8 text-left">
                    <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">{item.desc}</p>
                    <button 
                      onClick={() => setActiveTab(item.id as Tab)}
                      className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      Khởi động <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'simulate-2d':
        return <EngineSimulator2D onBack={() => setActiveTab('simulate')} />;
      case 'assemble-2d':
        return <DiagramAssembly2D onBack={() => setActiveTab('simulate')} />;
      case 'assemble-3d':
        return <EngineAssembly3D onBack={() => setActiveTab('simulate')} />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f8f9fc] font-sans overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-100 flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Công Nghệ 101</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LỚP 11 VN</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Menu chính</p>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all",
                  activeTab === item.id || (item.id === 'simulate' && activeTab.includes('simulate')) || (item.id === 'simulate' && activeTab.includes('assemble'))
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6">
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                {profile?.nickname?.substring(0, 2).toUpperCase() || 'SV'}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{profile?.nickname || 'Sinh Viên'}</p>
                <p className="text-[10px] font-bold text-orange-500 flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {xp} XP
                </p>
              </div>
            </div>
            <button 
              onClick={signOut}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-full flex flex-col pb-28 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around p-2 z-50 pb-safe">
        {sidebarItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'simulate' && (activeTab.includes('simulate') || activeTab.includes('assemble')));
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "flex flex-col items-center p-2 rounded-xl text-[10px] font-bold transition-all",
                isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon className={cn("w-6 h-6 mb-1", isActive ? "fill-indigo-50" : "")} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8f9fc]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return <SignIn />;
  }

  return <MainApp />;
}
