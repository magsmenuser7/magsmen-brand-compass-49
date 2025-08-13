import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, RotateCcw } from 'lucide-react';

interface ContactSectionProps {
  auditScore: number;
  recommendation: {
    title: string;
    description: string;
    action: string;
    color: string;
    bgColor: string;
    icon: React.ReactNode;
  };
  onStartOver: () => void;
}

export const ContactSection = ({ auditScore, recommendation, onStartOver }: ContactSectionProps) => {
  const getContactMessage = () => {
    if (auditScore >= 80) {
      return {
        title: "Ready to Scale Your Success?",
        message: "Your brand is performing excellently! Let's discuss advanced strategies to maximize your growth potential and market dominance.",
        urgency: "Schedule a Growth Strategy Session"
      };
    } else if (auditScore >= 60) {
      return {
        title: "Let's Elevate Your Brand",
        message: "Your brand has solid foundations with great potential. We can help you identify and implement the improvements that will drive significant growth.",
        urgency: "Book a Brand Enhancement Consultation"
      };
    } else {
      return {
        title: "Transform Your Brand Today",
        message: "Your brand needs strategic attention to reach its full potential. Our comprehensive brand consultation will provide the roadmap for transformation.",
        urgency: "Schedule an Urgent Brand Consultation"
      };
    }
  };

  const contactInfo = getContactMessage();

  const handleContactMethod = (method: string) => {
    const message = encodeURIComponent(`Hi Magsmen! I just completed my brand audit and scored ${auditScore}%. I'm interested in discussing how you can help improve my brand. My business type: [User will add their business type]`);
    
    switch (method) {
      case 'phone':
        window.open('tel:+1234567890', '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:hello@magsmen.com?subject=Brand Audit Follow-up - ${auditScore}% Score&body=${message}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <Card className="shadow-card border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          {contactInfo.title}
        </CardTitle>
        <CardDescription className="text-lg">
          {contactInfo.message}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">
              {contactInfo.urgency}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Button 
            onClick={() => handleContactMethod('phone')}
            className="gradient-primary text-white h-12 transition-bounce hover:shadow-glow"
            size="lg"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Now
          </Button>
          
          <Button 
            onClick={() => handleContactMethod('whatsapp')}
            className="gradient-accent text-white h-12 transition-bounce hover:shadow-glow"
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp
          </Button>
          
          <Button 
            onClick={() => handleContactMethod('email')}
            className="gradient-secondary text-primary h-12 transition-bounce hover:shadow-glow"
            size="lg"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email Us
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">About Magsmen Brand Consultants</h4>
            <p className="text-sm text-gray-600">
              We specialize in transforming businesses through strategic brand development, 
              design excellence, and growth-focused marketing strategies. Our data-driven approach 
              ensures measurable results for your brand investment.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Visit us at <a href="https://www.magsmen.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.magsmen.com</a>
            </p>
          </div>
          
          <Button 
            onClick={onStartOver}
            variant="outline"
            className="transition-smooth hover:shadow-card"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Another Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};