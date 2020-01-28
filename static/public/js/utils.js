// Judge Data Type
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

// Clone Data
function clone(target) {
  let result,
    targetType = checkedType(target);
  if (targetType === "Object") {
    result = {};
  } else if (targetType === "Array") {
    result = [];
  } else {
    return target;
  }
  for (let i in target) {
    let value = target[i];
    if (checkedType(value) === "Object" || checkedType(value) === "Array") {
      result[i] = clone(value);
    } else {
      result[i] = value;
    }
  }
  return result;
}

// readFile & getImg's base64 Code
var getFiles = imgFileName => {
  var promise = new Promise((resolve, reject) => {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(imgFileName);
    fileReader.onloadend = handler;
    fileReader.onerror = throwErr;

    function handler() {
      // operation is DONE
      if (this.readyState === 2) {
        // console.log(fileReader);
        resolve(this.result);
      }
    }

    function throwErr() {
      reject(`It seems that we have some problems in read files: ${this.err}`);
    }
  });
  return promise;
};

//
var getNewData = itemList => {
  var newData = {};
  for (let item of itemList) {
    if (item.value !== "") {
      if (item.value === "text") {
        newData[item.name] = clone(item.value);
      } else if (item.type === "file") {
        getFiles(item.files[0]).then(imgBase64 => {
          console.log(imgBase64);
          newData[item.name] = imgBase64;
        });
      }
      // console.log(`${item.name} === ${item.value} === ${item.type}`);
    } else {
      alert(`${item.name}字段不得为空`);
      return;
    }
    // 清空输入框
    item.value = "";
  }
  return newData;
};
