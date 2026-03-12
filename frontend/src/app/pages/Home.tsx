import { Link } from "react-router";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const recommendedItems = [
    { id: "rec1", name: "Neon Street Zip-Up", brand: "Urban Edge", price: "$85", image: "https://images.unsplash.com/photo-1769689387692-82b45df49791?auto=format&fit=crop&q=80&w=400&h=500", hasVton: true },
    { id: "rec2", name: "Vintage 90s Oversized", brand: "Y2K Finds", price: "$45", image: "https://images.unsplash.com/photo-1763403255616-201d3699d8d6?auto=format&fit=crop&q=80&w=400&h=500" },
    { id: "rec3", name: "Cyberpunk Cargo Pants", brand: "NeoSeoul", price: "$120", image: "https://images.unsplash.com/photo-1761500996989-30752a7f35ed?auto=format&fit=crop&q=80&w=400&h=500", hasVton: true },
    { id: "rec4", name: "Hype Beast X-1 Sneakers", brand: "SNKRZ", price: "$250", image: "https://images.unsplash.com/photo-1658933864178-183b64b55c69?auto=format&fit=crop&q=80&w=400&h=500" },
  ];

  const feedItems = [
    { id: "feed1", name: "Seoul Night Set", brand: "K-Style", price: "$90", image: "https://images.unsplash.com/photo-1761500996989-30752a7f35ed?auto=format&fit=crop&q=80&w=600&h=800", hasVton: true, height: "h-[450px]" },
    { id: "feed2", name: "Acid Wash Graphic Tee", brand: "Riot Club", price: "$35", image: "https://images.unsplash.com/photo-1763403255616-201d3699d8d6?auto=format&fit=crop&q=80&w=600&h=600", hasVton: false, height: "h-[300px]" },
    { id: "feed3", name: "Techwear Vest", brand: "Urban Edge", price: "$110", image: "https://images.unsplash.com/photo-1769689387692-82b45df49791?auto=format&fit=crop&q=80&w=600&h=700", hasVton: true, height: "h-[400px]" },
    { id: "feed4", name: "Platform Runners V2", brand: "SNKRZ", price: "$180", image: "https://images.unsplash.com/photo-1658933864178-183b64b55c69?auto=format&fit=crop&q=80&w=600&h=600", hasVton: false, height: "h-[350px]" },
    { id: "feed5", name: "Studio Series Look", brand: "Atelier", price: "$210", image: "https://images.unsplash.com/photo-1772714601064-056e3ceced8f?auto=format&fit=crop&q=80&w=600&h=800", hasVton: true, height: "h-[500px]" },
    { id: "feed6", name: "Vibrant Youth Jacket", brand: "GenZ", price: "$95", image: "https://images.unsplash.com/photo-1758505805277-6eb6869a9c1f?auto=format&fit=crop&q=80&w=600&h=700", hasVton: true, height: "h-[380px]" },
  ];

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pt-6">
      
      {/* Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 h-[500px] md:h-[600px] bg-gray-900 group">
        <img 
          src="https://images.unsplash.com/photo-1758505805277-6eb6869a9c1f?auto=format&fit=crop&q=80&w=1600&h=900" 
          alt="Trending in HCM City" 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl transform transition-all duration-500 translate-y-0 opacity-100">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B] text-white text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-[#FF6B6B]/30 animate-pulse">
              <Zap className="w-3 h-3 fill-current" /> Live Drop
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
              Trending in <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">HCM City</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-medium max-w-lg leading-relaxed">
              Discover the streetwear that's taking over the streets. Try it on instantly with our AI studio.
            </p>
            <button className="bg-white text-[#6D28D9] hover:bg-[#F8F9FA] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              Shop The Collection
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Recommended Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] rounded-xl shadow-lg shadow-[#6D28D9]/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Recommended for You</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">AI-curated based on your style profile.</p>
            </div>
          </div>
          <button className="hidden sm:flex text-[#6D28D9] font-bold text-sm items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {recommendedItems.map((item) => (
            <div key={item.id} className="min-w-[260px] md:min-w-[300px] snap-start shrink-0">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </section>

      {/* The Feed (Social-style) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Discover The Feed</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">See what others are trying on right now.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-bold shadow-md">For You</button>
            <button className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors">Following</button>
          </div>
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 640: 2, 1024: 3, 1280: 4}}>
          <Masonry gutter="24px">
            {feedItems.map((item) => (
              <div key={item.id} className="mb-6">
                <ProductCard {...item} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>

    </div>
  );
}
