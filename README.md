# Discord Clone
A full-stack ***clone*** web application of [Discord](https://discord.com/), created with **Express.js**, **Typescript** and **React**.

Check out the live demo [here](https://discord-clone-client.onrender.com/)! 👈

## Packages and Features
- **[Socket.io](https://socket.io/)** - Real-time messaging, user updates and messaging notifications
- **[Livekit](https://livekit.io/)** WebRTC - 1:1 and 1:N voice, video and screen-share and live call updates with webhooks
- **[EmojiMart](https://github.com/missive/emoji-mart)** - Twemojis and custom emojis
- **[Cloudinary](https://cloudinary.com/documentation)** - *Upload* message attachments, profile pictures and custom emojis
- **[Tenor GIF API](https://tenor.com/gifapi/documentation)** - Send *GIF* messages
- **[Slate React](https://docs.slatejs.org)** - *Rich-text editor* to automatically parse emojis from shortcodes and URL links
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching, state-management and client-side caching
- **[Axios](https://axios-http.com/docs/intro)** - Data fetching with request/response interceptors
- **[Redis](https://redis.io/docs/connect/clients/nodejs/)** - Server-side caching
- **[SCSS](https://sass-lang.com/documentation/syntax/) modules** - UI/UX, layout and responsiveness
- **[MongoDB](https://www.mongodb.com/docs/) with [Mongoose](https://mongoosejs.com/)** - Database
- **[JWT](https://jwt.io/) and [bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Authentication, including auto-refreshing access tokens
- **[Nodemailer](https://nodemailer.com/)** - Password reset and verification emails
<p></p>

- **Servers** - Join servers with communities of like-minded individuals, or create and customize your own
- **Channels** - Text and voice/video channels and categories to organize server topics
- **Invite Links** - Invite others to join servers with unique links
- **Roles** - Manage and customize server member permissions
- **Reactions** - Express your feelings with message reactions
- **DMs** - Create group chats for up to 10 friends
- **Profiles** - Individually customizable user and server profiles
- **Friending/Blocking** - Friend requesting, blocking and mutual friends/servers
- **Infinite scroll and offset pagination** - Loading messages and public servers

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
***NOTE:*** You will also need a secure tunneling service such as [ngrok](https://ngrok.com/product/secure-tunnels) to allow Livekit to access the webhook endpoint - detailed instructions [here](https://docs.livekit.io/realtime/server/webhooks/).


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