export default class Filter {
    constructor () {
        this.myRender()
    }
    render() {
        return`
        <p>FILTERS</p>
        <p class="burger_menu active">
          <span class="burger active"></span>
        </p>`
    }
    myRender() {
        const box = document.createElement('div')
        box.innerHTML = this.render()
        this.element = box
    }
}