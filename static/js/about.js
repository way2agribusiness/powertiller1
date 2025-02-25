if (window.innerWidth <= 768) {
    const introDivs = document.querySelectorAll('#long-text');
    introDivs.forEach(introDiv => {
        const actualContent = introDiv.textContent.trim();
        const wordsArray = actualContent.split(/\s+/);
        const displayWords = wordsArray.slice(0, 40).join(' ') + ' . . .';
        const actualHeight = window.getComputedStyle(introDiv).height;
        const trimmedHeight = '250px';
        introDiv.style.overflowY = 'hidden';
        introDiv.style.height = trimmedHeight;
        introDiv.textContent = displayWords;
        introDiv.style.textAlign = 'justify';
        const readMore = document.createElement('a');
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
function displayFullImage(imgSrc, imgTitle) {
  const fullImage = document.querySelector('.full-image');
  fullImage.src = imgSrc;
  fullImage.alt = imgTitle;
  const overlay = document.querySelector('.overlay');
  const fullImageContainer = document.querySelector('.full-image-container');
  overlay.style.display = 'block';
  fullImageContainer.style.display = 'block';
}

function hideFullImage() {
  const overlay = document.querySelector('.overlay');
  const fullImageContainer = document.querySelector('.full-image-container');
  overlay.style.display = 'none';
  fullImageContainer.style.display = 'none';
}

function toggleZoom(event) {
  event.stopPropagation();
  const fullImage = event.target;
  if (fullImage.style.cursor === 'zoom-out') {
    fullImage.style.cursor = 'zoom-in';
    fullImage.style.transform = 'scale(2.2)';
  } else {
    fullImage.style.cursor = 'zoom-out';
    fullImage.style.transform = 'none';
  }
}