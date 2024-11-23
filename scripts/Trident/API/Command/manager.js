import { Player, world } from "@minecraft/server";
import { MS, timeRegex } from "../../utils/converters";
export class CommandArg {
    constructor({ name, type, required, values, min, max, self, float, minLength, maxLength, matches, subArgs }) {
        this.name = name;
        this.type = type;
        this.required = required;
        this.values = values;
        this.min = min;
        this.max = max;
        this.self = self;
        this.subArgs = subArgs;
        this.float = float;
    }
    /**
     * Crates a literal argument type
     * @param name
     * @param required
     * @param values
     * @param subArgs
     * @returns
     * @remarks Use ```interaction.getString(argName)``` to get this argument
     */
    static literal(name, required, values, subArgs) {
        return new CommandArg({
            name,
            type: 'literal',
            required,
            values,
            min: undefined,
            max: undefined,
            self: undefined,
            float: undefined,
            minLength: undefined,
            maxLength: undefined,
            matches: undefined,
            subArgs
        });
    }
    /**
     * Crates a string argument type
     * @param name
     * @param required
     * @param subArgs
     * @returns
     * @remarks Use ```interaction.getString(argName)``` to get this argument
     */
    static string(name, required, minLength, maxLength, matches, subArgs) {
        return new CommandArg({
            name,
            type: 'string',
            required,
            values: undefined,
            min: undefined,
            max: undefined,
            self: undefined,
            float: undefined,
            minLength,
            maxLength,
            matches,
            subArgs
        });
    }
    /**
     * Crates a number argument type
     * @param name
     * @param required
     * @param min
     * @param max
     * @param subArgs
     * @returns
     * @remarks Use ```interaction.getInteger(argName)``` or ```interaction.getFloat(argName)``` to get this argument
     */
    static number(name, required, min, max, float, subArgs) {
        return new CommandArg({
            name,
            type: 'number',
            required,
            values: undefined,
            min,
            max,
            self: undefined,
            float,
            minLength: undefined,
            maxLength: undefined,
            matches: undefined,
            subArgs
        });
    }
    /**
     * Crates a boolean argument type
     * @param name
     * @param required
     * @param subArgs
     * @returns
     * @remarks Use ```interaction.getBoolean(argName)``` to get this argument
     */
    static boolean(name, required, subArgs) {
        return new CommandArg({
            name,
            type: 'boolean',
            required,
            values: undefined,
            min: undefined,
            max: undefined,
            self: undefined,
            float: undefined,
            minLength: undefined,
            maxLength: undefined,
            matches: undefined,
            subArgs
        });
    }
    /**
     * Crates a player argument type
     * @param name
     * @param required
     * @param self
     * @param subArgs
     * @returns
     * @remarks Use ```interaction.getPlayer(argName)``` to get this argument
     */
    static player(name, required, self, subArgs) {
        return new CommandArg({
            name,
            type: 'player',
            required,
            values: undefined,
            min: undefined,
            max: undefined,
            self,
            float: undefined,
            minLength: undefined,
            maxLength: undefined,
            matches: undefined,
            subArgs
        });
    }
    /**
     * Creates a time argument type
     * @param name
     * @param required
     * @param subArgs
     * @returns
     * @remarks Use ```interaction.getTime(argName)``` to get this argument
     */
    static time(name, required, subArgs) {
        return new CommandArg({
            name,
            type: 'time',
            required,
            values: undefined,
            min: undefined,
            max: undefined,
            self: undefined,
            float: undefined,
            minLength: undefined,
            maxLength: undefined,
            matches: undefined,
            subArgs
        });
    }
    /**
     * Creates a position argument type
     * @param name
     * @param required
     * @param relative
     * @param subArgs
     * @returns
     * @remarks This method will retrun three arguments in the format argNameX, argNameY, argNameZ
     * @remarks Remember to use the spread operator when using this function because it returns an array of arguments.
     * @remarks To get this argument as Vector3 you must use ```interaction.getPosition(argName)```
     */
    static position(name, required, subArgs) {
        return [
            new CommandArg({ name: `${name}X`, type: 'positionX', required, values: undefined, min: undefined, max: undefined, self: undefined, float: undefined, minLength: undefined, maxLength: undefined, matches: undefined, subArgs }),
            new CommandArg({ name: `${name}Y`, type: 'positionY', required, values: undefined, min: undefined, max: undefined, self: undefined, float: undefined, minLength: undefined, maxLength: undefined, matches: undefined, subArgs }),
            new CommandArg({ name: `${name}Z`, type: 'positionZ', required, values: undefined, min: undefined, max: undefined, self: undefined, float: undefined, minLength: undefined, maxLength: undefined, matches: undefined, subArgs })
        ];
    }
}
export class CommandInteraction {
    constructor(args, ctx) {
        this.args = {};
        this.args = args;
        this.ctx = ctx;
    }
    /**
     * Checks if the ctx used this argument
     * @param argName
     * @returns
     */
    hasArg(argName) {
        const value = this.args[argName];
        if (value)
            return true;
        return false;
    }
    /**
     * Gets a string type argument
     * @param argName
     * @returns
     */
    getString(argName) {
        const value = this.args[argName];
        if (typeof value === "string")
            return value;
        throw new Error(`Argument "${argName}" is not of type string.`);
    }
    /**
     * Gets an integer type argument
     * @param argName
     * @returns
     */
    getInteger(argName) {
        const value = this.args[argName];
        if (typeof value !== "number")
            throw new Error(`Argument "${argName}" is not of type number.`);
        if (!Number.isInteger(value))
            throw new Error(`Argument "${argName}" is not an integer.`);
        return value;
    }
    /**
     * Gets a float type argument
     * @param argName
     * @returns
     */
    getFloat(argName) {
        const value = this.args[argName];
        if (typeof value !== "number")
            throw new Error(`Argument "${argName}" is not of type number.`);
        if (Number.isInteger(value))
            throw new Error(`Argument "${argName}" is not a float.`);
        return value;
    }
    /**
     * Gets a boolean type argument
     * @param argName
     * @returns
     */
    getBoolean(argName) {
        const value = this.args[argName];
        if (typeof value === "boolean")
            return value;
        throw new Error(`Argument "${argName}" is not of type boolean.`);
    }
    /**
     * Gets a player type argument
     * @param argName
     * @returns
     */
    getPlayer(argName) {
        const value = this.args[argName];
        if (value instanceof Player)
            return value;
        throw new Error(`Argument "${argName}" is not of type player.`);
    }
    /**
     * Gets a time type argument
     * @param argName
     * @returns
     */
    getTime(argName) {
        const value = this.args[argName];
        if (!value?.match(timeRegex)?.length)
            throw new Error(`Argument "${argName}" is not of type time.`);
        return MS(value);
    }
    /**
     * Gets a position type argument
     * @param argName
     * @returns
     */
    getPosition(argName) {
        const args = Object.entries(this.args).filter(arg => arg[0].startsWith(argName));
        const vector = {
            x: args.find(arg => arg[0] === `${argName}X`)?.[1],
            y: args.find(arg => arg[0] === `${argName}Y`)?.[1],
            z: args.find(arg => arg[0] === `${argName}Z`)?.[1]
        };
        if (!vector?.x || !vector?.y || !vector?.z || isNaN(vector.x) || isNaN(vector.y) || isNaN(vector.z))
            throw new Error(`Argument "${argName}" is not of type position.`);
        return vector;
    }
    /**
     * Gets a raw argument
     * @param argName
     * @returns
     */
    getRawArg(argName) {
        const value = this.args[argName];
        return value;
    }
}
class CommandHandler {
    constructor() {
        this.commands = new Map();
    }
    /**
     * Registers a command in the server
     * @param command
     */
    registerCommand(command) {
        if (this.commands.has(command.name)) {
            throw new Error(`Command "${command.name}" is already registered.`);
        }
        this.commands.set(command.name, command);
    }
    /**
     * Gets a command instance
     * @param command
     * @returns
     */
    get(command) {
        return this.commands.get(command) || undefined;
    }
    /**
     * Gets all commands registered
     * @returns
     */
    all() {
        return this.commands.values();
    }
    /**
     * Executes a command line
     * @param commandLine
     * @param sender
     */
    executeCommand(commandLine, sender) {
        try {
            const { name, rawArgs: rawArguments } = parseCommandLine(commandLine);
            let command = this.commands.get(name);
            const commands = [...this.all()];
            if (!command)
                command = commands.find(command => command?.aliases?.length && command.aliases.includes(name));
            if (!command) {
                throw new Error(`Unknown command: ${name}. Please check that the command exists and that you have permission to use it.`);
            }
            const parsedArgs = {};
            function parseArgs(args, rawArgs, handler) {
                args.forEach((arg, index) => {
                    const rawArg = rawArgs[index];
                    if (arg.required && rawArg === undefined) {
                        throw new Error(`Missing required argument: ${arg.name}`);
                    }
                    if (rawArg !== undefined) {
                        parsedArgs[arg.name] = handler.parseArg(rawArg, arg, sender);
                    }
                    if (arg?.subArgs) {
                        const subArgs = arg.subArgs;
                        parseArgs(subArgs[rawArg], rawArgs.slice(index + 1), handler);
                    }
                });
            }
            parseArgs(command.args, rawArguments, this);
            console.warn(JSON.stringify(parsedArgs, undefined, 2));
            const interaction = new CommandInteraction(parsedArgs, sender);
            if (command?.requires && !command.requires(sender))
                throw new Error(`Unknown command: ${command.name}. Please check that the command exists and that you have permission to use it.`);
            command.execute(interaction);
        }
        catch (e) {
            sender.sendMessage(`§c${e}`);
            sender.playSound('block.false_permissions');
        }
    }
    /**
     * Parses a raw argument
     * @param value
     * @param arg
     * @param ctx
     * @returns
     */
    parseArg(value, arg, ctx) {
        const { type } = arg;
        switch (type) {
            case "string":
                return value;
            case "number":
                const num = Number(value);
                if (isNaN(num))
                    throw new Error(`Argument ${arg.name} must be a number`);
                if (arg?.min && num < arg.min)
                    throw new Error(`Argument ${arg.name} requires a number greather than or equal to ${arg.min}`);
                if (arg?.max && num > arg.max)
                    throw new Error(`Argument ${arg.name} requires a number less than or equal to ${arg.max}`);
                if (!arg?.float && !Number.isInteger(num))
                    throw new Error(`Argument ${arg.name} requires an integer number`);
                return num;
            case "boolean":
                if (value !== "true" && value !== "false") {
                    throw new Error(`Argument ${arg.name} must be a boolean`);
                }
                return value === "true";
            case "player":
                if (value === '@s' || value === '@p')
                    value = ctx.name;
                if (value === '@r') {
                    let players = world.getAllPlayers();
                    const randomPlayer = players[Math.floor(Math.random() * players.length)];
                    value = randomPlayer.name;
                }
                if (value.startsWith('@'))
                    value = value.replace('@', '').trim();
                if (value === ctx.name && !arg?.self)
                    throw Error(`Argument ${arg.name} requires a player that is not yourself`);
                const player = this.findPlayerByName(value);
                if (!player)
                    throw Error(`Argument of type player must be an online player`);
                return player;
            case 'literal':
                if (!arg?.values?.includes(value)) {
                    throw new Error(`Literal ${arg.name} must be: ${arg?.values?.join(' | ')}`);
                }
                return value;
            case 'time':
                if (!value?.match(timeRegex)?.length)
                    throw new Error(`Argument ${arg.name} must be of type time`);
                return value;
            case 'positionX': {
                const absoluteValue = Number(value);
                if (isNaN(absoluteValue))
                    throw new Error(`Argument ${arg.name} must be of type position`);
                return absoluteValue;
            }
            case 'positionY': {
                const absoluteValue = Number(value);
                if (isNaN(absoluteValue))
                    throw new Error(`Argument ${arg.name} must be of type position`);
                return absoluteValue;
            }
            case 'positionZ': {
                const absoluteValue = Number(value);
                if (isNaN(absoluteValue))
                    throw new Error(`Argument ${arg.name} must be of type position`);
                return absoluteValue;
            }
            default:
                throw new Error(`Unsupported argument type: ${type}`);
        }
    }
    /**
     * /Finds a player by it's name
     * @param name
     * @returns
     */
    findPlayerByName(name) {
        return world.getPlayers().find((p) => p.name === name) || undefined;
    }
}
const handler = new CommandHandler();
export default handler;
/**
 * Parses a command line to get it's raw arguments
 * @param commandLine
 * @returns
 */
function parseCommandLine(commandLine) {
    if (!commandLine || typeof commandLine !== "string") {
        throw new Error("commandLine must be a non-empty string.");
    }
    const regex = /"([^"]*)"|(\S+)/g;
    const matches = Array.from(commandLine.matchAll(regex));
    if (!matches.length) {
        throw new Error("No valid arguments found in command line.");
    }
    const args = matches.map(match => match[1] || match[2]);
    const [name, ...rawArgs] = args;
    if (!name) {
        throw new Error("Command name is missing or invalid.");
    }
    return { name, rawArgs };
}
