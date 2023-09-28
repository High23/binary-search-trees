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
}
