if (window.innerWidth <= 768) {
    const introDivs = document.querySelectorAll('#long-text');
    introDivs.forEach(introDiv => {
      const actualContent = introDiv.textContent.trim();
      const wordsArray = actualContent.split(/\s+/);
      const displayWords = wordsArray.slice(0, 40).join(' ') + ' . . .';
      const actualHeight = window.getComputedStyle(introDiv).height;
      const trimmedHeight = '200px';
      introDiv.style.overflowY = 'hidden';
      introDiv.style.height = trimmedHeight;
      introDiv.textContent = displayWords;
      const readMore = document.createElement('strong');
      readMore.innerHTML = 'Read More >>';
      readMore.style.color = 'darkblue';
      readMore.style.textDecoration = 'underline';
      introDiv.appendChild(readMore);
      readMore.addEventListener('click', function () {
        if (readMore.innerHTML.substr(0,readMore.innerHTML.length-9) === 'Read More') {
          introDiv.textContent = actualContent+' '+' . . .'+' '+ ' ';
          introDiv.style.height = actualHeight;
          readMore.innerHTML = 'Read Less <<';
        } else {
          introDiv.textContent = displayWords;
          introDiv.style.height = trimmedHeight;
          readMore.innerHTML = 'Read More >>';
        }
        introDiv.appendChild(readMore); 
  });
});
}
const banner = document.querySelector('.banner');
let imgIndex = 0;
function slideBanner() {
imgIndex = (imgIndex + 1) % banner.children.length;
const imgWidth = banner.children[0].offsetWidth; 
const imgMarginRight = parseFloat(window.getComputedStyle(banner.children[0]).marginRight);
const imgMarginLeft = parseFloat(window.getComputedStyle(banner.children[0]).marginLeft);
const translateX = -(imgIndex * (imgWidth + imgMarginRight + imgMarginLeft)); 
banner.style.transform = `translateX(${translateX}px)`; 
}
setInterval(slideBanner, 5000); 

const filledDivs = document.querySelectorAll('#filledDiv');
filledDivs.forEach((filledDiv, index) => {
const percentage = document.getElementById(`per${index}`).value; 
const spanDiv = document.getElementById(`${index}-span`);
const coloredWidth = percentage + '%';
spanDiv.style.width = coloredWidth;
spanDiv.style.backgroundColor = 'mediumseagreen';
});
const fullImageContainer = document.querySelector('.full-image-container');
const overlay = document.querySelector('.overlay');
function displayFullImage(imgSrc, imgTitle) {
const fullImage = document.querySelector('.full-image');
fullImage.src = imgSrc;
fullImage.alt = imgTitle;
const overlay = document.querySelector('.overlay');
overlay.style.display = 'block';
fullImageContainer.style.display = 'block';
}

function closeFullImage(){
overlay.style.display = 'none';
fullImageContainer.style.display = 'none';
}


