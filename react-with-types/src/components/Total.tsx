interface TotalProps {
  totalExercises: number;
}

export const Total = ({ totalExercises }: TotalProps) => {
  return <div>Number of exercises: {totalExercises}</div>;
};
