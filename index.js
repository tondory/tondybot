const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const fetch = require('node-fetch')

const client = new Discord.Client();

let api = "https://api.godsunchained.com/v0/"

var perPage = 800
var amountOfPagesProto = 0
var amountOfPagesProperties = 0

var amountOfPagesMatches = 0
var perPageMatches = 20000

var cardToString = ""
var ID = []
var name = []
var effect = []
var set = []
var mana = []
var attack = []
var health = []

var username = []
var userID = []
var xpLevel = []
var wonMatches = []
var lostMatches = []

var matchHistoryPlayerWon = []
var matchHistoryPlayerLost = []
var matchHistoryPlayerInfo = []
var matchHistoryStartTime = []


let commands = ['commands', 'ping', 'cat', 'card', 'list', 'search', 'match', 'inventory', 'id']

const commandsEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Tondy Bot Commands')
    .addField(prefix + commands[1], ':angry:`use to boolie`', true)
    .addField(prefix + commands[2], ':cat:`displays a random cat picture`', true)
    .addBlankField()
    .addField(prefix + commands[3], ':card_index:`gets the data of a specific card`', true)
    .addField(prefix + commands[4], ':sloth:`gets a list of all available cards to pull data from`', true)
    .addBlankField()
    .addField(prefix + commands[5], ':dolphin:`.search cat returns all cards with cat`', true)
    .addField(prefix + commands[6], '`TBD`', true)
    .addBlankField()
    .addField(prefix + commands[7], '`gets total amount of cards`', true)
    .addField(prefix + commands[8], '`gets the id + matches won/lost of a user`', true)
    .addBlankField()


async function firstFetch() {
    client.channels.get('654035430710312960').send('Rebooting the super awesome Tondy Bot..')

    client.channels.get('654035430710312960').send('Fetching totals')
    // fetching api for total data
    await fetch(api + '/proto?page=0')
    .then(response => response.json())
    .then(data => {
        amountOfPagesProto = Math.ceil(data.total / perPage)
    })

    // fetching api for total data
    amountOfPagesProperties = 10
    // await fetch(api + '/properties')
    // .then(response => response.json())
    // .then(data => {
    //     amountOfPagesProperties = Math.ceil(data.total / perPage)
        
    // })

    var currentUnixTS = Math.round((new Date()).getTime() / 1000)
    var time = new Date()
    var lastTS = new Date(time.getFullYear(), time.getMonth(), (time.getDate() - 2))
    var lastUnixTS = lastTS.getTime() / 1000

    await fetch(api + '/match' + '?page=1&perPage=' + perPageMatches + '&start_time=' + lastUnixTS + '-' +currentUnixTS)
    .then(response => response.json())
    .then(data => {
        amountOfPagesMatches = Math.ceil(data.total / perPageMatches)
    })

    client.channels.get('654035430710312960').send('Getting all data..')
    // fetch all gu data
    try {await fetchingGUData()}
    catch (error){console.log(error)}
}


async function fetchingGUData()
// Grabbing all the necesarry data from each page
{
    client.channels.get('654035430710312960').send('Getting proto data')
    for (var i2 = 1; i2 <= amountOfPagesProto; i2++) {
        await fetch(api + '/proto' + '?page=' + i2 + '&perPage=' + perPage)
        .then(response => response.json())
        .then(async data => {
            for (var i = 1; i < perPage; i++)
            {
                if (data.records[i] != undefined)
                {
                    var dr = data.records
                    ID.push(dr[i].id)
                    name.push(dr[i].name)
                    effect.push(dr[i].effect)
                    set.push(dr[i].set)
                    mana.push(dr[i].mana)
                    attack.push(dr[i].attack.Int64)
                    health.push(dr[i].health.Int64)
                }
                else {}
            }
        })
    }
    client.channels.get('654035430710312960').send('Getting user properties of first ' + perPage*amountOfPagesProperties + ' users with most wins - example https://api.godsunchained.com/v0/properties?page=20&perPage=400&sort=won_matches&order=desc')
    //used to have amountOfPagesProperties but too many dead accounts - hardcoded 20 for now to speed up api call
    for (var i = 1; i <= amountOfPagesProperties; i++)
    {   
        //https://api.godsunchained.com/v0/properties?page=20&perPage=400&sort=won_matches&order=desc
        await fetch(api + '/properties' + '?page=' + i + '&perPage=' + perPage + '&sort=won_matches&order=desc')
        .then(response => response.json())
        .then(data => {
            for (var i = 1; i < perPage; i++)
            {
                if (data.records[i] != undefined)
                {
                    var dr = data.records
                    userID.push(dr[i].user_id)
                    xpLevel.push(dr[i].xp_level)
                    wonMatches.push(dr[i].won_matches)
                    lostMatches.push(dr[i].lost_matches)
                    username.push(dr[i].username)
                }
                else {}
            }
        })
        console.log(i + '/' + amountOfPagesProperties)
    }
    
    client.channels.get('654035430710312960').send('Done getting base stats')
}

