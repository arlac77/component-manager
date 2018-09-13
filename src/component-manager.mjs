import { version } from "../package.json";
import { initialize } from "./initialize";

const caporal = require("caporal");

caporal
  .description("")
  .version(version)
  .command("start", "start service")
  .option("-c, --config <file>", "use config from file")
  .action(async (args, options) => {});

caporal.parse(process.argv);
