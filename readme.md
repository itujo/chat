# What is that?

Just a dummy project that uses venom-bot and openai sdk to send messages via WhatsApp

Currently the api have two methods,

`/bot [message]`

the bot will reply like a parrot, sending back the message it received.

`/chat [message]`

openai integration, send any message and the gpt model will reply you.

# How to Run

- clone the repo
- install the dependencies `pnpm install`
- create a .env file containing `OPENAI_API_KEY=[your_oai_key]` the token can be created at https://platform.openai.com/api-keys
- run the project `pnpm dev`
- connect via qrcode to your whatsapp
- thats it.
