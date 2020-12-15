import pacote from "pacote";
import { ServiceHTTP } from "@kronos-integration/service-http";
import { ServiceRepositories } from "@kronos-integration/service-repositories";

export default async function initialize(sp) {
  await sp.declareServices({
    http: {
      type: ServiceHTTP,
      autostart: true,
      endpoints: {
      }
    },
    repositories: {
      type: ServiceRepositories,
      autostart: true,
      providers: [
        {
          type: "github-repository-provider"
        }
      ]
    }
  });

  await sp.start();
}

export async function analyze(repository) {
  const pkg = await pacote.manifest("pacote@^1");
  console.log(pkg);

  const branch = await repository.defaultBranch();
  const content = await branch.content("package.json");
}
