export const replaceAt = (arr, index, value) => {
    const arrClone = arr.slice();
    arrClone.splice(index, 1, value);
    return arrClone;
}