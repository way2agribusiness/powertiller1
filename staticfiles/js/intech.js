if (window.innerWidth <= 768) {
    const introDivs = document.querySelectorAll('#long-text');
    introDivs.forEach(introDiv => {
        const actualContent = introDiv.textContent.trim();
        const wordsArray = actualContent.split(/\s+/);
        const displayWords = wordsArray.slice(0, 40).join(' ') + ' . . .';
        const actualHeight = window.getComputedStyle(introDiv).height;
        const trimmedHeight = '230px';
        introDiv.style.overflowY = 'hidden';
        introDiv.style.height = trimmedHeight;
        introDiv.textContent = displayWords;
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
function scrollToSection() {
    const section = document.getElementById('target-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
function scrollToSection1(event) {
    const clickedElement = event.currentTarget; 
    const offset = 100;
    const elementTop = (clickedElement.getBoundingClientRect().top)+ window.scrollY-offset; 
    window.scrollTo({ top: elementTop, behavior: 'smooth' }); 
}

for (let i=1; i < 10; i++) {
    const fileInput = document.getElementById(`id_intechsellerproductimage_set-${i}-seller_product_images`);
    fileInput.style.display = 'none';
}
const removeIcon = document.getElementById('close-id_intechsellerproductimage_set-0-seller_product_images');
removeIcon.style.display = 'none';
for (let i=0; i<10; i++){
    const deleteInput = document.getElementById(`id_intechsellerproductimage_set-${i}-DELETE`);
    deleteInput.style.display = 'none';
}
let count = 0;
function addImage() {
    count += 1;
    const fileInput = document.getElementById(`id_intechsellerproductimage_set-${count}-seller_product_images`);
    const openRemoveIcon = document.getElementById(`close-id_intechsellerproductimage_set-${count}-seller_product_images`);
    if (fileInput && openRemoveIcon) {
        fileInput.parentNode.style.display = 'flex';
        fileInput.parentNode.style.marginTop = '1rem';
        fileInput.parentNode.style.gap = '1rem';
        fileInput.style.display = 'flex';
        openRemoveIcon.style.display = 'flex';
        openRemoveIcon.style.cursor = 'pointer';
        openRemoveIcon.style.backgroundColor = 'darkblue';
        openRemoveIcon.style.borderRadius = '50%';
        openRemoveIcon.style.padding = '0.7rem';
        openRemoveIcon.style.fontWeight = 'bold';
        openRemoveIcon.style.fontSize = '1rem';
        openRemoveIcon.style.color = 'white';
    }
    if(fileInput.id === 'id_intechsellerproductimage_set-9-seller_product_images'){
        if(fileInput.style.display === 'flex'){
            const addBtn = document.getElementById('add-plot-form');
            addBtn.style.display = 'none';
        }
    }
}
function deleteImage(event){
    id = event.target.id;
    if (id !== '0'){
        const closeInput = document.getElementById(`id_intechsellerproductimage_set-${id.split('-')[2]}-seller_product_images`);
        const closeIcon = document.getElementById(`close-id_intechsellerproductimage_set-${id.split('-')[2]}-seller_product_images`);
        if(closeInput && closeIcon){
            closeInput.style.display = 'none';
            closeIcon.style.display = 'none';
        }
        if(closeInput.id === 'id_intechsellerproductimage_set-9-seller_product_images'){
            if(closeInput.style.display === 'none'){
                const addBtn = document.getElementById('add-plot-form');
                addBtn.style.display = 'block';
            }
        }
    }
} 
const countryDiv = document.querySelector('.country-div');
const categoryDiv = document.querySelector('#tabs');
for(let i=0; i<countryDiv.children.length; i++){
    if(i>0){
        countryDiv.children[i].style.display = 'none';
    }else{
        categoryDiv.children[0].style.backgroundImage='linear-gradient(180deg, darkblue, lightblue)';
    }
}
function clikToOpen(event){
    const selectedDiv = document.querySelector(`#${event.target.id}-div`)
    for(let i=0; i<countryDiv.children.length; i++){
        if(countryDiv.children[i] === selectedDiv){
            countryDiv.children[i].style.display='block';
            categoryDiv.children[i].style.backgroundImage='linear-gradient(180deg, darkblue, lightblue)';
        }else{
            countryDiv.children[i].style.display='none';
            categoryDiv.children[i].style.backgroundImage='linear-gradient(180deg, seagreen, green)';
        }
    }
} 