const onlineMessages  = ["This player isn't currently playing SkyBlock!", "This player disabled guesting invites in their SkyBlock settings!", "to visit Your Island!"];
const offlineMessages = ["This player isn't currently online on Hypixel!"];
const ignoreMessages = ["There was an error checking this player's status, try again later!"];

const chalk = require('chalk');

module.exports = class Tracker extends require('events') {

    constructor(staff) {

        super();

        this.player    = staff;
        this.expecting = false;
        this.state     = false;

    }

    ready = (send) => { 
        
        console.log(`\n[${chalk.magenta('~')}] Checking '${chalk.blueBright(this.player)}'...`);

        // If waits too long, skip.
        this.timeout = setTimeout(() => {
          
            this.emit('found', false);
            this.expecting = false;

        }, 30 * 60 * 1000);

        this.expecting = true;
        send(`/invite ${this.player}`);

    }

    chat = (formatted) => {
        
        if(!this.expecting) return;
        
        // Offline

        if(ignoreMessages.indexOf(formatted) > -1) this.state = false;

        if(offlineMessages.indexOf(formatted) > -1) this.state = false;

        // Online
        else if(onlineMessages.indexOf(formatted) > -1) this.state = true;

        else return;

        // Reset
        this.expecting = false;
        clearTimeout(this.timeout);

        // Output
        console.log(`[${this.state ? chalk.green('+') : chalk.red('-')}] ${chalk.blueBright(this.player)} ${this.state ? 'is' : 'isn\'t'} online.\n`);

        // Emit
        this.emit('found', this.state);

    }

}