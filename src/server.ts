import fastify from "fastify";
import crypto from "crypto";
import { knex } from "./database";
import { env } from "./env";

const app = fastify({ logger: true });

app.post("/transactions", async (request, reply) => {
  const transactions = await knex("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "teste",
      amount: 1000,
    })
    .returning("*");
  return transactions;
});

app.get("/transactions", async (request, reply) => {
  const transactions = await knex("transactions")
    .where("amount", ">", 100)
    .select("*");
  return transactions;
});

app.listen({ port: Number(env.PORT) }).then(() => {
  console.log(`Server is running on port ${env.PORT}`);
});
