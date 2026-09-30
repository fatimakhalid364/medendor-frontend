import {
  UserRound,
  Stethoscope,
  GraduationCap,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export const doctorOnboardingSteps = [
  {
    id: "basic",
    title: "Basic Profile",
    description: "Add your personal and professional basic information.",
    icon: UserRound
  },
  {
    id: "professional",
    title: "Professional Details",
    description: "Add your specialization and professional information.",
    icon: Stethoscope
  },
  {
    id: "credentials",
    title: "Credentials",
    description: "Add your medical qualifications and certifications.",
    icon: GraduationCap
  },
  {
    id: "availability",
    title: "Availability",
    description: "Set your workplace and consultation availability.",
    icon: CalendarDays
  },
  {
    id: "final",
    title: "Final Touches",
    description: "Review your profile and complete your setup.",
    icon: Sparkles
  },
];