export default function lengthCart(carts) {

    const length = carts.reduce((init,item) => {

            return init + item.products.length
    },0)

    return length

}