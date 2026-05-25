import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors justify-center font-medium drop-shadow-sm">
          <ArrowLeft size={16} /> Return to Public Feed
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface/60 backdrop-blur-2xl py-8 px-4 shadow-2xl shadow-accent/5 sm:rounded-xl border border-border/50 sm:px-10 transition-all duration-300 hover:shadow-accent/10 hover:border-accent/30">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4 backdrop-blur-md border border-accent/20">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold font-heading text-text-primary">Operator Authentication</h2>
            <p className="text-sm text-text-secondary mt-2">Secure access to the intelligence dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Operator ID
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-standard"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-standard"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-danger-bg/80 backdrop-blur-md text-danger-text text-sm p-3 rounded-lg border border-danger-border/50 shadow-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
