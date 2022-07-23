export default class FilterRating {
    constructor () {
        this.myRender()
    }
    render() {
        return`
        <h2>Rating</h2>
        <div class="renge_slide">
          <span class="min"><span>0</span></span>
          <div class="renge_slide__inner">
            <span class="renge_slide__left"></span>
            <span class="renge_slide__renge"></span>
            <span class="renge_slide__right"></span>
          </div>
          <span class="max"><span>5</span></span>
        </div>`
    }
    myRender() {
        const box = document.createElement('div')
        box.innerHTML = this.render()
        this.element = box
    }
}