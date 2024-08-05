require("esbuild")
  .build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/index.js",
  })
  .catch(() => process.exit(1));
