function getMsg(className, havePhoto) {
  var itemList = document.getElementsByClassName(className);

  console.log(itemList);
  
  for(let item of itemList){
    console.log(`${item.name} - ${item.value}`)
  }

  // return Object;
}
