/**
 * EXAMPLE OF A COMMAND THAT OPENS A FORM
 */
import handler from "../../API/Command/manager";
import { ActionForm } from "../../API/Form/ActionForm";
handler.registerCommand({
    name: 'form',
    description: 'Open form',
    args: [],
    category: 'test',
    execute(interaction) {
        new ActionForm()
            .setTitle('Trident Wrapper')
            .setBody(`§bYou are using trident wrapper by trident studios!`)
            .addButton('§eAccept', 'textures/items/paper', plr => plr.sendMessage(`§aAccepted!`))
            .addButton('§cCancel', 'textures/items/diamond', (plr) => plr.sendMessage(`§cCanceled!`))
            .send(interaction.ctx);
    },
});
