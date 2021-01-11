export function objectToString(obj, ndeep) {
    if (obj == null) {
        return String(obj);
    }
    switch (typeof obj) {
        case "string":
            return '"' + obj + '"';
        case "function":
            return obj.name || obj.toString(); 
        case "object":
            var indent = Array(ndeep || 1).join('    '),
                isArray = Array.isArray(obj);
            return '{['[+isArray] + Object.keys(obj).map(function (key) {
                return '\n    ' + indent + (isNaN(parseInt(key)) ? key + ':' : '') + ' ' + objectToString(obj[key], (ndeep || 1) + 1);
            }).join(',') + '\n' + indent + '}]'[+isArray];
        default:
            return obj.toString();
    }
}