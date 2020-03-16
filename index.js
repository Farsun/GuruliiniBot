const Telegraf = require('telegraf')
require('dotenv').config()
console.log(process.env.TOKEN)

const laudebot = new Telegraf(process.env.TOKEN)
const regex1 = /[.,:;!?\"_-]/

const sendHelp = "CAACAgQAAxkBAANYXmvTsAvRPlnuWtY7YvRm4GzVLIoAAh0CAAK9EfYDRqMWJlBTCbkYBA"

// runs on command /start and is equivalent to laudebot.command('start', ctx => ...)
laudebot.start(ctx => ctx.reply('Taktisesta puuttuu edelleen tuoli!'))

// runs when audio is sent to the bot
laudebot.on('audio', ctx => ctx.reply('I must scream, but I have no ears.'))

// runs when a sticker or a photo is sent to the bot
laudebot.on(['sticker', 'photo'], ctx => {
  // use ctx.message to access information about the message
  const chatId = ctx.message.chat.id
  // this is equivalent to ctx.reply(...)
  return ctx.telegram.sendMessage(chatId, 'Gurulacam kiellettiin, älä postaa kuvia!')
  //return ctx.telegram.sendMessage(chatId, ctx.message.sticker.file_id)
})

// runs when someone types 'haskell' to the bot
laudebot.hears('haskell', ctx => ctx.reply('No mitä Rauski?'))

laudebot.command('suffiksoi', ctx => ctx.reply(suffiksoi(ctx)))
laudebot.command('indeksoi', ctx => ctx.reply(jalluindeksoi(ctx)))
laudebot.command('help', ctx => ctx.reply("Dokumentaatio osoitteessa http://gurula.wtf/helpdesk"))
laudebot.command('coronastatus', ctx => ctx.replyWithSticker(sendHelp))

laudebot.launch()

function jalluindeksoi(ctx) {
	let sanat = ctx.message.text.split(" ")
	let reply = "Antamasi summa on "
	let summa = parseFloat(sanat[1])
	let jalluindeksi = 16.98 //kovakoodattu koska oltiin käsiä.
	
	reply += summa / jalluindeksi + " jalluindeksiä"
	return reply
}

function suffiksoi(ctx) {
	let sanat = ctx.message.text.split(" ")
	let reply = ""
	for (let i = 1; i < sanat.length; i++) {
		let erikoismerkki = sanat[i].charAt(sanat[i].length - 1).search(regex1)
		if (erikoismerkki > -1){
			reply += sanat[i].substring(0, sanat[i].length - 1) + "mme" + sanat[i].charAt(sanat[i].length - 1) + " "
		} else {
			reply += sanat[i] + "mme "
		}
	}
	
	if (reply == "")
		reply = "tyhjä viestimme"
	return reply.trim()
}