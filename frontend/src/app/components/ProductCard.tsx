import { Link } from "react-router";
import { Heart, Share2, ShoppingCart, Sparkles } from "lucide-react";

interface ProductCardProps {
  id: string;
  image: string;
  brand: string;
  price: string;
  name: string;
  hasVton?: boolean;
  aspectRatio?: string;
}

export function ProductCard({ id, image, brand, price, name, hasVton = false, aspectRatio = "aspect-[4/5]" }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-xl hover:shadow-[#6D28D9]/5 transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${id}`} className="block relative">
        <div className={`w-full overflow-hidden bg-gray-100 ${aspectRatio}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
        
        {hasVton && (
          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
            <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">VTON Ready</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">{brand}</p>
            <Link to={`/product/${id}`}>
              <h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-1 hover:text-[#6D28D9] transition-colors">{name}</h3>
            </Link>
          </div>
          <p className="text-base font-extrabold text-[#6D28D9]">{price}</p>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-gray-50 hover:bg-[#6D28D9] hover:text-white text-gray-700 py-2 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button className="p-2.5 bg-gray-50 text-gray-500 hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/10 rounded-xl transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2.5 bg-gray-50 text-gray-500 hover:text-[#6D28D9] hover:bg-[#6D28D9]/10 rounded-xl transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
