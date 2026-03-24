import type { Express } from "express";
const port = process.env.PORT || 3000;

export async function runServer(app: Express) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
