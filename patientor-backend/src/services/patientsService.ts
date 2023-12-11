import data from "../../data/patients";
import { Gender } from "../../data/patients";

interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

// type NewBaseEntry = Omit<BaseEntry, "id">;

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown
//   ? Omit<T, K>
//   : never;
// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

type PatientWithoutSsn = Omit<Patient, "ssn" | "entries">;

const removeSnn = (): PatientWithoutSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

export const safePatients = removeSnn();

export const findById = (id: string): PatientWithoutSsn | undefined => {
  const patient = safePatients.find((p) => p.id === id);

  return patient;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
const parseGender = (gender: string): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`'${gender}' is not a gender!`);
  }
  return gender;
};

export const creteNewPatient = (req: Omit<Patient, "id">): Patient => {
  if (
    req.name === "" ||
    req.dateOfBirth === "" ||
    !parseGender(req.gender) ||
    req.occupation === ""
  ) {
    console.log(req);
    console.log(parseGender(req.gender));

    throw new Error("No missing fields!");
  } else {
    const newPatient = {
      id: Math.floor(Math.random() * 10000).toString(),
      ...req,
    };

    return newPatient;
  }
};

export const creteNewEntry = (req: Omit<Entry, "id">): Omit<Entry, "id"> => {
  if (
    req.description === "" ||
    req.date === "" ||
    req.diagnosisCodes?.length === 0 ||
    req.specialist === ""
  ) {
    throw new Error("No missing fields!");
  } else {
    const newEntry = {
      id: Math.floor(Math.random() * 10000).toString(),
      ...req,
    };

    return newEntry;
  }
};
