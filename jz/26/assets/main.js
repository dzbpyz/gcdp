(function() {
    // 检测是否为 iOS 设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    function getParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    const pdfName = getParam('pdf');
    const iframe = document.getElementById('pdfFrame');
    let pdfUrl = '';

    if (pdfName) {
        pdfUrl = `./pdf/${pdfName}.pdf`;          // 相对路径，确保 pdf 文件夹与 index.html 同级
        iframe.src = pdfUrl;
    } else {
        document.querySelector('.content').innerHTML = '<p style="text-align:center;padding-top:50px;color:#999;">请指定pdf参数，例如 ?pdf=004</p>';
        iframe.style.display = 'none';
    }

    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', function() {
        if (!pdfUrl) {
            alert('没有可下载的PDF文件');
            return;
        }

        // iOS 设备：直接新窗口打开，用户可通过系统分享菜单保存 PDF（不会出现0字节）
        if (isIOS) {
            window.open(pdfUrl, '_blank');
            return;
        }

        // 非 iOS 设备：使用 fetch + Blob 下载（Chrome / Edge / Firefox 等）
        fetch(pdfUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('文件不存在或网络错误 (状态码: ' + response.status + ')');
                }
                return response.blob();
            })
            .then(blob => {
                if (blob.size === 0) {
                    throw new Error('文件大小为0，可能文件损坏');
                }
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = pdfName + '.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(link.href), 100);
            })
            .catch(error => {
                console.warn('fetch下载失败，降级为新窗口打开:', error);
                window.open(pdfUrl, '_blank');
            });
    });
})();