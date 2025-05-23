// 获取 DOM 元素
const qualityPage = document.getElementById('qualityPage');
const contactPage = document.getElementById('contactPage');
const btnQuality = document.getElementById('btnQuality');
const btnContact = document.getElementById('btnContact');

// 定义切换函数
function showQuality() {
  qualityPage.style.display = 'block';
  contactPage.style.display = 'none';
}
function showContact() {
  qualityPage.style.display = 'none';
  contactPage.style.display = 'block';
}

// 绑定事件
btnQuality.addEventListener('click', showQuality);
btnContact.addEventListener('click', showContact);

// 页面默认加载时显示质检信息
showQuality();
