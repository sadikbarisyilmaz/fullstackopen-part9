interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export type ExerciseHours = number[];
export type Target = number;

export const calculateExercises = (
  exerciseHours: ExerciseHours,
  target: Target
): Result => {
  if (isNaN(target) || exerciseHours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }
  let trainingDays: number = 0;
  exerciseHours.forEach((x) => (x > 0 ? trainingDays++ : null));

  let periodLength: number = exerciseHours.length;
  let average: number = exerciseHours.reduce((a, b) => a + b) / periodLength;

  let rating: number = average >= target ? 3 : average >= target / 2 ? 2 : 1;

  let ratingDescription: string = "";
  switch (rating) {
    case 3:
      ratingDescription = "target reached !";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    case 1:
      ratingDescription = "too bad, die.";
      break;
    default:
      break;
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };
};
