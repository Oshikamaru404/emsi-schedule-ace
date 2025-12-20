import { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import DaySelector from '@/components/DaySelector';
import CourseCard from '@/components/CourseCard';
import NotificationPanel from '@/components/NotificationPanel';
import NextClassBanner from '@/components/NextClassBanner';
import EmptyDayState from '@/components/EmptyDayState';
import CampusMap from '@/components/CampusMap';
import { schedule2AP2, sampleNotifications, Notification, classInfo, Course } from '@/data/scheduleData';
import { Calendar, Map, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { student, isLoading, logout } = useAuth();
  const [selectedDay, setSelectedDay] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedCourseForMap, setSelectedCourseForMap] = useState<Course | null>(null);

  // Get today's index (0 = Monday, 5 = Saturday)
  const today = new Date();
  const dayOfWeek = today.getDay();
  // Convert to our format: 0=Monday, 5=Saturday (Sunday = -1, out of schedule)
  const todayIndex = dayOfWeek === 0 ? -1 : dayOfWeek - 1;

  // Set initial selected day to today
  useEffect(() => {
    if (todayIndex >= 0 && todayIndex <= 5) {
      setSelectedDay(todayIndex);
    } else {
      setSelectedDay(0); // Default to Monday if Sunday
    }
  }, [todayIndex]);

  // Auth guard is placed after hooks to respect Rules of Hooks.


  const currentDaySchedule = schedule2AP2[selectedDay];
  const unreadCount = notifications.filter(n => !n.read).length;

  // Find current and next class
  const { currentClass, nextClass, timeUntilNext } = useMemo(() => {
    if (isLoading || !student) {
      return { currentClass: null, nextClass: null, timeUntilNext: null };
    }

    if (todayIndex !== selectedDay) {
      return { currentClass: null, nextClass: null, timeUntilNext: null };
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    let current = null;
    let next = null;

    for (const course of currentDaySchedule.courses) {
      const [startHour, startMin] = course.startTime.split(':').map(Number);
      const [endHour, endMin] = course.endTime.split(':').map(Number);
      const startMins = startHour * 60 + startMin;
      const endMins = endHour * 60 + endMin;

      if (currentTime >= startMins && currentTime <= endMins) {
        current = course;
      } else if (currentTime < startMins && !next) {
        next = course;
        const minsUntil = startMins - currentTime;
        const hours = Math.floor(minsUntil / 60);
        const mins = minsUntil % 60;
        return {
          currentClass: current,
          nextClass: next,
          timeUntilNext: hours > 0 ? `Dans ${hours}h ${mins}min` : `Dans ${mins} min`,
        };
      }
    }

    return { currentClass: current, nextClass: next, timeUntilNext: null };
  }, [selectedDay, todayIndex, currentDaySchedule, isLoading, student?.id]);

  // Redirect to login if not authenticated
  if (!isLoading && !student) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleShowMap = (course: Course) => {
    setSelectedCourseForMap(course);
    setIsMapOpen(true);
  };

  const handleShowNextClassMap = () => {
    const targetCourse = currentClass || nextClass || currentDaySchedule.courses[0];
    if (targetCourse) {
      setSelectedCourseForMap(targetCourse);
      setIsMapOpen(true);
    }
  };

  const handleOpenMapGeneral = () => {
    setSelectedCourseForMap(null);
    setIsMapOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        notificationCount={unreadCount}
        onNotificationClick={() => setIsNotificationOpen(true)}
        onMenuClick={() => {}}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8 fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {classInfo.semester} • {classInfo.year}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenMapGeneral}
              className="gap-2"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Carte du campus</span>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                Bonjour, {student?.full_name.split(' ')[0]} ! 👋
              </h2>
              <p className="text-muted-foreground">
                {student?.class_name} • Voici votre emploi du temps
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-muted-foreground hover:text-destructive"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Notification Banner */}
        {unreadCount > 0 && (
          <div 
            className="notification-banner mb-6 cursor-pointer fade-in"
            onClick={() => setIsNotificationOpen(true)}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <p className="text-sm font-medium text-foreground">
                {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} notification{unreadCount > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}

        {/* Next Class Banner - Only show on today */}
        {todayIndex === selectedDay && (
          <div className="mb-8 slide-up">
            <NextClassBanner 
              course={currentClass || nextClass || currentDaySchedule.courses[0]} 
              timeUntil={timeUntilNext || undefined}
              onShowMap={handleShowNextClassMap}
            />
          </div>
        )}

        {/* Day Selector */}
        <div className="mb-6">
          <DaySelector
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            todayIndex={todayIndex}
          />
        </div>

        {/* Schedule Content */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-foreground">
              {currentDaySchedule.dayFr}
            </h3>
            <span className="text-sm text-muted-foreground">
              {currentDaySchedule.courses.length} cours
            </span>
          </div>

          {currentDaySchedule.courses.length === 0 ? (
            <EmptyDayState />
          ) : (
            <div className="grid gap-4">
              {currentDaySchedule.courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isCurrentClass={currentClass?.id === course.id}
                  isNextClass={nextClass?.id === course.id && !currentClass}
                  animationDelay={index * 100}
                  onShowMap={handleShowMap}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            EMSI Smart Schedule • {classInfo.className}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Mise à jour automatique des emplois du temps
          </p>
        </footer>
      </main>

      {/* Notification Panel */}
      <NotificationPanel
        notifications={notifications}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onMarkAsRead={handleMarkAsRead}
      />

      {/* Campus Map */}
      {isMapOpen && (
        <CampusMap
          targetRoom={selectedCourseForMap?.room}
          targetCourse={selectedCourseForMap}
          onClose={() => setIsMapOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
