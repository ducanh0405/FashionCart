import { useState } from "react";
import { Link } from "react-router";
import { MessageCircle, MoreHorizontal, Play, Share2, ShoppingBag, Sparkles, Heart } from "lucide-react";
import { clsx } from "clsx";

export function CommunityFeed() {
  const posts = [
    {
      id: "post1",
      user: {
        name: "mia_styles",
        avatar: "https://images.unsplash.com/photo-1605504836193-e77d3d9ede8a?auto=format&fit=crop&q=80&w=150&h=150",
      },
      content: "Testing out the new VTON feature. The fit is literally 1:1! 🤯 #streetwear #vton",
      media: "https://images.unsplash.com/photo-1722966652917-449fe146ee5c?auto=format&fit=crop&q=80&w=1080&h=1350",
      type: "vton",
      likes: "12.4k",
      comments: "342",
      products: [
        { id: "p1", name: "Studio Series Blazer", price: "$210", image: "https://images.unsplash.com/photo-1772714601064-056e3ceced8f?auto=format&fit=crop&q=80&w=100&h=100" }
      ]
    },
    {
      id: "post2",
      user: {
        name: "seoul_hunter",
        avatar: "https://images.unsplash.com/photo-1761500996989-30752a7f35ed?auto=format&fit=crop&q=80&w=150&h=150",
      },
      content: "Late night coffee runs. Just dropped this cargo set in the shop. Go get it before it's gone.",
      media: "https://images.unsplash.com/photo-1761500996989-30752a7f35ed?auto=format&fit=crop&q=80&w=1080&h=1350",
      type: "real",
      likes: "8.9k",
      comments: "120",
      products: [
        { id: "p3", name: "Cyberpunk Cargo", price: "$120", image: "https://images.unsplash.com/photo-1761500996989-30752a7f35ed?auto=format&fit=crop&q=80&w=100&h=100" },
        { id: "p4", name: "Hype X-1", price: "$250", image: "https://images.unsplash.com/photo-1658933864178-183b64b55c69?auto=format&fit=crop&q=80&w=100&h=100" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] overflow-hidden flex flex-col md:flex-row gap-8">
      
      {/* Sidebar - Trending/Filters (Desktop) */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 h-full overflow-y-auto pr-4 hide-scrollbar">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">Discover</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-[#6D28D9]/10 text-[#6D28D9] font-extrabold text-sm transition-colors">For You</button>
            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors flex items-center justify-between">
              Following <span className="w-2 h-2 rounded-full bg-[#FF6B6B]"></span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors">Trending Sounds</button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex-1">
          <h2 className="text-sm font-extrabold text-gray-500 uppercase tracking-widest mb-4">Trending Tags</h2>
          <div className="flex flex-wrap gap-2">
            {['#Y2K', '#Streetwear', '#VTON', '#OOTD', '#Sneakerhead', '#KoreanFashion'].map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <div className="flex-1 h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory pb-24 relative">
        <div className="flex flex-col items-center gap-12 w-full max-w-lg mx-auto">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
}

function Post({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden snap-start snap-always relative group">
      
      {/* User Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-white to-white/0 absolute top-0 w-full z-10 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" />
          <div>
            <h3 className="font-extrabold text-gray-900 drop-shadow-md text-sm">@{post.user.name}</h3>
            {post.type === 'vton' && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#6D28D9] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full uppercase tracking-wider mt-0.5 shadow-sm">
                <Sparkles className="w-3 h-3" /> AI Try-On
              </span>
            )}
          </div>
        </div>
        <button className="p-2 text-gray-600 hover:bg-white/50 rounded-full transition-colors pointer-events-auto backdrop-blur-md bg-white/30">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content (Image/Video) */}
      <div className="relative aspect-[4/5] bg-gray-900 w-full">
        <img src={post.media} alt="Post content" className="w-full h-full object-cover" />
        {/* Play Icon overlay for video feeling */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
            <Play className="w-8 h-8 ml-1" />
          </div>
        </div>
      </div>

      {/* Interaction Bar & Caption */}
      <div className="p-5 pt-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLiked(!liked)} 
              className={clsx("flex items-center gap-1.5 transition-all active:scale-75", liked ? "text-[#FF6B6B]" : "text-gray-600 hover:text-gray-900")}
            >
              <Heart className={clsx("w-7 h-7", liked && "fill-current")} />
              <span className="font-bold text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              <MessageCircle className="w-7 h-7" />
              <span className="font-bold text-sm">{post.comments}</span>
            </button>
            <button className="flex items-center gap-1.5 text-gray-600 hover:text-[#6D28D9] transition-colors ml-2">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <p className="text-gray-800 text-sm font-medium leading-relaxed mb-4">
          <span className="font-extrabold mr-2">@{post.user.name}</span>
          {post.content}
        </p>

        {/* Shop This Look Button */}
        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 shadow-inner group/shop cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6D28D9]/10 flex items-center justify-center shrink-0 text-[#6D28D9]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-0.5">Shop This Look</p>
                <p className="text-xs font-medium text-gray-500">{post.products.length} item{post.products.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <div className="flex -space-x-2 mr-2">
              {post.products.map((prod: any) => (
                <img key={prod.id} src={prod.image} className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm group-hover/shop:scale-110 transition-transform" alt={prod.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
