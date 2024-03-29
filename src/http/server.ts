import cookie from "@fastify/cookie";
import cors from '@fastify/cors';
import websocket from "@fastify/websocket";
import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getAllPolls } from "./routes/get-all-polls";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./ws/poll-results";

// CONFIGURAR CORS
// Configuração mais detalhada do CORS
const corsOptions = {
  origin: true, // ou uma lista de origens permitidas ['http://localhost:3000', 'https://seu-outro-app.com']
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // incluir credenciais (por exemplo, cookies)
  optionsSuccessStatus: 204, // alguns navegadores (por exemplo, Chrome) podem retornar 204
};

const app = fastify()
app.register(cors, corsOptions)

app.register(cookie, {
  secret: "my-secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
})

app.register(websocket)

app. register(createPoll)
app. register(getPoll)
app.register(getAllPolls)
app.register(voteOnPoll)
app.register(pollResults)

app.listen({ port: 3333 }).then(()=> {
  console.log('HTTP server running on http://localhost:3333')
})