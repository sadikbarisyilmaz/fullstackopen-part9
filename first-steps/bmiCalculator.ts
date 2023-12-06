const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  let BMI: number = weight / Math.pow(height / 100, 2);

  switch (true) {
    case BMI < 16.0:
      return "Underweight (Severe thinness)";
    case BMI < 16.9:
      return "Underweight (Moderate thinness)";
    case BMI < 18.4:
      return "Underweight (Mild thinness)";
    case BMI < 24.9:
      return "Normal (healthy weight)";
    case BMI < 29.9:
      return "Overweight (Pre-obese)";
    case BMI < 34.9:
      return "Obese (Class I)";
    case BMI < 39.9:
      return "Obese (Class II)";
    case BMI >= 40:
      return "Obese (Class III)";

    default:
      break;
  }

  return "";
};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
