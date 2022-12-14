export const fastParseInt = (str) => {
    let i = -1;
    let num = 0;
    while (str[++i]) {
        num = num * 10 + (str.charCodeAt(i) - 48);
    }
    return num;
};
