import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();



app.use(cors({origin: process.env.CORS_ORIGIN,credentials: true,}));
// Purpose: Enables CORS (Cross-Origin Resource Sharing).
// By default, browsers block requests that come from different origins (like frontend http://localhost:3000 calling backend http://localhost:5000).
// CORS allows your backend to accept requests from specific domains.

// Explanation:
// origin: process.env.CORS_ORIGIN → allows only the frontend URL (from your .env file) to access the backend.
// Example: CORS_ORIGIN=http://localhost:3000
// credentials: true → allows cookies, tokens, or session info to be sent along with requests.
// ✅ In short:
// It lets your frontend (on a different domain/port) talk to your backend securely.

app.use(express.json({limit:"20kb"}))
// Purpose: Parses incoming JSON data in the request body.
// When you send data like this:
// {
//   "username": "anurag",
//   "email": "anurag@example.com"
// }
// Express will automatically convert it into a JavaScript object (req.body).
// Explanation:
// limit: "20kb" → prevents very large payloads (for security and performance reasons).
// If someone tries to send 5MB JSON, it will be rejected.
// ✅ In short:
// It allows Express to understand JSON request bodies and restricts their size.

app.use(express.urlencoded({extended:true,limit:'16kb'}))
// Purpose: Parses form data (like when you submit an HTML <form>).
// For example, when a user submits a form:
// username=anurag&email=anurag@example.com
// Express converts it into an object:
// req.body = { username: "anurag", email: "anurag@example.com" }
// Explanation:
// extended: true → allows nested objects (via qs library).
// limit: "16kb" → again, limits payload size for safety.\
// ✅ In short:
// It handles application/x-www-form-urlencoded data (typical for HTML forms).

app.use(express.static("public"))
// Purpose: Serves static files (images, CSS, JS, etc.) directly from the public folder.
// If you have a file public/logo.png,
// you can access it in the browser like:
// http://localhost:5000/logo.png
// ✅ In short:
// It lets Express serve files directly without a route.

app.use(cookieParser());
// Purpose: Parses cookies from incoming requests and makes them available in req.cookies.
// For example:
// Cookie: token=abc123
// will become:
// req.cookies = { token: "abc123" }
// ✅ In short:
// It helps you access cookies (useful for authentication, sessions, etc.).



export { app };
