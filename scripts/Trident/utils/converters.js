export const metricNumbers = (value) => {
    const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"], selectType = Math.log10(value) / 3 | 0;
    if (selectType == 0)
        return value;
    let scaled = value / Math.pow(10, selectType * 3);
    return scaled.toFixed(1) + types[selectType];
}, 
/**
* Convert string to hex
* @param {string} text
* @returns {number[]}
*/ // @ts-ignore
textToAscii = (text) => text.split('').map(char => char.charCodeAt()), 
/**
* Convert hex to string
* @param {number} hex
* @returns {string}
*/
asciiToText = (hex) => hex.map(char => String.fromCharCode(char)).join('');
export const timeRegex = /-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi;
export function MS(value, { compactDuration, fullDuration, avoidDuration } = {}) {
    try {
        if (typeof value === 'string') {
            if (/^\d+$/.test(value))
                return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            //@ts-ignore
            return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
        }
        if (typeof value === 'number')
            return toDuration(value, { compactDuration, fullDuration, avoidDuration });
        throw new Error('Value is not a string or a number');
    }
    catch (err) {
        const message = isError(err)
            ? `${err.message}. Value = ${JSON.stringify(value)}`
            : 'An unknown error has occured.';
        throw new Error(message);
    }
}
;
/**
 * Convert Durations to milliseconds
 */
const toMS = (value) => {
    const number = Number(value.replace(/[^-.0-9]+/g, ''));
    value = value.replace(/\s+/g, '');
    if (/\d+(?=y)/i.test(value))
        return number * 3.154e+10;
    if (/\d+(?=w)/i.test(value))
        return number * 6.048e+8;
    if (/\d+(?=d)/i.test(value))
        return number * 8.64e+7;
    if (/\d+(?=h)/i.test(value))
        return number * 3.6e+6;
    if (/\d+(?=m)/i.test(value))
        return number * 60000;
    if (/\d+(?=s)/i.test(value))
        return number * 1000;
    if (/\d+(?=ms|milliseconds?)/i.test(value))
        return number;
};
/**
 * Convert milliseconds to durations
 */
const toDuration = (value, { compactDuration, fullDuration, avoidDuration } = {}) => {
    const absMs = Math.abs(value);
    const duration = [
        { short: 'w', long: 'week', duration: Math.floor(absMs / 6.048e+8) },
        { short: 'd', long: 'day', duration: Math.floor(absMs / 8.64e+7) % 7 },
        { short: 'h', long: 'hour', duration: Math.floor(absMs / 3.6e+6) % 24 },
        { short: 'm', long: 'minute', duration: Math.floor(absMs / 60000) % 60 },
        { short: 's', long: 'second', duration: Math.floor(absMs / 1000) % 60 },
        { short: 'ms', long: 'millisecond', duration: absMs % 1000 }
    ];
    const mappedDuration = duration
        .filter(obj => obj.duration !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.duration)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.duration)}${obj.short}` : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? '' : 's'}`}`);
    const result = fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
    return result || `${absMs}`;
};
/**
 * A type guard for errors.
 */
const isError = (error) => {
    return typeof error === 'object' && error !== null && 'message' in error;
};
