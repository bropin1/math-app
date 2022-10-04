//need to do some composite calcul
//use recursion or while loop
//négatif ou non
//niveau 1  17 - 36
// niveau 2 56 - ( 76 + 13 ) + 7 - 15 // x1 + x2 + x3 for let i in k (k is a variable)
//for the addition/substraction: 56 - ( 76 + 13 ) + 7 - 15
//                               (  ) x ( )

//0 is addition
//1 is substraction
//2 is multiplication
//3 is division

//for only additions and substractions, operator Choice Number must be 3
//counter is for how many nested
//lengthOfMain variable is the max number of main operators

// function that calculates the "diviseur" of a number

const isPrimeNumber = (number) => {
  if (number === 0 || number === 1) {
    return false;
  }

  for (let k = 2; k < Math.round(Math.sqrt(number)) + 1; k++) {
    if (number % k === 0) {
      return false;
    }
  }
  return true;
};

const RandomDivider = (number) => {
  if (number === 1 || number === 0) {
    return 1;
  }
  const listOfPrimeDivider = [];
  let randomDivider = 1;
  let storage = Math.abs(number); //or else could make storage negative and endless loop
  let counter = 2;
  while (storage !== 1) {
    if (!isPrimeNumber(counter)) {
      counter++;
      continue;
    }
    while (storage % counter === 0) {
      listOfPrimeDivider.push(counter);
      storage = storage / counter;
    }
    counter++;
  }
  while (
    randomDivider === 1 ||
    (randomDivider === number && !isPrimeNumber(number))
  ) {
    randomDivider = 1;
    for (let k of listOfPrimeDivider) {
      Math.round(Math.random()) ? (randomDivider *= k) : (randomDivider *= 1);
    }
  }

  return randomDivider;
};

//create a function that starts from a number and decompose it into an operation
//baseLengthhow many "variables" there is at the beginning X1 + X2 + X3 (replace X by parentheses)
//nestedCount: number of recursions

const operationGeneratorAV = (
  number,
  operators = [0, 1, 2, 3],
  nestedCount = 0,
  baseLength = 1,
  negativeNumber = false
) => {
  let literalExpression = [];
  const rangeOfRandomNumbers = 25; //to avoid having extremely high numbers for the divisions
  for (let k = 0; k < baseLength; k++) {
    const operator =
      operators[Math.round(Math.random() * (operators.length - 1))];
    let randomNumber = Math.round(Math.random() * rangeOfRandomNumbers) + 10;
    let randomNumber2 = RandomDivider(number); //crazy computation

    if (Math.round(Math.random()) && negativeNumber) {
      randomNumber *= -1;
      randomNumber2 *= -1;
    } //changes the signs
    if (nestedCount > 0) {
      switch (operator) {
        case 0:
          literalExpression.push(
            ...[
              operationGeneratorAV(
                number - randomNumber,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),

              [0],

              operationGeneratorAV(
                randomNumber,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),
            ]
          );
          break;
        case 1:
          literalExpression.push(
            ...[
              operationGeneratorAV(
                number + randomNumber,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),

              [1],

              operationGeneratorAV(
                randomNumber,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),
            ]
          );
          break;
        case 2:
          literalExpression.push(
            ...[
              operationGeneratorAV(
                number / randomNumber2,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),

              [2],
              operationGeneratorAV(
                randomNumber2,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),
            ]
          );
          break;
        case 3:
          literalExpression.push(
            ...[
              operationGeneratorAV(
                number * randomNumber,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),

              [3],

              operationGeneratorAV(
                randomNumber,
                operators,
                nestedCount - 1,
                baseLength,
                negativeNumber
              ),
            ]
          );
          break;
        default:
          break;
      }
    } else {
      switch (operator) {
        case 0:
          literalExpression = [[number - randomNumber], [0], [randomNumber]];
          break;
        case 1:
          literalExpression = [[number + randomNumber], [1], [randomNumber]];
          break;
        case 2:
          literalExpression = [[number / randomNumber2], [2], [randomNumber2]];
          break;
        case 3:
          literalExpression = [[number * randomNumber], [3], [randomNumber]];
          break;
        default:
          break;
      }
    }
  }

  return literalExpression;
};

export { operationGeneratorAV };
