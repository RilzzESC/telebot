const { Telegraf } = require('telegraf');
const colorize = require('./controllers/collor.js')
const fs = require('fs')
const {
    startHandler,
    menuHandler,
    addStockHandler,
    textHandler,
    callbackQueryHandler
} = require('./controllers/command.js');
const {
    spotifyHandler,
    vidioHandler,
    youtubeHandler,
    apmusHandler,
    backToMenuHandler
} = require('./controllers/action.js');

const bot = new Telegraf('6748810084:AAGqdhavK-E6Dvw4mIpI_RfIZPT1W8X9i_I');

bot.use((ctx, next) => {
    const rilz = ctx.message;
    if (!rilz || !rilz.from || !rilz.from.username || !rilz.chat || !rilz.chat.type || !rilz.text) {
        return next(); // Lanjutkan ke handler berikutnya
    }

    const data = `Dari => ${colorize(rilz.from.username, 'yellow')} Di, ${colorize(rilz.chat.type, 'green')} chat\nPesan => [ ${colorize(rilz.text, 'cyan')} ]\n`;
    console.log(data);
    next(); // Lanjutkan ke handler berikutnya
});

// bot.on('callback_query', (ctx) => {
//     const callbackData = ctx.callbackQuery.data;
//     const fromUsername = ctx.callbackQuery.from.username;
//     const chatType = ctx.callbackQuery.message.chat.type;
//     const messageText = ctx.callbackQuery.message.text;

//     console.log(`Dari => ${colorize(fromUsername, "yellow")} Di, ${colorize(chatType, "green")} chat\nPesan => [ ${colorize(callbackData, 'cyan')} ]\n`);

// });


// Handler untuk perintah /start
bot.start(startHandler);

// Command implemen
bot.command('menu', menuHandler);
bot.command('stok', addStockHandler); 

// Action implemen
// bot.on('callback_query', callbackQueryHandler);
bot.action('spotify', spotifyHandler);
bot.action('vidio', vidioHandler);
bot.action('youtube', youtubeHandler);
bot.action('apmus', apmusHandler);
bot.action('menu', backToMenuHandler);

// bot in implemen
bot.on('text', textHandler);

// Starting bot
bot.launch();
