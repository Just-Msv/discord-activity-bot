import dsc, { Intents } from 'discord.js'
import denv from 'dotenv'

denv.config()

let cli = new dsc.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_INTEGRATIONS
    ]
})

cli.on('ready', () => {
    console.log('Your Bot is now READY! Coded By Msv')

    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = cli.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'reply with pong',
    })

    commands?.create({
        name: 'act',
        description: 'starting activity',
        options: [
            {
                name: 'roomid',
                description: 'get room ID',
                required: true,
                type: dsc.Constants.ApplicationCommandOptionTypes.MENTIONABLE
            },
            {
                name: 'games',
                description: 'select your game',
                required: true,
                type: dsc.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})

cli.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    let {commandName, options} = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: `pong | ${cli.ws.ping} ms`,
            // ephemeral: true,
        })
    } else if (commandName === 'act') {
        // let op1 = options.getNumber('roomID')!
        // let op2 = options.getString('games')!

        let link = null

        interaction.reply({
            content: `Click Here to play : ${link}`
        })
    }
})

cli.login(process.env.TOKEN)
