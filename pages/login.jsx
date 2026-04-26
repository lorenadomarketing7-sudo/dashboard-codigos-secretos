import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Email ou senha incorretos. Verifique suas credenciais.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 1.5rem' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔐</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
            Códigos Secretos da Atenção
          </h1>
          <p style={{ fontSize: '14px', color: '#C4B5B0' }}>
            Acesse com seu email e senha
          </p>
        </div>

        {/* Form */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderTop: '2px solid #E8513A', borderRadius: '4px', padding: '2rem' }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C4B5B0', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '12px 16px', fontSize: '14px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C4B5B0', marginBottom: '8px' }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '12px 16px', fontSize: '14px', color: '#fff', outline: 'none' }}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(232,81,58,0.1)', border: '1px solid rgba(232,81,58,0.3)', borderRadius: '4px', padding: '12px 16px', marginBottom: '1.25rem', fontSize: '13px', color: '#E8513A' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: loading ? '#666' : '#E8513A', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px', borderRadius: '4px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#C4B5B0', marginTop: '1.5rem' }}>
          Problemas com acesso? Entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
}
