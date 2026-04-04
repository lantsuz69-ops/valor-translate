import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generateResumePDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error("Target element for PDF not found");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 3, // איכות גבוהה מאוד
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    
    // פקודת השמירה שמורידה את הקובץ ישירות
    pdf.save(`${fileName.replace(/\s+/g, "_")}_CV.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
}