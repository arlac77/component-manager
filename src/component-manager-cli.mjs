import { version, description } from "../package.json";
import { initialize } from "./component-manager";
import program from "commander";

program
  .description(description)
  .version(version)
  .command("start", "start service")
  .option("-c, --config <dir>", "use config from directory")
  .action(async () => {
    initialize(program);
  })
  .parse(process.argv);
