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

export default function MenuCard({
  name,
  description,
  price,
  isVeg,
  isChefSpecial,
  isBestSeller,
}: MenuCardProps) {
  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(96,38,40,0.12)' }}
    >
      {/* Badges row */}
      <div className="px-6 pt-5 flex gap-2">
        <span className={isVeg ? 'veg-dot' : 'nonveg-dot'} />
        {isChefSpecial && <span className="badge-chef">Chef's Special</span>}
        {isBestSeller && <span className="badge-best-seller">Best Seller</span>}
      </div>

      {/* Dish info — no image, clean card layout */}
      <div className="p-6 pt-4">
        {/* Dish name — large, bold */}
        <h4 className="text-xl font-bold mb-2">{name}</h4>

        {/* Description — ingredients / cooking process, 2-3 lines */}
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Price at the bottom */}
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-xl">₹{price}</span>
        </div>
      </div>
    </motion.div>
  );
}
