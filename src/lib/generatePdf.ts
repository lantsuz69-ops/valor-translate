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
    
    // יצירת blob והורדה ישירה בלי להפעיל הדפסה
    const pdfBlob = pdf.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName.replace(/\s+/g, "_")}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
}