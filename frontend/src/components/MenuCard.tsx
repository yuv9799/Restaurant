'use client';

import { motion } from 'framer-motion';

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
  isBestSeller?: boolean;
}

export default function MenuCard({ name, description, price, isVeg, isChefSpecial, isBestSeller }: MenuCardProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('en-IN');
  };

  return (
    <motion.div
      className="card overflow-hidden group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={isVeg ? 'veg-dot' : 'nonveg-dot'} />
              {isChefSpecial && <span className="badge badge-chef">Chef's Special</span>}
              {isBestSeller && <span className="badge badge-best-seller">Best Seller</span>}
            </div>
            <h4 className="text-base font-semibold line-clamp-1">{name}</h4>
          </div>

          {/* Premium Price Tag */}
          <div className="relative shrink-0">
            <div className="flex flex-col items-center bg-primary text-white rounded-xl px-3 py-2 min-w-[70px] shadow-md shadow-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-105">
              <span className="text-[10px] font-medium uppercase tracking-wider text-accent/90 leading-none">Price</span>
              <span className="text-base font-bold font-heading leading-tight mt-0.5 whitespace-nowrap">
                ₹{formatPrice(price)}
              </span>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-[5px] border-x-transparent border-t-[4px] border-t-white/10" />
          </div>
        </div>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}