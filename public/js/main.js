
const client = contentful.createClient({
  space: "t6x3u1dqycdr",
  accessToken: "k1NDWNbUypRzam_hbMrtGNHBTA2-SAoY1Prc0eBY-FI"
});


// variables
let el = {};
let k = 1;
let im = "";
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const viewBtn = document.querySelector(".view-btn");

//variables checkout

const checkoutOverlay = document.querySelector('.checkout-overlay');
const checkoutDom = document.querySelector('.checkout');
const checkoutItems = document.querySelector('.checkout-items');
const checkoutContent = document.querySelector('.checkout-content');
const checkoutCloseBtn = document.querySelector('.close-checkout');
const checkoutBtn = document.querySelector(".checkout-btn");

//variables final
const finalOverlay = document.querySelector('.final-overlay');
const finalDOM = document.querySelector('.final');
const finalContent = document.querySelector('.final-content');
const finalCloseBtn = document.querySelector('.close-final');
const finalBtn = document.querySelector('.final-btn');

//variables confiramtion
const confOverlay = document.querySelector('.conf-overlay');
const confDOM = document.querySelector('.conf');
const confContent = document.querySelector('.conf-content');
const confCloseBtn = document.querySelector('.close-conf');
const cont = document.querySelector('.conf-btn');

//variables item
const itemOverlay = document.querySelector('.item-overlay');
const itemDOM = document.querySelector('.item');
const itemContent = document.querySelector('.item-content');
const itemCloseBtn = document.querySelector('.close-item');
const itemBtn = document.querySelector('.item-btn');
const left = document.querySelector(".left");
const right = document.querySelector(".right");

let cart = [];
let i = 1;
let deliveryPrice = 294.99;//menjaj ovo u skaldu za cenom



