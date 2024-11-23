/**
 * EXAMPLE OF A BASIC COMMAND
 */
import handler from "../../API/Command/manager";
handler.registerCommand({
    name: 'ping',
    description: 'Ping Pong',
    args: [],
    category: 'test',
    execute(interaction) {
        interaction.ctx.sendMessage('Pong');
    },
});