$(window).on('load', function () {
var NoLi = $('.listOfassignment li').length;
console.log(NoLi);
no = 0;

showNoLi = 4;

if ($(window).width() <= 750) {
showNoLi = 2;
}

if ($(window).width() <= 450) {
showNoLi = 1;
}

start = 0;

end = showNoLi;

var deviedLi = NoLi / showNoLi;

var arounVal = Math.ceil(deviedLi);

var counter;

for (counter = 1; counter <= arounVal; counter++) {
$('<li><a href="javascript:void(0)"></a></li>').appendTo(
'.pagenation'
);
}

$('.pagenation li').eq(0).addClass('active');

$('.listOfassignment li').slice(start, end).addClass('active');

$('.prv').prop('disabled', true);

function myfunction(selectedShow) {
return function () {
if (selectedShow === 'nextShow') {
no++;

$('.pagenation li').removeClass('active');

$('.pagenation li').eq(no).addClass('active');

$('.listOfassignment li').removeClass('active');

start = showNoLi * no;

end = showNoLi * no + showNoLi;

$('.listOfassignment li').slice(start, end).addClass('active');

$('.prv').prop('disabled', false);

if (no * showNoLi + showNoLi >= NoLi) {
  $('.next').prop('disabled', true);
}
}
if (selectedShow === 'pinterclick') {
$('.pagenation li').removeClass('active');

var thisnumber = $(this).addClass('active').index();

no = thisnumber;

start = showNoLi * no;

end = showNoLi * no + showNoLi;

$('.listOfassignment li').removeClass('active');

$('.listOfassignment li').slice(start, end).addClass('active');

if (no > 0) {
  $('.prv').prop('disabled', false);
} else {
  $('.prv').prop('disabled', true);
}

if (no * showNoLi + showNoLi >= NoLi) {
  $('.next').prop('disabled', true);
} else {
  $('.next').prop('disabled', false);
}
} else if (selectedShow === 'prevSelecte') {
no--;

$('.pagenation li').removeClass('active');

$('.pagenation li').eq(no).addClass('active');

$('.listOfassignment li').removeClass('active');

start = showNoLi * no;

end = showNoLi * no + showNoLi;

$('.listOfassignment li').slice(start, end).addClass('active');

$('.next').prop('disabled', false);

if (no === 0) {
  $('.prv').prop('disabled', true);
}
}
};
}

$('.next').on('click', myfunction('nextShow'));

$('.prv').on('click', myfunction('prevSelecte'));

$('.pagenation').on('click', 'li', myfunction('pinterclick'));
});
/* /////////////////////////////////////////////////////////end/////////////////////////////////////// */

$(window).on('load', function () {
var NoLio = $('.listOfassignmento li').length;
console.log(NoLio);
no = 0;

showNoLio = 4;

if ($(window).width() <= 750) {
showNoLio = 2;
}

if ($(window).width() <= 450) {
showNoLio = 1;
}

starto = 0;

endo = showNoLio;

var deviedLio = NoLio / showNoLio;

var arounValo = Math.ceil(deviedLio);

var countero;

for (countero = 1; countero <= arounValo; countero++) {
$('<li><a href="javascript:void(0)"></a></li>').appendTo(
'.pagenationo'
);
}

$('.pagenationo li').eq(0).addClass('activeo');

$('.listOfassignmento li').slice(starto, endo).addClass('activeo');

$('.prvo').prop('disabled', true);

function myfunction(selectedShowo) {
return function () {
if (selectedShowo === 'nextShowo') {
no++;

$('.pagenationo li').removeClass('activeo');

$('.pagenationo li').eq(no).addClass('activeo');

$('.listOfassignmento li').removeClass('activeo');

starto = showNoLio * no;

endo = showNoLio * no + showNoLio;

$('.listOfassignmento li')
  .slice(starto, endo)
  .addClass('activeo');

$('.prvo').prop('disabled', false);

if (no * showNoLio + showNoLio >= NoLio) {
  $('.nexto').prop('disabled', true);
}
}
if (selectedShowo === 'pinterclicko') {
$('.pagenationo li').removeClass('activeo');

var thisnumbero = $(this).addClass('activeo').index();

no = thisnumbero;

starto = showNoLio * no;

endo = showNoLio * no + showNoLio;

$('.listOfassignmento li').removeClass('activeo');

$('.listOfassignmento li')
  .slice(starto, endo)
  .addClass('activeo');

if (no > 0) {
  $('.prvo').prop('disabled', false);
} else {
  $('.prvo').prop('disabled', true);
}

if (no * showNoLio + showNoLio >= NoLio) {
  $('.nexto').prop('disabled', true);
} else {
  $('.nexto').prop('disabled', false);
}
} else if (selectedShowo === 'prevSelecteo') {
no--;

$('.pagenationo li').removeClass('activeo');

$('.pagenationo li').eq(no).addClass('activeo');

$('.listOfassignmento li').removeClass('activeo');

starto = showNoLio * no;

endo = showNoLio * no + showNoLio;

$('.listOfassignmento li')
  .slice(starto, endo)
  .addClass('activeo');

$('.nexto').prop('disabled', false);

if (no === 0) {
  $('.prvo').prop('disabled', true);
}
}
};
}

$('.nexto').on('click', myfunction('nextShowo'));

$('.prvo').on('click', myfunction('prevSelecteo'));

$('.pagenationo').on('click', 'li', myfunction('pinterclicko'));
});