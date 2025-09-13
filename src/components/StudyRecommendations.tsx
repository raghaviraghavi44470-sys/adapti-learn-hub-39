import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, Star, ArrowRight, Lightbulb } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: "Review Machine Learning Fundamentals",
    reason: "Based on your recent assessment performance",
    priority: "high",
    estimatedTime: "45 min",
    confidence: 92,
    topics: ["Neural Networks", "Supervised Learning"],
    type: "review"
  },
  {
    id: 2,
    title: "Practice Data Structures Problems",
    reason: "Identified knowledge gap in algorithms",
    priority: "medium",
    estimatedTime: "30 min", 
    confidence: 87,
    topics: ["Trees", "Graphs"],
    type: "practice"
  },
  {
    id: 3,
    title: "Explore Advanced Statistics",
    reason: "Next logical step in your learning path",
    priority: "low",
    estimatedTime: "60 min",
    confidence: 78,
    topics: ["Bayesian Methods", "Hypothesis Testing"],
    type: "explore"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive text-destructive-foreground';
    case 'medium': return 'bg-warning text-warning-foreground';
    case 'low': return 'bg-success text-success-foreground';
    default: return 'bg-secondary text-secondary-foreground';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'review': return <Brain className="h-4 w-4" />;
    case 'practice': return <Star className="h-4 w-4" />;
    case 'explore': return <Lightbulb className="h-4 w-4" />;
    default: return <Brain className="h-4 w-4" />;
  }
};

export const StudyRecommendations = () => {
  return (
    <Card className="card-learning p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">AI Study Recommendations</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Brain className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-4 border hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {getTypeIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                </div>
              </div>
              <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                {rec.priority}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {rec.estimatedTime}
                </span>
                <span className="flex items-center">
                  <Brain className="h-3 w-3 mr-1" />
                  {rec.confidence}% match
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {rec.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
              <Button size="sm" variant="outline" className="ml-2">
                Start
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Recommendations update based on your progress
          </p>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </div>
    </Card>
  );
};