const { Telegraf,Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}`))
bot.help((ctx) => ctx.reply(text.commands))

// bot.use(async (ctx) => {
//     await ctx.reply(JSON.stringify(ctx.update, null, 2));
// });

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));