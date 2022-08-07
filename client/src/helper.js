export const replaceAt = (arr, index, value) => {
    const arrClone = arr.slice();
    arrClone.splice(index, 1, value);
    return arrClone;
}

export const insertAt = (arr, index, value) => {
    return [
        ...arr.slice(0, index),
        value,
        ...arr.slice(index)
    ]
}

export const removeAt = (arr, index) => {
    return [
        ...arr.slice(0, index), ...arr.slice(index + 1)
    ]
}