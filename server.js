import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxG6c7yggSzX17KYZ_76gEJo9Fsh1W8vitwtqyAXQgr5coWIloEVm7lF36leDcZYmw/exec";
async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.post("/api/enquiry", async (req, res) => {
    try {
      const payload = req.body;
      console.log("Forwarding enquiry to Google Sheets:", payload);
      const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload),
        redirect: "follow"
      });
      const responseText = await scriptResponse.text();
      console.log("Google Apps Script response:", responseText);
      let parsedData = {};
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        parsedData = { raw: responseText };
      }
      return res.json({
        success: true,
        message: "Enquiry submitted to Google Sheets successfully.",
        data: parsedData
      });
    } catch (error) {
      console.error("Error in /api/enquiry:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to forward enquiry to Google Sheets.",
        error: error.message
      });
    }
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
        watch: process.env.DISABLE_HMR === "true" ? null : {}
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
