export let checkProductInCart = (_id: string): boolean => {
  let products = localStorage.getItem("carhartt-cart");
  if (!products) {
    return false;
  } else {
    if (JSON.parse(products).indexOf(_id) == -1) return false;
    return true;
  }
};

export let addProductToCart = (_id: string) => {
  let products = localStorage.getItem("carhartt-cart");
  if (!products) {
    let arr = [];
    localStorage.setItem("carhartt-cart", JSON.stringify([]));
    arr.push(_id);
    localStorage.setItem("carhartt-cart", JSON.stringify(arr));
  } else {
    if (JSON.parse(products).indexOf(_id) == -1) {
      let myArr = JSON.parse(localStorage.getItem("carhartt-cart")!);
      myArr.push(_id);
      localStorage.setItem("carhartt-cart", JSON.stringify(myArr));
    } else {
      return false;
    }
  }
};

export let removeProductFromCart = (_id: string) => {
  let myArr = JSON.parse(localStorage.getItem("carhartt-cart")!);
  myArr.splice(myArr.indexOf(_id), 1);
  localStorage.setItem("carhartt-cart", JSON.stringify(myArr));
};
