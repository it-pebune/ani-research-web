export const capitalizeFirst = (string: string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((str: string) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
