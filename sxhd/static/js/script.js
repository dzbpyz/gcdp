document.addEventListener('DOMContentLoaded', function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const jhParam = urlParams.get('jh');
    const zlParam = urlParams.get('zl'); 

    const furnaceNumberElement = document.getElementById('furnaceNumberValue');
    const itemPart1Element = document.getElementById('itemNumberPart1');
    const itemPart2Element = document.getElementById('itemNumberPart2');
    const weightValueElement = document.getElementById('weightValue');
    
    if (furnaceNumberElement && itemPart1Element) {
        itemPart1Element.textContent = furnaceNumberElement.textContent.trim();
    }
    if (jhParam && itemPart2Element) {
        itemPart2Element.textContent = jhParam;
    }

    if (zlParam && weightValueElement) {
        weightValueElement.textContent = zlParam;
    }

    const itemNumberElement = document.getElementById('itemNumberValue');
    const searchInputElement = document.getElementById('searchInput');

    if (itemNumberElement && searchInputElement) {
        searchInputElement.value = itemNumberElement.textContent.trim();
    }

    const tabProduct = document.getElementById('tab-product');
    const tabQuality = document.getElementById('tab-quality');
    const contentProduct = document.getElementById('content-product');
    const contentQuality = document.getElementById('content-quality');

    function showProductInfo() {
        tabProduct.classList.add('active');
        tabQuality.classList.remove('active');
        
        tabProduct.style.backgroundColor = '#0044FF'; 
        tabQuality.style.backgroundColor = '#00D0FF'; 
        
        contentProduct.classList.add('active');
        contentQuality.classList.remove('active');
    }

    function showQualityInfo() {
        tabQuality.classList.add('active');
        tabProduct.classList.remove('active');

        tabProduct.style.backgroundColor = '#00D0FF'; 
        tabQuality.style.backgroundColor = '#0044FF'; 

        contentQuality.classList.add('active');
        contentProduct.classList.remove('active');
    }

    tabProduct.addEventListener('click', showProductInfo);
    tabQuality.addEventListener('click', showQualityInfo);
    
    showProductInfo();
});