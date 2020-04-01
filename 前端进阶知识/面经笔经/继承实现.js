function animal() {
  this.name = "animal"
  this.say = function() {
    console.log(this.name)
  }
}

function dog() {
  animal.call(this)
  this.name = "dog"
}

dog.prototype = Object.create(animal.prototype)
dog.prototype.constructor = dog