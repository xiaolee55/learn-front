function Node(data,left,right) {
  this.data = data
  this.left = left
  this.right = right
}

Node.prototype = {
  show: function () {
    console.log(this.data)
  }
}

function Tree() {
  this.root = null
}

Tree.prototype = {
  insert: function (data) {  //构造二叉查找树
    var node = new Node(data,null,null)
    if(!this.root) {
      this.root = node
      return
    }
    var current = this.root
    var parent = null
    while(current) {
      parent = current
      if(data<parent.data) {
        current = current.left
        if(!current){
          parent.left = node
          return
        }
      }else {
        current = current.right
        if(!current) {
          parent.right = node
          return
        }
      }
    }
  },
  preOrder: function (node) {  //先序遍历，根->左子树->右子树
    if (node) {
        node.show();
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
  },
  middleOrder: function (node) {  //中序遍历，左子树->根->右子树
      if (node) {
          this.middleOrder(node.left);
          node.show();
          this.middleOrder(node.right);
      }
  },
  laterOrder: function (node) { //后序遍历，左子树->右子树->根
      if (node) {
          this.laterOrder(node.left);
          this.laterOrder(node.right);
          node.show();
      }
  },
  getMin: function () {   //获取最小值
      var current = this.root;
      while(current){
          if(!current.left){
              return current;
          }
          current = current.left;
      }
  },
  getMax: function () {   //获取最大值
      var current = this.root;
      while(current){
          if(!current.right){
              return current;
          }
          current = current.right;
      }
  },
  getDeep: function (node,deep) { //获取树的深度，递归，每次都找最大的子树
      deep = deep || 0;
      if(node == null){
          return deep;
      }
      deep++;
      var dleft = this.getDeep(node.left,deep);
      var dright = this.getDeep(node.right,deep);
      return Math.max(dleft,dright);
  },
  getNode: function (data, node) {
    if(!node) return null
    if(data===node.data){
      return node
    }else if(data<node.data){
      return this.getNode(data,node.left)
    }else if(data>node.data){
      return this.getNode(data,node.right)
    }
  }
}

var t = new Tree();
t.insert(3);
t.insert(8);
t.insert(1);
t.insert(2);
t.insert(5);
t.insert(7);
t.insert(6);
t.insert(0);
console.log(t);
// t.middleOrder(t.root);
console.log(t.getMin(), t.getMax());
console.log(t.getDeep(t.root, 0));
console.log(t.getNode(5,t.root));
