const removeButton = document.querySelectorAll(".btn-danger")
const cartTotal = document.getElementsByClassName("cart-total-price")[0]
const quantityInput = document.querySelectorAll('.cart-quantity-input')


removeButton.forEach(button => {
    button.addEventListener('click', removeItem)
})

function removeItem(e) {
    e.target.parentElement.parentElement.remove()
    updateTotal()
}

quantityInput.forEach(item => {
    console.log(item)
    item.addEventListener('change', quantityChange)
})

const purch = document.querySelector('.btn-purchase').addEventListener('click', purchaseClick)
function purchaseClick() {
    alert('Thank you for your purchase')
    const cartItems = document.querySelector(".cart-items")
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
}



function updateTotal() {
    let total = 0
    const cartContainer = document.querySelector(".cart-items")
    const cartRows = cartContainer.querySelectorAll(".cart-row")
    cartRows.forEach(cartRow => {
        const cartPrice = cartRow.querySelector(".cart-price")
        const cartQuantity = cartRow.querySelector(".cart-quantity-input")
        let price = parseFloat(cartPrice.innerText.replace('$', ''))
        let quantity = cartQuantity.value
        total = total + (price * quantity)
    })
    total = Math.round(total * 100) / 100
    cartTotal.innerText = `$${total}`
}

const addToCart = document.querySelectorAll(".shop-item-button")
addToCart.forEach(item => {
    item.addEventListener('click', e => {
        const shopItem = e.target.parentElement.parentElement
        const title = shopItem.querySelector(".shop-item-title").innerText
        const price = shopItem.querySelector(".shop-item-price").innerText
        const img = shopItem.querySelector(".shop-item-image").src
        updateTotal()
        addItemToCart(title, price, img)
    })
})

const addItemToCart = (title, price, img) => {
    const cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    const cartItems = document.querySelector('.cart-items')
    const cartItemNames = cartItems.querySelectorAll(".cart-item-title")
    cartItemNames.forEach(item => {
        if (item.innerText == title) {
            alert('This item is already added to the cart')
        }
    })
    const cartRowContents = `
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${img}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    cartRow.querySelector('.btn-danger').addEventListener('click', removeItem)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChange)
}

function quantityChange(event) {
    if (isNaN(event.target.value) || (event.target.value <= 0)) {
        event.target.value = 1
    }
    updateTotal()
}