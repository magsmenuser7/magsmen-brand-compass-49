import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditWizard } from "@/components/AuditWizard";
import { ResultsPage } from "@/components/ResultsPage";
import { WebsiteAnalyzer } from "@/components/WebsiteAnalyzer";
import { CheckCircle, Star, TrendingUp, Target, Shield, Zap, BarChart3, Users, Award } from 'lucide-react';

interface AuditData {
  website: string;
  businessType: string;
  currentBrand: string;
  designQuality: number;
  communicationClarity: number;
  strategyAlignment: number;
  marketingBudget: string;
  platformsUsed: string[];
  additionalInfo: string;
  score: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'audit' | 'results'>('landing');
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const { analyzeWebsite } = WebsiteAnalyzer();

  const handleStartAudit = () => {
    setCurrentView('audit');
  };

  const handleAuditComplete = (data: AuditData) => {
    setAuditData(data);
    setCurrentView('results');
  };

  const handleStartOver = () => {
    setAuditData(null);
    setCurrentView('landing');
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header with Logo */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="max-w-7xl mx-auto">
          <img 
            src="src/assets/magsmen-new-version.png"
            alt="magsmen-new-version" 
            className="h-8 sm:h-10 md:h-12 w-auto mt-5"
          />
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Brand Audit System
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover your brand's true potential with our comprehensive assessment
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-8">
              <span>Powered by</span>
              <strong className="gradient-primary text-white px-3 py-1 rounded-full text-sm">
                Magsmen Brand Consultants
              </strong>
            </div>
          </div>

          <div className="animate-slide-up">
            <Card className="shadow-elegant border-2 border-primary/10 mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Get Your Free Brand Assessment
                </CardTitle>
                <CardDescription className="text-lg">
                  Understand your brand's current state and discover opportunities for growth
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Comprehensive Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      6-category assessment covering all aspects of your brand
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Get specific advice based on your unique brand score
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Expert Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Direct access to brand consultants for next steps
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleStartAudit}
                  className="gradient-primary text-white text-lg px-8 py-6 h-auto transition-bounce hover:shadow-glow"
                  size="lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Free Brand Audit
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Takes only 5 minutes • No credit card required
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Analyze</h2>
          <p className="text-xl text-muted-foreground">
            Our comprehensive audit covers every aspect of your brand
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Star className="h-8 w-8" />,
              title: "Design Quality",
              description: "Logo, visual identity, website design, and overall aesthetic appeal"
            },
            {
              icon: <CheckCircle className="h-8 w-8" />,
              title: "Communication",
              description: "Brand messaging, voice consistency, and value proposition clarity"
            },
            {
              icon: <Target className="h-8 w-8" />,
              title: "Strategic Alignment",
              description: "Brand positioning, target audience fit, and competitive differentiation"
            },
            {
              icon: <TrendingUp className="h-8 w-8" />,
              title: "Marketing Investment",
              description: "Budget allocation, channel effectiveness, and ROI optimization"
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Platform Presence",
              description: "Digital footprint, social media, and multi-channel consistency"
            },
            {
              icon: <Award className="h-8 w-8" />,
              title: "Growth Potential",
              description: "Scalability assessment and future opportunity identification"
            }
          ].map((feature, index) => (
            <Card key={index} className="shadow-card transition-smooth hover:shadow-glow">
              <CardHeader>
                <div className="text-primary mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-elegant gradient-secondary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Ready to Transform Your Brand?
              </CardTitle>
              <CardDescription className="text-lg">
                Join hundreds of businesses who've discovered their brand's true potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleStartAudit}
                className="gradient-primary text-white text-lg px-8 py-6 h-auto transition-bounce hover:shadow-glow"
                size="lg"
              >
                Begin Your Brand Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  if (currentView === 'audit') {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <AuditWizard 
            onComplete={handleAuditComplete}
            onAnalyzeWebsite={analyzeWebsite}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'results' && auditData) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <ResultsPage 
            auditData={auditData}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  return renderLandingPage();
};

export default Index;