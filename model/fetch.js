let cart = null;

module.exports = class Cart {

    static save(item) {
       if(cart){
        const existingItemIndex = cart.items.findIndex(p=>p.id==item.id)
        if(existingItemIndex>=0){
            const existingItem = cart.items[existingItemIndex]
              existingItem.qty += 1
        }else{
            item.qty=1
            cart.items.push(item)
        }
       }else{
         cart = {items:[]}
         item.qty =1
         cart.items.push[item]
       }

    }

    static getCart() {
        return cart;
    }
}