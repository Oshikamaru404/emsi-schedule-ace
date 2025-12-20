import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Loader2, AlertCircle, Fingerprint } from 'lucide-react';

const Login = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedNumber, setSavedNumber] = useState<string | null>(null);
  const { login, student } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (student) {
      navigate('/');
    }
  }, [student, navigate]);

  // Check for saved student number
  useEffect(() => {
    const saved = localStorage.getItem('emsi_last_student');
    if (saved) {
      setSavedNumber(saved);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(studentNumber);
    
    if (result.success) {
      localStorage.setItem('emsi_last_student', studentNumber.trim().toUpperCase());
      navigate('/');
    } else {
      setError(result.error || 'Erreur de connexion');
    }
    
    setIsLoading(false);
  };

  const handleQuickLogin = async () => {
    if (!savedNumber) return;
    setError('');
    setIsLoading(true);

    const result = await login(savedNumber);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Erreur de connexion');
      // Clear saved number if it fails
      localStorage.removeItem('emsi_last_student');
      setSavedNumber(null);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">EMSI Smart Schedule</h1>
          <p className="text-muted-foreground">Connectez-vous avec votre numéro d'étudiant</p>
        </div>

        {/* Quick Login Option */}
        {savedNumber && (
          <div className="mb-6">
            <Button
              onClick={handleQuickLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full h-16 glass-card border-primary/30 hover:bg-primary/10 gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Connexion rapide</p>
                <p className="text-xs text-muted-foreground">{savedNumber}</p>
              </div>
            </Button>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="studentNumber" className="text-sm font-medium text-foreground">
                Numéro d'étudiant
              </label>
              <Input
                id="studentNumber"
                type="text"
                placeholder="F-XXXX-XXXXXX"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                className="h-12 text-lg bg-background/50 border-border/50 focus:border-primary"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2025 EMSI Smart Schedule
        </p>
      </div>
    </div>
  );
};

export default Login;
