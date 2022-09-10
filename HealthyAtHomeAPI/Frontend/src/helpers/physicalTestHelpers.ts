import {LevelsOfDifficulty} from "../enums/planOptionEnums";
import pushupGif from "../gifs/pushup.gif";
import pullGif from "../gifs/Towel_Back_Extension.gif";
import coreGif from "../gifs/v_up.gif";
import squatGif from "../gifs/bodyweightsquat.gif";
import burpeeGif from "../gifs/burpee.gif";

//Pushups
//V up core
// pull - back extensions with towel
// legs - bodyweight squat
// stamina - burpee

export const physicalTestExerciseInfo = {
  push: {
    name: "Bodyweight Push Up",
    link: "https://www.youtube.com/embed/IODxDxX7oi4",
    dos: [
      "Full range of motion - all the way up, all the way down",
      "Protract and depress your shoulderblades",
      "Tilt your pelvis backwards",
    ],
    donts: [
      "Flare out your elbows",
      "Arch your back",
      "Decrease range of motion",
    ],
    instructions:
        "Get on the floor on all fours, positioning your hands slightly wider than your shoulders. \n" +
        "Don't lock out the elbows; keep them slightly bent. \n Extend your legs back so you are balanced" +
        "on your hands and toes, your feet hip-width apart.",
    gif: pushupGif,
  },
  pull: {
    name: "Towel Back Extension",
    link: "https://www.youtube.com/embed/aHMdxCVWJIw",
    dos: ["Keep your feet off the floor", "Retract your shoulderblades"],
    donts: ["Release tension off of your back"],
    instructions:
        "Get on the floor grabbing a towel shoulder width apart. \n" +
        "Lift your feet off the floor and bring the towel back to your chest while keeping your back engaged.",
    gif: pullGif,
  },
  core: {
    name: "V Up",
    link: "https://www.youtube.com/embed/iP2fjvG0g3w",
    dos: ["Keep your legs straight", "Keep a tight core", "Point your toes"],
    donts: ["Not touching your toes with your hands"],
    instructions:
        "Keep your legs straight and lift them up as you simultaneously raise your upper body off the floor.\n" +
        " Keep your core tight as you reach for your toes with your hands.\n" +
        " Slowly lower yourself back down to the starting position",
    gif: coreGif,
  },
  legs: {
    name: "Bodyweight Squat",
    link: "https://www.youtube.com/embed/RClKKQqsvXA",
    dos: [
      "Full range of motion - go all the way down",
      "Keep a tight core",
      "Toes pointed slightly outward",
    ],
    donts: ["Lift heels off the floor", "Arch your back"],
    instructions:
        "Squat down by bending hips back while allowing knees to bend forward, keeping back straight and knees pointed same direction as feet.\n" +
        " Descend until thighs are just past parallel to floor.\n" +
        " Extend knees and hips until legs are straight. Return and repeat.",
    gif: squatGif,
  },
  stamina: {
    name: "Burpee",
    link: "https://www.youtube.com/embed/qLBImHhCXSw",
    dos: ["Be explosive", "Keep a tight core"],
    donts: ["Break the pushup form", "Break the squat form"],
    instructions:
        "While holding upper body in place, buck hips ups slightly by extending knees and hips," +
        " then immediately kick legs back. Perform push-up. Push body back up. Keeping upper body in place return to original position. Jump upward.",
    gif: burpeeGif,
  },
};

export const getPhysicalResultForType = (
    type: string,
    value: string
): LevelsOfDifficulty => {
  switch (type) {
    case "push":
      return getResultsForPush(value);
    case "pull":
      return getResultsForPull(value);
    case "core":
      return getResultsForCore(value);
    case "legs":
      return getResultsForLegs(value);
    case "stamina":
      return getResultsForStamina(value);
    default:
      return LevelsOfDifficulty.Novice;
  }
};

const getResultsForPush = (value: string): LevelsOfDifficulty => {
  const number = parseInt(value);

  if (number < 8) return LevelsOfDifficulty.Novice;
  if (number < 25) return LevelsOfDifficulty.Intermediate;
  return LevelsOfDifficulty.Advanced;
};

const getResultsForPull = (value: string): LevelsOfDifficulty => {
  const number = parseInt(value);

  if (number < 15) return LevelsOfDifficulty.Novice;
  if (number < 25) return LevelsOfDifficulty.Intermediate;
  return LevelsOfDifficulty.Advanced;
};

const getResultsForCore = (value: string): LevelsOfDifficulty => {
  const number = parseInt(value);

  if (number < 10) return LevelsOfDifficulty.Novice;
  if (number < 30) return LevelsOfDifficulty.Intermediate;
  return LevelsOfDifficulty.Advanced;
};

const getResultsForLegs = (value: string): LevelsOfDifficulty => {
  const number = parseInt(value);

  if (number < 8) return LevelsOfDifficulty.Novice;
  if (number < 25) return LevelsOfDifficulty.Intermediate;
  return LevelsOfDifficulty.Advanced;
};

const getResultsForStamina = (value: string): LevelsOfDifficulty => {
  const number = parseInt(value);

  if (number < 15) return LevelsOfDifficulty.Novice;
  if (number < 30) return LevelsOfDifficulty.Intermediate;
  return LevelsOfDifficulty.Advanced;
};
