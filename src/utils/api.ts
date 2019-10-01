export async function load(_: string): Promise<string> {
  return SERVER;
}

export async function save(_: string, data: string) {
  SERVER = data;
  return;
}

let SERVER = `

# grilled cheese

bread
cheese
butter

butter the bread
add cheese
grill

# soup

veggies
water
spices

chop veggies
put in water
heat for a while

`;
