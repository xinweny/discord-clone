# Discord Clone
A full-stack web application of [Discord](https://discord.com/), created with MongoDB, Express.js, React, Node.js and Typescript.

Check out the live demo [here](#)! 👈

## Features
- Real-time messaging, user updates and messaging notifications using Socket.io
- 1:1 and 1:N voice, video and screen-share with Livekit WebRTC
- Get live call updates outside of calls with Livekit webhooks
- React to messages with emojis or upload custom ones with EmojiMart
- Add attachments to messages with Cloudinary
- Send GIFs with Tenor GIF API
- Rich-text editor to parse (custom) emojis, server invites and links with React Slate
- Join servers with communities of like-minded individuals, or create and customize your own
- Organize server discussions and topics into text and voice/video channels
- Invite others to join servers with unique server invite links
- Manage server member permissions with custom roles
- Create group chats for up to 10 friends
- Customize your user and server profiles
- Friend system with friend requesting, blocking and mutual friends/servers
- Infinite scroll loading for messages and offset pagination for public servers
- Data fetching and caching with RTK Query
- Server-side caching using Redis
- Desktop UI responsiveness and UI with SCSS modules
- Mongoose ORM with MongoDB Atlas cloud database
- Authentication with JWT and bcrypt, including auto-refreshing access tokens and password reset emails

## Installation
### 1. Clone the repository
```
git clone https://github.com/xinweny/discord-clone.git
cd discord-clone
```

### 2. Back-end setup
```
# Move into front-end folder
cd backend

# Install dependencies
npm install

# Copy the example .env file and fill it out
cp .env.example .env

# Run Express and Livekit servers
npm run dev

```

### 3. Front-end setup
```
# Move into front-end folder
cd frontend

# Install dependencies
npm install

# Copy the example .env file and fill it out
cp .env.example .env

# Run Vite front-end
npm run dev

# Open in your browser
open http://localhost:5173
```

## Disclaimer
This is a project inspired by [Discord](https://discord.com/) and created solely for personal educational purposes. This project is **NOT** used for the purpose of monetary gain. This project has no affiliation with Discord Inc. or any parties related or associated with Discord Inc.