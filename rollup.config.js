import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";
import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json";
import json from "rollup-plugin-json";

const external = [
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "zlib"
];

export default Object.keys(pkg.bin || {}).map(name => {
    return {
      input: `src/${name}-cli.mjs`,
      output: {
        file: pkg.bin[name],
        format: "cjs",
        banner:
          '#!/bin/sh\n":" //# comment; exec /usr/bin/env node --experimental-modules "$0" "$@"',
        interop: false
      },
      external,
      plugins: [
        babel({
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
  });
