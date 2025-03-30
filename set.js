const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUthVmNCcExrWll3bEwvUVFQTkVLUURnUDMySitQN015K2lmOEc4bHVVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDV1eWtubXVxOElFbnZmeHpFc0kwWndiaEFKZXlUNHZHU2FYN2U3VHhsaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSS9Fa2dzYjRnYkJqYXlKRnVuLzBJYXBJMDRkNVR2MU1XQnEwcDAyM0VvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4bkYrMXdMdWU2Y3l4c1pXWXRXeXV1R0dCZ3pPMXVsaCtZVzBVL0IxL1NrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVMa3loeUlSMFVYMjVwRzYyckVQU0o0Qm9sYXU4VVNpZmZudFdObFFEWEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iit5V2lkWjZKeG5XR3hYQk5UbE5WeisvaGRCdERxSW9Wb2lLb1VIZ1gzeUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0pZK2FSOUFBejN0UnJucXA4cUVlYUQ4dkpjOE4ySlZGNjNUSEQrMFdVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkFUZnp0ZGdBWllUYkxlc3ZnczkrZElPWkRQdzlaZmR6T3dCdjhZQzZpUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im50ZXNES3l2aFlzVThWWVFNVExBdnh3MHkwRlFCdGZvdWVvL3RDNWpqWU4vZGhueTlJN0MrOVBIbmYzWElyM25QRHBlWFh2S01XeFN2MXB4emdEYWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM3LCJhZHZTZWNyZXRLZXkiOiJBZFliVDRSalR3WXZFU0UxbWVtNWdUQ3FMNFF6MWZxdW0vUmZMSVkwL2NRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNLckd2c3NMRUpUSm83OEdHQ2NnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5a2pzQ3FwUFFmRTF6cE56RzRZMjVoTnhBNzBEejdFRUZYUUEwaXZpVDNBPSIsImFjY291bnRTaWduYXR1cmUiOiJraFUyMzcwb01jOXZxVVExY2N0TE1WZWx4OHJWOHZiVmRYY2xoakppT21DK3B2MmxhVFpIeVRzdjlOWmI0Uk9WeTJTNDR3b2J0NWNVNHNNYmVmb1ZEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUU85cGJ5Vi81dk5iVldrOFd4L0Y4clBTOGZ5WForZkZmMjFadG5Cd0JlR0FhcjJjTk02bGphUkM0V245cEwyWlJsMmc1TVhpRkdONzRUOUE5RktVaHc9PSJ9LCJtZSI6eyJpZCI6IjEzMzIzMjM3NjU4OjU3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiOTE3NDM4NTY5Njg0NTo1N0BsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTMzMjMyMzc2NTg6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3BJN0FxcVQwSHhOYzZUY3h1R051WVRjUU85QTgreEJCVjBBTklyNGs5dyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDMzMTYxMjgsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ3NDIn0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Trending Boss",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "13323237658",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'TRENDING-BOSS',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/YKVlucn.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
