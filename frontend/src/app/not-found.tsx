'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center p-4">
      <motion.div className="text-center max-w-sm" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-7xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-text-muted text-sm mb-8">
          This dish isn&apos;t on our menu. Let&apos;s get you back.
        </p>
        <Link href="/" className="btn-primary"><Home className="w-4 h-4" /> Back to Home</Link>
      </motion.div>
    </div>
  );
}
