const pContainer = document.querySelector(".products");
let prodArr = JSON.parse(localStorage.getItem("productsArray"));
let cartCount = document.getElementById("cart-count");

let prodArr2 = JSON.parse(localStorage.getItem("shopProducts")) || [];
if (prodArr2.length > 0) {
  cartCount.textContent = prodArr2.length;
} else {
  cartCount.textContent = 0;
}

function createProductCard() {
  prodArr.forEach((product) => {
    // Main container
    const productDiv = document.createElement("div");
    productDiv.className =
      "product text-white w-[30%] min-h-[400px] bg-neutral-300/10 rounded-[10px]";

    // Image section
    const imgWrapper = document.createElement("div");
    imgWrapper.className =
      "img relative cursor-pointer group w-full h-[250px] rounded-[10px] overflow-hidden";

    const overlay = document.createElement("div");
    overlay.className =
      "overlay absolute w-full h-full top-0 group-hover:bg-black/30 z-[1] duration-300";

    const img = document.createElement("img");
    img.src = product.pImage;
    img.alt = product.pName;
    img.className =
      "w-full h-full group-hover:scale-[1.1] z-[-1] duration-300 object-cover";

    imgWrapper.append(overlay, img);

    // Product info
    const info = document.createElement("div");
    info.className = "prdocut-info w-full my-5";

    const title = document.createElement("h4");
    title.className = "font-bold text-[1.5rem] my-2";
    title.textContent = product.pName;

    const desc = document.createElement("p");
    desc.className = "pDes mb-5 font-medium text-white opacity-60";
    desc.textContent = product.pDescription;
    // Rating + price
    const ratingWrapper = document.createElement("span");
    ratingWrapper.className = "text-white";

    for (let i = 0; i < 5; i++) {
      const star = document.createElement("i");
      star.className = "fa-solid fa-star text-[1.05rem]";
      ratingWrapper.appendChild(star);
    }

    const price = document.createElement("h4");
    price.className = "text-[1.4rem] font-bold my-2";
    price.textContent = `$${product.pPrice}`;

    ratingWrapper.appendChild(price);

    info.append(title, desc, ratingWrapper);

    // Button
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "button w-full";

    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = "Add Now";
    btn.addEventListener("click", () => {
      handleAddToCart(product.id);
      NotifyX.show({
        message: "Product Ordered Successfullt",
        type: "success",
        position: "top-right",
        duration: 4000,
        dismissible: true,
        onClose: () => {
          console.log("Notification was closed");
          // Perform cleanup or tracking
        },
      });
    });
    btn.className =
      "decoration-none block text-center hover:bg-slate-700 duration-300 cursor-pointer rounded-[5px]  font-bold w-full bg-slate-600 text-white py-3";

    btnWrapper.appendChild(btn);

    // Final structure
    productDiv.append(imgWrapper, info, btnWrapper);
    pContainer.appendChild(productDiv);
  });
}

let shopProducts = JSON.parse(localStorage.getItem("shopProducts")) || [];
createProductCard();

function handleAddToCart(id) {
  let curr = prodArr.find((product) => product.id == id);
  if (!curr) return;
  shopProducts.push(curr);
  localStorage.setItem("shopProducts", JSON.stringify(shopProducts));

  if (prodArr2.length > 0) {
    cartCount.textContent = prodArr2.length;
  } else {
    cartCount.textContent = 0;
  }
  setTimeout(() => {
    window.location.reload();
  },4000)
}
