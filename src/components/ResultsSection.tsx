import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Briefcase, Star, ListChecks } from "lucide-react";
import ResumePreviewModal from "@/components/ResumePreviewModal";
import type { TranslationResult } from "@/pages/Index";

interface ResultsSectionProps {
  result: TranslationResult;
  formData: { fullName: string; role: string; responsibilities: string };
}

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">תפקיד מקצועי</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{result.title}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">תקציר מקצועי</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">{result.summary}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ListChecks className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">כישורים מקצועיים</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">ניסיון תעסוקתי</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.experience.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button
          onClick={() => setPreviewOpen(true)}
          size="lg"
          className="w-full gap-2"
        >
          <Eye className="h-5 w-5" />
          צפה בקורות חיים (PDF)
        </Button>

        <ResumePreviewModal
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          result={result}
          fullName={formData.fullName}
        />
      </div>
    </section>
  );
};

export default ResultsSection;
