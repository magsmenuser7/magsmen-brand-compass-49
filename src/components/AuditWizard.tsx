import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Globe, Palette, MessageCircle, Target, DollarSign, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';
import emailjs from "@emailjs/browser";


interface AuditData {
  name: string;
  email: string;
  contact: string;
  website: string;
  businessType: string;
  currentBrand: string;
  designQuality: number;
  communicationClarity: number;
  strategyAlignment: number;
  marketingBudget: string;
  platformsUsed: string[];
  additionalInfo: string;
}

interface AuditWizardProps {
  onComplete: (data: AuditData & { score: number }) => void;
  onAnalyzeWebsite: (url: string) => Promise<any>;
}

const steps = [
  { id: 'basic', title: 'Basic Information', icon: Globe },
  { id: 'design', title: 'Design Audit', icon: Palette },
  { id: 'communication', title: 'Communication', icon: MessageCircle },
  { id: 'strategy', title: 'Strategy', icon: Target },
  { id: 'marketing', title: 'Marketing & Budget', icon: DollarSign },
  { id: 'platforms', title: 'Platforms Used', icon: Smartphone },
];

export const AuditWizard = ({ onComplete, onAnalyzeWebsite }: AuditWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [auditData, setAuditData] = useState<AuditData>({
    name: '',
    email: '',
    contact: '',
    website: '',
    businessType: '',
    currentBrand: '',
    designQuality: 5,
    communicationClarity: 5,
    strategyAlignment: 5,
    marketingBudget: '',
    platformsUsed: [],
    additionalInfo: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateAuditData = (field: keyof AuditData, value: any) => {
    setAuditData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) { // Basic Information step
      if (!auditData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!auditData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auditData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!auditData.contact.trim()) {
        newErrors.contact = 'Contact number is required';
      } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(auditData.contact.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.contact = 'Please enter a valid contact number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleWebsiteAnalysis = async () => {
    if (!auditData.website) return;
    
    setIsAnalyzing(true);
    try {
      const analysis = await onAnalyzeWebsite(auditData.website);
      // Auto-fill some fields based on analysis
      if (analysis) {
        updateAuditData('businessType', analysis.businessType || '');
        updateAuditData('currentBrand', analysis.brandDescription || '');
      }
    } catch (error) {
      console.error('Website analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // const calculateScore = () => {
  //   const designScore = auditData.designQuality * 20;
  //   const communicationScore = auditData.communicationClarity * 20;
  //   const strategyScore = auditData.strategyAlignment * 20;
  //   const budgetScore = auditData.marketingBudget ? 20 : 0;
  //   const platformScore = auditData.platformsUsed.length > 0 ? 20 : 0;
    
  //   const totalScore = (designScore + communicationScore + strategyScore + budgetScore + platformScore) / 5;
    
  //   onComplete({ ...auditData, score: Math.round(totalScore) });
  // };




  // inside your calculateScore function:
const calculateScore = () => {
  debugger;
  const designScore = auditData.designQuality * 20;
  const communicationScore = auditData.communicationClarity * 20;
  const strategyScore = auditData.strategyAlignment * 20;
  const budgetScore = auditData.marketingBudget ? 20 : 0;
  const platformScore = auditData.platformsUsed.length > 0 ? 20 : 0;

  const totalScore = (designScore + communicationScore + strategyScore + budgetScore + platformScore) / 5;
  const finalData = { ...auditData, score: Math.round(totalScore) };

  // ---- EMAILJS Integration ----
    emailjs.send(
      "service_inugbpo",
      "template_38ycg6y",
     {
        name: finalData.name,
        email: finalData.email,
        contact: finalData.contact,
        website: finalData.website,
        businessType: finalData.businessType,
        currentBrand: finalData.currentBrand,
        designQuality: finalData.designQuality,
        communicationClarity: finalData.communicationClarity,
        strategyAlignment: finalData.strategyAlignment,
        marketingBudget: finalData.marketingBudget,
        platformsUsed: finalData.platformsUsed.join(", "),
        additionalInfo: finalData.additionalInfo,
        score: finalData.score,
      },
      "ayB1ovewIh1u5ekdN"
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Assessment submitted successfully via email!");
      },
      (err) => {
        console.error("FAILED...", err);
        alert("Failed to send email. Please try again.");
      }
    );

  // Call parent onComplete if needed
  onComplete(finalData);
};


  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    const step = steps[currentStep];
    const StepIcon = step.icon;

    switch (step.id) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Globe className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">Let's start with the basics</h3>
              <p className="text-muted-foreground">Tell us about your business and online presence</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={auditData.name}
                  onChange={(e) => updateAuditData('name', e.target.value)}
                  required
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={auditData.email}
                  onChange={(e) => updateAuditData('email', e.target.value)}
                  required
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={auditData.contact}
                  onChange={(e) => updateAuditData('contact', e.target.value)}
                  required
                  className={errors.contact ? 'border-red-500' : ''}
                />
                {errors.contact && <p className="text-sm text-red-500 mt-1">{errors.contact}</p>}
              </div>

              <div>
                <Label htmlFor="website">Website URL (optional)</Label>
                <Input
                  id="website"
                  placeholder="https://yourwebsite.com"
                  value={auditData.website}
                  onChange={(e) => updateAuditData('website', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="businessType">What type of business are you?</Label>
                <Input
                  id="businessType"
                  placeholder="e.g., E-commerce, SaaS, Consulting, Restaurant"
                  value={auditData.businessType}
                  onChange={(e) => updateAuditData('businessType', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="currentBrand">Describe your current brand in one sentence</Label>
                <Textarea
                  id="currentBrand"
                  placeholder="What does your brand represent? What makes you unique?"
                  value={auditData.currentBrand}
                  onChange={(e) => updateAuditData('currentBrand', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Palette className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">Design Quality Assessment</h3>
              <p className="text-muted-foreground">How would you rate your current design assets?</p>
            </div>
            
            <div>
              <Label>Overall Design Quality (1-10)</Label>
              <div className="mt-4">
                <RadioGroup
                  value={auditData.designQuality.toString()}
                  onValueChange={(value) => updateAuditData('designQuality', parseInt(value))}
                  className="flex flex-wrap gap-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <RadioGroupItem value={num.toString()} id={`design-${num}`} />
                      <Label htmlFor={`design-${num}`}>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Consider logo, website design, marketing materials, color scheme, typography
              </p>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MessageCircle className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">Communication Clarity</h3>
              <p className="text-muted-foreground">How clear is your brand messaging?</p>
            </div>
            
            <div>
              <Label>Communication Effectiveness (1-10)</Label>
              <div className="mt-4">
                <RadioGroup
                  value={auditData.communicationClarity.toString()}
                  onValueChange={(value) => updateAuditData('communicationClarity', parseInt(value))}
                  className="flex flex-wrap gap-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <RadioGroupItem value={num.toString()} id={`comm-${num}`} />
                      <Label htmlFor={`comm-${num}`}>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Consider brand voice, messaging consistency, value proposition clarity
              </p>
            </div>
          </div>
        );

      case 'strategy':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">Strategic Alignment</h3>
              <p className="text-muted-foreground">How well does your brand align with your business goals?</p>
            </div>
            
            <div>
              <Label>Strategy Alignment (1-10)</Label>
              <div className="mt-4">
                <RadioGroup
                  value={auditData.strategyAlignment.toString()}
                  onValueChange={(value) => updateAuditData('strategyAlignment', parseInt(value))}
                  className="flex flex-wrap gap-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <RadioGroupItem value={num.toString()} id={`strategy-${num}`} />
                      <Label htmlFor={`strategy-${num}`}>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Consider target audience alignment, brand positioning, competitive differentiation
              </p>
            </div>
          </div>
        );

      case 'marketing':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">Marketing & Budget</h3>
              <p className="text-muted-foreground">Tell us about your marketing investment</p>
            </div>
            
            <div>
              <Label>Monthly Marketing Budget Range</Label>
              <RadioGroup
                value={auditData.marketingBudget}
                onValueChange={(value) => updateAuditData('marketingBudget', value)}
                className="mt-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-1000" id="budget-1" />
                  <Label htmlFor="budget-1">$0 - $1,00,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1000-5000" id="budget-2" />
                  <Label htmlFor="budget-2">$1,00,000 - $5,00,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5000-10000" id="budget-3" />
                  <Label htmlFor="budget-3">less than $10,00,000</Label>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10000+" id="budget-4" />
                  <Label htmlFor="budget-4">$10,000+</Label>
                </div> */}
              </RadioGroup>
            </div>
          </div>
        );

      case 'platforms':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Smartphone className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">Platforms & Channels</h3>
              <p className="text-muted-foreground">Where do you currently engage with customers?</p>
            </div>
            
            <div>
              <Label>Select all platforms you actively use</Label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  'Website', 'Instagram', 'Facebook', 'LinkedIn', 'Twitter/X',
                  'TikTok', 'YouTube', 'Email Marketing', 'Google Ads', 'SEO',
                  'Print Media', 'Radio/TV', 'Events', 'Other'
                ].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={platform}
                      checked={auditData.platformsUsed.includes(platform)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateAuditData('platformsUsed', [...auditData.platformsUsed, platform]);
                        } else {
                          updateAuditData('platformsUsed', auditData.platformsUsed.filter(p => p !== platform));
                        }
                      }}
                    />
                    <Label htmlFor={platform}>{platform}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Any additional information? (Optional)</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Specific challenges, goals, or context we should know about..."
                value={auditData.additionalInfo}
                onChange={(e) => updateAuditData('additionalInfo', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Brand Audit Assessment</CardTitle>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <CardDescription>
          Complete this comprehensive assessment to understand your brand's current state
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      
      <CardContent>
        <div className="animate-fade-in">
          {renderStep()}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            className="gradient-primary text-white"
          >
            {currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};