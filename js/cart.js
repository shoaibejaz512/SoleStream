let cartContainer = document.querySelector(".cart-container");
let cartCount = document.getElementById("cart-count");
let totalBill = document.querySelector("#total_bill");

let sum = 0;
let prodArr = JSON.parse(localStorage.getItem("shopProducts")) || [];


function generateCart(){
  
if(prodArr.length > 0){
  cartCount.textContent = prodArr.length;
  
prodArr.forEach((product, index) => {
  sum+= Number(product.pPrice);
  // Parent card
  const card = document.createElement("div");
  card.className =
    "cart-product flex cursor-pointer items-center justify-between bg-gray-200 rounded-lg p-4 hover:shadow-md transition";

  // Left section
  const left = document.createElement("div");
  left.className = "flex items-center gap-4";

  // Image
  const img = document.createElement("img");
  img.src = product.pImage;
  img.className = "w-14 h-14 rounded-full object-cover";

  // Text wrapper
  const textWrapper = document.createElement("div");

  // Title
  const title = document.createElement("h2");
  title.className = "font-semibold text-gray-800";
  title.textContent = product.pName;

  // Price
  const price = document.createElement("p");
  price.className = "text-sm text-gray-600";
  price.innerHTML = `Price: <span class="font-medium">$${product.pPrice}</span>`;

  // Append text
  textWrapper.append(title, price);

  // Append left section
  left.append(img, textWrapper);

  // Remove button
  const removeBtn = document.createElement("button");
//   removeBtn.addEventListener("click",() => {
//     deletItem(product.id);
//     NotifyX.show({
//   message: 'Product Deleted Successfully',
//   type: 'succeess',
//   position: 'top-right',
//   duration: 5000,
//   dismissible: true,
//   onClose: () => {
//     console.log('Notification was closed');
//     // Perform cleanup or tracking
//   }
// });
//  })
  removeBtn.className =
    "w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-red-600 transition";
  removeBtn.textContent = "✕";

  // Optional: remove item logic
  removeBtn.addEventListener("click", () => {
    prodArr.splice(index, 1);
    localStorage.setItem("shopProducts", JSON.stringify(prodArr));
       NotifyX.show({
  message: 'Product Deleted Successfully',
  type: 'success',
  position: 'top-right',
  duration: 3000,
  dismissible: true,
  onClose: () => {
    console.log('Notification was closed');
    // Perform cleanup or tracking
  }
});
   setTimeout(() => {
     location.reload();
   },3000)
  });

  // Final append
  card.append(left, removeBtn);
  cartContainer.appendChild(card);
});

}else{
  cartCount.textContent = 0;
  let heading = document.createElement("h1");
  heading.textContent = "Cart Empty"
  heading.className = "text-black/50 text-[2rem]  font-extrabold "
  cartContainer.appendChild(heading)
}
}

generateCart();



if(sum>0){
  totalBill.textContent = "$"+sum;
}else{
  totalBill.textContent = 0
}


const deletItem = (id) => {
  prodArr = prodArr.filter((curr) => curr.id != id);
  generateCart()
}