if (window.innerWidth <= 768) {
    const introDivs = document.querySelectorAll('#long-text');
    introDivs.forEach(introDiv => {
      const actualContent = introDiv.textContent.trim();
      const wordsArray = actualContent.split(/\s+/);
      const displayWords = wordsArray.slice(0, 40).join(' ') + ' . . .';
      const actualHeight = window.getComputedStyle(introDiv).height;
      const trimmedHeight = '220px';
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
document.querySelectorAll('.ats-select').forEach(selectElement => {
  selectElement.addEventListener('change', function(event) {
    const form = document.getElementById('form2');
    const category = document.getElementById('ats-category').value;
    const value = event.target.value;
    if (value) {
      const company = value.split('--ats-category-company--')[0];
      const categorySlug = value.split('--ats-category-company--')[1];
      document.getElementById('selected-category').value = categorySlug;
      document.getElementById('selected-company').value = company;
      form.submit();
    }
  });
});
const restDiv = document.querySelectorAll(".ats-card");
const cntct = document.querySelectorAll(".ats-select");
const allSellers = document.querySelectorAll(".ats-cnt");
restDiv.forEach(div => {
  if (div.id === `${window.location.href.split('/')[4]}-div`){
    div.style.display = "block";
  }else{
    div.style.display='none';
    for (let r = 0; r < restDiv.length; r++) {
      if (restDiv[r].style.display === 'none') {
        let nextElement = restDiv[r].nextElementSibling;
        if (nextElement && nextElement.tagName === 'BR') {
          nextElement.remove();
        }
      }
    }
  }
});
cntct.forEach(div =>{
  if (div.id !== window.location.href.split('/')[4]){
    div.style.display = "none";
  }
});
function selectDropdwn(event){
  const selectedCategory = event.target.value;
  for (let i=0; i<restDiv.length; i++){
    if (restDiv[i].id === `${selectedCategory}-div`){
      restDiv[i].style.display='block';
    }else{
      restDiv[i].style.display='none';
    }
  }
  document.querySelectorAll('.ats-select').forEach(selectElement => {
    if (selectElement.id === selectedCategory) {
      selectElement.style.display = 'block';
    } else {
      selectElement.style.display = 'none';
    }
  });
}
if (window.innerWidth <= 768 ){
  const sellerH2 = document.querySelector('.scale');
  const targetDiv = document.querySelector('.supplier-form');
  const sellerForm = document.querySelector('.seller-form');
  const roadmapImg = document.querySelector('.roadmap-img');
  if (targetDiv) {
    targetDiv.appendChild(sellerH2);
    targetDiv.appendChild(roadmapImg);
    targetDiv.appendChild(sellerForm);
  }
}
function scrollToSection() {
  const section = document.getElementById('start-to-scale-up');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
document.getElementById('id_atssellerproductimage_set-0-seller_product_images').style.display='block';
  for (let i=1; i < 10; i++) {
    const fileInput = document.getElementById(`id_atssellerproductimage_set-${i}-seller_product_images`);
    fileInput.style.display = 'none';
  }
  const removeIcon = document.getElementById('close-id_atssellerproductimage_set-0-seller_product_images');
  removeIcon.style.display = 'none';
  for (let i=0; i<10; i++){
    const deleteInput = document.getElementById(`id_atssellerproductimage_set-${i}-DELETE`);
    deleteInput.style.display = 'none';
  }
  let count = 0;
  function addImage() {
    count += 1;
    const fileInput = document.getElementById(`id_atssellerproductimage_set-${count}-seller_product_images`);
    const openRemoveIcon = document.getElementById(`close-id_atssellerproductimage_set-${count}-seller_product_images`);
    if (fileInput && openRemoveIcon) {
      fileInput.parentNode.style.display = 'flex';
      fileInput.parentNode.style.marginTop = '1rem';
      fileInput.parentNode.style.gap = '1rem';
      fileInput.style.display = 'flex';
      openRemoveIcon.style.display = 'flex';
      openRemoveIcon.style.cursor = 'pointer';
      openRemoveIcon.style.fontWeight = 'bold';
      openRemoveIcon.style.fontSize = '1rem';
      openRemoveIcon.style.color = 'darkblue';
    }
    if(fileInput.id === 'id_atssellerproductimage_set-9-seller_product_images'){
      if(fileInput.style.display === 'flex'){
        const addBtn = document.getElementById('add-plot-form');
        addBtn.style.display = 'none';
      }
    }
  }
function deleteImage(event){
  id = event.target.id;
  if (id !== '0'){
    const closeInput = document.getElementById(`id_atssellerproductimage_set-${id.split('-')[2]}-seller_product_images`);
    const closeIcon = document.getElementById(`close-id_atssellerproductimage_set-${id.split('-')[2]}-seller_product_images`);
    if(closeInput && closeIcon){
      closeInput.style.display = 'none';
      closeIcon.style.display = 'none';
      if (closeInput.parentNode.className === 'input' && closeInput.parentNode.style.display === 'flex'){
        closeInput.parentNode.style.display = 'none';
      }else{
        closeInput.parentNode.style.display = 'flex';
      }
    }
    if(closeInput.id === 'id_atssellerproductimage_set-9-seller_product_images'){
      if(closeInput.style.display === 'none'){
        const addBtn = document.getElementById('add-plot-form');
        addBtn.style.display = 'block';
      }
    }
  }
}
function prevImg(event){
  const prodImg = document.querySelectorAll('.product-image');
  let count = 0;
  for (let i=0; i<prodImg.length; i++){
    if (prodImg[i].id === event.target.id.split('-')[1]){
      const selectedDiv = document.getElementById(`${prodImg[i].id}`);
      let len1 = parseInt(event.target.id.split('-')[2])
      if (len1 !== 1){
        count = len1;
        const currentImg = document.getElementsByClassName(`${event.target.id.split('-')[1]}-image-${count}`);
        count--
        const nextImg = document.getElementsByClassName(`${event.target.id.split('-')[1]}-image-${count}`);
        if(nextImg){
          currentImg[0].parentNode.style.display='none';
          nextImg[0].parentNode.style.display='flex';
          nextImg.style.cursor='zoom-in';
        }else{
          currentImg[0].parentNode.style.display='flex';
          nextImg[0].parentNode.style.display='none';
          currentImg.style.cursor='zoom-in';
        }
      }
    }
  }
}
function nextImg(event){
  const prodImg = document.querySelectorAll('.product-image');
  let count = 0;
  for (let i=0; i<prodImg.length; i++){
    if (prodImg[i].id === event.target.id.split('-')[1]){
      const selectedDiv = document.getElementById(`${prodImg[i].id}`);
      let len = parseInt(selectedDiv.children.length);
      let len1 = parseInt(event.target.id.split('-')[2])
      if ( len1 !== len){
        count = len1;
        const currentImg = document.getElementsByClassName(`${event.target.id.split('-')[1]}-image-${count}`);
        count++
        const nextImg = document.getElementsByClassName(`${event.target.id.split('-')[1]}-image-${count}`);
        if(nextImg){
          currentImg[0].parentNode.style.display='none';
          nextImg[0].parentNode.style.display='flex';
          nextImg.style.cursor='zoom-in';
        }else{
          currentImg[0].parentNode.style.display='flex';
          nextImg[0].parentNode.style.display='none';
          currentImg.style.cursor='zoom-in';
        }
      }
    }
  }
}