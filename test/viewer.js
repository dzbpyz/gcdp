// 从 HTML 定义的全局变量中获取 PDF 路径
// 'default.pdf' 是一个备用路径，以防 pdfPathFromHtml 未定义或为空
const url = (typeof pdfPathFromHtml !== 'undefined' && pdfPathFromHtml) ? pdfPathFromHtml : 'default.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.5, // 可以调整缩放比例
      canvas = document.getElementById('pdf-canvas'),
      ctx = canvas.getContext('2d');

// DOM Elements for navigation
const pageNumInput = document.getElementById('page-num');
const pageCountDisplay = document.getElementById('page-count');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const firstPageBtn = document.getElementById('first-page');
const lastPageBtn = document.getElementById('last-page');
const exportImageBtn = document.getElementById('export-image');

// DOM Elements for static links (to be updated)
const openSourcePdfLink = document.getElementById('open-source-pdf-link');
const downloadPdfLinkDropdown = document.getElementById('download-pdf-link-dropdown');
const emailPdfButton = document.getElementById('email-pdf-button');
const bottomDownloadPdfLink = document.getElementById('bottom-download-pdf-link');

// Function to update static links that point to the PDF file
function updateStaticPdfLinks(pdfPath) {
    if (openSourcePdfLink) openSourcePdfLink.href = pdfPath;
    if (downloadPdfLinkDropdown) {
        downloadPdfLinkDropdown.href = pdfPath;
        // 可选: 更新下载文件名
        // downloadPdfLinkDropdown.download = pdfPath.substring(pdfPath.lastIndexOf('/') + 1) || 'document.pdf';
    }
    if (emailPdfButton) {
        emailPdfButton.onclick = () => {
            const subject = encodeURIComponent("PDF文件分享");
            const body = encodeURIComponent(`你好，\n\n请查看这个PDF文件： ${pdfPath}\n\n(或者，如果邮件客户端支持，文件应该已附上)`);
            // 实际上通过JS附加文件到邮件比较复杂且不可靠，通常是引导用户下载后自行附加
            // 这里仅提供一个包含链接的邮件体
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
        };
    }
    if (bottomDownloadPdfLink) {
        bottomDownloadPdfLink.href = pdfPath;
        // 可选: 更新下载文件名
        // bottomDownloadPdfLink.download = pdfPath.substring(pdfPath.lastIndexOf('/') + 1) || 'document.pdf';
    }
}


// Render the page
const renderPage = num => {
    pageIsRendering = true;
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderCtx = { canvasContext: ctx, viewport };
        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;
            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });
        pageNumInput.value = num;
    }).catch(err => {
        console.error("Error rendering page:", err);
        pageIsRendering = false; // Reset flag on error
        displayError("渲染PDF页面时出错: " + err.message);
    });
};

const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

const showPrevPage = () => { if (pageNum <= 1) return; pageNum--; queueRenderPage(pageNum); };
const showNextPage = () => { if (pageNum >= pdfDoc.numPages) return; pageNum++; queueRenderPage(pageNum); };
const showFirstPage = () => { if (pageNum === 1) return; pageNum = 1; queueRenderPage(pageNum); };
const showLastPage = () => { if (pageNum === pdfDoc.numPages) return; pageNum = pdfDoc.numPages; queueRenderPage(pageNum); };

// Function to display errors in the PDF area
function displayError(message) {
    const pdfArea = document.querySelector('.pdf-viewer-area');
    pdfArea.innerHTML = `<div style="color: red; padding: 20px; text-align: center;">错误: ${message}</div>`;
}

// Get Document
if (url === 'default.pdf' && (!pdfPathFromHtml || pdfPathFromHtml === 'your_actual_document.pdf')) {
    displayError("请在 index.html 中配置 'pdfPathFromHtml' 变量指向您的PDF文件。");
} else {
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;
        if (pageCountDisplay) pageCountDisplay.textContent = pdfDoc.numPages;
        renderPage(pageNum);
        updateStaticPdfLinks(url); // Update links once PDF is loaded and URL is confirmed
    })
    .catch(err => {
        console.error("Error loading PDF:", err);
        displayError("加载PDF文件失败: " + (err.message || "未知错误") + ". 请检查文件路径和网络连接，或查看浏览器控制台获取更多信息。");
        // Disable nav buttons if PDF fails to load
        [prevPageBtn, nextPageBtn, firstPageBtn, lastPageBtn, pageNumInput, exportImageBtn].forEach(el => {
            if(el) el.disabled = true;
        });
    });
}

// Button Events
if(prevPageBtn) prevPageBtn.addEventListener('click', showPrevPage);
if(nextPageBtn) nextPageBtn.addEventListener('click', showNextPage);
if(firstPageBtn) firstPageBtn.addEventListener('click', showFirstPage);
if(lastPageBtn) lastPageBtn.addEventListener('click', showLastPage);

if(pageNumInput) {
    pageNumInput.addEventListener('change', () => {
        if (!pdfDoc) return;
        const num = parseInt(pageNumInput.value);
        if (num >= 1 && num <= pdfDoc.numPages) {
            pageNum = num;
            queueRenderPage(pageNum);
        } else {
            pageNumInput.value = pageNum;
        }
    });
}

if(exportImageBtn) {
    exportImageBtn.addEventListener('click', () => {
        if (!pdfDoc || pageIsRendering) return;
        try {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            const filename = url.substring(url.lastIndexOf('/') + 1).replace(/\.pdf$/i, '') || 'document';
            link.href = dataURL;
            link.download = `page_${pageNum}_from_${filename}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error("Error exporting image:", e);
            alert("导出图片失败，可能是因为画布内容过大或浏览器限制。");
        }
    });
}

// --- Dropdown JS ---
document.querySelectorAll('.dropdown > button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        document.querySelectorAll('.dropdown-content.show').forEach(dc => {
            if (dc !== this.nextElementSibling) dc.classList.remove('show');
        });
        this.nextElementSibling.classList.toggle('show');
    });
});
window.onclick = function(event) {
    if (!event.target.matches('.dropdown > button') && !event.target.closest('.dropdown > button')) {
        document.querySelectorAll('.dropdown-content.show').forEach(dc => dc.classList.remove('show'));
    }
};