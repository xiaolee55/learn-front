async function a(arr) {
  for (let i=0; i<arr.length; i++) {
    await setTimeout(() => {
      console.log(i)
    }, i*1000);
  }
}

a([1,2,3,4])