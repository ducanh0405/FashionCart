import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Camera, Download, Loader2, Share2, ShoppingCart, Sparkles, Upload } from "lucide-react";
import { clsx } from "clsx";

export function VtonStudio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedColor, setSelectedColor] = useState("violet");

  // Mock Data
  const colors = [
    { id: "violet", hex: "#6D28D9", name: "Electric Violet" },
    { id: "peach", hex: "#FF6B6B", name: "Neon Peach" },
    { id: "black", hex: "#111827", name: "Midnight Black" },
    { id: "white", hex: "#F9FAFB", name: "Arctic White" },
  ];

  const handleVariantChange = (colorId: string) => {
    setSelectedColor(colorId);
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500); // Simulate AI generation time
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#F8F9FA] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E7EB] shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors shadow-sm border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Virtual Try-On Studio <Sparkles className="w-4 h-4 text-[#6D28D9]" />
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Studio Series V1 Blazer</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 bg-gray-50 hover:bg-gray-100 font-bold text-sm transition-colors border border-gray-200">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-extrabold text-sm shadow-lg shadow-[#6D28D9]/20 transition-all active:scale-95">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-50">
        
        {/* Left Panel: User Photo */}
        <section className="flex-1 flex flex-col border-r border-[#E5E7EB] bg-white relative">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm z-10">
            <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">1</span>
              Your Photo
            </h2>
            <button className="text-xs font-bold text-[#6D28D9] flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#6D28D9]/5 transition-colors">
              <Camera className="w-3.5 h-3.5" /> Retake
            </button>
          </div>
          
          <div className="flex-1 relative bg-gray-100/50 flex items-center justify-center p-8 overflow-hidden">
             {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#6D28D9 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative max-w-sm w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1699787167971-db840f61c3bd?auto=format&fit=crop&q=80&w=800&h=1200" 
                alt="Your Photo" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <button className="flex flex-col items-center gap-2 text-white p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <Upload className="w-8 h-8" />
                  <span className="font-bold tracking-wide">Change Photo</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: AI Result */}
        <section className="flex-1 flex flex-col bg-white relative">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm z-10 shadow-sm">
            <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#6D28D9] text-white flex items-center justify-center text-xs shadow-md">2</span>
              AI Generated Result
            </h2>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Ready</span>
            </div>
          </div>

          <div className="flex-1 relative flex flex-col">
             {/* The Image Container */}
            <div className="flex-1 relative flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
               {isGenerating && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-[#6D28D9] animate-spin mb-4" />
                  <p className="font-extrabold text-gray-900 text-lg">Fitting the garment...</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">Applying real-time physics & lighting</p>
                </div>
              )}

              <div className={clsx(
                "relative max-w-sm w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-700",
                isGenerating ? "scale-95 opacity-50 blur-sm" : "scale-100 opacity-100 blur-0"
              )}>
                <img 
                  src={
                    selectedColor === 'violet' ? "https://images.unsplash.com/photo-1615903162221-b757b14b8000?auto=format&fit=crop&q=80&w=800&h=1200" :
                    selectedColor === 'peach' ? "https://images.unsplash.com/photo-1769689387692-82b45df49791?auto=format&fit=crop&q=80&w=800&h=1200" :
                    "https://images.unsplash.com/photo-1772714601064-056e3ceced8f?auto=format&fit=crop&q=80&w=800&h=1200"
                  } 
                  alt="AI Fit Result" 
                  className="w-full h-full object-cover"
                />
                
                {/* AI Quality Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">98% Match</span>
                </div>
              </div>
            </div>

            {/* Controls Drawer */}
            <div className="bg-white border-t border-[#E5E7EB] p-6 pb-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-2xl mx-auto w-full">
                
                {/* Colors */}
                <div className="flex-1 w-full text-center md:text-left">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Instant Color Switch</p>
                  <div className="flex gap-3 justify-center md:justify-start">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleVariantChange(c.id)}
                        className={clsx(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ring-offset-2",
                          selectedColor === c.id ? "ring-2 ring-[#6D28D9] scale-110 shadow-lg" : "ring-1 ring-gray-200 hover:scale-105"
                        )}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.id && <Sparkles className={clsx("w-5 h-5", c.id === 'white' ? 'text-gray-900' : 'text-white')} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full md:w-auto">
                   <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-900 text-white font-extrabold text-sm shadow-xl shadow-gray-900/20 hover:bg-gray-800 transition-all active:scale-95">
                    <Download className="w-5 h-5" /> Save Look
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B6B] to-[#6D28D9] text-white font-extrabold text-sm shadow-xl shadow-[#6D28D9]/30 hover:shadow-2xl hover:shadow-[#6D28D9]/40 transition-all active:scale-95 group">
                    Share to Feed <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
            
          </div>
        </section>

      </main>
    </div>
  );
}

// ArrowRight needed for the button
import { ArrowRight } from "lucide-react";
