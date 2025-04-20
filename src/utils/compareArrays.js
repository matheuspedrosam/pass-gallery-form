export default function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return true;
    
    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];

        if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
        return true;
        }
    }

    return false;
}