import pacote from "pacote";
import { GithubProvider } from "github-repository-provider";
import { AggregationProvider } from "aggregation-repository-provider";

export async function initialize() {
  const rp = new AggregationProvider([
    new GithubProvider(GithubProvider.optionsFromEnvironment(process.env))
  ]);

  const rg = await rp.repositoryGroup("arlac77");
  console.log(rg.name);
  //console.log(rg.repositories.keys());
  console.log(rp.repositories.keys());

  //rp.repositoryOwners();

  const pkg = await pacote.manifest("pacote@^1");
  console.log(pkg);
}

export async function analyze(repository) {
  const branch = await repository.defaultBranch();
  const content = await branch.content("package.json");
}
