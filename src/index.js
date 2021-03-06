import './styles.css';
const axios = require('axios').default;

const BASE_URL = `https://callboard-backend.herokuapp.com`;

let id = '';

const refsAdvert={
  advertTitle: document.querySelector('.js-advert-title'),
  advertPrice: document.querySelector('.js-advert-price'),
  openModal: document.querySelector('.js-advert-open'),
  advertCloseModal: document.querySelector('.js-advert-close'),
  advertIMG: document.querySelector('.js-advert-img'),
  sellerName: document.querySelector('.js-seller-name'),
  sellerTime: document.querySelector('.js-seller-time'),
  sellerTel: document.querySelector('.js-seller-tel'),
  favorBtn: document.querySelector('.js-advert-favorites'),
  
}

// console.log(refsAdvert.advertTitle.textContent);
// console.log(refsAdvert.openModal);
// console.log(refsAdvert.advertCloseModal);
// refsAdvert.cardAdvert.addEventListener('click', addModalAdvert);

document.addEventListener('click', addModalAdvert)

refsAdvert.favorBtn.addEventListener('click', PostInFavorit);

// // закрытие модалки через кнопку
refsAdvert.advertCloseModal.addEventListener('click', modalClose);

// закрытие модалки по Esc
document.addEventListener('keydown', modalEscClose);

// зактрытие по оверлэю
refsAdvert.openModal.addEventListener('click', onModalBackdropClick);

console.log(localStorage.getItem('accessToken'));

function PostInFavorit() {
  console.log("grtgrtg");
  console.log(id);
   if (localStorage.getItem('accessToken')){
    console.log("grtgrtg");
    axios.post(`${BASE_URL}/call/favourite/`, 
    {
      "_id": `${id}`,
      // "accessToken":`${localStorage.getItem('accessToken')}`, 
    }
    )
      .then(({ data }) => {
        console.log(data);
        
      })
      .catch(error => {
        console.log(error);
      })	
   }

}



// Функция открытия модалки
function addModalAdvert(event) {
  let target = event.target;

// console.dir(target.parentElement.children[1].textContent);
  if (target.parentElement.classList[0] ==='card-item') {
    // обнуление картинки
    refsAdvert.advertIMG.src = '/';

    changeImgOnAdvert(target);
     // подставлять значения цены 
    changeAdvertTitle(target);
    
    // открыть модалку
    refsAdvert.openModal.classList.remove('is-hidden');
    
   
   
    // console.dir(target.parentElement);
    // рендерить и подставлять фотки под основной картинкой.

  }
}

// Функции закрытия модалки
function modalClose() {
  refsAdvert.openModal.classList.add('is-hidden');
}
function modalEscClose(evt) {
  if (evt.key === "Escape") {
    modalClose();
  }
}
function onModalBackdropClick(evt) {
  // console.dir(evt.target.attributes.class.value);
  // console.log(evt.target.dataset.action);
  if (evt.target.attributes.class.value.includes("add-backdrop")){
    modalClose();
  }
} 
// функция получения и подставления адруса картинки 
function changeImgOnAdvert(target) {
  // Брать значение картинки и переподставлять в свою в модалке
  refsAdvert.advertIMG.src = target.parentElement.firstElementChild.firstElementChild.currentSrc;
}

function changeAdvertTitle(target) {
  let item = target.parentElement.children;
  console.dir(target.parentElement.id);

  
  console.log(id);
  refsAdvert.advertTitle.textContent='';

  // console.log(item[1].textContent);
  // console.log(refsAdvert.advertTitle.textContent);
  refsAdvert.advertPrice.textContent='';
  
  refsAdvert.advertTitle.textContent = item[1].textContent;

  if(item[2].children.length === 2 &&
     item[2].children[1].textContent !=="" ){
      //  console.log(item[2].children[1].textContent);
    refsAdvert.advertPrice.textContent = item[2].children[1].textContent;
  } else {
    refsAdvert.advertPrice.textContent= item[2].children[0].textContent;
  }
    
}






const refs ={
  btnInfoSeller: document.querySelector('.js-info-seller'),
  info: document.querySelector('.js-info'),
  infoSeller: document.querySelector('.js-seller-on'),

}
// console.dir(refs.favorBtn);

refs.btnInfoSeller.addEventListener('click', showSellerInfo);


function showSellerInfo(params) {
  refs.info.classList.toggle('visually-hidden');
  refs.btnInfoSeller.classList.toggle('seller');
  refs.infoSeller.classList.toggle('visually-hidden');

}