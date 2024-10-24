const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel").default;
const { terser } = require("rollup-plugin-terser");

module.exports = {
  // input: "./test.jsx", // Your JSX file as input
  // output: {
  //   file: "./tmp/1/dgc/dist/index.js",
  //   format: "es",
  // },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled", // Correct handling for Rollup
      presets: ["@babel/preset-react"], // This will handle JSX
    }),
    terser(), // Optional for minification
  ],
  external: ["react", "react-dom"], // Externalize React and ReactDOM
};
