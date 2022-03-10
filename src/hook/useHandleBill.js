

export default function handleTempPrice (list){

    const listIntoMoney = list.map(item =>(item.intoMoney))

    const tempPrice = listIntoMoney.reduce((init, item) =>{

        return init + item
    },0)


    return tempPrice || 0
}