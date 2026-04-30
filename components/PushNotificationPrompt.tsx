'use client';

import { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';

export default function PushNotificationPrompt() {
  const [show, setShow] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already subscribed
    const checkSubscription = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            const subscription = await registration.pushManager.getSubscription();
            setSubscribed(!!subscription);
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      }
    };

    checkSubscription();

    // Show prompt after 5 seconds
    const timer = setTimeout(() => {
      if (!subscribed && 'Notification' in window && Notification.permission === 'default') {
        setShow(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [subscribed]);

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      // Request notification permission
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        // Register service worker
        const registration = await navigator.serviceWorker.register('/sw.js');

        // Subscribe to push
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });

        // Send subscription to server (you'll need to implement this)
        // await fetch('/api/push/subscribe', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(subscription),
        // });

        setSubscribed(true);
        setShow(false);
      }
    } catch (error) {
      console.error('Error subscribing to push:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show || subscribed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-[var(--bg2)] border-2 border-[var(--head)] rounded-lg shadow-lg z-[500] p-4 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-[var(--text3)] hover:text-[var(--head)] transition-colors"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-[var(--head)] rounded-full">
          <Bell size={20} className="text-[var(--bg)]" />
        </div>
        <div className="flex-1">
          <h3 className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--head)] mb-1">
            Notificaciones
          </h3>
          <p className="font-source-serif text-sm text-[var(--text2)] mb-3">
            Recibe notificaciones cuando publiquemos nuevos artículos de Hip-Hop.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase bg-[var(--head)] text-[var(--bg)] rounded hover:bg-[var(--acc)] transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Activando...' : 'Activar'}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase border border-[var(--border)] rounded hover:border-[var(--head)] transition-colors cursor-pointer"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
