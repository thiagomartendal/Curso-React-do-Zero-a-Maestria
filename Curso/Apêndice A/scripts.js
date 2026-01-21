// 1 - var, let, const
var x = 10
var y = 15

if (y > 10) {
    var x = 5 // Modifica o contexto global
    console.log(x)
}

console.log(x)

let a = 10
let b = 15

if (b > 10) {
    let a = 5 // Não modifica o contexto global
    console.log(a)
}

console.log(a)

let i = 100

for (let i = 0; i < 5; i++)
    console.log(i)

console.log(i)

function logName() {
    const name = 'Tony'
    console.log(name)
}

const name = 'Aarão'

logName()

console.log(name)

// 2 - Arrow Function
const sum = function sum(a, b) {
    return a + b
}

const arrowSum = (a, b) => a + b

console.log(sum(5, 5))
console.log(arrowSum(5, 5))

const greeting = (name) => {
    if (name)
        return 'Olá ' + name + '!'
    else
        return 'Olá!'
}

console.log(greeting(name))
console.log(greeting())

const testeArrow = () => console.log('Testou!')

testeArrow()

const user = {
    name: 'Tony',
    sayUserName() {
        var self = this
        setTimeout(function() {
            console.log(self)
            console.log('Username: ' + self.name)
        }, 500)
    },
    sayUserNameArrow() {
        setTimeout(() => {
            console.log(this)
            console.log('Username: ' + this.name)
        }, 700)
    }
}

// Executa após o período de tempo do timeout
// user.sayUserName()
// user.sayUserNameArrow()

// 3 - Filter
const arr = [1, 2, 3, 4, 5]

const highNumbers = arr.filter((n) => {
    if (n >= 3)
        return n
})

console.log(arr)
console.log(highNumbers)

const users = [
    {name: 'Aarão', available: true},
    {name: 'Tony', available: true},
    {name: 'Rosa', available: false}
]

const availableUsers = users.filter((user) => user.available)
const notAvailableUsers = users.filter((user) => !user.available)

console.log(users)
console.log(availableUsers)
console.log(notAvailableUsers)

// 4 - Map
const products = [
    {name: 'Camisa', price: 10.99, category: 'Roupas'},
    {name: 'Chaleira Elétrica', price: 49.99, category: 'Eletro'},
    {name: 'Fogão', price: 400, category: 'Eletro'},
    {name: 'Calça', price: 50.99, category: 'Roupas'}
]

products.map((product) => {
    if (product.category === 'Roupas') {
        product.onSale = true
    }
})

console.log(products)

// 5 - Template Literals
const userName = 'Tony'
const age = 28

console.log(`O nome o usuário é ${userName} e ele tem ${age} anos.`) // Exibe as variáveis em templates com ${} no meio do texto definido entre ``

// 6 - Destructing
const fruits = ['Maçã', 'Laranja', 'Mamão']

const [f1, f2, f3] = fruits

console.log(f1, f2, f3)

const productDetails = {
    name: 'Mouse',
    price: 39.99,
    category: 'Periféricos',
    color: 'Cinza'
}

const {name: productName, price, category: productCategory, color} = productDetails

console.log(productName)
console.log(price)
console.log(productCategory)
console.log(color)

// 7 - Spread operator
const a1 = [1, 2, 3]
const a2 = [4, 5, 6]

const a3 = [...a1, ...a2] // Une os arrays

const a4 = [0, ...a1, 7]

console.log(a1)
console.log(a2)
console.log(a3)
console.log(a4)

const carName = {name: 'Gol'}
const carBrand = {brand: 'Volkswagen'}
const otherInfos = {km: 100000, price: 49000}

const car = {...carName, ...carBrand, year: 2000, ...otherInfos, wheels: 4}

console.log(carName)
console.log(carBrand)
console.log(otherInfos)
console.log(car)

// 8 - Classes
class Product {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    productWithDiscount(discount) {
        return this.price * ((100 - discount) / 100)
    }
}

const shirt = new Product('Camisa gola polo', 20)

console.log(shirt.name, shirt.price)
console.log('Desconto: ', shirt.productWithDiscount(32))

const tenis = new Product('Tenis verde', 120)

console.log(tenis.name, tenis.price)
console.log('Desconto: ', tenis.productWithDiscount(70))

// 9 - Herança
class ProductWithAttributes extends Product {
    constructor(name, price, colors) {
        super(name, price)
        this.colors = colors
    }

    showColors() {
        console.log('As cores são:')
        this.colors.forEach(color => {
            console.log(color)
        })
    }
}

const hat = new ProductWithAttributes('Chapéu', 29.99, ['Preto', 'Azul', 'Verde'])

console.log(hat.name, hat.price)
console.log('Desconto:', hat.productWithDiscount(30))
hat.showColors()