const { Telegraf,Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
const mongoose = require("mongoose")
const Lot = require ('./models/lots');

main().catch(err => console.log(err));
let lotTitle
let ltitle
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/houses');
    console.log("connected")
    let lots = await Lot.findOne({title:"lot 1"})
    let ltitle = JSON.stringify(lots.title)
    let lotTitle = lots.title
    console.log(lots)
    console.log(ltitle)
    console.log(lots.title)
    return lots.title
}
let lots



bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}, choose the appropriate option ${ltitle}` ))
bot.help((ctx) => ctx.reply(text.commands))

// bot.use(async (ctx) => {
//     await ctx.reply(JSON.stringify(ctx.update, null, 2));
// });

bot.launch().then(() => console.log('Started'));

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
