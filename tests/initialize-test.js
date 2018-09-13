import test from "ava";

import { initialize } from "../src/initialize";

test("initialize", async t => {
  await initialize();
});
