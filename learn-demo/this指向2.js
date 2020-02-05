// function Ninja(){　　 　
//   this.whoAmI = function(){　　　 　　
//     return this;　　 　
//   }.bind(this);　
//  }　
// var ninja1 = new Ninja();　 
// var ninja2 = {　　 　
//   whoAmI: ninja1.whoAmI　 
// }

// console.log(ninja1.whoAmI()==ninja1)
// console.log(ninja2.whoAmI()==ninja2)


function Ninja(){ 　
  this.whoAmI = () => this; 
}
var ninja1 = new Ninja();
var ninja2 = { 　whoAmI: ninja1.whoAmI };
console.log(ninja1.whoAmI()==ninja1)
console.log(ninja2.whoAmI()==ninja2)