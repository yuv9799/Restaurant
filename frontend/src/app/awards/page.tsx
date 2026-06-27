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

  useEffect(() => {
    fetchData();
  }, [activePlatform]);

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
      <section className="bg-gradient-to-br from-primary to-primary/90 py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Awards & Feedback
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Recognition from the finest platforms and love from our guests
          </motion.p>
        </div>
      </section>

      {/* Rating Stats */}
      {stats && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">{stats.averageRating.toFixed(1)}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(stats.averageRating) ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <p className="text-text-muted text-sm">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{stats.totalReviews}</div>
                <p className="text-text-muted text-sm">Total Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-success mb-2">{awards.length}</div>
                <p className="text-text-muted text-sm">Awards Won</p>
              </div>
            </div>

            {/* Rating Distribution */}
            {stats.distribution && (
              <div className="max-w-md mx-auto mt-12 space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const item = stats.distribution.find((d: any) => d._id === rating);
                  const count = item?.count || 0;
                  const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-4">{rating}</span>
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-text-muted w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Awards Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-title">
            <h2>Our Awards</h2>
            <p>Recognition that drives us to excel</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-32 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award: any, i: number) => (
                <motion.div key={award._id} className="card p-8 flex items-center gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="mb-1">{award.title}</h4>
                    <p className="text-sm text-text-muted">{award.platform} • {award.year}</p>
                    {award.description && <p className="text-xs text-text-muted mt-1">{award.description}</p>}
                  </div>
                </motion.div>
              ))}
              {awards.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-text-muted">No awards data available yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <hr className="divider container-custom" />

      {/* Customer Reviews */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-title">
            <h2>Customer Feedback Wall</h2>
            <p>What our guests are saying</p>
          </div>

          {/* Platform Filter */}
          <div className="flex justify-center gap-3 mb-8">
            {platforms.map(platform => (
              <button key={platform} onClick={() => setActivePlatform(platform)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activePlatform === platform ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-border'}`}>
                {platform === 'all' ? 'All Platforms' : platform}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-40 rounded-2xl" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">No reviews yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review: any, i: number) => (
                <motion.div key={review._id} className="card p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{review.reviewerName[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{review.reviewerName}</p>
                        <span className="text-xs text-text-muted">via {review.platform}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-text-muted text-sm italic">&ldquo;{review.comment}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}