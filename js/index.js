let form = document.querySelector(".form-container");
let count = Number(localStorage.getItem("productCount")) || 0;

// Load existing products from localStorage
let productsArr = JSON.parse(localStorage.getItem("productsArray")) || [];
  let cartCount = document.getElementById("cart-count");

  let prodArr = JSON.parse(localStorage.getItem("shopProducts")) || [];
  if(prodArr.length > 0){
    cartCount.textContent = prodArr.length;
  }else{
    cartCount.textContent = 0;
  }

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let productName = document.getElementById("product-name").value.trim();
    let productPrice = document.getElementById("product-price").value.trim();
    let productDescription = document
      .getElementById("product-description")
      .value.trim();
    let productImage = document.getElementById("product-image").value.trim();

    if (!productName || !productPrice || !productDescription || !productImage) {
      return NotifyX.show({
  message: 'All fileds are required!',
  type: 'error',
  position: 'top-right',
  duration: 5000,
  dismissible: true,
  onClose: () => {
    console.log('Notification was closed');
    // Perform cleanup or tracking
  }
});;
    }

    count++;
    const product = {
        pName:productName,
        pPrice:productPrice,
        pDescription:productDescription,
        pImage:productImage,
        id:count,
    }
    localStorage.setItem("productCount", count);

    productsArr.push(product);

    //set productsarr to localstorage and get it to another file later 
    localStorage.setItem("productsArray",JSON.stringify(productsArr));
    form.reset();

    NotifyX.show({
  message: 'Product Created Successfully',
  type: 'success',
  position: 'top-right',
  duration: 5000,
  dismissible: true,
  onClose: () => {
    console.log('Notification was closed');
    // Perform cleanup or tracking
  }
});
  });
}