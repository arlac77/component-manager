import { version } from "../package.json";
import { initialize } from "./component-manager";
import { caporal } from "caporal";

caporal
  .description("manages components and its dependencies")
  .version(version)
  .command("start", "start service")
  .option("-c, --config <file>", "use config from file")
  .action(async (args, options) => {
    initialize(args, options);
  });

caporal.parse(process.argv);
