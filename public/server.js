// // server.js
// import http from "http";
// import { parse } from "url";
// import { StringDecoder } from "string_decoder";
// import admin from "firebase-admin";

// // Initialize Firebase Admin
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault()
//     // or admin.credential.cert(require("./serviceAccountKey.json"))
//   });
// }

// const server = http.createServer(async (req, res) => {
//   const parsedUrl = parse(req.url, true);
//   const method = req.method;
//   const decoder = new StringDecoder("utf-8");
//   let buffer = "";

//   req.on("data", chunk => {
//     buffer += decoder.write(chunk);
//   });

//   req.on("end", async () => {
//     buffer += decoder.end();

//     // Handle POST /auth
//     if (parsedUrl.pathname === "/auth" && method === "POST") {
//       try {
//         const { token } = JSON.parse(buffer);
//         const decoded = await admin.auth().verifyIdToken(token);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ uid: decoded.uid, email: decoded.email }));
//       } catch (err) {
//         res.writeHead(401, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid token" }));
//       }
//     }

//     // Handle GET /user-data
//     else if (parsedUrl.pathname === "/user-data" && method === "GET") {
//       try {
//         const authHeader = req.headers["authorization"] || "";
//         const token = authHeader.split("Bearer ")[1];
//         const decoded = await admin.auth().verifyIdToken(token);

//         const doc = await admin.firestore().collection("users").doc(decoded.uid).get();
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(doc.data() || {}));
//       } catch (err) {
//         res.writeHead(401, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Unauthorized" }));
//       }
//     }

//     // Fallback
//     else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Not found" }));
//     }
//   });
// });

// server.listen(30000, () => {
//   console.log("Server running at http://localhost:3000");
// });


// have to work on it don't laterrrrrrrrrrrrrrrrrrrrrrrr...............