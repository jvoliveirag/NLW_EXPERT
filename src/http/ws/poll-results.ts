import { FastifyInstance } from "fastify";
import { z } from "zod";
import { voting } from "../../utils/voting-pub-sub";

export async  function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    //'INSCREVER' (subscribe) somente nas mensagens 'PUBLICADAS' no 'canal' com o ID da respectiva enquete (pollId)
    // Pub/Sub - PATTERN para lidar com eventos (categorizar)
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
    
    const { pollId } = getPollParams.parse(request.params)

    connection.socket.on('message', (message: string) => {
      connection.socket.send('you sent: ' + pollId  + message);
    })

    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message));
    })
  })
}


