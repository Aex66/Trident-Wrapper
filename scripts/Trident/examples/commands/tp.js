/**
 * EXAMPLE OF A COMMAND THAT USES A POSITION ARGUMENT
 */
import { world } from "@minecraft/server";
import handler, { CommandArg } from "../../API/Command/manager";
handler.registerCommand({
    name: 'tp',
    category: 'test',
    description: 'Teleport to dimension',
    args: [
        CommandArg.literal('dimension', true, ['overworld', 'the_end', 'nether']),
        /**For position args you must use spread operator */
        ...CommandArg.position('location', true)
    ],
    execute(interaction) {
        const dimensionID = interaction.getString('dimension'), location = interaction.getPosition('location');
        interaction.ctx.teleport(location, { dimension: world.getDimension(dimensionID) });
        interaction.ctx.sendMessage(`§aYou have been teleported to §b${~~location.x}, ${~~location.y}, ${~~location.z}§a in §c${dimensionID}`);
    },
});
