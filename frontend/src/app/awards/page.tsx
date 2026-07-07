'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, Filter } from 'lucide-react';
import { awardsApi, reviewsApi } from '@/lib/api';

export default function AwardsPage() {
  const [awards, setAwards] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePlatform, setActivePlatform] = useState('all');

  useEffect(() => { fetchData(); }, [activePlatform]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [awardsRes, reviewsRes] = await Promise.all([
        awardsApi.getAll(),
        reviewsApi.getAll({ platform: activePlatform !== 'all' ? activePlatform : undefined })
      ]);
      setAwards(awardsRes.data.awards);
      setReviews(reviewsRes.data.reviews);
      setStats(reviewsRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const platforms = ['all', 'Zomato', 'Google', 'Swiggy', 'EazyDiner'];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/90 py-12 md:py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4 text-3xl md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Awards & Feedback
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Recognition from the finest platforms and love from our guests
          </motion.p>
        </div>
      </section>

      {stats && (
        <section className="py-8 md:py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-accent mb-1 md:mb-2">{stats.averageRating.toFixed(1)}</div>
                <div className="flex justify-center gap-0.5 md:gap-1 mb-1 md:mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 md:w-5 md:h-5 ${i < Math.round(stats.averageRating) ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <p className="text-text-muted text-[10px] md:text-sm">Avg Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">{stats.totalReviews}</div>
                <p className="text-text-muted text-[10px] md:text-sm">Total Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-success mb-1 md:mb-2">{awards.length}</div>
                <p className="text-text-muted text-[10px] md:text-sm">Awards Won</p>
              </div>
            </div>
            {stats.distribution && (
              <div className="max-w-md mx-auto mt-8 md:mt-12 space-y-1.5 md:space-y-2 px-4">
                {[5, 4, 3, 2, 1].map(rating => {
                  const item = stats.distribution.find((d: any) => d._id === rating);
                  const count = item?.count || 0;
                  const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-2 md:gap-3">
                      <span className="text-xs md:text-sm w-3 md:w-4">{rating}</span>
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-accent fill-accent" />
                      <div className="flex-1 h-2 md:h-3 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-xs md:text-sm text-text-muted w-6 md:w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="section-title mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl">Our Awards</h2>
            <p className="text-sm md:text-base">Recognition that drives us to excel</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-24 md:h-32 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {awards.map((award: any, i: number) => (
                <motion.div key={award._id} className="card p-4 md:p-8 flex items-center gap-4 md:gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-accent/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 md:w-8 md:h-8 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm md:text-xl mb-0.5 md:mb-1 truncate">{award.title}</h4>
                    <p className="text-xs md:text-sm text-text-muted">{award.platform} &bull; {award.year}</p>
                    {award.description && <p className="text-[10px] md:text-xs text-text-muted mt-0.5 md:mt-1 truncate">{award.description}</p>}
                  </div>
                </motion.div>
              ))}
              {awards.length === 0 && <div className="col-span-full text-center py-8 md:py-12"><p className="text-text-muted text-sm md:text-base">No awards data available yet</p></div>}
            </div>
          )}
        </div>
      </section>

      <hr className="divider container-custom my-0" />

      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="section-title mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl">Customer Feedback Wall</h2>
            <p className="text-sm md:text-base">What our guests are saying</p>
          </div>
          <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-none">
            {platforms.map(platform => (
              <button key={platform} onClick={() => setActivePlatform(platform)} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${activePlatform === platform ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-border'}`}>
                {platform === 'all' ? 'All Platforms' : platform}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 md:h-40 rounded-2xl" />)}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 md:py-12"><p className="text-text-muted text-sm md:text-base">No reviews yet</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {reviews.map((review: any, i: number) => (
                <motion.div key={review._id} className="card p-4 md:p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xs md:text-sm">{review.reviewerName?.[0] || 'G'}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs md:text-sm truncate">{review.reviewerName}</p>
                        <span className="text-[10px] md:text-xs text-text-muted">via {review.platform}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-accent text-accent" />)}
                    </div>
                  </div>
                  <p className="text-text-muted text-xs md:text-sm italic">&ldquo;{review.comment}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
