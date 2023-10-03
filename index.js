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
        if (typeof value !== 'number') return 'The inputted value must be a number';
        let nodeToBeReplaced = this.root;
        let parentNode;
        while (true) {
            if (nodeToBeReplaced.right && nodeToBeReplaced.right.data === value || nodeToBeReplaced.left && nodeToBeReplaced.left.data === value) {
                parentNode = nodeToBeReplaced;
            }
            if (value > nodeToBeReplaced.data) {
                nodeToBeReplaced = nodeToBeReplaced.right
            } else if (value < nodeToBeReplaced.data) {
                nodeToBeReplaced = nodeToBeReplaced.left
            } else {
                break;
            }
        }
        let replacementNode;
        let replacementNodeParent;
        if (nodeToBeReplaced.right !== null) {
            replacementNode = nodeToBeReplaced.right
            // 1 child node case
            if (replacementNode.right === null && replacementNode.left === null) {
                nodeToBeReplaced.data = replacementNode.data;
                nodeToBeReplaced.right = null
                return;
            }
            // 2 children node case
            while (true) {
                if (replacementNode.left === null) {
                    break;
                }
                replacementNodeParent = replacementNode
                replacementNode = replacementNode.left;
            }
            nodeToBeReplaced.data = replacementNode.data;
            if (replacementNodeParent.left === replacementNode) {
                
                replacementNodeParent.left = replacementNode.right;
            } else if (replacementNodeParent.right === replacementNode) {
                replacementNodeParent.right = replacementNode.left;
            }
            return;
        } else if (nodeToBeReplaced.left !== null) { // 1 child node case
            replacementNode = nodeToBeReplaced.left
            if (parentNode.left === nodeToBeReplaced) {
                parentNode.left = replacementNode;
            } else if (parentNode.right === nodeToBeReplaced) {
                parentNode.right = replacementNode;
            }
            return
        }
        // leaf node case
        if (parentNode.left === nodeToBeReplaced) {
            parentNode.left = null;
        } else if (parentNode.right === nodeToBeReplaced) {
            parentNode.right = null;
        }
    }
    find(value) {
        if (typeof value !== 'number') return 'The inputted value must be a number';
        let root = this.root
        while (true) {
            if (value > root.data) {
                root = root.right
            } else if (value < root.data) {
                root = root.left
            } else {
                return root
            }
        }
    }
    levelOrder(func) {
        let queue = [this.root];
        if (typeof func === 'function') {
            while (true) {
                if (queue.length === 0) {
                    return;
                }
                if (queue[0].left !== null) {
                    queue.push(queue[0].left)
                }
                if (queue[0].right !== null) {
                    queue.push(queue[0].right)
                }
                func(queue[0])
                queue.shift()
            }
        } else {
            let arrayOfValues = [];
            while (true){
                if (queue.length === 0) {
                    return arrayOfValues;
                }
                if (queue[0].left !== null) {
                    queue.push(queue[0].left)
                }
                if (queue[0].right !== null) {
                    queue.push(queue[0].right)
                }
                arrayOfValues.push(queue[0].data)
                queue.shift()
            }
        }
    }
    
    inorder(func, node = this.root) {
        if (node === null) return;
        if (typeof func === 'function') {
            this.inorder(func, node.left);
            func(node);
            this.inorder(func, node.right);
        } else {
            let arrayOfValues = [];
            let leftNode = this.inorder(func, node.left);
            if (Array.isArray(leftNode)) {
                arrayOfValues = arrayOfValues.concat(leftNode)
            }
            arrayOfValues.push(node.data)
            let rightNode = this.inorder(func, node.right);
            if (Array.isArray(rightNode)) {
                arrayOfValues = arrayOfValues.concat(rightNode)
            }
            return arrayOfValues
        }
        
    }
    preorder(func, node = this.root) {
        if (node === null) return;
        if (typeof func === 'function') {
            func(node);
            this.preorder(func, node.left);
            this.preorder(func, node.right);
        } else {
            let arrayOfValues = [];
            arrayOfValues.push(node.data)
            let leftNode = this.preorder(func, node.left);
            if (Array.isArray(leftNode)) {
                arrayOfValues = arrayOfValues.concat(leftNode)
            }
            let rightNode = this.preorder(func, node.right);
            if (Array.isArray(rightNode)) {
                arrayOfValues = arrayOfValues.concat(rightNode)
            }
            return arrayOfValues
        }
    }
    postorder(func, node = this.root) {
        if (node === null) return;
        if (typeof func === 'function') {
            this.postorder(func, node.left);
            this.postorder(func, node.right);
            func(node);
        } else {
            let arrayOfValues = [];
            let leftNode = this.postorder(func, node.left);
            if (Array.isArray(leftNode)) {
                arrayOfValues = arrayOfValues.concat(leftNode)
            }
            let rightNode = this.postorder(func, node.right);
            if (Array.isArray(rightNode)) {
                arrayOfValues = arrayOfValues.concat(rightNode)
            }
            arrayOfValues.push(node.data)
            return arrayOfValues
        }
    }
    height(node) {
    }
    depth(node) {

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

let BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

/*
BST.insert(10)
BST.insert(11)
BST.insert(6)
BST.insert(0)
BST.insert(2)
BST.insert(212)
BST.insert(7000)


BST.delete(4) 

BST.inorder(function test(node){
    console.log(node)
})
BST.preorder(function test(node){
    console.log(node)
})
BST.postorder(function test(node){
    console.log(node)
}) */
console.log(BST.preorder())
console.log(BST.height(BST.find(23)))
prettyPrint(BST.root)
// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]