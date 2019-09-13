import { Suite } from "benchmark";

const str = "oaclick";

new Suite()
    .add("startswith", () => {
        str.startsWith("on");
    })
    .add("regexp", () => {
        /^on/.exec(str) != null;
    })
    .add("letters", () => {
        str[0] === "o" && str[1] === "n";
    })
    .on("cycle", (event: any) => {
        console.log(`${event.target}`);
    })
    .run({ async: false });
