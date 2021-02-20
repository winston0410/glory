module.exports = [
  {
    path: ["dist/esm/index.js", "dist/esm/addon/virtual.js"],
    gzip: true,
    limit: '2 KB',
    webpack: false,
    name: 'Minimum setup'
  },
  {
    path: ["dist/esm/index.js", "dist/esm/addon/virtual.js", "dist/esm/addon/prefixer.js", "dist/esm/addon/hydration.js", "dist/esm/addon/keyframes.js"],
    gzip: true,
    limit: '5 KB',
    webpack: false,
    name: 'Complete setup'
  },
  {
    path: ["dist/esm/index.js", "dist/esm/addon/virtual.js", "dist/esm/addon/prefixer.js", "dist/esm/addon/hydration.js", "dist/esm/addon/keyframes.js", "dist/esm/addon/jsx.js"],
    gzip: true,
    limit: '5 KB',
    webpack: false,
    name: 'Styled-component setup'
  }
]
