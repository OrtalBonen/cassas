export function areArrayItemsUnique(array: number[]) {
    return !(array.some(n => array.indexOf(n) !== array.lastIndexOf(n)))
} 