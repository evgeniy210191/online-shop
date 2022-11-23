
import CardsList from "./cards-list.js"
import Pagination from "./pagination.js";
import SearchBox from "./searchBox.js";
import FilterPrice from "./filtersPrice.js"
import FilterCategory from "./filterCategory.js"
import FilterBrand from "./filterbrand.js"
import FilterRating from "./filterRating.js"
import Header from "./header.js"
import Filter from "./filter.js"

const obj = [
	{
	  "id": "76w0hz7015kkr9kjkav",
	  "title": "Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black",
	  "rating": 2.89,
	  "price": 15999,
	  "category": "laptops",
	  "brand": "acer"
	},
	 {
	    "id": "76w0hz7015kkr9kjkav",
	    "images": [
	      "https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg",
	      "https://content.rozetka.com.ua/goods/images/big_tile/163399633.jpg"
	    ],
	    "title": "Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black",
	    "rating": 2.89,
	    "price": 15999,
	    "category": "laptops",
	    "brand": "acer"
	  },
	  {
	    "id": "qeagrlm9lrkr9kjkav",
	    "images": [
	      "https://content1.rozetka.com.ua/goods/images/big_tile/178060622.jpg",
	      "https://content2.rozetka.com.ua/goods/images/big_tile/178060625.jpg"
	    ],
	    "title": "Ноутбук Acer Aspire 7 A715-41G-R9KP (NH.Q8QEU.00L) Charcoal Black",
	    "rating": 1.96,
	    "price": 21500,
	    "category": "laptops",
	    "brand": "acer"
	  },
	  {
	    "id": "3xaz1nx5a9lkr9kjkav",
	    "images": [
	      "https://content.rozetka.com.ua/goods/images/big_tile/26635597.jpg"
	    ],
	    "title": "Монитор 24.1\" Dell P2421 Black (210-AWLE)",
	    "rating": 1.43,
	    "price": 6900,
	    "category": "monitors",
	    "brand": "dell"
	  },
	  {
	    "id": "4l150fmw7yekr9kjkav",
	    "images": [
	      "https://content2.rozetka.com.ua/goods/images/big_tile/9559719.jpg"
	    ],
	    "title": "Монитор 23.8\" Dell E2421HN Black (210-AXMC)",
	    "rating": 3.43,
	    "price": 3900,
	    "category": "monitors",
	    "brand": "dell"
	  },
	    {
	    "id": "kub9vo3i3hckr9kjkav",
	    "images": [
	      "https://content.rozetka.com.ua/goods/images/big_tile/165161262.jpg",
	      "https://content1.rozetka.com.ua/goods/images/big_tile/165161264.jpg"
	    ],
	    "title": "Asus PCI-Ex Radeon RX 6700 XT Dual 12GB GDDR6 (192bit) (HDMI, 3 x DisplayPort) (DUAL-RX6700XT-12G)",
	    "rating": 2.04,
	    "price": 28000,
	    "category": "video_cards",
	    "brand": "asus"
	  },
	  {
	    "id": "mnrntvpjpupkr9kjkav",
	    "images": [
	      "https://content1.rozetka.com.ua/goods/images/big_tile/31959984.jpg",
	      "https://content.rozetka.com.ua/goods/images/big_tile/31960011.jpg"
	    ],
	    "title": "Asus PCI-Ex GeForce RTX 3080 TUF Gaming OC 10GB GDDR6X (320bit) (1440/19000) (2 x HDMI, 3 x DisplayPort) (TUF-RTX3080-O10G-GAMING)",
	    "rating": 3.86,
	    "price": 64500,
	    "category": "video_cards",
	    "brand": "asus"
	  }
]

const BACKEND_URL = 'https://online-store.bootcamp.place/api/'
const FULL_URL = 'https://online-store.bootcamp.place/api/products'

export default class OnlineStorePage {
  constructor (someFilter = []) {
    this.products = [];
    this.pageSize = 9
    this.url = new URL('products',BACKEND_URL)
    this.url.searchParams.set('_limit', this.pageSize)
    this.components = {};
    this.someFilter = someFilter
    this.initComponents();
    this.render();
    this.renderComponents();
    this.initEventListeners()
    this.loadData()
    this.update(1)
    this.getData ()
    
  }
  getData () {
    const request = new XMLHttpRequest
    
    request.open('GET', FULL_URL)
    request.onreadystatechange = function (event) {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status <= 399) {
          const someFilter = JSON.parse(this.responseText)
          this.someFilter = someFilter
        }
      }
    }
    request.send()
    console.log(request)
    return request
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
      <aside class="container_left filter_element filter_element_none" id="filter">
      <div class="container_filters">
          <p class="burger_menu" data-element="burger_menu">
            <span class="burger"></span>
          </p>
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
    const filterBrand = new FilterBrand(obj)
    console.log(filterBrand)
    const filterCategory = new FilterCategory(this.someFilter)
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
    
    const request = new XMLHttpRequest
    
    request.open('GET', FULL_URL)
    request.onreadystatechange = function (event) {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status <= 399) {
          this.responseText
        }
      }
    }
    request.send()
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
    
    const filters = this.element.querySelector('#filter')
    const burger = this.element.querySelector('[data-element="burger_menu"]')
    const classWrapper = document.querySelector('.wrapper')

    filterBox.onclick = function (event) {
      filters.classList.remove('filter_element_none')
      classWrapper.classList.add('adaptiw_wrap')
      document.body.classList.add('stop')
    }
    burger.onclick = function (event) {
      filters.classList.add('filter_element_none')
      classWrapper.classList.remove('adaptiw_wrap')
      document.body.classList.remove('stop')
    }
  }


  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper;
  }
  initEventListeners() {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = Number(event.detail);
      this.update(pageIndex + 1)

    });
  }
   async update (pageNumber) {

const data = await this.loadData(pageNumber)
this.components.cardList.update(data)
    }
}

