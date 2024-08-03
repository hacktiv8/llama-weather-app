import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { html, raw } from "hono/html";
import fs from "node:fs";

const app = new Hono();

app.use("/img/*", serveStatic({ root: "./" }));

app.use(async function (ctx, next) {
  ctx.setRenderer(function (content) {
    const template = fs
      .readFileSync("./template.html", "utf-8")
      .replace("{{content}}", content);
    return ctx.html(template);
  });
  await next();
});

app.get("/health", function (ctx) {
  return ctx.text("OK");
});

app.get("/", async function (ctx) {
  const location = ctx.req.query("location") || "Jakarta";
  console.log(`Weather for: ${location}`);

  return ctx.render(
    html`<div class="weathers">
      <h1>${location}</h1>
      <div id="weather">
        <div class="info">
          <div class="icon">
            <img src="img/clear-day.png" />
          </div>
          <div class="text">
            <ul id="report">
              <li>Temperature: <span id="temp">30°C</span></li>
              <li>Humidity: <span id="humidity">100</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="comment">&nbsp;</div>
    </div>`,
  );
});

serve({ fetch: app.fetch, port: 3000 });
