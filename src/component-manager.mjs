import pacote from 'pacote';

async function doit() {
  const pkg = await pacote.manifest('pacote@^1');
  console.log(pkg);
}

doit();