client.once('ready', () => {
    try{firstFetch()}
    catch(error){console.log(error)}
});

client.on('message', async message => {
    let args = message.content.substring(prefix.length).split(" ")
    let member = message.mentions.members.first() || message.author

    //message.channel.send('pls fight ' + message.author).then(newMessage => {newMessage.delete(3000)})
    if (message.isMentioned('654010700569772042') == true)
    {
        var time = 1800

        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(time)
        message.channel.send('***Channels inner Super Saiyan***')
        await delay(time)
        message.channel.send('***Evil Smirk***')
        await delay(time)
        message.channel.send('**I guess i must respond..**')
        await delay(time)
        message.channel.send('***.***')
        await delay(time)
        message.channel.send('***.***')
        await delay(time)
        message.channel.send(message.author + '*** Decides to fire destructive comet***') 
        await delay(time)
        message.channel.send('***.***') 
        await delay(time)
        message.channel.send('***.***') 
        await delay(time)
        message.channel.send('***The smoke fades away***') 
        await delay(time)
        message.channel.send(message.author + '** Notices that Tondy Bot survived!**') 
        await delay(time)
        message.channel.send(message.author +  '*** angers***') 
        await delay(time)
        message.channel.send('***.***') 
        await delay(time)
        message.channel.send('***.***') 
        await delay(time)
        message.channel.send('*Suddenly there is super cool background music*') 
        await delay(time)
        message.channel.send('***.***') 
        await delay(time)
        message.channel.send(message.author + '*** gets mad and rushes towards Tondy Bot***') 
        await delay(time)
        message.channel.send(message.author + '*** Fires a left arm with incredible speed***') 
        await delay(time)
        message.channel.send('***Tondy Bot dodges and punches back! knocking ***' + message.author + '*** to oblivion! ***') 

    } else {}
    

function lookingForCard() {
    var lookingFor = []
    // this converts the array substring back to a string except for the first word cause i = 1
    // first word will be .card (command)
    for (var i = 1; i < args.length; i++) 
    {
        // filters undefined fields away such as spaces i think?
        
        if (args[i] != undefined)
        {
            // grabs every word and makes it lower case
            var filteredargs = args[i].toLowerCase()
            // make first letter uppercase of filteredargs
            var Capital = filteredargs.charAt(0).toUpperCase()
            // first letter in capital + the original word in lowercase but slice the first letter
            var completeCard = Capital + filteredargs.slice(1)

            lookingFor.push(completeCard)
        }
    }
    // join = take each element of the array and add it to a string with ' '
    cardToString = lookingFor.join(' ')
    return cardToString
}

function getId() {
    var localUser = []
    var lookingForUser = []
    var userToString = ''
    var userValid = false
    
    for (var i =1; i < args.length; i++)
    {
        if (args[i] != undefined)
        {
            var filteredargs = args[i].toLowerCase()
            lookingForUser.push(filteredargs)
        }
    }
    userToString = lookingForUser.join(' ')
    
    for (var i = 0; i < username.length; i++)
    {
        if (userToString === username[i].toLowerCase())
        {
                localUser.push(username[i])
                localUser.push(userID[i])
                localUser.push(xpLevel[i])
                localUser.push(wonMatches[i])
                localUser.push(lostMatches[i])
                userValid = true
        } 
        else {}
    }
    return {localUser, userValid}
}

async function lookingForMatch() {
    var currentUnixTS = Math.round((new Date()).getTime() / 1000)
    var time = new Date()
    var lastTS = new Date(time.getFullYear(), time.getMonth(), (time.getDate() - 2))
    var lastUnixTS = lastTS.getTime() / 1000

    message.channel.send('Fetching decklist..')
    // https://api.godsunchained.com/v0/match?perPage=200&page=300&start_time=1574899200-1576281600

    var lookingForId = 0
    var maxStartTime = 0


    if (args[1] == parseInt(args[1])) {
        console.log('args = int')
        lookingForId = args[1]
    }
    else {
        console.log(' args = string')
        getId()

        lookingForId = getId().localUser[1]
    }


    for (var i = 1; i <= amountOfPagesMatches; i++){
        await fetch(api + '/match' + '?page=' + i + '&perPage=' + perPageMatches + '&start_time=' + lastUnixTS + '-' +currentUnixTS)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < perPageMatches; i++)
                {if (data.records[i]) 
                    {   
                        dr = data.records[i]
                        if (lookingForId == dr.player_won || lookingForId == dr.player_lost)
                        {
                            // getting latest match
                            if (dr.start_time > maxStartTime)
                            {maxStartTime = dr.start_time}
                        }
                    }
                }
                
            for (var i = 0; i < perPageMatches; i++)
            {
                // if record exists
                if (data.records[i])
                {
                    //data.records goes here
                    dr = data.records[i]
                    // if id we are looking for = player won or lost
                    if (lookingForId == dr.player_won || lookingForId == dr.player_lost)
                    {
                        // if startime is latest match
                        if (maxStartTime == dr.start_time)
                        {   
                            // 2 values stored in player info -> 
                            for (var i2 = 0; i2 < 2; i2++)
                            {
                                // if id is id that we are looking for
                                if (dr.player_info[i2].user_id == lookingForId)
                                {
                                    var cards = dr.player_info[i2].cards
                                    var deckProto = []
                                    var deckCards = []

                                    //Getting card names and pushing them to to deckCards 
                                    for (var i3 = 0; i3 < cards.length; i3++)
                                    {
                                        deckProto.push(cards[i3])
                                        for (var i4 = 0; i4 < ID.length; i4++)
                                        {
                                            if (deckProto[i3] == ID[i4])
                                            {
                                                deckCards.push(name[i4])
                                            }
                                        }
                                    }

                                    //checking for duplicates
                                    for (var i5 = 0; i5 < deckCards.length; i5++) {
                                        for (var j = i5 + 1 ; j < deckCards.length; j++) {
                                             if (deckCards[i5] == deckCards[j]) {
                                                    console.log(i5, j)
                                                    deckCards.splice(j, 1)
                                                    deckCards.splice(i5, 1, '2x ' + deckCards[i5])
                                             }
                                        }
                                    }

                                    console.log(deckCards)
                                    deckString = deckCards.join('\n')
                                    message.channel.send(dr.player_info[i2].god + ' id: ' + lookingForId + ' at unix: ' + maxStartTime + 
                                    + '\n' + deckString)

                                    deckProto = []
                                    deckCards = []
                                    cards = dr.player_info[i2].cards
                                } else {}
                            }
                        }
                    }
                }
            }
        })
        console.log('fetched ' + i + '/' +amountOfPagesMatches)
    }
}


    
    switch(args[0]){
        //commands
        case commands[0]:
            message.channel.send(commandsEmbed)
        break;

        //ping
        case commands[1]:
            member === message.author ? message.channel.send(member.avatarURL)
            : message.channel.send(member.user.avatarURL)
        break;

        //cat
        case commands[2]:
            fetch("https://api.thecatapi.com/v1/images/search")
            .then(response => response.json())
            .then(data => {
                message.channel.send(data[0].url)
            })
        break;

        //card
        case commands[3]:

            lookingForCard()
            // find the current index of the name of the card that the user is looking for
            var index = name.findIndex(k => k==lookingForCard())
            
            console.log(args[1].length)

            // if index is not equal to undefined (-1) aka if the cardindex exists in index = name.findIndex
            if (index != -1)
            {
                message.channel.send('https://images.godsunchained.com/art2/375/' + ID[index] + '.webp')
                message.channel.send(name[index] + ' '+ mana[index] + ' :gem: '+ attack[index] +' :crossed_swords: '+ health[index] + ' :heart: ')
                if (effect[index] != "")
                {
                    message.channel.send(effect[index])
                }
            }
            else {
                message.channel.send('Use .search to double check the spelling')
            }

        break;

        //list of all names?
        case commands[4]:
            message.channel.send(name)
        break;

        //search
        case commands[5]:
            var Cards = []

            if (args[1].length > 1 )
            {
                for (var i = 0; i < name.length; i++)
                {
                    var ele = name[i].includes(lookingForCard())
                    // returns true or false
                    if (ele)
                    // if ele = true aka if value is found
                    {
                        Cards.push(name[i])
                    } else {}
                }
                
                //if cards is not empty aka if cards are found \n = new line
                if(Cards.length != 0){
                    message.channel.send('Did you mean: '+ '\n' + Cards.join('\n'))
                }
                else{
                    message.channel.send('No card for that you dipshit')
                }
               
            }
            else {
                client.channels.get('654035430710312960').send('Please provide > 1 character')
            }

            
        break;

        //match (get enemy deck + stats)
        case commands[6]:
            lookingForMatch();
            
        break;
 
        //get inventory
        case commands[7]:
            var ethAdress = args[1]

            fetch(api + '/user/' + ethAdress + '/inventory')
            .then(response => response.json())
            .then(async data => {
                await data.total === undefined ? message.channel.send('Please provide valid eth adress (example): **.' + commands[7] +' 0xC7e5283Fe9043a222a0c337Fa8B46B71270BEF7D **')
                :message.channel.send('User has: ' + data.total + ' total cards')
                
            })

        break;


        //get user id
        case commands[8]:
            getId()

            getId().userValid ? message.channel.send(getId().localUser[0] + ' id: ' + getId().localUser[1] + ' level: '+ getId().localUser[2] + ' won: ' + getId().localUser[3] + ' lost: ' + getId().localUser[4])
            : message.channel.send('still loading')
            
        break;
    }

})

client.login(token)
