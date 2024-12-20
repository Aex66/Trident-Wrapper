/**
 * EXAMPLE OF AN ADVANCED COMMAND WITH SUBGROUPS AND ARGS
 */
import handler, { CommandArg } from "../../API/Command/manager";
import config from "../../config";
handler.registerCommand({
    name: 'game',
    category: 'test',
    description: 'Manage games',
    args: [
        CommandArg.literal('gameId', true, ['skywars', 'eggwars'], {
            "skywars": [
                CommandArg.literal('action', true, ['setloot', 'setmap'], {
                    "setloot": [
                        CommandArg.literal('loot', true, ['common', 'rare', 'epic', 'legendary'])
                    ],
                    "setmap": [
                        CommandArg.literal('map', true, ['desert', 'lava', 'grass'])
                    ]
                })
            ],
            "eggwars": [
                CommandArg.literal('action', true, ['seteggskin', 'setplayerteam'], {
                    "seteggskin": [
                        CommandArg.literal('eggskin', true, ['winter', 'halloween', 'normal'])
                    ],
                    "setplayerteam": [
                        CommandArg.player('target', true, true),
                        CommandArg.literal('team', true, ['yellow', 'blue', 'red', 'black']),
                    ]
                })
            ]
        })
    ],
    requires(player) {
        return player.hasTag(config.adminTag);
    },
    execute(interaction) {
        const gameId = interaction.getString('gameId');
        switch (gameId) {
            case 'eggwars':
                eggwars(interaction);
                break;
            case 'skywars':
                skywars(interaction);
                break;
        }
    },
});
function eggwars(interaction) {
    const action = interaction.getString('action');
    switch (action) {
        case 'seteggskin':
            const eggSkin = interaction.getString('eggskin');
            interaction.ctx.sendMessage(`§aYou set the eggwars egg skin to §e${eggSkin}`);
            break;
        case 'setplayerteam':
            const target = interaction.getPlayer('target');
            const team = interaction.getString('team');
            interaction.ctx.sendMessage(`§aYou set §7${target.name}'s §aeggwars team to §e${team}`);
            break;
    }
}
function skywars(interaction) {
    const action = interaction.getString('action');
    switch (action) {
        case 'setloot':
            const loot = interaction.getString('loot');
            interaction.ctx.sendMessage(`§aYou set the skywars loot to §e${loot}`);
            break;
        case 'setmap':
            const map = interaction.getString('map');
            interaction.ctx.sendMessage(`§aYou set the skywars map to §e${map}`);
            break;
    }
}
