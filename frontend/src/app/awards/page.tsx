'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
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
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const platforms = ['all', 'Zomato', 'Google', 'Swiggy', 'EazyDiner'];

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Recognition</span>
            <h1 className="mb-3">Awards & Feedback</h1>
            <p className="text-text-muted text-sm">Recognition from the finest platforms and love from our guests</p>
          </div>

          {stats && (
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{stats.averageRating.toFixed(1)}</div>
                <div className="flex justify-center gap-0.5 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(stats.averageRating) ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <p className="text-xs text-text-muted">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.totalReviews}</div>
                <p className="text-xs text-text-muted mt-2">Total Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">{awards.length}</div>
                <p className="text-xs text-text-muted mt-2">Awards Won</p>
              </div>
            </div>
          )}

          {stats?.distribution && (
            <div className="max-w-xs mx-auto mb-12 space-y-1.5">
              {[5, 4, 3, 2, 1].map(rating => {
                const item = stats.distribution.find((d: any) => d._id === rating);
                const count = item?.count || 0;
                const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-xs w-3">{rating}</span>
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-text-muted w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <h3 className="mb-2">Our Awards</h3>
            <p className="text-sm text-text-muted">Recognition that drives us to excel</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {awards.map((award: any, i: number) => (
                <motion.div key={award._id} className="card p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent/10">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold truncate">{award.title}</h4>
                    <p className="text-xs text-text-muted">{award.platform} &bull; {award.year}</p>
                  </div>
                </motion.div>
              ))}
              {awards.length === 0 && <div className="col-span-full text-center py-12"><p className="text-text-muted text-sm">No awards yet</p></div>}
            </div>
          )}
        </div>
      </section>

      <hr className="divider" />

      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <h3 className="mb-2">Customer Feedback</h3>
            <p className="text-sm text-text-muted">What our guests are saying</p>
          </div>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {platforms.map(p => (
              <button key={p} onClick={() => setActivePlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  activePlatform === p ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border hover:border-primary/30'
                }`}>
                {p === 'all' ? 'All Platforms' : p}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12"><p className="text-text-muted text-sm">No reviews yet</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {reviews.map((review: any, i: number) => (
                <motion.div key={review._id} className="card p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/5">
                        <span className="text-primary font-bold text-xs">{review.reviewerName?.[0] || 'G'}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-xs">{review.reviewerName}</p>
                        <span className="text-[10px] text-text-muted">via {review.platform}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="w-3 h-3 fill-accent text-accent" />)}
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
