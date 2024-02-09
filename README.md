# NLW Expert 🚀
Rocketseat Next Level Week - Node.js

This project consists, basically, of an API for a simple voting and ranking system with Redis and Node.js, which makes it totally scalable

## Technologies 

- TypeScript
- Node.js
- Fastify
- Zod
- Redis
- Prisma ORM - PostgreSQL
- Docker

## Requirements

- Node.js
- Docker

## How to use

1. Clone this repository on yout computer;
2. Go the respective folder and install all dependencies with `npm install` or `yarn`;
3. Run the server using `docker-compose up`. This will start a container running in background, and another one that is attached to it (so you can see logs);
4. Run the server in development mode with `npm run dev` or `yarn dev`;
5. Run prisma `npx prisma studio` to start the database GUI (where you can check the data being changed);
6. Use Insomnia, Postman or any other tool to test the endpoints, sending requests as JSON (see the endpoints list below).

## Endpoints

- ### Create Poll

  Method: ```POST```

  Path: `/polls`

  request body: 
  ```json
  {
    "title": "Frameworks NodeJs",
    "options": ["Express", "Fastify", "NestJS"]
  }
  ```

  response:

  ```json
  {
    "pollId": "776b9e7d-0f1d-480a-bc44-a298fc2429f9",
    "options": [
      "ReactJS",
      "Vue",
      "Svelte"
    ]
  } 
  ```

- ### Get Poll by id

  Method: `GET`

  Path: `/polls/:pollId`

  response:

  ```json collapse
  {
    "poll": {
      "id": "b2d02afd-886f-4df3-9f12-e199f38a8c4a",
      "title": "Frameworks NodeJs",
      "options": [
        {
          "id": "e53284b6-d6f6-48f1-98c7-5bda419bc22d",
          "title": "Express",
          "score": 0
        },
        {
          "id": "a83f6acf-27c7-4ba1-aa1b-a8ef12d2e4ae",
          "title": "Fastify",
          "score": 1
        },
        {
          "id": "b9e1d43b-a5e1-44c4-a297-862ecf07c048",
          "title": "NestJS",
          "score": 0
        }
      ]
    }
  }
  ```

- ### Get All Polls

  Method: `GET`

  Path: `/polls/:pollId`

  response:

  ```json collapse
  {
    "poll": {
      "id": "b2d02afd-886f-4df3-9f12-e199f38a8c4a",
      "title": "Frameworks NodeJs",
      "options": [
        {
          "id": "e53284b6-d6f6-48f1-98c7-5bda419bc22d",
          "title": "Express",
          "score": 0
        },
        {
          "id": "a83f6acf-27c7-4ba1-aa1b-a8ef12d2e4ae",
          "title": "Fastify",
          "score": 1
        },
        {
          "id": "b9e1d43b-a5e1-44c4-a297-862ecf07c048",
          "title": "NestJS",
          "score": 0
        }
      ]
    },
    "poll": {...}
  }
  ```
  Note: if there is no poll, you will see the following: `{ message: 'No poll was found' }`.

- ### Vote on a poll

  Method: ```POST```

  Path: `/polls/:pollId/votes`

  request body: 
  ```json
  {
    "pollOptionId": "pollId"
  }
  ```

  response:

  ```json
  {
    "pollId": "776b9e7d-0f1d-480a-bc44-a298fc2429f9",
    "options": [
      "ReactJS",
      "Vue",
      "Svelte"
    ]
  } 
  ```
- ### Poll results (WebSocket)

  `ws://localhost:3333/polls/:pollId/results`