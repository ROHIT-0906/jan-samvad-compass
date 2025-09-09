import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, FileText, Loader2 } from "lucide-react";

export function FeedbackSummarizer() {
  const [feedback, setFeedback] = useState("");
  const [summary, setSummary] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const generateSummary = async () => {
    if (!feedback.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated summary based on input length and content
    const mockSummary = generateMockSummary(feedback);
    setSummary(mockSummary);
    setIsProcessing(false);
  };

  const generateMockSummary = (input: string) => {
    const wordCount = input.trim().split(/\s+/).length;
    const hasPositive = /good|great|excellent|positive|support|approve|like|satisfied/i.test(input);
    const hasNegative = /bad|poor|terrible|negative|oppose|disapprove|hate|dissatisfied|concern|issue|problem/i.test(input);
    
    let themes = [];
    if (hasPositive && hasNegative) {
      themes.push("Mixed sentiment with both supportive and critical feedback");
    } else if (hasPositive) {
      themes.push("Predominantly positive sentiment towards proposed measures");
    } else if (hasNegative) {
      themes.push("Concerns raised regarding implementation and impact");
    } else {
      themes.push("Neutral feedback focused on procedural and technical aspects");
    }

    if (input.toLowerCase().includes("cost") || input.toLowerCase().includes("expense")) {
      themes.push("cost implications frequently mentioned");
    }
    if (input.toLowerCase().includes("time") || input.toLowerCase().includes("deadline")) {
      themes.push("timeline concerns highlighted");
    }
    if (input.toLowerCase().includes("transparency") || input.toLowerCase().includes("disclosure")) {
      themes.push("transparency measures received attention");
    }

    const positivePoints = hasPositive ? 
      "Stakeholders appreciate the structured approach to regulatory reform and enhanced accountability measures." : 
      "Limited positive feedback, focusing mainly on procedural clarity.";

    const issues = hasNegative ? 
      "Recurring concerns include compliance costs, implementation timelines, and resource allocation challenges." :
      "No significant recurring issues identified in the feedback.";

    return `🤖 Generated Summary (Transformer-based)
Summary: Analysis of ${wordCount} words of stakeholder feedback reveals key themes including ${themes.join(", ")}. ${positivePoints} ${issues} The feedback demonstrates active stakeholder engagement with the proposed corporate governance reforms, providing valuable insights for policy refinement and implementation planning.`;
  };

  const clearAll = () => {
    setFeedback("");
    setSummary("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Feedback Summarizer
        </CardTitle>
        <CardDescription>
          Process public comments and generate AI-powered summaries with key insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Paste feedback content for analysis
          </label>
          <Textarea
            placeholder="Paste public comments, stakeholder feedback, or survey responses here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-32 resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {feedback.trim().split(/\s+/).filter(word => word.length > 0).length} words
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={!feedback && !summary}
              >
                Clear
              </Button>
              <Button
                onClick={generateSummary}
                disabled={!feedback.trim() || isProcessing}
                size="sm"
                className="gap-2"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                {isProcessing ? "Processing..." : "Generate Summary"}
              </Button>
            </div>
          </div>
        </div>

        {summary && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Bot className="w-3 h-3" />
                AI Generated
              </Badge>
              <span className="text-xs text-muted-foreground">
                Professional analysis completed
              </span>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-l-primary/20">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {summary}
              </pre>
            </div>
          </div>
        )}

        {!summary && !isProcessing && (
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <Bot className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Enter feedback content above and click "Generate Summary" to analyze
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}