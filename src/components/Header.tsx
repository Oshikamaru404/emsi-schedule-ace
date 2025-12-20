import { Bell, Menu, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { classInfo } from '@/data/scheduleData';

interface HeaderProps {
  notificationCount: number;
  onNotificationClick: () => void;
  onMenuClick: () => void;
}

const Header = ({ notificationCount, onNotificationClick, onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-foreground leading-tight">
                  EMSI <span className="text-primary">Smart Schedule</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  {classInfo.fullName}
                </p>
              </div>
            </div>
          </div>

          {/* Class Badge */}
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 font-semibold">
              <MapPin className="w-3 h-3 mr-1" />
              Campus EMSI
            </Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 font-bold">
              {classInfo.className}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onNotificationClick}
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
