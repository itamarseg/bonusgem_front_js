require("esbuild")
  .build({
    entryPoints: ["form-submission.js", "home-page.js", "datepicker.css", "datepicker.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    external: ['jquery'],
    outdir: "dist",
  })
  .catch(() => process.exit(1));
