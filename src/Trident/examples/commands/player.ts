/**
 * THIS IS AN EXAMPLE OF A COMMAND WITH ARGUMENTS
 */

import handler, { CommandArg } from "../../API/Command/manager";
import config from "../../config";

handler.registerCommand({
    name: 'player',
    description: 'Kick or ban players from your server!',
    category: 'test',
    args: [
        CommandArg.literal('action', true, ['kick', 'ban']),
        CommandArg.player('target', true, false)
    ],

    requires(player) {
        return player.hasTag(config.adminTag)
    },

    execute(interaction) {
        const action = interaction.getString('action') as 'kick' | 'ban'
        const target = interaction.getPlayer('target')

        switch(action) {
            case 'ban':
                interaction.ctx.sendMessage(`§aYou have banned §7${target.name}§a from your server!`)
            break;
            case 'kick':
                interaction.ctx.sendMessage(`§aYou have kicked §7${target.name}§a from your server!`)
            break;
        }
    },
})