class Node {
    constructor(data = null, rightNode = null, leftNode = null) {
        this.data = data,
        this.rightNode = rightNode, 
        this.leftNode = leftNode
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr)
    }
    buildTree(arr) {
        let sortedArray = mergeSort(arr)

    }
}

function mergeSort(arr) {
    if (arr.length < 2) return arr;
    else {
        let leftHalf = mergeSort(arr.splice(0, Math.floor(arr.length / 2))); // imagine length = 2
        let rightHalf = mergeSort(arr) // imagine length = 3
        let j = 0;
        /**/
        for (let i = 0; i < rightHalf.length; i++) {
            if (leftHalf.includes(rightHalf[i])) {
                continue;
            } else if ((leftHalf.length === 1 && rightHalf[i] > leftHalf[j]) || rightHalf[i] > leftHalf[leftHalf.length - 1]){
                leftHalf.push(rightHalf[i]);
            } else if (leftHalf[j] > rightHalf[i]) {
                leftHalf.splice(j, 0, rightHalf[i]);
            } else if (rightHalf[i] > leftHalf[j]) {
                i--
            } 
            j++
        }
        return leftHalf
    }
}

console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 10, 67, 6345, 324]))