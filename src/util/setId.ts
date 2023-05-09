import Month from "../constants/Month";

export const setId = (type: "q" | "c", uid: string) => {
  const dateArray = Date().split(" ");
  const year = dateArray[3];
  const month = Month[dateArray[1] as keyof typeof Month];
  const day = dateArray[2];
  const time = dateArray[4].split(":").join("");
  const id = [type, year, month, day, time, uid].join("");
  const date = [year, month, day, time].join("");

  return { id, date };
};
