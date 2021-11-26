export function capitalize(str) {
    return str && str.length
        ? str
              .toLowerCase()
              .split(' ')
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
        : str;
}
