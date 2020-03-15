var findContentChildren = function(g, s) {
  g.sort((a,b)=>a-b);s.sort((a,b)=>a-b);
  let a=0,i=0,j=0
  console.log(g,s);
  
  while(i<g.length&&j<s.length){
    if(g[i]<=s[j]){
      i++;j++;
      a++
    }else{
        j++
    }
  }
  return a
};

findContentChildren([10,9,8,7],[5,6,7,8])