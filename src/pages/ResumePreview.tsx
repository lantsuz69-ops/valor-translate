import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileDown } from "lucide-react";
import { generateResumePDF } from "@/lib/generatePdf";
import { detectUnitColor } from "@/lib/unitColors";
import type { TranslationResult } from "@/pages/Index";

interface PreviewState {
  result: TranslationResult;
  formData: { fullName: string; role: string; responsibilities: string };
}

const topoPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cpath d='M50 50c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 120c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 190c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 260c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 330c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 400c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 470c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3Cpath d='M50 540c30-20 70 10 100-5s60-40 100-20 50 50 100 30 70-30 100-10 60 40 100 20' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.05'/%3E%3C/svg%3E")`;

const ResumePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PreviewState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { result, formData } = state;
  const primaryColor = detectUnitColor(formData.role, formData.responsibilities);

  const handleDownload = async () => {
    await generateResumePDF(result, formData.fullName, primaryColor);
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center py-10 px-4"
      style={{ background: "#121212" }}
    >
      {/* A4 Resume */}
      <div
        id="resume-preview-page"
        className="bg-white shadow-2xl w-full max-w-[794px] rounded-sm relative overflow-hidden"
        style={{
          fontFamily: "'Heebo', sans-serif",
          direction: "rtl",
          color: "#1e293b",
          backgroundImage: topoPattern,
          backgroundSize: "600px 600px",
        }}
      >
        {/* Header */}
        <div style={{ background: primaryColor, padding: "28px 36px" }}>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: 800, margin: "0 0 6px 0" }}>
            {formData.fullName}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", margin: 0 }}>
            {result.title}
          </p>
        </div>

        <div style={{ padding: "28px 36px" }}>
          {/* Summary */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ color: primaryColor, fontSize: "17px", fontWeight: 700, borderBottom: `2px solid ${primaryColor}`, paddingBottom: "6px", margin: "0 0 10px 0" }}>
              תקציר מקצועי
            </h2>
            <p style={{ fontSize: "13px", lineHeight: 1.7, margin: 0, color: "#334155" }}>
              {result.summary}
            </p>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ color: primaryColor, fontSize: "17px", fontWeight: 700, borderBottom: `2px solid ${primaryColor}`, paddingBottom: "6px", margin: "0 0 10px 0" }}>
              כישורים מקצועיים
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {result.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    background: `${primaryColor}15`,
                    color: primaryColor,
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ color: primaryColor, fontSize: "17px", fontWeight: 700, borderBottom: `2px solid ${primaryColor}`, paddingBottom: "6px", margin: "0 0 10px 0" }}>
              ניסיון מקצועי
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {result.experience.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                    marginBottom: "6px",
                    paddingRight: "16px",
                    position: "relative",
                    color: "#334155",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "8px",
                      width: "6px",
                      height: "6px",
                      background: primaryColor,
                      borderRadius: "50%",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p style={{ textAlign: "center", fontSize: "10px", color: "#94a3b8", marginTop: "32px" }}>
            Generated by Skill-Bridge
          </p>
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50" dir="rtl">
        <Button
          onClick={() => navigate("/", { state: { returnData: { result, formData } } })}
          variant="outline"
          size="lg"
          className="gap-2 bg-white/90 hover:bg-white shadow-lg"
        >
          <ArrowRight className="h-5 w-5" />
          חזור לעריכה
        </Button>
        <Button onClick={handleDownload} size="lg" className="gap-2 shadow-lg">
          <FileDown className="h-5 w-5" />
          הורד PDF
        </Button>
      </div>
    </div>
  );
};

export default ResumePreview;
