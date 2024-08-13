require("esbuild")
  .build({
    entryPoints: ["form-submission.js", "home-page.js", "datepicker-extra.css", "datepicker.css"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "dist",
  })
  .catch(() => process.exit(1));
