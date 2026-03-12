import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ChevronRight, Heart, Share2, Sparkles, Star, ShieldCheck, Ruler } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");
  
  // Mock data
  const product = {
    id: "p1",
    name: "Studio Series V1 Blazer",
    brand: "Atelier Gen Z",
    price: "$210.00",
    rating: 4.8,
    reviews: 124,
    description: "The definitive blazer for the modern urbanite. Crafted with lightweight breathable tech-fabric that moves with you while holding a sharp, structured silhouette. Perfect for layering over graphic tees or hoodies.",
    images: [
      "https://images.unsplash.com/photo-1772714601064-056e3ceced8f?auto=format&fit=crop&q=80&w=800&h=1000",
      "https://images.unsplash.com/photo-1769689387692-82b45df49791?auto=format&fit=crop&q=80&w=800&h=1000",
      "https://images.unsplash.com/photo-1758505805277-6eb6869a9c1f?auto=format&fit=crop&q=80&w=800&h=1000",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8">
        <Link to="/" className="hover:text-[#6D28D9]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-[#6D28D9] cursor-pointer">Shop</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        
        {/* Left Column: Image Gallery */}
        <div className="flex gap-4 flex-col-reverse md:flex-row h-full">
          {/* Vertical Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto shrink-0 snap-x md:w-24 hide-scrollbar p-1">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`w-20 h-24 md:w-full md:h-32 rounded-xl overflow-hidden shrink-0 snap-center border-2 transition-all ${mainImage === img ? 'border-[#6D28D9] shadow-lg scale-105' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[700px] relative group">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              <button className="p-3 bg-white/80 backdrop-blur-md text-gray-700 hover:text-[#FF6B6B] hover:bg-white rounded-full shadow-lg transition-all hover:scale-110">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/80 backdrop-blur-md text-gray-700 hover:text-[#6D28D9] hover:bg-white rounded-full shadow-lg transition-all hover:scale-110">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            {/* VTON Badge overlay on main image */}
             <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-extrabold text-white tracking-wide uppercase">VTON Enabled</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col pt-2 lg:pt-8 h-full">
          
          {/* Header Info */}
          <div className="mb-6">
            <p className="text-sm font-extrabold tracking-widest text-gray-500 uppercase mb-2">{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl lg:text-3xl font-extrabold text-[#6D28D9]">{product.price}</span>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                <span className="text-sm font-medium text-gray-500">({product.reviews})</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg mb-8 font-medium">{product.description}</p>

          {/* DSS Module (Crucial AI Suggestion) */}
          <div className="mb-10 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9] to-[#FF6B6B] rounded-[24px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-[#6D28D9]/20 rounded-3xl p-6 shadow-xl shadow-[#6D28D9]/5 flex items-start gap-5">
              <div className="p-3 bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] rounded-2xl shadow-lg shadow-[#6D28D9]/30 shrink-0">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                  AI Size Suggestion: M
                  <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Perfect Fit</span>
                </h3>
                <p className="text-[15px] text-gray-600 mt-1.5 font-medium leading-relaxed">
                  Based on your profile <span className="font-bold text-gray-900">(175cm, 65kg)</span> and 3D body scan, Size M will provide the intended relaxed silhouette.
                </p>
                <button className="text-[#6D28D9] text-sm font-bold mt-3 hover:underline flex items-center gap-1.5 transition-colors">
                  <Ruler className="w-4 h-4" /> Edit measurements
                </button>
              </div>
            </div>
          </div>

          {/* Sizing */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Select Size</h3>
              <button className="text-gray-500 text-sm font-medium hover:text-[#6D28D9] underline transition-colors">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[4rem] h-12 rounded-xl text-sm font-extrabold tracking-wide transition-all border-2 ${
                    selectedSize === size
                      ? "border-[#6D28D9] bg-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30 scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#6D28D9] hover:text-[#6D28D9]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-gray-100">
            <button className="flex-1 bg-[#6D28D9] hover:bg-[#5B21B6] text-white py-4.5 px-8 rounded-2xl font-extrabold text-lg shadow-xl shadow-[#6D28D9]/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              Add to Cart
            </button>
            
            <button 
              onClick={() => navigate(`/vton/${id}`)}
              className="flex-1 relative group overflow-hidden rounded-2xl p-[2px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] via-[#6D28D9] to-[#FF6B6B] bg-[length:200%_auto] animate-gradient"></div>
              <div className="relative bg-white group-hover:bg-transparent transition-colors duration-300 h-full w-full rounded-[14px] flex items-center justify-center gap-3 px-8 py-4.5">
                <Sparkles className="w-5 h-5 text-[#6D28D9] group-hover:text-white transition-colors" />
                <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#6D28D9] group-hover:text-white transition-colors">
                  Virtual Try-On
                </span>
              </div>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Authenticity Guaranteed</span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
            <span>Free Returns in 30 Days</span>
          </div>

        </div>
      </div>
    </div>
  );
}
