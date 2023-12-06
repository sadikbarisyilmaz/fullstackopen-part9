import data from "../../data/diagnoses";

interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// const optionalLatinDiagnoses = (): Diagnose[] => {
//   return data.map(({ code, name, latin }) => ({
//     code,
//     name,
//     latin,
//   }));
// };

export const typedDiagnoses = data as Diagnose[];
