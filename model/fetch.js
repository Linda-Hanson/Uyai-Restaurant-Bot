let cart = null;

module.exports = class Cart {

    static save(item) {
        const existingItemIndex = cart.items.findIndex(p => p.id == item.id)

        if (cart = null) {
            cart = { items: [] }
        } else if (existingItemIndex >= 0) {
            const existingItem = cart.items[existingItemIndex]
            existingItem.qty += 1
        }

    }

    static getCart() {
        return cart;
    }
}