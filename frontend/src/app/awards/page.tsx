'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Star, Trophy, Heart, ChefHat, TrendingUp, Sparkles,
  Quote, MessageCircle, X, Send, Loader2, CheckCircle, Users,
  CalendarDays, UtensilsCrossed, Crown, BadgeCheck, Info,
} from 'lucide-react';
import {
  demoAwards, demoReviews, demoStats, featuredReview,
  platformRatings, overallRating,
} from '@/lib/awardsData';

// ---------- Icon Mapper ----------
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, Heart, ChefHat, TrendingUp, Sparkles, Star, Award, Crown, BadgeCheck,
};

// ---------- Platforms ----------
const platforms = ['all', 'Google', 'Zomato', 'Swiggy', 'EazyDiner'];

// ---------- Helper: get initials ----------
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

// ---------- Star Rating Component ----------
function StarRating({ rating, size = 'w-4 h-4' }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < rating ? 'fill-accent text-accent' : 'text-border'}`}
        />
      ))}
    </div>
  );
}

// ---------- Demo Badge ----------
function DemoBadge({ label = 'DEMO' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/10 text-warning text-[10px] font-semibold tracking-wider uppercase">
      <Info className="w-2.5 h-2.5" /> {label}
    </span>
  );
}

// ---------- Share Experience Modal ----------
function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', rating: 5, review: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="mb-2">Thank You!</h3>
                <p className="text-text-muted text-sm mb-4">
                  We've received your feedback. This is a demo submission — real review integration will be added soon.
                </p>
                <button onClick={onClose} className="btn-primary w-full justify-center text-sm">Close</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-2xl">Share Your Experience</h3>
                  <button onClick={onClose} className="p-1 hover:bg-background rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      className="input-field text-sm"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Rating</label>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setForm({ ...form, rating: i + 1 })}
                          className="p-1"
                        >
                          <Star className={`w-6 h-6 ${i < form.rating ? 'fill-accent text-accent' : 'text-border'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Review</label>
                    <textarea
                      required
                      className="input-field text-sm"
                      rows={4}
                      placeholder="Tell us about your experience..."
                      value={form.review}
                      onChange={e => setForm({ ...form, review: e.target.value })}
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Review</>}
                  </button>
                  <p className="text-[10px] text-text-muted text-center">
                    This is a demo form. Reviews will be connected to real platforms in the future.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Main Page ----------
export default function AwardsPage() {
  const [activePlatform, setActivePlatform] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [shareOpen, setShareOpen] = useState(false);

  // Filter reviews by platform
  const filteredReviews = useMemo(() => {
    if (activePlatform === 'all') return demoReviews;
    return demoReviews.filter(r => r.platform === activePlatform);
  }, [activePlatform]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const handlePlatformChange = (platform: string) => {
    setActivePlatform(platform);
    setVisibleCount(6);
  };

  const renderAwardIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Award;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="pt-24">
      {/* ==================== HERO ==================== */}
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Recognition</span>
            <h1 className="mb-3">Awards & Feedback</h1>
            <p className="text-text-muted text-sm">Recognition from the finest platforms and love from our guests</p>
            <div className="flex justify-center mt-4">
              <DemoBadge label="Illustrative Content" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== AWARDS ==================== */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <h3 className="mb-2">Our Awards</h3>
            <p className="text-sm text-text-muted">Recognition that drives us to excel</p>
            <p className="text-[10px] text-warning mt-2 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" /> Sample recognitions shown for demonstration purposes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoAwards.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10 group-hover:bg-primary group-hover:text-white transition-all">
                    {renderAwardIcon(award.icon)}
                  </div>
                  <DemoBadge />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-accent tracking-wider">0{i + 1}</span>
                  <span className="text-xs text-text-muted">{award.year}</span>
                </div>
                <h4 className="text-sm font-semibold mb-1.5 leading-snug">{award.title}</h4>
                <p className="text-xs text-accent font-medium mb-2">{award.organization}</p>
                <p className="text-xs text-text-muted leading-relaxed">{award.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ===== Demo Statistics ===== */}
          <div className="mt-12">
            <div className="glass-card p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Info className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs font-semibold text-warning tracking-wider uppercase">Demo Statistics</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {demoStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-center"
                  >
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ==================== CUSTOMER FEEDBACK ==================== */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <h3 className="mb-2">Customer Feedback</h3>
            <p className="text-sm text-text-muted">What our guests are saying</p>
            <p className="text-[10px] text-warning mt-2 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" /> Demo reviews shown for illustration — not verified real reviews
            </p>
          </div>

          {/* ===== Rating Summary ===== */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="glass-card p-8 text-center">
              <h4 className="text-sm font-semibold mb-4">Guest Love</h4>
              <div className="text-5xl font-bold text-primary mb-2">{overallRating.value}</div>
              <div className="flex justify-center mb-2">
                <StarRating rating={5} size="w-5 h-5" />
              </div>
              <p className="text-xs text-text-muted mb-6">{overallRating.label}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {platformRatings.map((pr, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-background rounded-xl p-3"
                  >
                    <p className="text-xs font-semibold mb-1">{pr.platform}</p>
                    <div className="flex justify-center mb-1">
                      <StarRating rating={pr.rating} size="w-3 h-3" />
                    </div>
                    <p className="text-[10px] text-text-muted">Demo</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== Featured Review ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="glass-card p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <Quote className="w-10 h-10 mx-auto mb-6 text-accent/30" />
              <p className="text-xl md:text-2xl font-heading italic leading-relaxed mb-6 text-text">
                &ldquo;{featuredReview.quote}&rdquo;
              </p>
              <p className="font-semibold text-primary mb-1">— {featuredReview.name}</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xs text-text-muted">{featuredReview.label}</p>
                <DemoBadge />
              </div>
            </div>
          </motion.div>

          {/* ===== Platform Filters ===== */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => handlePlatformChange(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  activePlatform === p ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border hover:border-primary/30'
                }`}
              >
                {p === 'all' ? 'All Platforms' : p}
              </button>
            ))}
          </div>

          {/* ===== Review Grid ===== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
            >
              {visibleReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="card p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/5">
                        <span className="text-primary font-bold text-xs">{getInitials(review.name)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-xs">{review.name}</p>
                        <span className="text-[10px] text-text-muted">{review.platform}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StarRating rating={review.rating} size="w-3 h-3" />
                      <DemoBadge label="Demo Review" />
                    </div>
                  </div>
                  <p className="text-text-muted text-sm italic leading-relaxed flex-1">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] text-text-muted flex items-center gap-1">
                      <Users className="w-3 h-3" /> {review.visitType}
                    </span>
                    <span className="text-[10px] text-text-muted">{review.platform} · Demo</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ===== Load More ===== */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(c => c + 6)}
                className="btn-secondary text-sm"
              >
                Load More Reviews
              </button>
            </div>
          )}

          {!hasMore && filteredReviews.length > 6 && (
            <div className="text-center mt-8">
              <p className="text-xs text-text-muted">All {filteredReviews.length} demo reviews shown</p>
            </div>
          )}

          {/* ===== Share Your Experience CTA ===== */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="glass-card p-10 text-center" style={{ background: 'rgba(96, 38, 40, 0.03)', borderColor: 'rgba(96, 38, 40, 0.1)' }}>
              <MessageCircle className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="mb-2">We'd Love to Hear From You</h3>
              <p className="text-text-muted text-sm mb-6">Had an evening with us? Tell us about it.</p>
              <button onClick={() => setShareOpen(true)} className="btn-primary bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20">
                <Send className="w-4 h-4" /> Share Your Experience
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Share Modal ===== */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}