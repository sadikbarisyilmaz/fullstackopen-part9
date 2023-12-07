import data from "../../data/patients";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

type PatientWithoutSsn = Omit<Patient, "ssn">;

const removeSnn = (): PatientWithoutSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const safePatients = removeSnn();

export const findById = (id: string): PatientWithoutSsn | undefined => {
  const patient = safePatients.find((p) => p.id === id);

  return patient;
};

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

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
