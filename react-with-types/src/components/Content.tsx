import { Part } from "./Part";
import { CoursePart } from "../App";

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => {
        return (
          <div key={part.name}>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};
