
import CardsList from "./cards-list.js"
import Pagination from "./pagination.js";
import SearchBox from "./searchBox.js";
import FilterPrice from "./filtersPrice.js"
import FilterCategory from "./filterCategory.js"
import FilterBrand from "./filterbrand.js"
import FilterRating from "./filterRating.js"
import Header from "./header.js"
import Filter from "./filter.js"

const BACKEND_URL = 'https://online-store.bootcamp.place/api/'

export default class OnlineStorePage {
  constructor () {
    this.products = [];
    this.pageSize = 9
    this.url = new URL('products',BACKEND_URL)
    this.url.searchParams.set('_limit', this.pageSize)

    this.components = {};

    this.initComponents();
    this.render();
    this.renderComponents();
    this.initEventListeners()
    this.loadData()
    this.update(1)
  }
async loadData(pageNumber) {
  this.url.searchParams.set('_page', pageNumber)
        const response = await fetch(this.url)
        const products = await response.json()
return products
}

  getTemplate () {
    return `
    <header data-element="header">
      <h1 class="logo">
        <a href="#">Online Store</a>
      </h1>
    </header>
    <main class="container">
      <div class="filter" data-element="filter">
      </div>
      <aside class="container_left filter_element">
      <div class="container_filters">
          <!-- filters -->
          <div data-element="filterPrice" class="price" >
          </div>
          <div data-element="filterCategory" class="category sort" >
          </div>
          <div data-element="filterBrand" class="brand sort" >
          </div>
          <div data-element="filterRating" class="rating" >
          </div>
        </div>
        <button data-element="button-filter">clear all filters</button>
      </aside>
      <div class="container_right //substrate//">
        <div data-element="searchBox" class="container_search">
          <!-- search component -->
        </div>
        <div data-element="cardsList">
          <!-- Cards List component -->
        </div>
        <div data-element="pagination">
          <!-- Pagination component -->
        </div>
      </div>
    </main>
    `;
  }

  initComponents () {
    const totalElements = 100
    const totalPages = Math.ceil(totalElements / this.pageSize);

    const filter = new Filter
    const header = new Header
    const filterRating = new FilterRating
    const filterBrand = new FilterBrand
    const filterCategory = new FilterCategory
    const filterPrice = new FilterPrice
    const searchBox = new SearchBox
    const cardList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    });
   
    this.components.filter = filter
    this.components.header = header
    this.components.filterRating = filterRating
    this.components.filterBrand = filterBrand
    this.components.filterCategory = filterCategory
    this.components.filterPrice = filterPrice;
    this.components.searchBox = searchBox;
    this.components.cardList = cardList;
    this.components.pagination = pagination;
    
  }

  renderComponents () {
    const filterBox = this.element.querySelector('[data-element="filter"]')
    const headerContainer = this.element.querySelector('[data-element="header"]')
    const filterRatingContainer = this.element.querySelector('[data-element="filterRating"]')
    const filterCategoryContainer = this.element.querySelector('[data-element="filterCategory"]');
    const filterBrandContainer = this.element.querySelector('[data-element="filterBrand"]')
    const filterPriceContainer = this.element.querySelector('[data-element="filterPrice"]');
    const searchBoxContainer = this.element.querySelector('[data-element="searchBox"]');
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]');
    const paginationContainer = this.element.querySelector('[data-element="pagination"]');
   
    filterBox.append(this.components.filter.element)
    headerContainer.append(this.components.header.element)
    filterRatingContainer.append(this.components.filterRating.element)
    filterBrandContainer.append(this.components.filterBrand.element)
    filterCategoryContainer.append(this.components.filterCategory.element)
    filterPriceContainer.append(this.components.filterPrice.element)
    searchBoxContainer.append(this.components.searchBox.element);
    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);
    
  }


  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper;
  }
  initEventListeners() {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = event.detail;
      this.update(pageIndex + 1)

    });
  }
   async update (pageNumber) {

const data = await this.loadData(pageNumber)
this.components.cardList.update(data)
    }
}

