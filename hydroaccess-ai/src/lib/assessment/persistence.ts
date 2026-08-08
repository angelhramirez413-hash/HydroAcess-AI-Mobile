import { HydroAssessment } from "./types";
import { getInitialAssessment, cleanStaleSourceDetails } from "./branching";
import { Language } from "../../types";

const STORAGE_KEY = "hydroaccess-assessment-v1";

export function loadAssessmentFromStorage(locale: Language = "en"): HydroAssessment {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialAssessment(locale);
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return getInitialAssessment(locale);
    return { ...parsed, locale };
  } catch {
    return getInitialAssessment(locale);
  }
}

export function saveAssessmentToStorage(assessment: HydroAssessment): void {
  try {
    const cleaned = cleanStaleSourceDetails(assessment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch {
    // ignore
  }
}

export function clearAssessmentStorage(locale: Language = "en"): HydroAssessment {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return getInitialAssessment(locale);
}
