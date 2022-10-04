const signs = { 0: "\u002B", 1: "\u2212", 2: "\u00D7", 3: "\u00F7" };
const dummyArray = [[[12], [1], [45]], [3], [[2], [1], [56]]];
const dummyArray2 = [[[12], [0], [45]], [3], [[2], [3], [56]]];
const dummyArray3 = [
  [[[12], [3], [78]], [3], [[45], [8], [96]]],
  [3],
  [[[3], [0], [7]], [1], [[56], [0], [15]]],
];

const dummyArrayLeft = [[[12], [3], [78]], [3], [[45], [8], [96]]];
const dummyArrayRight = [[[3], [0], [7]], [1], [[56], [0], [15]]];

const convertToKatex = (array) => {
  const op = ["+", "-", "\\times", "\\frac"]; // \\times or \\cdot
  let stringOutput = "";
  if (!array[0]) return stringOutput;
  if (array[0].length > 1) {
    if (array[1][0] === 3)
      return (stringOutput = `\\frac{${convertToKatex(
        array[0]
      )}}{${convertToKatex(array[2])}}`);
    switch (array[1][0]) {
      case 0:
        return (stringOutput = `${convertToKatex(array[0])} ${
          op[0]
        } ${convertToKatex(array[2])}`);
      case 1:
        return (stringOutput = `${convertToKatex(array[0])} ${op[1]} ${
          isNaN(convertToKatex(array[2])) &&
          array[2][1][0] !== 3 &&
          array[2][1][0] !== 2
            ? "(" + convertToKatex(array[2]) + ")"
            : convertToKatex(array[2])
        }`);

      case 2:
        if (
          convertToKatex(array[0]) === "1" ||
          convertToKatex(array[2]) === "1"
        )
          //checking if there is a number one to delete it because it's useless to multiply by one
          return `${
            convertToKatex(array[0]) !== "1"
              ? isNaN(convertToKatex(array[0])) && //checking if string returned is a single number or an operation to choose wether or not to parenthesis
                array[0][1][0] !== 3 &&
                array[0][1][0] !== 2
                ? "(" + convertToKatex(array[0]) + ")"
                : convertToKatex(array[0])
              : isNaN(convertToKatex(array[2])) &&
                array[2][1][0] !== 3 &&
                array[2][1][0] !== 2
              ? "(" + convertToKatex(array[2]) + ")"
              : convertToKatex(array[2])
          }`;
        return `${
          isNaN(convertToKatex(array[0])) &&
          array[0][1][0] !== 3 &&
          array[0][1][0] !== 2
            ? "(" + convertToKatex(array[0]) + ")"
            : convertToKatex(array[0])
        } ${op[2]} ${
          isNaN(convertToKatex(array[2])) &&
          array[2][1][0] !== 3 &&
          array[2][1][0] !== 2
            ? "(" + convertToKatex(array[2]) + ")"
            : convertToKatex(array[2])
        }`;
    }
    return (stringOutput = `${convertToKatex(array[0])} ${
      op[array[1][0]]
    } ${convertToKatex(array[2])}`);
  }
  //  array[1][0]
  if (array[1][0] === 3)
    return (stringOutput = `\\frac{${array[0][0]}}{${array[2][0]}}`);
  //checking if there's no ones
  if (array[1][0] === 2 && (array[0][0] === 1 || array[2][0] === 1)) {
    return (stringOutput = `${array[0][0] !== 1 ? array[0][0] : array[2][0]}`);
  }
  if (array[1][0] === 2 && (array[0][0] === -1 || array[2][0] === -1)) {
    return (stringOutput = `${
      array[0][0] !== -1 ? -array[0][0] : -array[2][0]
    }`);
  }

  return (stringOutput = `${array[0][0]}${op[array[1][0]]}${array[2][0]}`);
};

// const divisionOperatorCount = (arrayInput) => {
//   const stringInput = arrayToString(arrayInput);
//   let count = 0;
//   for (let k = 0; k < stringInput.length; k++) {
//     if (stringInput[k] === "\u00F7") count++;
//   }
//   return count;
// };
// console.log("array to string", arrayToString(dummyArray2));
// console.log(arrayToString(dummyArray3));
export { convertToKatex };

console.log("latex", convertToKatex(dummyArray));
