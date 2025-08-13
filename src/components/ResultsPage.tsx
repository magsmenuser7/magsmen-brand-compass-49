import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, TrendingUp, Star, Target, Zap, Phone, MessageCircle } from 'lucide-react';
import { ContactSection } from './ContactSection';

interface ResultsPageProps {
  auditData: {
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
  };
  onStartOver: () => void;
}

export const ResultsPage = ({ auditData, onStartOver }: ResultsPageProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-8 w-8 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
    return <AlertTriangle className="h-8 w-8 text-red-600" />;
  };

  const getRecommendation = () => {
    const score = auditData.score;
    
    if (score >= 80) {
      return {
        title: "Excellent Brand Foundation!",
        description: "Your brand is performing well. Let's discuss scaling strategies to maximize your potential.",
        action: "growth",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: <TrendingUp className="h-6 w-6" />
      };
    } else if (score >= 60) {
      return {
        title: "Good Foundation with Growth Potential",
        description: "Your brand has solid elements but there's room for improvement. Let's discuss how to elevate your brand.",
        action: "consultation",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        icon: <Target className="h-6 w-6" />
      };
    } else {
      return {
        title: "Brand Enhancement Needed",
        description: "Your brand needs strategic attention. A comprehensive brand consultation would be highly beneficial.",
        action: "urgent",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: <Zap className="h-6 w-6" />
      };
    }
  };

  const recommendation = getRecommendation();

  const categoryScores = [
    { name: 'Design Quality', score: auditData.designQuality * 10, icon: <Star className="h-5 w-5" /> },
    { name: 'Communication', score: auditData.communicationClarity * 10, icon: <MessageCircle className="h-5 w-5" /> },
    { name: 'Strategy Alignment', score: auditData.strategyAlignment * 10, icon: <Target className="h-5 w-5" /> },
    { name: 'Marketing Budget', score: auditData.marketingBudget ? 100 : 0, icon: <TrendingUp className="h-5 w-5" /> },
    { name: 'Platform Usage', score: auditData.platformsUsed.length > 0 ? 100 : 0, icon: <Phone className="h-5 w-5" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Overall Score Card */}
      <Card className="shadow-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getScoreIcon(auditData.score)}
          </div>
          <CardTitle className="text-3xl font-bold">
            Your Brand Audit Score
          </CardTitle>
          <CardDescription>
            Based on your comprehensive brand assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(auditData.score)}`}>
              {auditData.score}%
            </div>
            <Progress value={auditData.score} className="mt-4 h-3" />
          </div>
          
          <div className={`p-6 rounded-lg ${recommendation.bgColor} border-l-4 ${recommendation.color} border-l-current`}>
            <div className="flex items-start space-x-3">
              <div className={recommendation.color}>
                {recommendation.icon}
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${recommendation.color}`}>
                  {recommendation.title}
                </h3>
                <p className="text-gray-700 mt-2">
                  {recommendation.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>
            See how each category contributes to your overall brand score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryScores.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-primary">
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24">
                    <Progress value={category.score} className="h-2" />
                  </div>
                  <span className="font-semibold min-w-[3rem] text-right">
                    {category.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Your Business Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Business Type</h4>
              <p className="text-gray-700">{auditData.businessType || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Website</h4>
              <p className="text-gray-700">
                {auditData.website || 'Not provided'}
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-2">Current Brand Description</h4>
              <p className="text-gray-700">{auditData.currentBrand || 'Not provided'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Marketing Budget</h4>
              <Badge variant="outline">
                ${auditData.marketingBudget || 'Not specified'}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Active Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {auditData.platformsUsed.length > 0 ? (
                  auditData.platformsUsed.map((platform, index) => (
                    <Badge key={index} variant="outline">
                      {platform}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">None specified</span>
                )}
              </div>
            </div>
            {auditData.additionalInfo && (
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2">Additional Information</h4>
                <p className="text-gray-700">{auditData.additionalInfo}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <ContactSection 
        auditScore={auditData.score}
        recommendation={recommendation}
        onStartOver={onStartOver}
      />
    </div>
  );
};