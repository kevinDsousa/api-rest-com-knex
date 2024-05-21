import fastify from "fastify";
import { knex } from "./database";

const app = fastify({ logger: true });

app.get("/hello", async (request, reply) => {
  const tables = await knex("sqlite_schema").select("*");
  return tables;
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});