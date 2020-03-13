function myInstanceof(target, origin) {
  const proto = target.__proto__;
  while(proto&&proto !== origin.prototype){
    proto = proto.__proto__
  }
  return proto?true: false
}