import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export async function createPoll(app: FastifyInstance) {
  
  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    })

    const { title, options } = createPollBody.parse(request.body)
    
    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return {title: option} // no prisma, no momento em que cria um relacionamento ao mesmo tempo em que cria o registro na tabela pai 
                                     // nao precisa informar a foreign key (neste caso, o id)
            }),
          }
        }
      }
    })

    return reply.status(201).send({ pollId: poll.id, options: options })
  })
}