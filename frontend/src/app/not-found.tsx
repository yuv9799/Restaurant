'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <UtensilsCrossed className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-text-muted mb-8">
          Oops! This dish isn't on our menu. Let's get you back to the table.
        </p>
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}