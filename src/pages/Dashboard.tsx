import { useState } from 'react';
import { Header } from '@/components/Header';
import { DocumentUpload } from '@/components/DocumentUpload';
import { ProgressAnalytics } from '@/components/ProgressAnalytics';
import { StudyRecommendations } from '@/components/StudyRecommendations';
import { AssessmentGenerator } from '@/components/AssessmentGenerator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  BarChart3, 
  Brain, 
  ClipboardList, 
  TrendingUp, 
  Zap,
  BookOpen
} from 'lucide-react';
import heroImage from '@/assets/hero-learning.jpg';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-learning-secondary/5 to-learning-analytics/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered Learning
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Personalized Learning{' '}
                  <span className="gradient-text">Powered by AI</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Upload your documents, get AI-generated assessments, and receive personalized study recommendations based on your progress.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" size="lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI Learning Platform" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4" />
              <span>Assessments</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Recommendations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ProgressAnalytics />
              </div>
              <div>
                <StudyRecommendations />
              </div>
            </div>
            
            {/* Quick Actions */}
            <Card className="card-learning p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setActiveTab('documents')}
                >
                  <Upload className="h-8 w-8 text-primary" />
                  <span>Upload Documents</span>
                  <span className="text-xs text-muted-foreground">Process learning materials</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setActiveTab('assessments')}
                >
                  <ClipboardList className="h-8 w-8 text-learning-secondary" />
                  <span>Generate Assessment</span>
                  <span className="text-xs text-muted-foreground">Create AI-powered tests</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setActiveTab('recommendations')}
                >
                  <Brain className="h-8 w-8 text-learning-analytics" />
                  <span>Get Recommendations</span>
                  <span className="text-xs text-muted-foreground">AI study suggestions</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentGenerator />
          </TabsContent>

          <TabsContent value="recommendations">
            <StudyRecommendations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;