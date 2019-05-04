import * as View from "src/view/h";

export function IngredientAmount({ amount }: { amount: string }): any {
  if (amount.includes("/")) {
    const arr = amount.split("/");
    if (arr[0].includes(" ")) {
      const brr = arr[0].split(" ");
      return mixedFraction(brr[0], brr[1], arr[1]);
    } else {
      return fraction(arr[0], arr[1]);
    }
  } else {
    return number(amount);
  }
}

function number(a: string) {
  return a;
}

function fraction(a: string, b: string) {
  return [<sup>{a}</sup>, "/", <sub>{b}</sub>];
}

function mixedFraction(a: string, b: string, c: string) {
  return [a, " "].concat(fraction(b, c) as any[]);
}
