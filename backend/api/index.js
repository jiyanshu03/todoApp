/**
 * Vercel serverless entry: all requests are rewritten here so the Express app handles them.
 * The app is defined in src/index.js.
 */
import app from "../src/index.js";

export default app;
