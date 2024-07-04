"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkTokenCookie } from '../auth/login/auth';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Memeriksa keberadaan cookie token saat komponen dimount
    const hasToken = checkTokenCookie();

    // Jika tidak ada token, arahkan pengguna ke halaman login
    if (!hasToken) {
      router.push('/auth/login'); // Ganti dengan path login yang sesuai
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default DashboardPage;
