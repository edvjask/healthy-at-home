import React from "react";

type ExerciseTypeIconProps = {
  type:
      | "Horizontal Push"
      | "Horizontal Pull"
      | "Vertical Pull"
      | "Vertical Push"
      | "Core"
      | "Legs";
};

export const ExerciseTypeIcon: React.FC<ExerciseTypeIconProps> = ({type}) => {
  const getLink = (type: string) => {
    switch (type) {
      case "Vertical Pull":
        return "https://img.icons8.com/ios-glyphs/30/000000/pullups--v1.png";
      case "Core":
        return "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-abs-health-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png";
      case "Horizontal Pull":
        return "https://img.icons8.com/ios/50/000000/rowing.png";
      case "Horizontal Push":
        return "https://img.icons8.com/ios-glyphs/30/000000/push.png";
      case "Vertical Push":
        return "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-headstand-dance-flaticons-flat-flat-icons.png";
      case "Legs":
        return "https://img.icons8.com/ios/50/000000/squats.png";
    }
  };

  return (
      <img
          src={getLink(type)}
          width={"30px"}
          height={"30px"}
          style={{
            filter:
                "invert(100%) sepia(99%) saturate(0%) hue-rotate(256deg) brightness(102%) contrast(101%)",
          }}
      />
  );
};
