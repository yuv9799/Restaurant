'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { authApi } from '@/lib/api';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function OTPModal({ isOpen, onClose, onSuccess }: OTPModalProps) {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await authApi.sendOTP(email);
      setMessage('OTP sent to your email');
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authApi.verifyOTP({ email, otp });
      onSuccess(response.data.user);
      onClose();
      setStep('email');
      setEmail('');
      setOtp('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setStep('email');
    setEmail('');
    setOtp('');
    setError('');
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl">
                {step === 'email' ? 'Sign In' : 'Enter OTP'}
              </h3>
              <button onClick={handleClose} className="p-1 hover:bg-background rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-error/10 text-error p-3 rounded-lg text-sm mb-4">{error}</div>
            )}
            {message && (
              <div className="bg-success/10 text-success p-3 rounded-lg text-sm mb-4">{message}</div>
            )}

            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="email"
                      required
                      className="input-field pl-10"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><KeyRound className="w-4 h-4" /> Send OTP</>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="input-field text-center text-2xl tracking-[8px]"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                </div>
                <button type="submit" disabled={loading || otp.length !== 6} className="btn-primary w-full justify-center">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Verify & Sign In</>}
                </button>
                <button type="button" onClick={() => { setStep('email'); setError(''); setMessage(''); }} className="text-sm text-text-muted hover:text-primary w-full text-center">
                  Change email
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}