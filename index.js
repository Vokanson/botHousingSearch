const { Telegraf,Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
const mongoose = require("mongoose")
const Lot = require ('./models/lots');


const Calendar = require('telegraf-calendar-telegram')


let orderDates = []




    const calendar = new Calendar(bot, {
        startWeekDay: 1,
        weekDayNames: ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'],
        monthNames: [
            'Янв',
            'Фев',
            'Март',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек'
        ]
    })

    // listen for the selected date event
    calendar.setDateListener((ctx, date) =>{
        console.log(date)
        if (orderDates.length){
           if(orderDates.includes(date)) {
               ctx.reply(` ${date}"К сожалению эта дата уже занята"`)
           }else {
               orderDates.push(date)
               ctx.reply(`"Вы выбрали" ${date}`)
           }
        }else{
                orderDates.push(date)
                ctx.reply(`"Вы выбрали" ${date}`)
            }
    })
// retrieve the calendar HTML

    bot.command('start', async (ctx) => {
        ctx.reply(`Здравствуйте ${ctx.from.first_name} ${lot}`)
        const today = new Date()
        const minDate = new Date()
        minDate.setMonth(today.getMonth() - 2)
        const maxDate = new Date()
        maxDate.setMonth(today.getMonth() + 2)
        maxDate.setDate(today.getDate())

        const didReply = await ctx.reply(
            'Выбирете дату',
            calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar()
        )

        if (didReply) {
            console.log('Reply to /calendar command sent successfully.')
        } else {
            console.error(
                'Something went wrong with the /calendar command. Reply not sent.'
            )
        }
    })

    bot.catch((err) => {
        console.error('Error in bot:', err)
    })






// main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/houses');
    console.log("connected")
    let lots = await Lot.findOne({title:"lot 1"})
    return lots

}

let lot
main().then(lots => lot=lots);


bot.command('orders', (ctx) => ctx.reply(`"занятые даты" ${orderDates}`))
// bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}, choose the appropriate option ${lot}` ))
bot.help((ctx) => ctx.reply(text.commands))

// bot.use(async (ctx) => {
//     await ctx.reply(JSON.stringify(ctx.update, null, 2));
// });

bot.launch().then(() => console.log('Started'));

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
