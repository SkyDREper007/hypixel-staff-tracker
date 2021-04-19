# hypixel-staff-tracker
Davyd Malikov

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/mom-made-pizza-rolls.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)

# Hypixel SkyBlock Staff Tracker
The fastest Minecraft staff tracking bot you'll ever see!

Licenced to cayke, read the [licence here](https://github.com/SkyDREper007/hypixel-staff-tracker/blob/main/LICENSE.md).

## Forewarning
While this is the fastest method of finding out staff members (with a possible API off) this is **use at your own risk**. Players spamming specific staff members may be punished for "cheating". We are not responsible if you are banned, please use with caution.

Do not use this on SkyBlock profiles where you currently have flying soup, you will be indefinetly kicked for flying.

## Node Dependencies
Both NPM dependencies [mineflayer](https://www.npmjs.com/package/mineflayer) and [chalk](https://www.npmjs.com/package/chalk) are used in this repository.

You can quickly install the required packages by running `npm i` in the correct directory.

## Example
![Console of staff tracker](https://cdn.luke.mx/88d53b99-6d6a-48ca-9b73-8feeabf27e07.gif)

## Installation
Download [NodeJS](https://nodejs.org/) and run `npm i` your terminal, ensuring you `cd` to your designated folder.

```json
{
  "email": "dreper@example.com",
  "password": "WorkingIsBi69",
  "discordToken": "98yu289453yj245hu42hj254y3243u52u2uh42u6h2h",
  "discordGuild": "12345678912345",
  "discordChannel": "12345678912345"
}
```

Open **\src\data\config.json** and replace the data to suit your usage.

To have a live updating feed (still work in development) enter you [bot token](https://discord.com/developers), guild and channel ID.

Finally, to run the staff tracker in terminal, run `npm start` and read terminal for both in-game and logging messages.

## Support

If you need any support with the staff tracker or you're having issues, you may join our [discord](https://discord.gg/monkeys) or create an issue on GitHub.
