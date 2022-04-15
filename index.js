var Discord = require("discord.js");
const Canvas = require("canvas");
const ytdl = require("ytdl-core");
var Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});
const prefix = "r!"

Client.on("ready", () => {
    console.log("bot oppérationels")
});

Client.on("guildMemberAdd", async member => {
    console.log("un membre vient d'arriver sur le serveur");
    Client.channels.cache.get("964219307909324830").send("<@" + member.id +  "> est arrivée sur le serveur ");

    var canvas = Canvas.createCanvas(1024, 500);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./background.jpg");
    ctx.drawImage(background, 0, 0, 1024, 500);

    ctx.font = "42px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 410) ;

    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }));

    ctx.drawImage(avatar, 393, 47, 238, 238);

    var attachments = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

    Client.channels.cache.get("944639463747907604").send({files: [attachments]});
});

Client.on("guildMemberRemove", member => {
    console.log("un membre vient de quitter");
    Client.channels.cache.get("964219401958227998").send(member.displayName + " vient de quitter le serveur :sob: ");
})

Client.on("messageCreate", message => {
    if (message.author.bot) return ;
    if(message.channel.type == "DM") return;

    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear" )){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de message non ou mal définis");
            }
            else {
                let number = parseInt(args[1]);

            if(isNaN(number)){
                message.reply("non ou mal définis");
            }else {
                message.channel.bulkDelete(number).then(messages => {
                    console.log(" suppresion de " + message.size + " message réussis ." );
                }).catch(err => {
                    console.log(" erreur de suppresion de messages :" + err);
                });
            }
            }
        }
    }

    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention === undefined){
                message.reply("membre non ou mal mentioné");
            }
            else{
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + "a été bannis avac succès");
                }
                else{
                    message.reply("impossible de banir ce membre")
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();
            

            if (mention == undefined){
                message.reply("membre non ou mal mentionée");
            }
            else {
                if (mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName, + "a été kick avec succès");
                }
                else {
                    message.reply("impossible de kick ce membre")
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("pseudo non ou mal mantionée")
            }
            else {
                mention.roles.add("964552974837887006");
                message.reply(mention.displayName + " a été mute avec succès ")
                let mention = message.mentions.members.first();
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

        if(mention == undefined){
            message.reply("member non ou mal mentionée");
        }
        else {
            mention.roles.remove("964552974837887006");
            message.reply(mention.displayName + "a été unmute avec succès");
        }
        }

          
        
        }
        if (message.content === prefix + "youtube"){
        message.reply("ma chaine youtube: https://www.youtube.com/channel/UClJIFBWwh8FGq1-hIqP358g");
    }
    else if (message.content === prefix + "anniversaire"){
        message.reply("l'anniversaire du serveur est le 19 février !");
    }
    if (message.content === prefix + "support"){
        message.reply("un probleme ? n'ésite pas a aller dans #ticket ");
    }
    else if (message.content === prefix + "ipmc"){
        message.reply("l'ip du serveur est: rayoux240.aternos.me:44276 la version de mon serveur Minecraft est en 1.18.2 ! les crack sont autorisée !");
    }
    if (message.content === prefix + "twitch"){
        message.reply("ma chaine Twitch est: https://twitch.tv/levraierayoux");
    }
    if (message.content === prefix + "pp"){
        message.reply("photo de profil de rayoux: https://cdn.discordapp.com/attachments/919234225771786300/957206800535519242/unknown.png")
    }
    else if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
        .setTitle("liste des commandes du bot ")
        .setColor("AQUA")
        .setAuthor(" l'auteur du bot est : twitch_rayoux#0277", "https://cdn.discordapp.com/attachments/919234225771786300/957206800535519242/unknown.png")
        .setDescription(" ici, se trouve la liste de toute les commandes du bot .")
        .setThumbnail("https://cdn.discordapp.com/attachments/919234225771786300/957206800535519242/unknown.png")
        .addField("r!help", "affiche la liste des commandes du serveur.💁")
        .addField("r!youtube", "affiche ma chaine youtube🟥")
        .addField("r!twitch", "affiche ma chaine Twitch🟦 !")
        .addField("r!anniversaire", "affiche la date d'anniversaire du serveur🎂!")
        .addField("r!ipmc", "affiche l'ip de mon serveur minecraft ⛏️")
        .addField("r!support", "affiche que faire en cas de probleme sur le serveur 🆘")
        .addField("r!pp", "affiche la photo de profile de rayoux 🟠")
        .setImage("https://cdn.discordapp.com/attachments/919234225771786300/957206800535519242/unknown.png")
        .setTimestamp()
        .setFooter("ce bot appartient a rayoux", "https://cdn.discordapp.com/attachments/919234225771786300/957206800535519242/unknown.png");


    message.channel.send({ embeds: [embed]})
    }
});
Client.login(process.env.TOKEN);