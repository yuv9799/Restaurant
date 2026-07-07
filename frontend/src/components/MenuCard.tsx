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
  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={isVeg ? 'veg-dot' : 'nonveg-dot'} />
              {isChefSpecial && <span className="badge badge-chef">Chef&apos;s Special</span>}
              {isBestSeller && <span className="badge badge-best-seller">Best Seller</span>}
            </div>
            <h4 className="text-base font-semibold truncate">{name}</h4>
          </div>
          <span className="text-primary font-bold text-lg whitespace-nowrap">₹{price}</span>
        </div>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}
