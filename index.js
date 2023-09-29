class Node {
    constructor(data = null, right = null, left = null) {
        this.data = data,
        this.right = right, 
        this.left = left
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr)
    }
    buildTree(arr) {
        let sortedArray = mergeSort(arr)
        return sortedArrayToBST(sortedArray)
        
    }
    insert(value) {
        if (typeof value !== 'number') return 'The inputted value must be a number';
        let root = this.root
        while (true) {
            if (value > root.data && root.right === null) {
                root.right = new Node(value)
                return;
            } else if ( value < root.data && root.left === null) {
                root.left = new Node(value)
                return;
            } else if (value > root.data) {
                root = root.right
            } else if (value < root.data) {
                root = root.left
            } else {
                break;
            }
        }
    }
    delete(value) {

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
            } else
                continue;
            j++;
        }
        return leftHalf
    }
}

function sortedArrayToBST(sortedArray) {
    if (sortedArray.length < 2) return new Node(sortedArray[0]);
    else {
        let root = new Node(sortedArray.splice(sortedArray.length / 2, 1)[0])
        let leftHalf;
        let rightHalf;
        if (sortedArray.length === 1) {
            leftHalf = sortedArrayToBST(sortedArray.splice(0, 1));
        } else {
            leftHalf = sortedArrayToBST(sortedArray.splice(0, sortedArray.length / 2)); 
            rightHalf = sortedArrayToBST(sortedArray);
        }
        if (leftHalf.data < root.data) {
            root.left = leftHalf
        }
        if (rightHalf !== undefined && rightHalf.data > root.data) {
            root.right = rightHalf
        }
        return root
    }
}

let BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

BST.insert(10)
BST.insert(11)
BST.insert(6)
BST.insert(0)
BST.insert(2)

prettyPrint(BST.root)
// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]