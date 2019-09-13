import * as tape from "tape";

tape("test", (t) => {
    t.deepEqual(1 + 1, 2, "1+1 = 2");
    t.end();
})