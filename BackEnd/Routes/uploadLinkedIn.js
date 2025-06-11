import express from 'express';
import multer from 'multer';
import AdmZip from 'adm-zip';
import fs from 'fs';
import { parse } from 'csv-parse/sync'; // <-- Add this

const router1 = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router1.post('/uploadLinkedIn', upload.single('file'), (req, res) => {
  try {
    const zip = new AdmZip(req.file.path);
    console.log("ZIP entries:", zip.getEntries().map(e => e.entryName));
    // Helper to get and parse CSV as JSON
    const getCSV = (filename) => {
      const entry = zip.getEntries().find(e => e.entryName.endsWith(filename));
      if (!entry) return null;
      const text = zip.readAsText(entry);
      return parse(text, { columns: true, skip_empty_lines: true });
    };

    const profile = getCSV("Profile.csv");
    

    fs.unlinkSync(req.file.path); // cleanup

    res.json({
      success: true,
      data: {
        profile,
    
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error parsing ZIP", error: err.message });
  }
});

export default router1;