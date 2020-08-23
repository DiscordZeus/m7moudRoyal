const fs = require("fs");

module.exports = bot => {
  bot.servers = ["747138802212012053"];
  bot.commands = [];
  bot.chs = { active: "747139046987268216", not: "747139078792937502" };

  fs.readdir("./events", (err, files) => {
    if (err) return console.error(err);
    files
      .filter(file => file.endsWith(".js"))
      .map(file => {
        let event = require("../events/" + file);
        bot.on(file.split(".")[0], (...args) => event(bot, ...args));
      });
  });

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files
      .filter(cmd => cmd.endsWith(".js"))
      .map(cmd => {
        let command = require(`../commands/${cmd}`);
        bot.commands.push(command);
      });
  });
};
