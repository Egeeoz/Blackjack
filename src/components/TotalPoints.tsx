interface TotalPointsProps {
  label: string;
  points: number;
}

const TotalPoints = ({ label, points }: TotalPointsProps) => {
  return (
    <h3>
      {label} {points}
    </h3>
  );
};

export default TotalPoints;
