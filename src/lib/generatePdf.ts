import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { TranslationResult } from "@/pages/Index";

export async function generateResumePDF(result: TranslationResult, fullName: string, primaryColor: string = "#2563eb") {
  // 1. הגנה על הנתונים - מוודא שיש מערכים תקינים לפני הרינדור
  const safeSkills = result.skills || [];
  const safeExperience = result.experience || [];

  const container = document.createElement("div");
  container.id = "resume-pdf-render";
  
  // שיפור הסטיילינג כדי שיתאים לסטנדרט של Lovable
  container.style.cssText = `
    position: absolute; 
    left: -9999px; 
    top: 0;
    width: 210mm; 
    min-height: 297mm;
    padding: 20mm;
    background: white;
    font-family: sans-serif;
    direction: rtl;
    color: #1e293b;
    box-sizing: border-box;
  `;

  // בניית ה-HTML עם הגנות (Optional Chaining)
  container.innerHTML = `
    <div style="background: ${primaryColor}; padding: 30px; border-radius: 12px; margin-bottom: 30px; color: white;">
      <h1 style="font-size: 32px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.02em;">${fullName}</h1>
      <p style="font-size: 18px; opacity: 0.9; margin: 0;">${result.title || ""}</p>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: 700; border-bottom: 2px solid ${primaryColor}20; padding-bottom: 8px; margin-bottom: 12px;">תקציר מקצועי</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">${result.summary || ""}</p>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: 700; border-bottom: 2px solid ${primaryColor}20; padding-bottom: 8px; margin-bottom: 15px;">כישורים מקצועיים</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        ${safeSkills.map(s => `
          <span style="background: ${primaryColor}10; color: ${primaryColor}; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; border: 1px solid ${primaryColor}20;">
            ${s}
          </span>
        `).join("")}
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: 700; border-bottom: 2px solid ${primaryColor}20; padding-bottom: 8px; margin-bottom: 15px;">ניסיון מקצועי</h2>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${safeExperience.map(item => `
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="min-width: 8px; height: 8px; background: ${primaryColor}; border-radius: 50%; margin-top: 6px;"></div>
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">${item}</p>
          </div>
        `).join("")}
      </div>
    </div>

    <div style="position: absolute; bottom: 20mm; left: 0; right: 0; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
      <p style="font-size: 11px; color: #94a3b8; margin: 0;">הופק באמצעות Skill-Bridge</p>
    </div>
  `;

  document.body.appendChild(container);

  try {
    // השהייה קלה כדי לוודא שהדפדפן רינדר את הטקסט והעברית
    await new Promise(resolve => setTimeout(resolve, 250));

    const canvas = await html2canvas(container, {
      scale: 3, // איכות גבוהה יותר להדפסה
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: container.offsetWidth,
      windowHeight: container.offsetHeight
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // הוספת התמונה תוך שמירה על פרופורציות A4
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    
    // שמירה ישירה (Download)
    pdf.save(`${fullName.replace(/\s+/g, "_")}_CV.pdf`);
    
  } catch (error) {
    console.error("PDF Generation failed:", error);
  } finally {
    document.body.removeChild(container);
  }
}