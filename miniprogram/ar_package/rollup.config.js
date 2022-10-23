import sucrase from "@rollup/plugin-sucrase";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

const production = !process.env.ROLLUP_WATCH;

const plugins = [
  terser(),
  resolve({ extensions: [".ts", ".js"] }),
  commonjs(),
  sucrase({ transforms: ["typescript"] }),
];

export default [
  {
    input: ["./pages/ar/ar.ts"],
    treeshake: true,
    output: {
      format: "cjs",
      dir: "./",
      chunkFileNames: "chunks/[name].js",
      entryFileNames: "pages/[name]/[name].js",
      manualChunks: {
        "three-platformize": ["three-platformize"],
      },
    },
    plugins,
  },
];
