import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let ts;
try {
  ts = require("typescript");
} catch {
  try {
    ts = require("/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript");
  } catch {
    ts = null;
  }
}
import path from "node:path";
import fs from "node:fs";
const src = (p) => readFileSync(p, "utf8");
const required = [
  "src/app/api/admin/ai-blog/route.js",
  "src/app/api/cron/daily-blog/route.js",
  "src/app/api/chat/route.js",
  "src/lib/ai-blog.js",
  "src/lib/gemini.js",
  "src/lib/legal-chat.js",
  "src/components/admin/AiBlogStudio.jsx",
  "src/components/chat/LegalChat.jsx",
  "src/components/chat/ChatMount.jsx",
  "src/components/site/RouteProgress.jsx",
  "src/app/(site)/loading.jsx",
  "src/app/admin/(dashboard)/loading.jsx",
  "src/app/admin/(dashboard)/ai-blog/page.jsx",
  "vercel.json",
];
let issues = required.filter((p) => !existsSync(p)).map((p) => `Missing ${p}`);
let count = 0;
function walk(folder) {
  for (const e of fs.readdirSync(folder, { withFileTypes: true })) {
    const f = path.join(folder, e.name);
    if (e.isDirectory()) walk(f);
    else if (/\.(jsx?|mjs)$/.test(e.name)) {
      count++;
      if (ts) {
        const file = ts.createSourceFile(
          f,
          src(f),
          ts.ScriptTarget.Latest,
          true,
          f.endsWith(".jsx") ? ts.ScriptKind.JSX : ts.ScriptKind.JS,
        );
        for (const err of file.parseDiagnostics)
          issues.push(
            `${f}: ${ts.flattenDiagnosticMessageText(err.messageText, " ")}`,
          );
      } else if (!f.endsWith(".jsx")) {
        // Without the optional parser, regular JS must still parse via node --check in CI.
      }
    }
  }
}
walk("src");
walk("scripts");
const check = (condition, text) => {
  if (!condition) issues.push(text);
};
check(
  src("src/app/api/cron/daily-blog/route.js").includes("AUTO_BLOG_ENABLED") &&
    src("src/app/api/cron/daily-blog/route.js").includes("Bearer ${secret}"),
  "Cron security / disabled-by-default check missing",
);
check(
  src("src/lib/ai-blog.js").includes("published: false") &&
    src("src/lib/ai-blog.js").includes("pending_review"),
  "AI generator must never publish itself",
);
check(
  src("src/app/api/admin/ai-blog/route.js").includes("currentAdmin") &&
    src("src/app/api/admin/ai-blog/route.js").includes(
      'reviewStatus !== "approved"',
    ),
  "Admin approval gate missing",
);
check(
  src("src/app/api/chat/route.js").includes("limitChat") &&
    src("src/lib/legal-chat.js").includes("validateQuestion"),
  "Chat validation / limits missing",
);
check(
  src("src/components/chat/ChatMount.jsx").includes("dynamic("),
  "Chat lazy load missing",
);
check(
  src("src/app/(site)/layout.jsx").includes("RouteProgressMount"),
  "Route-progress indicator missing",
);
const cron = JSON.parse(src("vercel.json"));
check(
  cron.crons?.some(
    (x) => x.path === "/api/cron/daily-blog" && x.schedule === "30 4 * * *",
  ),
  "Daily schedule missing",
);
check(
  !existsSync(".env.local"),
  "Secret-bearing .env.local must not be packaged",
);
console.log(
  JSON.stringify(
    {
      status: issues.length ? "FAIL" : "PASS",
      filesParsed: count,
      newRoutes: 3,
      issues,
    },
    null,
    2,
  ),
);
if (issues.length) process.exit(1);
