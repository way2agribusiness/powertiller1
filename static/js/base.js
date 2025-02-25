const currentPath = window.location.pathname;
        	const currentHREF = window.location.href;
        	const navLinks = document.querySelectorAll('.navc2 a');
        	const mobileMenu = document.getElementById('mobile-menu');
        	const deskMenu = document.getElementById('menu-mobile');
      
        	window.addEventListener('scroll',function(){
            	deskMenu.style.display = 'none';
        	});
     
        	navLinks.forEach((link) => {
            	if (link.getAttribute('href') === currentPath) {
              		link.classList.add('active');
            	}
        	});
      
        	mobileMenu.addEventListener('click', function () {
            	if (deskMenu.style.display === 'block') {
              		deskMenu.style.display = 'none';
            	} else {
              		deskMenu.style.display = 'block';
            	}
        	});
        	
        	for (let i=0; i < navLinks.length;i++){
          		console.log(navLinks[i]);
          		if(navLinks[i].className === 'active'){
            		console.log("href: ",navLinks[i].href);
            		if (navLinks[i].baseURI === window.location.href){
              			navLinks[i].style.borderBottom = '2px solid goldenrod';
            		}
          		} else {
            		if (currentHREF.endsWith('/')){
              			console.log("with /: ",currentHREF)
              			url = currentHREF.slice(0, -1);
              			if (navLinks[i].href === url){
                			navLinks[i].style.borderBottom = '2px solid goldenrod';
              			}
            		}else{
              			console.log("without /: ",currentHREF)
              			if (navLinks[i].href === currentHREF){
               	 			navLinks[i].style.borderBottom = '2px solid goldenrod';
              			}
            		}
            	}
        	}