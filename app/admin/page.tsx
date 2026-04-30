'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminPanel from '@/components/admin/AdminPanel';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
          Cargando...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminAuth onAuthenticated={() => setUser(auth.currentUser)} />;
  }

  return <AdminPanel />;
}
