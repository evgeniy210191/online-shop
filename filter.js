export default class Filter {
    constructor () {
        this.myRender()
    }
    render() {
        return`
        <p>FILTERS</p>
        `
    }
    myRender() {
        const box = document.createElement('div')
        box.innerHTML = this.render()
        this.element = box
    }
}