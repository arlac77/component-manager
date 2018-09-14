import multiEntry from "rollup-plugin-multi-entry";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import istanbul from "rollup-plugin-istanbul";

export default {
  input: "tests/**/*-test.js",
  output: {
    file: "build/bundle-test.js",
    format: "cjs",
    sourcemap: true,
    interop: false
  },
  external: [
    "ava",
    "pacote",
    "github-repository-provider",
    "aggregation-repository-provider"
  ],
  plugins: [
    multiEntry(),
    plugins: [
      babel({
        babelrc: false,
        plugins: ["@babel/plugin-proposal-async-generator-functions"],
        exclude: "node_modules/**"
      }),
    resolve(),
    commonjs(),
    istanbul({
      exclude: ["tests/**/*-test.js", "node_modules/**/*"]
    })
  ]
};
