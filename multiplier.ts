const multiplicator = (a, b, printText) => {
  console.log(printText, a * b);
};

multiplicator(2, 4, "Multiplied numbers 2 and 4, the result is:");

//

const multiplicator2 = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

multiplicator2("how about a string?", 4, "Multiplied a string and 4, the result is:");
