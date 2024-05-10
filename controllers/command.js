const { Markup } = require('telegraf');
const colorize = require('./collor.js')
const fs = require('fs')
const userStatus = {};

// Handler untuk perintah /start
function startHandler(ctx) {
  ctx.reply('Selamat datang! Gunakan perintah /menu untuk melihat menu');
}

// Handler untuk perintah /menu
function menuHandler(ctx) {
  ctx.reply('Silakan pilih:', 
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Spotify', 'spotify'),
        Markup.button.callback('Apple Music', 'apmus')
      ],
      [
        Markup.button.callback('Vidio', 'vidio'),
        Markup.button.callback('Youtube', 'youtube')
      ],
    ])
  );
}

async function addStockHandler(ctx) {
  const arg = ctx.message.text.split(' ')[1];
  let filePath;
  if (arg === 'spohead') {
      filePath = './stock/spohead.json';
  } else if (arg === 'spo1b') {
      filePath = './stock/spoidv.json';
  } else {
      await ctx.reply('Format perintah tidak valid. Gunakan format yang benar  \n\n/addstock spohead\n/addstock spo1b.');
      return;
  }
  userStatus[ctx.from.id] = { status: 'waitingForStock', filePath };
  await ctx.reply('Masukkan stok Anda dengan format:\n\nstoksatu:pass\nstoksatu:pass\nstoksatu:pass');
}

async function textHandler(ctx) {
  const userId = ctx.from.id;
  const statusObj = userStatus[userId];

  if (statusObj && statusObj.status === 'waitingForStock') {
      try {
          const stockData = ctx.message.text.split('\n');

          let filePath;
          if (statusObj.filePath) {
              filePath = statusObj.filePath;
          } else {
              return;
          }

          let jsonData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

          stockData.forEach((stockEntry) => {
              const [email, pw] = stockEntry.split(':');
              if (email && pw) {
                  jsonData.push({ email, pw });
              }
          });

          fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

          delete userStatus[userId];

          await ctx.reply('Stok Anda berhasil disimpan.');
      } catch (error) {
          console.error('Gagal menyimpan stok:', error);
          await ctx.reply('Maaf, terjadi kesalahan saat menyimpan stok.');
      }
  }
}

function callbackQueryHandler(ctx) {
  const callbackData = ctx.callbackQuery.data;
  const fromUsername = ctx.callbackQuery.from.username;
  const chatType = ctx.callbackQuery.message.chat.type;

  const logMessage = `Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nPesan => [ ${colorize(callbackData, 'cyan')} ]\n`;
  console.log(logMessage);
}

module.exports = {
  startHandler,
  menuHandler,
  addStockHandler,
  textHandler,
  callbackQueryHandler
};
