const Tracker    = require('./tracker.js');

const config     = require('./data/config.json');
const staff      = require('./data/staff.json');
const minecraft  = require('mineflayer');

const discord    = require('./bot.js');

const server     = require('./server/server.js');

const bot = minecraft.createBot({
    host: 'mc.hypixel.net',
    port: 25565,
    username: config.email,
    password: config.password,
    version: false
});


const getText = input => {
    let out = "";
    Object.keys(input).forEach(k => {
        let v = input[k];
        if(k == 'text') out += v;
        else if (typeof v == 'object' && v.length != undefined) {
            v.forEach(i => { out += getText(i); });
        }
    });
    return out;
}

//

let trackers = {};

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

bot.on('message', (message) => {

    let chat = getText(message).replace(/(§[0-9a-z]?)/g, '');
    
    // Garbage matte
    if(chat.indexOf('Mana') > -1) return;

    // Log to STDOUT
    // console.log(chat);
    
    // Check for kicks
    if(chat.indexOf('A kick occurred in your connection, so you were put in the SkyBlock lobby!') > -1) setup();
    if(chat.indexOf('There was a problem joining SkyBlock, try again in a moment!') > -1) setup();

    // Chat message before trackers are initialized.
    if(Object.keys(trackers).length == 0) return;
    staff.forEach(s => trackers[s].chat(chat));

})

bot.once('login', () => {

    console.log('Logged in!');
    setup();

});

//

function setup() {

    trackers = {};
        
    sleep(500);
    bot.chat('/lobby ptl');
    sleep(1000);
    bot.chat('/whereami');
    sleep(1000);
    bot.chat('/nick reset');
    sleep(1500);
    bot.chat('/skyblock');
    sleep(1000);
    bot.chat('/whereami');
    sleep(5000);

    staff.forEach(s => {
        
        let tracker = new Tracker(s);
        tracker.on('found', () => {

            // Update web server
            server.update(trackers);

            // Update Discord bot
            discord.update(trackers);

            // Next member
            let next = staff[staff.indexOf(s) + 1];

            // Wait added time if end of list
            let time = next ? 750 : 30 * 1000;

            if(!next) {
                
                console.log('Completed round.');

                sleep(500);
                bot.chat('/l ptl');
                sleep(1000);
                bot.chat('/whereami');
                sleep(1000);
                bot.chat('/play skyblock');
                sleep(1000);
                bot.chat('/whereami');
                sleep(1500);

            }


            // Wait, then go to next staff member
            setTimeout(() => {
                
                // Reached the end!
                if(!next) next = staff[0];

                trackers[next].ready((message) => bot.chat(message))

            }, time);

        });

        // 'TJBRUCE17594': [Tracker tracker]. 
        trackers[s] = tracker;

    });


    // Initialize first tracker
    setTimeout(() => trackers[staff[0]].ready((message) => bot.chat(message)), 4000);

    /*

     E.g is 'tjbruce17594' online?
     
     trackers['tjbruce17594'].state
     // true (online) / false (offline / unknown).

    */
}

//

bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn));
bot.on('error', err => console.log(err));