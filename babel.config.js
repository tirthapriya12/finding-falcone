module.exports = {
  presets: [
    // [
    //   "@babel/preset-env",
    //   {
    //     modules: false
    //   }
    // ],
    // "@babel/preset-react"
    // "@babel/env",
    // "@babel/react",
    ["@babel/preset-env",{"modules":'commonjs'}], "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime", //Reduces code duplication by extracting Babel helpers into shared modules.
    "@babel/plugin-syntax-dynamic-import", //Enables dynamic import() syntax in browsers lacking native Promise support.
    "@babel/plugin-proposal-class-properties", //Enables support for the public instance field syntax proposal, for writing class-based React components.,
    "transform-es2015-modules-commonjs"
  ],
  // env: {
  //   production: {
  //     only: ["src"],
  //     plugins: [
  //       [
  //         "transform-react-remove-prop-types", //removes unnecessary prop-types from production code.
  //         {
  //           removeImport: true
  //         }
  //       ],
  //       "@babel/plugin-transform-react-inline-elements", // evaluates React.createElement during compilation and inlines the result.
  //       "@babel/plugin-transform-react-constant-elements" // extracts static React elements as constants.
  //     ]
  //   },
  //   // testing: {
  //   //   "presets": ["es2015", "stage-1", "react", "flow"],
  //   //   "plugins": ["lodash", "transform-runtime", "transform-es2015-modules-commonjs"]
  //   // },
  //   test: { "presets": [["@babel/preset-env",{"modules":'commonjs'}], "@babel/preset-react"], "plugins": ["transform-es2015-modules-commonjs"] }
  // }
};