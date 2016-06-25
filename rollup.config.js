import babel from 'rollup-plugin-babel'

export default {
  moduleName: 'Animation',
  entry: 'src/dynamica.js',
  dest: 'dist/dynamica.js',
  format: 'umd',
  plugins: [ 
    babel()
  ]
}