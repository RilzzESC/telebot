const { Markup } = require('telegraf');
const colorize = require('./collor')


// Handler untuk menanggapi tombol yang ditekan
function spotifyHandler(ctx) {
  const fromUsername = ctx.callbackQuery.from.username;
  const chatType = ctx.callbackQuery.message.chat.type;
  const callbackData = 'Spotify'; // Anda dapat mengubah nilai callbackData sesuai dengan kebutuhan

  // Mencetak pesan ke konsol
  const logMessage = `Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nTelah menekan tombol [ ${colorize(callbackData, 'cyan')} ]\n`;
  console.log(logMessage);

  ctx.editMessageText('Anda memilih Spotify', Markup.inlineKeyboard([
    [
      Markup.button.callback('Kembali', 'menu')
    ]
  ]));
}

function vidioHandler(ctx) {
  const fromUsername = ctx.callbackQuery.from.username;
  const chatType = ctx.callbackQuery.message.chat.type;
  const callbackData = 'Vidio'; // Anda dapat mengubah nilai callbackData sesuai dengan kebutuhan

  // Mencetak pesan ke konsol
  const logMessage = `Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nTelah menekan tombol [ ${colorize(callbackData, 'cyan')} ]\n`;
  console.log(logMessage);

  ctx.editMessageText('Anda memilih Vidio', Markup.inlineKeyboard([
    [
      Markup.button.callback('Kembali', 'menu')
    ]
  ]));
}

function youtubeHandler(ctx) {
  const fromUsername = ctx.callbackQuery.from.username;
  const chatType = ctx.callbackQuery.message.chat.type;
  const callbackData = 'Youtube'; // Anda dapat mengubah nilai callbackData sesuai dengan kebutuhan

  // Mencetak pesan ke konsol
  const logMessage = `Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nTelah menekan tombol [ ${colorize(callbackData, 'cyan')} ]\n`;
  console.log(logMessage);

  ctx.editMessageText('Anda memilih Youtube', Markup.inlineKeyboard([
    [
      Markup.button.callback('Kembali', 'menu')
    ]
  ]));
}

function apmusHandler(ctx) {
  const fromUsername = ctx.callbackQuery.from.username;
  const chatType = ctx.callbackQuery.message.chat.type;
  const callbackData = 'Apple Music'; // Anda dapat mengubah nilai callbackData sesuai dengan kebutuhan

  // Mencetak pesan ke konsol
  const logMessage = `Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nTelah menekan tombol [ ${colorize(callbackData, 'cyan')} ]\n`;
  console.log(logMessage);

  ctx.editMessageText('Anda memilih Apple Music', Markup.inlineKeyboard([
    [
      Markup.button.callback('Kembali', 'menu')
    ]
  ]));
}

function backToMenuHandler(ctx) {
  const fromUsername = ctx.callbackQuery.from.username;
  const chatType = ctx.callbackQuery.message.chat.type;
  const callbackData = 'Kembali'; // Anda dapat mengubah nilai callbackData sesuai dengan kebutuhan

  // Mencetak pesan ke konsol
  const logMessage = `Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nTelah menekan tombol [ ${colorize(callbackData, 'cyan')} ]\n`;
  console.log(logMessage);
  
  ctx.editMessageText('Silakan pilih:', Markup.inlineKeyboard(
    ([
      [
        Markup.button.callback('Spotify', 'spotify'),
        Markup.button.callback('Apple Music', 'apmus')
      ],
      [
        Markup.button.callback('Vidio', 'vidio'),
        Markup.button.callback('Youtube', 'youtube')
      ],
    ])
  ));
}

module.exports = {
  spotifyHandler,
  vidioHandler,
  youtubeHandler,
  apmusHandler,
  backToMenuHandler
};
