import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  // UMD build
  {
    input: 'src/react-rating.js',
    output: {
      file: `${pkg.name}.umd.js`,
      format: 'umd',
      name: 'ReactRating',
      globals: {
        react: 'React'
      },
      sourcemap: true
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
    ],
    external: [
      'react'
    ]
  },
  // Minified UMD build
  {
    input: 'src/react-rating.js',
    output: {
      file: `${pkg.name}.umd.min.js`,
      format: 'umd',
      name: 'ReactRating',
      globals: {
        react: 'React'
      },
      sourcemap: true
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ],
    external: [
      'react'
    ]
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/react-rating.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ],
    external: [
      'react'
    ]
  }
];
