import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Clock, BookOpen } from 'lucide-react';

const mockData = {
  weeklyProgress: 78,
  studyStreak: 12,
  completedTopics: 24,
  totalTopics: 35,
  weeklyGoal: 85,
  studyTime: '2h 45m',
  avgScore: 87,
  improvement: '+12%'
};

export const ProgressAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-learning p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Study Streak</p>
              <p className="text-2xl font-bold text-success">{mockData.studyStreak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
            <Target className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="card-learning p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold text-primary">{mockData.avgScore}%</p>
              <p className="text-xs text-success">{mockData.improvement}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="card-learning p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Study Time</p>
              <p className="text-2xl font-bold text-learning-secondary">{mockData.studyTime}</p>
              <p className="text-xs text-muted-foreground">this week</p>
            </div>
            <Clock className="h-8 w-8 text-learning-secondary" />
          </div>
        </Card>

        <Card className="card-learning p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Topics</p>
              <p className="text-2xl font-bold text-learning-analytics">{mockData.completedTopics}/{mockData.totalTopics}</p>
              <p className="text-xs text-muted-foreground">completed</p>
            </div>
            <BookOpen className="h-8 w-8 text-learning-analytics" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-learning p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress to Goal</span>
              <span>{mockData.weeklyProgress}% of {mockData.weeklyGoal}%</span>
            </div>
            <Progress value={mockData.weeklyProgress} className="progress-glow" />
            <p className="text-sm text-muted-foreground">
              You're {mockData.weeklyGoal - mockData.weeklyProgress}% away from your weekly goal!
            </p>
          </div>
        </Card>

        <Card className="card-learning p-6">
          <h3 className="text-lg font-semibold mb-4">Topic Completion</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Completed Topics</span>
              <span>{mockData.completedTopics} of {mockData.totalTopics}</span>
            </div>
            <Progress 
              value={(mockData.completedTopics / mockData.totalTopics) * 100} 
              className="progress-glow" 
            />
            <p className="text-sm text-muted-foreground">
              {mockData.totalTopics - mockData.completedTopics} topics remaining
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};