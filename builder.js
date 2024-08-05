require("esbuild")
  .build({
    entryPoints: ["form-submission.js", "home-page.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "dist",
  })
  .catch(() => process.exit(1));