// products
class Products {
  async getProducts() {
    try {
      let contentful = await client.getEntries({
        content_type: "products"
      });
      // let result = await fetch("products.json");
      // let data = await result.json();
      let products = contentful.items;
      products = products.map(item => {
        const { title, price, txt, oldprice,  } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        const img = item.fields.img.fields.file.url;
        const slika =  item.fields.slika.fields.file.url;
        return { title, price, id, image, txt, oldprice,img,slika};
      });
      console.log(products);
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

function doleft(){
  console.log("hello");
  k=k-1;
  if (k<0) {
    k=1
  } 
}
function doright(){
  console.log("hello");
  k=k+1;
  if (k>3) {
    k=1
  } 
}
function showc(){
    let date = getDate();
    let time = getTime();
    confOverlay.classList.add("transparentBcgconf");
    confDOM.classList.add("showconf");
    let us = getUserInfo();
    const div = document.createElement("div");
    div.classList.add("conf-content");
    div.innerHTML = `
        <label for="fname"> <b>VAŠA NARUDŽBINA JE PRIHVAĆENA ! </b></label> 
        <i class="fas fa-check-circle" style="color:#f09d51;" ></i>
        <br>
        <br>
        <label for="fname"> DATUM : ${date} </label> 
        <br>
        <br>
        <label for="fname"> VREME : ${time} </label> 
        <br>
        <br>
        `;
    confContent.appendChild(div);
}
function alertUser() {
  window.alert("Vasa Narudzbina je prosledjena! Kliknite NASTAVI")
}
function rand(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
}
function makeCartString() {
  let str = "";
  cart.forEach(item => {
    str += item.title;
    str += " x"
    str += item.amount;
    str += "  "
  })
  return str;
}
function getUserInfo() {
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const add = document.getElementById('add').value;
  const email = document.getElementById('email').value;
  const city = document.getElementById('city').value;
  const user = {
    fname,
    lname,
    add,
    email,
    city
  };
  return user;
};
function getCartTotal() {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  return tempTotal.toFixed(2);
}
function setValues(cart) {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  cartItems.innerText = itemsTotal;
}
function getDate() {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date;
}
function getTime() {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}
function mailData() {
  let us = getUserInfo();
  let total = getCartTotal();
  console.log(us)
  console.log(total)
  console.log(cart);
}

//final
class Final {
  setupFinal() {
    finalBtn.addEventListener("click", this.showFinal)
    finalCloseBtn.addEventListener("click", this.hideFinal);
  }
  showFinal() {
    finalOverlay.classList.add("transparentBcgFinal");
    finalDOM.classList.add("showFinal");
    let us = getUserInfo();
    let ja = makeCartString();
    let total = 0;
    let num = 0;
    num = rand(1000, 10000);
    let sum = 0;
    total = getCartTotal();
    if (total > 1999.99) {
      deliveryPrice = 0;
    }
    var result = parseFloat(total) + parseFloat(deliveryPrice);
    var temp = result.toFixed(2);
    const div = document.createElement("div");
    div.classList.add("final-content");
    div.innerHTML = `
      <form action="/purchase" method="POST">
      <label for="fname"> Ime :</label>
      <input type="text" id="fname" name="ime" value ="${us.fname}" /> 

      <label for="lname"> Prezime :</label>
      <input type="text" id="lname" name="prezime" value ="${us.lname}" /> 

      <label for="adresa"> Adresa :</label>
      <input type="text" id="adresa" name="adresa" value ="${us.add}" /> 
        <label for="nar"> Narudzbina :   </label>
        <input type="text" id="items" name="items" value ="${ja}" /> 
        <hr>
        <br>
        <label for="rdbr"> BROJ NARUDZBINE :  </label> 
        <input type="text" id="rdbr" name="rdbr" value ="#${num}" /> 
        <br>
        <br>
        <label> Cena Proizvoda : рсд ${total}  </label>
        <br>
        <br>
        <label> Dostava od : рсд ${deliveryPrice}   </label>
        <br>
        <label> (zavisi od lokacije i težine pošiljke)   </label>
        <br>
        <br>
        <label> Ukupno  :  рсд ${temp} </label>
        <br>
        <br>
        <button type="submit" class="clear-cart banner-btn checkout-btn end-btn"
        onclick = "showc()">Prosledi</button>
        <br>
        <br>
        </form>
        `;
    finalContent.appendChild(div);
  }
  hideFinal() {
    finalOverlay.classList.remove("transparentBcgFinal");
    finalDOM.classList.remove("showFinal");
    finalContent.innerHTML = "";
  }
}

//checkout
class Checkout {
  setupCheckout() {
    checkoutBtn.addEventListener("click", this.showCheckout)
    checkoutCloseBtn.addEventListener("click", this.hideCheckout);
    finalBtn.addEventListener("click", this.hideCheckout);
  }
  showCheckout() {
    checkoutOverlay.classList.add("transparentBcgCheckout");
    checkoutDom.classList.add("showCheckout");
    console.log(cart);
    makeCartString();
  }
  hideCheckout() {
    checkoutOverlay.classList.remove("transparentBcgCheckout");
    checkoutDom.classList.remove("showCheckout");
  }
}

//confirmation
class Conf {
  setupConfirmation() {
    confCloseBtn.addEventListener("click", this.hideConf);
    cont.addEventListener("click", () => {
      this.hideConf();
      mailData();
      this.makePurchase();//clears cart 
      location.reload();
    });
  }
  showConf() {
    let date = getDate();
    let time = getTime();
    confOverlay.classList.add("transparentBcgconf");
    confDOM.classList.add("showconf");
    let us = getUserInfo();
    const div = document.createElement("div");
    div.classList.add("conf-content");
    div.innerHTML = `
        <label for="fname"> <b>VAŠA NARUDŽBINA JE PRIHVAĆENA ! </b></label> 
        <i class="fas fa-check-circle" style="color:#f09d51;" ></i>
        <br>
        <br>
        <label for="fname"> DATUM : ${date} </label> 
        <br>
        <br>
        <label for="fname"> VREME : ${time} </label> 
        <br>
        <br>
        `;
    confContent.appendChild(div);
  }
  hideConf() {
    confOverlay.classList.remove("transparentBcgconf");
    confDOM.classList.remove("showconf");
    confContent.innerHTML = "";
  }
  makePurchase() {
    cart = [];
    setValues(cart);
    Storage.saveCart(cart);
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach(button => {
      button.disabled = false;
      button.innerHTML = `<i class="fas fa-shopping-cart"></i>dodaj u korpu`;
    });
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

}

// ui
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach(product => {
      result += `
     <!-- single product -->
          <article class="product">
            <div class="img-container">
              <img
                src=${product.image}
                alt="product"
                class="product-img"
              />
              <button class="bag-btn" data-id=${product.id}>
                <i class="fas fa-shopping-cart"></i>
                dodaj u korpu
              </button>
            </div>
            <h3 style="color: rgb(153, 33, 93);">${product.title}</h3>
            <br>
            <h9 style="color: rgb(153, 33, 93);">RSD ${product.oldprice}</h9>
            <br>
            <h4 style="color: rgb(153, 33, 93);">RSD ${product.price}</h4>
            <br>
            <button class=" view-btn" data-image=${product.img} data-slika=${product.slika} data-id=${product.id} data-title="${product.title}" data-price=${product.price} data-img=${product.image} data-txt="${product.txt}"
            <i class="fas fa-eye" style="color:#fff;" ></i>
                Pogledaj
              </button>
          </article>
          <!-- end of single product -->
     `;
    });
    productsDOM.innerHTML = result;
  }
  hideItem() {
    itemOverlay.classList.remove("transparentBcgItem");
    itemDOM.classList.remove("showItem");
    itemContent.innerHTML = "";
  }
  getViewButtons() {
    const buttons = [...document.querySelectorAll(".view-btn")];
    buttons.forEach(element => {
      element.addEventListener("click", () => {
        itemOverlay.classList.add("transparentBcgItem");
        itemDOM.classList.add("showItem");
        el = element.dataset
        console.log(el)
        let n = 0;
        n = rand(80, 230);
        const div = document.createElement("div");
        div.classList.add("info-content");
        div.innerHTML =  `
        <h2>${el.title}</h2>`;
        
        div.innerHTML+= `<div class="view-item">
          <img src="${el.img}" id="myImage" />
         </div>
         <button class="left" onclick="document.getElementById('myImage').src='${el.slika}'" > <i class="fas fa-angle-double-left" ></i> </button>
         <button class="middle" onclick="document.getElementById('myImage').src='${el.img}'" > <i class="far fa-circle"></i> </button>
         <button class="right" onclick="document.getElementById('myImage').src='${el.image}'"> <i class="fas fa-angle-double-right"></i> </button>
         <br><br>
        <div>`
        div.innerHTML+= ` <label for="price"> Cena : RSD ${el.price}</label>
        <br>
        <br>
        <label for="info"> O proizvodu :</label>
        <br>
        <p> <pre> ${el.txt} </pre> </p>
        <br>
        <br>
        <div style=" margin-bottom: 15px; padding: 4px 12px;">
        <p style=" margin-right:5rem; background-color: #56627A; border-left: 6px solid #2196F3;">Ovaj proizvod je kupljen<strong> ${n} </strong>puta! </p>
        </div>
        </div>
        `;
        itemContent.appendChild(div);
        itemCloseBtn.addEventListener("click", () => {
          this.hideItem()
        })
        let id = el.id;
        let inCart = cart.find(item => item.id === id);
        if (inCart) {
          itemBtn.innerText = "U Korpi";
          itemBtn.disabled = true;
        }
        else {
          itemBtn.innerText = "Dodaj u Korpu";
          itemBtn.disabled = false;
          itemBtn.addEventListener("click", () => {
            let cartItem = { ...Storage.getProduct(id), amount: 1 };
            cart = [...cart, cartItem];
            console.log(cart)
            Storage.saveCart(cart);
            this.setCartValues(cart);
            // this.addCartItem(cartItem);
            this.hideItem();
            location.reload();
          })
        }
      })
    });
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = "u korpi";
        button.disabled = true;
      } else {
        button.addEventListener("click", event => {
          // disable button
          event.target.innerText = "u korpi";
          event.target.disabled = true;
          // add to cart
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          cart = [...cart, cartItem];
          Storage.saveCart(cart);
          // add to DOM
          this.setCartValues(cart);
          this.addCartItem(cartItem);
          this.showCart();
        });
      }
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<!-- cart item -->
              <!-- item image -->
              <img src=${item.image} alt="product" />
              <!-- item info -->
              <div>
                <h4>${item.title}</h4>
                <h5>RSD${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>ukloni</span>
              </div>
              <!-- item functionality -->
              <div>
                  <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">
                  ${item.amount}
                </p>
                  <i class="fas fa-chevron-down" data-id=${item.id}></i>
              </div>
            <!-- cart item -->
      `;
    cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
    checkoutBtn.addEventListener("click", this.hideCart)
  }
  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }
  cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    cartContent.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cart = cart.filter(item => item.id !== id);
        console.log(cart);

        this.setCartValues(cart);
        Storage.saveCart(cart);
        cartContent.removeChild(removeItem.parentElement.parentElement);
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button => {
          if (parseInt(button.dataset.id) === id) {
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>dodaj u korpu`;
          }
        });
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cart = cart.filter(item => item.id !== id);
          this.setCartValues(cart);
          Storage.saveCart(cart);
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          const buttons = [...document.querySelectorAll(".bag-btn")];
          buttons.forEach(button => {
            if (parseInt(button.dataset.id) === id) {
              button.disabled = false;
              button.innerHTML = `<i class="fas fa-shopping-cart"></i>dodaj u korpu`;
            }
          });
        }
      }
    });
  }
  clearCart() {
    cart = [];
    this.setCartValues(cart);
    Storage.saveCart(cart);
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach(button => {
      button.disabled = false;
      button.innerHTML = `<i class="fas fa-shopping-cart"></i>dodaj u korpu`;
    });
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }
}

//storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

class View {
  //static methods
}
document.addEventListener("DOMContentLoaded", () => {
  //page
  const ui = new UI();
  const products = new Products();
  console.log(cart)
  ui.setupAPP();
  // get all products
  products
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.getViewButtons();
      ui.cartLogic();
    });
  const final = new Final();
  const checkout = new Checkout();
  const conf = new Conf();
  checkout.setupCheckout();
  final.setupFinal();
  conf.setupConfirmation();
});
