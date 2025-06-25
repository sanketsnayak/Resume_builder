import express from "express";
import multer from "multer";
import pdfExtract from "pdf-extraction";

const router3 = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router3.post("/AtsScoreCheck", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const data = await pdfExtract(req.file.buffer);

    const fullText = data.text;

    res.json({
      success: true,
      message: "PDF parsed successfully",
      text: fullText.trim()
    });
  } catch (error) {
    console.error("PDF Parse Error:", error);
    res.status(500).json({ success: false, message: "PDF parsing failed", error: error.message });
  }
});

export default router3;
