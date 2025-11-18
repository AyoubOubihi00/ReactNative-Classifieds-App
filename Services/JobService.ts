import jobsData from "../helpers/jobs.json";

export interface Job {
  id: string;
  poste: string;
  entreprise: string;
  ville: string;
  codePostal?: string | null;
  rue?: string | null;
  numeroRue?: string | null;
  description?: string | null;
  date?: string | null;
  telephone?: string | null;
  email?: string | null;
  entreprisePhoto?: string | null;
  salaireAnnuel?: number | null;
}

type RawJob = {
  id: string;
  poste: string;
  entreprise: string;
  ville: string;
  codePostal: string | null;
  rue: string | null;
  numeroRue: string | null;
  description: string | null;
  date: string | null;
  telephone: string | null;
  email: string | null;
  entreprisePhoto: string | null;
  salaireAnnuel: number | null;
};

const normalizedJobs: Job[] = (jobsData as RawJob[]).map((job) => ({
  ...job,
  codePostal: job.codePostal ?? undefined,
  rue: job.rue ?? undefined,
  numeroRue: job.numeroRue ?? undefined,
  description: job.description ?? undefined,
  date: job.date ?? undefined,
  telephone: job.telephone ?? undefined,
  email: job.email ?? undefined,
  entreprisePhoto: job.entreprisePhoto ?? undefined,
  salaireAnnuel:
    typeof job.salaireAnnuel === "number" ? job.salaireAnnuel : undefined,
}));

export const getJobs = (): Job[] => normalizedJobs;

export const getJobById = (id: string): Job | undefined =>
  normalizedJobs.find((job) => job.id === id);

export const searchJobs = (query: string): Job[] => {
  const term = query.trim().toLowerCase();
  if (!term) {
    return normalizedJobs;
  }

  return normalizedJobs.filter((job) => {
    const haystack = [
      job.poste,
      job.entreprise,
      job.ville,
      job.email,
      job.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(term);
  });
};
