import { system, world } from "@minecraft/server"
import handler from "./manager"
import config from "../../config";

world.beforeEvents.chatSend.subscribe(data => {
    const sender = data.sender
    let message = data.message
    
    if (!data.message.startsWith(config.prefix)) {
        return;
    }

    data.cancel = true
    
    const commandLine = message.slice(config.prefix.length).trim()
    system.run(() => handler.executeCommand(commandLine, sender));
});