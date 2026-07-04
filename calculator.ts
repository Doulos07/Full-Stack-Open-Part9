// CREANDO TIPOS

type Operation = "multiply" | "add" | "divide";

type Result = string | number;
const calculator = (a: number, b: number, op: Operation): Result => {
  if (op === "multiply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) return "this cannot be done";
    return a / b;
  } else {
    return "Operation is not multiply, add or divide!"; // <-- esta rama es la que faltaba
  }
};

console.log(calculator(1, 5, "divide"));
/*
Al pasar el codigo a JS este no tiene veriicacion de tipos 
Si 'Operation' proviene de una interfaz externa, no hay garantia que respete el 'Type'
Por lo que es necesario prevenir estos Posibles errores
*/

/* La funcion solo debe devolver type: Number y como error devueve un String en vez de devolver String o Number */
const calculator2 = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

/** type narrowing => Estrechamiento de tipo
 *
 * TypeScript "reduce el conjunto de tipos posibles" que puede tener una variable verificando que hace en tiempo de ejecucion.
 * => : TypeScript "sigue" tu lógica de control de flujo y va infiriendo un tipo más específico a medida que el código descarta posibilidades
 */
try {
  console.log(calculator2(1, 5, "divide"));
} catch (error: unknown) {
  // acá 'error' es de tipo 'unknown' (puede ser CUALQUIER cosa)
  let errorMessage = "Something went wrong: ";
  // instanceof una de las muchas formas de estrechar un tipo
  if (error instanceof Error) {
    // acá TypeScript "estrechó" el tipo:
    // dentro de este bloque, 'error' ya no es 'unknown',
    // sino específicamente 'Error'
    errorMessage += error.message;
  }
  // Aca vuelve a unknown
  console.log(errorMessage);
}
