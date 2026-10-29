import { z } from "zod";

export const PROJECT_TYPES = [
  "nowa-strona",
  "modernizacja-strony",
  "optymalizacja-wydajnosci",
  "inne",
] as const;

export const PROJECT_TYPE_LABELS: Record<(typeof PROJECT_TYPES)[number], string> = {
  "nowa-strona": "Nowa strona internetowa",
  "modernizacja-strony": "Przebudowa istniejącej strony",
  "optymalizacja-wydajnosci": "Optymalizacja szybkości / SEO",
  inne: "Inny temat / doradztwo",
};

export const BUDGET_RANGES = [
  "ponizej-5k",
  "5k-10k",
  "10k-20k",
  "powyzej-20k",
  "do-ustalenia",
] as const;

export const BUDGET_RANGE_LABELS: Record<(typeof BUDGET_RANGES)[number], string> = {
  "ponizej-5k": "Poniżej 5 000 zł",
  "5k-10k": "5 000 – 10 000 zł",
  "10k-20k": "10 000 – 20 000 zł",
  "powyzej-20k": "Powyżej 20 000 zł",
  "do-ustalenia": "Do ustalenia podczas rozmowy",
};

export const contactFormSchema = z.object({
  name: z
    .string({ message: "Imię jest wymagane" })
    .trim()
    .min(2, "Imię musi zawierać minimum 2 znaki")
    .max(100, "Imię może zawierać maksymalnie 100 znaków"),
  email: z
    .string({ message: "Adres e-mail jest wymagany" })
    .trim()
    .email("Wprowadź poprawny adres e-mail")
    .max(254, "Adres e-mail jest zbyt długi"),
  phone: z
    .string()
    .trim()
    .max(30, "Numer telefonu jest zbyt długi")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES, {
    message: "Wybierz rodzaj projektu z listy",
  }),
  budget: z
    .enum(BUDGET_RANGES, {
      message: "Wybierz orientacyjny budżet z listy",
    })
    .optional()
    .or(z.literal("")),
  message: z
    .string({ message: "Treść wiadomości jest wymagana" })
    .trim()
    .min(10, "Wiadomość musi zawierać minimum 10 znaków")
    .max(3000, "Wiadomość może zawierać maksymalnie 3000 znaków"),
  consent: z
    .boolean({
      message: "Zgoda na kontakt jest wymagana",
    })
    .refine((val) => val === true, {
      message: "Zgoda na kontakt jest wymagana do wysłania wiadomości",
    }),
  // Pole antyspamowe (honeypot) - musi pozostać puste
  honeypot: z
    .string()
    .max(0, "Wykryto próbę spamu (pole honeypot)")
    .optional()
    .or(z.literal("")),
  // Podpisany token znacznika czasu
  timeToken: z
    .string({
      message: "Brak wymaganego tokenu zabezpieczającego",
    })
    .min(1, "Brak tokenu zabezpieczającego"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
