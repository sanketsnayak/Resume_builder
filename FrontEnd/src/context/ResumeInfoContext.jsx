import { createContext } from "react";
import Dummy from "@/data/Dummy";
export const ResumeInfoContext=createContext(
    {resumeInfo: Dummy,
  setResumeInfo: () => {},}
)