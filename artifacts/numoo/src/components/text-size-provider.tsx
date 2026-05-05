import { useEffect } from "react";
import { useAssessmentStore } from "@/lib/store";

export function TextSizeProvider() {
  const textSize = useAssessmentStore((s) => s.textSize);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-large", "text-xlarge");
    if (textSize === "large") root.classList.add("text-large");
    else if (textSize === "xlarge") root.classList.add("text-xlarge");
  }, [textSize]);

  return null;
}
