import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList, Settings, Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Assessment {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  questions: number;
  status: 'generating' | 'ready' | 'completed';
  createdAt: string;
}

export const AssessmentGenerator = () => {
  const [topic, setTopic] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateAssessment = async () => {
    if (!topic || !assessmentType || !difficulty || !questionCount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate an assessment.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    const newAssessment: Assessment = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${topic} Assessment`,
      type: assessmentType,
      difficulty,
      questions: parseInt(questionCount),
      status: 'generating',
      createdAt: new Date().toISOString()
    };

    setAssessments(prev => [newAssessment, ...prev]);

    // Simulate AI generation
    setTimeout(() => {
      setAssessments(prev => prev.map(a => 
        a.id === newAssessment.id ? { ...a, status: 'ready' } : a
      ));
      setIsGenerating(false);
      toast({
        title: "Assessment Generated",
        description: `Your ${topic} assessment is ready to use!`
      });
    }, 3000);

    // Reset form
    setTopic('');
    setAssessmentType('');
    setDifficulty('');
    setQuestionCount('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: Assessment['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'generating':
        return <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />;
      default:
        return <ClipboardList className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-learning p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Assessment Generator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic/Subject</label>
            <Textarea 
              placeholder="e.g., Machine Learning Algorithms, Data Structures..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assessment Type</label>
              <Select value={assessmentType} onValueChange={setAssessmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  <SelectItem value="mixed">Mixed Format</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Questions</label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={generateAssessment}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
              Generating Assessment...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Generate Assessment
            </>
          )}
        </Button>
      </Card>

      {assessments.length > 0 && (
        <Card className="card-learning p-6">
          <h4 className="text-lg font-semibold mb-4">Generated Assessments</h4>
          <div className="space-y-3">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/30">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(assessment.status)}
                  <div>
                    <p className="font-medium">{assessment.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{assessment.type}</Badge>
                      <Badge className={getDifficultyColor(assessment.difficulty)} variant="secondary">
                        {assessment.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {assessment.questions} questions
                      </span>
                    </div>
                  </div>
                </div>
                
                {assessment.status === 'ready' && (
                  <Button size="sm" variant="outline">
                    Start Assessment
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};