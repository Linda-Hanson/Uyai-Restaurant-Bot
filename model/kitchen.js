const items = []

class kitchen {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    save() {
        items.push(this);
    }
    static findById(itemId) {
        return items.filter(i => i.id == itemId);
    }
}


const afangSoup = new kitchen("01", 'Afang Soup', '$10')
const garri = new kitchen("02", 'Garri','$5')
const riceAndStew = new kitchen("03", 'Rice and Stew', '$15')
const egusi = new kitchen("04", 'Egusi', '$5')
const okpa = new kitchen("05", 'Okpa', '$2')

module.exports = {
    afangSoup,
    garri,
    riceAndStew,
    egusi,
    okpa
}