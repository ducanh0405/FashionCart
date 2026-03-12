import { Outlet, Link, useLocation } from "react-router";
import { Search, ShoppingBag, MessageCircle, User, Camera, Menu } from "lucide-react";
import { clsx } from "clsx";

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Plus_Jakarta_Sans',sans-serif]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] px-4 py-3 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-[#6D28D9]">
              FashionCart<span className="text-[#FF6B6B]">.</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
               <Link to="/" className={clsx("font-semibold transition-colors", location.pathname === "/" ? "text-[#6D28D9]" : "text-gray-500 hover:text-gray-900")}>Shop</Link>
               <Link to="/community" className={clsx("font-semibold transition-colors", location.pathname === "/community" ? "text-[#6D28D9]" : "text-gray-500 hover:text-gray-900")}>Community</Link>
            </nav>
          </div>

          <div className="flex-1 max-w-xl hidden sm:block relative mx-4 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#6D28D9] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search trends, brands, or styles..."
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-12 pr-12 focus:ring-2 focus:ring-[#6D28D9]/20 focus:bg-white transition-all outline-none text-sm font-medium"
            />
            <button className="absolute inset-y-0 right-2 flex items-center p-2 text-gray-400 hover:text-[#6D28D9] transition-colors">
              <Camera className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="sm:hidden p-2 text-gray-600">
              <Search className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 relative text-gray-600 hover:text-[#6D28D9] transition-colors rounded-full hover:bg-[#6D28D9]/5">
                <MessageCircle className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF6B6B] rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 relative text-gray-600 hover:text-[#6D28D9] transition-colors rounded-full hover:bg-[#6D28D9]/5">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute top-0 right-0 bg-[#6D28D9] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">3</span>
              </button>
              <button className="hidden md:block p-1 ml-2 rounded-full border-2 border-transparent hover:border-[#6D28D9] transition-colors">
                <img src="https://images.unsplash.com/photo-1605504836193-e77d3d9ede8a?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </button>
              <button className="md:hidden p-2 text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
