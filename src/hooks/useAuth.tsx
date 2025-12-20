import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Student {
  id: string;
  student_number: string;
  full_name: string;
  class_name: string;
}

interface AuthContextType {
  student: Student | null;
  isLoading: boolean;
  login: (studentNumber: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const storedStudent = localStorage.getItem('emsi_student');
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
    setIsLoading(false);
  }, []);

  const login = async (studentNumber: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedNumber = studentNumber.trim().toUpperCase();
    
    if (!trimmedNumber) {
      return { success: false, error: 'Veuillez entrer votre numéro d\'étudiant' };
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('student_number', trimmedNumber)
      .maybeSingle();

    if (error) {
      return { success: false, error: 'Erreur de connexion. Veuillez réessayer.' };
    }

    if (!data) {
      return { success: false, error: 'Numéro d\'étudiant non reconnu' };
    }

    setStudent(data);
    localStorage.setItem('emsi_student', JSON.stringify(data));
    return { success: true };
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('emsi_student');
  };

  return (
    <AuthContext.Provider value={{ student, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
