import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";
import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json";
import json from "rollup-plugin-json";

const external = [
  "pacote",
  "github-repository-provider",
  "aggregation-repository-provider"
];

export default [
  ...Object.keys(pkg.bin || {}).map(name => {
    return {
      input: `src/${name}.mjs`,
      output: {
        file: pkg.bin[name],
        format: "cjs",
        banner:
          '#!/bin/sh\n":" //# comment; exec /usr/bin/env node --experimental-modules --experimental-worker "$0" "$@"',
        interop: false
      },
      external,
      plugins: [
        /*resolve(),*/ babel({
          runtimeHelpers: false,
          externalHelpers: true,
          babelrc: false,
          plugins: ["@babel/plugin-proposal-async-generator-functions"],
          exclude: "node_modules/**"
        }),
        json({
          include: "package.json",
          preferConst: true,
          compact: true
        }),
        commonjs(),
        cleanup(),
        executable()
      ]
    };
  }),
  {
    input: pkg.module,
    output: {
      file: pkg.main,
      format: "cjs",
      interop: false
    },
    external,
    plugins: [
      /*resolve(),*/ babel({
        runtimeHelpers: false,
        externalHelpers: true,
        babelrc: false,
        plugins: ["@babel/plugin-proposal-async-generator-functions"],
        exclude: "node_modules/**"
      }),
      json(),
      commonjs(),
      cleanup()
    ]
  }
];
