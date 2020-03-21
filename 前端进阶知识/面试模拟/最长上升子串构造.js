// let len = input[0]
// let arr = input[1].split(" ")
// let dp = []
// let res = 0
// let tmp = []

// for(let i=0;i<len;i++){
//     tmp.push(arr.slice().filter((item,index)=>index!=i))
// }

// for(let i=0;i<tmp.length;i++){
//     let t = tmp[i]
//     dp[i]=[]
//     for(let j=0;j<t.length;j++){
//         if(j==0){
//           dp[i][j]=1   
//         }else{
//           if(t[j]>=t[j-1]){
//           	dp[i][j] = dp[i][j-1]+1    
//           }else{
//             dp[i][j]=0
//           }
                
//         }
//     }
// }
// let max=0
// for(let i=0;i<dp.length;i++){
//     for(let j=0;j<dp[i].length;j++){
//         if(dp[i][j]>max) max=dp[i][j]
//     }
// }
// console.log(max)