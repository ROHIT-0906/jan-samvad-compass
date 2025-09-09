import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, TrendingUp, Users } from "lucide-react";

export function SummaryInsights() {
  const insights = [
    {
      icon: CheckCircle,
      title: "Overall Sentiment",
      description: "67% of public comments express positive sentiment towards proposed corporate governance reforms",
      sentiment: "positive",
      metric: "67%"
    },
    {
      icon: TrendingUp,
      title: "Key Finding",
      description: "Strong support for transparency measures and accountability frameworks in corporate reporting",
      sentiment: "neutral",
      metric: "High"
    },
    {
      icon: Users,
      title: "Stakeholder Engagement", 
      description: "Active participation from diverse stakeholders including investors, regulatory bodies, and civil society",
      sentiment: "positive",
      metric: "2,847"
    },
    {
      icon: AlertTriangle,
      title: "Areas of Concern",
      description: "Implementation timeline and compliance costs remain primary concerns among respondents",
      sentiment: "negative",
      metric: "23%"
    }
  ];

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => {
        const IconComponent = insight.icon;
        return (
          <Card key={index} className="border-l-4 border-l-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        insight.sentiment === 'positive' ? 'bg-sentiment-positive/10 text-sentiment-positive border-sentiment-positive/20' :
                        insight.sentiment === 'negative' ? 'bg-sentiment-negative/10 text-sentiment-negative border-sentiment-negative/20' :
                        'bg-sentiment-neutral/10 text-sentiment-neutral border-sentiment-neutral/20'
                      }`}
                    >
                      {insight.metric}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
        <h4 className="font-medium text-sm mb-2 text-foreground">Recommendations</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Focus implementation support on compliance cost mitigation strategies</li>
          <li>• Enhance stakeholder communication regarding timeline expectations</li>
          <li>• Leverage strong transparency support to build momentum for reforms</li>
        </ul>
      </div>
    </div>
  );
}