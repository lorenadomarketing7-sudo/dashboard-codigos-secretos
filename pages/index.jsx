import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) router.push('/login');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push('/login');
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#E8513A', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Carregando...</div>
    </div>
  );

  if (!session) return null;

  return <Dashboard />;
}
