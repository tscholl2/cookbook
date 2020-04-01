import { Recipe } from "src/model";

export async function load(page: string): Promise<Array<Recipe>> {
    const resp = await fetch(`https://cowyo.com/${page}/raw`);
    const data = await resp.json();
    return data;
}

export async function save(page: string, data: Array<Recipe>) {
  fetch("https://cowyo.com/update",{
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({page,new_text:JSON.stringify(data)})
  });
}
