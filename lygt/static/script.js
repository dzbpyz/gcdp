document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfParamValue = urlParams.get('pdf');
    const zlParamValue = urlParams.get('zl'); 
    const khParamValue = urlParams.get('kh'); 

    const certificateImageElement = document.querySelector('.full-width-image-area .certificate-image-container img');
    const defaultImageSrc = certificateImageElement ? certificateImageElement.src : '../pdf/001.png'; 
    const defaultImageAlt = certificateImageElement ? certificateImageElement.alt : '产品质量证明书';

    if (certificateImageElement) {
        try {
            if (pdfParamValue) {
                if (pdfParamValue.includes('.') && pdfParamValue.lastIndexOf('.') < pdfParamValue.length - 1) {
                    let explicitFileName = pdfParamValue.replace(/[^\w\-\.]/g, ''); 
                    if (explicitFileName) {
                        certificateImageElement.src = `../pdf/${explicitFileName}`;
                        const baseName = explicitFileName.substring(0, explicitFileName.lastIndexOf('.'));
                        certificateImageElement.alt = `产品质量证明书 ${baseName}`;
                        certificateImageElement.onerror = function() {
                            console.error(`Error loading explicitly specified image: ../pdf/${explicitFileName}. Reverting to default.`);
                            certificateImageElement.src = defaultImageSrc; 
                            certificateImageElement.alt = defaultImageAlt;
                            certificateImageElement.onerror = null; 
                        };
                        certificateImageElement.onload = function() {
                            certificateImageElement.onerror = null; 
                        };
                    } else {
                        console.warn('Invalid "pdf" parameter (with extension) after sanitization:', pdfParamValue);
                    }
                } else {
                    let baseFileName = pdfParamValue.replace(/[^\w\-]/g, ''); 
                    if (baseFileName) {
                        const extensionsToTry = ['png', 'jpg', 'jpeg', 'gif', 'webp']; 
                        let foundImage = false;
                        function tryLoadNextExtension(index) {
                            if (index >= extensionsToTry.length) {
                                console.warn(`Image not found for base name "${baseFileName}" with any attempted extension. Reverting to default.`);
                                certificateImageElement.src = defaultImageSrc; 
                                certificateImageElement.alt = defaultImageAlt;
                                certificateImageElement.onerror = null;
                                return;
                            }
                            const currentExtension = extensionsToTry[index];
                            const potentialSrc = `../pdf/${baseFileName}.${currentExtension}`;
                            certificateImageElement.src = potentialSrc;
                            certificateImageElement.onload = function() {
                                console.log(`Successfully loaded: ${potentialSrc}`);
                                certificateImageElement.alt = `产品质量证明书 ${baseFileName}`;
                                foundImage = true;
                                certificateImageElement.onerror = null; 
                                certificateImageElement.onload = null;  
                            };
                            certificateImageElement.onerror = function() {
                                console.log(`Failed to load: ${potentialSrc}. Trying next extension...`);
                                tryLoadNextExtension(index + 1); 
                            };
                        }
                        tryLoadNextExtension(0); 
                    } else {
                        console.warn('Invalid "pdf" parameter (no extension) after sanitization:', pdfParamValue);
                    }
                }
            }
        } catch (e) {
            console.error("Error processing URL parameters for PDF image:", e);
            if (certificateImageElement) {
                certificateImageElement.src = defaultImageSrc; 
                certificateImageElement.alt = defaultImageAlt;
            }
        }
    } else {
        console.error('Certificate image element not found for dynamic update.');
    }

    const sourceItemTemplate = document.querySelector('[data-source-item-template]');
    const sourceDetailsTemplate = document.querySelector('[data-source-details-template]');

    if (!sourceItemTemplate || !sourceDetailsTemplate) {
        console.error('数据源模板元素未找到!');
        return;
    }

    const sourceData = {
        idText: sourceItemTemplate.querySelector('[data-source-field="idText"]')?.textContent || '',
        dateLabel: sourceItemTemplate.querySelector('[data-source-label-part="dateLabel"]')?.textContent || '签发日期: ',
        dateValue: sourceItemTemplate.querySelector('[data-source-value-part="dateValue"]')?.textContent || '',
        pValues: {}, 
        components: {},
        properties: {}
    };

    sourceDetailsTemplate.querySelectorAll('[data-source-p]').forEach(pElement => {
        const pKey = pElement.dataset.sourceP;
        if (pKey === 'weight') { 
            const valueSpan = pElement.querySelector('[data-source-value-part="weightValue"]');
            const unitSpan = pElement.querySelector('[data-source-value-part="weightUnit"]');
            if (valueSpan) sourceData.pValues.weightValue = valueSpan.textContent.trim();
            if (unitSpan) sourceData.pValues.weightUnit = unitSpan.textContent.trim();
        } else if (pKey === 'bundleNo') { 
            const valueSpan = pElement.querySelector('[data-source-value-part="bundleNoValue"]');
            if (valueSpan) sourceData.pValues.bundleNoValue = valueSpan.textContent.trim();
        } else if (pKey === 'productionDate') {
            const labelSpan = pElement.querySelector('[data-source-label-part="productionDateLabel"]');
            const valueSpan = pElement.querySelector('[data-source-value-part="productionDateValue"]');
            if (labelSpan) sourceData.pValues.productionDateLabel = labelSpan.textContent.trim(); 
            if (valueSpan) sourceData.pValues.productionDateValue = valueSpan.textContent.trim(); 
        } else { 
            const textContent = pElement.textContent || '';
            const colonIndex = textContent.indexOf(':');
            const value = (colonIndex !== -1) ? textContent.substring(colonIndex + 1).trim() : textContent.trim();
            if (pKey) sourceData.pValues[pKey] = value;
        }
    });

    if (zlParamValue) {
        const sanitizedZl = zlParamValue.replace(/[^\d.-]/g, ''); 
        if (sanitizedZl) {
            sourceData.pValues.weightValue = sanitizedZl; 
            const sourceWeightValueSpan = sourceDetailsTemplate.querySelector('[data-source-value-part="weightValue"]');
            if (sourceWeightValueSpan) sourceWeightValueSpan.textContent = sanitizedZl;
        } else {
            console.warn('无效的 "zl" (重量) URL参数 (过滤后为空):', zlParamValue);
        }
    }
    if (khParamValue) {
        sourceData.pValues.bundleNoValue = khParamValue; 
        const sourceBundleNoValueSpan = sourceDetailsTemplate.querySelector('[data-source-value-part="bundleNoValue"]');
        if (sourceBundleNoValueSpan) sourceBundleNoValueSpan.textContent = khParamValue;
    }
    if (!sourceData.pValues.weightUnit && sourceDetailsTemplate.querySelector('[data-source-value-part="weightUnit"]')) {
        sourceData.pValues.weightUnit = sourceDetailsTemplate.querySelector('[data-source-value-part="weightUnit"]').textContent.trim() || 'kg';
    }

    if (sourceData.pValues.productionDateValue) {
        sourceData.dateValue = sourceData.pValues.productionDateValue;
        const sourceDateValueSpan = sourceItemTemplate.querySelector('[data-source-value-part="dateValue"]');
        if (sourceDateValueSpan) {
            sourceDateValueSpan.textContent = sourceData.dateValue;
        }
    }

    sourceDetailsTemplate.querySelectorAll('[data-source-component]').forEach(compElement => {
        const key = compElement.dataset.sourceComponent;
        const valueElement = compElement.querySelector('[data-source-value]');
        const statusElement = compElement.querySelector('[data-source-status]');
        if (key && valueElement && statusElement) {
            sourceData.components[key] = {
                value: valueElement.textContent || '',
                status: statusElement.textContent || ''
            };
        }
    });

    const propertiesToCopyFromSource = [
        'actualThickness', 'gaugeCode', 'yieldStrength', 'tensileStrength',
        'yieldRatio', 'bendingAngle', 'bendingDiameter', 'tensileDirection'
    ];
    propertiesToCopyFromSource.forEach(propKey => {
         const propElement = sourceDetailsTemplate.querySelector(`[data-source-property="${propKey}"]`);
         const valueElement = propElement?.querySelector('[data-source-value]');
         const statusElement = propElement?.querySelector('[data-source-status]');
         if (propElement && valueElement && statusElement){
            sourceData.properties[propKey] = {
                value: valueElement.textContent || '',
                status: statusElement.textContent || ''
            };
         }
    });

    const targetItems = document.querySelectorAll('[data-target-item]');
    targetItems.forEach(targetItem => {
        const targetDetails = targetItem.nextElementSibling;
        if (!targetDetails || !targetDetails.hasAttribute('data-target-details')) return;

        const targetIdField = targetItem.querySelector('[data-target-field="idText"]');
        if (targetIdField) targetIdField.textContent = sourceData.idText;
        
        const targetDateFieldCombined = targetItem.querySelector('[data-target-field="dateTextCombined"]');
        if (targetDateFieldCombined) {
            targetDateFieldCombined.textContent = (sourceData.dateLabel || '') + (sourceData.dateValue || '');
        }

        for (const key in sourceData.pValues) {
            const targetPValueSpan = targetDetails.querySelector(`[data-target-value-for-p="${key}"]`);
            if (targetPValueSpan) {
                 targetPValueSpan.textContent = sourceData.pValues[key];
            }
        }

        for (const key in sourceData.properties) {
             const targetPropEntry = targetDetails.querySelector(`[data-target-property="${key}"]`);
             if (targetPropEntry) {
                 const targetValueSpan = targetPropEntry.querySelector('[data-target-value]');
                 const targetStatusSpan = targetPropEntry.querySelector('[data-target-status]');
                 if (targetValueSpan && sourceData.properties[key]?.value !== undefined) targetValueSpan.textContent = sourceData.properties[key].value;
                 if (targetStatusSpan && sourceData.properties[key]?.status !== undefined) targetStatusSpan.textContent = sourceData.properties[key].status;
             }
        }

        if (targetDetails.dataset.itemIndex === '6') {
            for (const key in sourceData.components) {
                const targetCompEntry = targetDetails.querySelector(`[data-target-component="${key}"]`);
                if (targetCompEntry) {
                    const targetValueSpan = targetCompEntry.querySelector('[data-target-value]');
                    const targetStatusSpan = targetCompEntry.querySelector('[data-target-status]');
                    if (targetValueSpan && sourceData.components[key]?.value !== undefined) targetValueSpan.textContent = sourceData.components[key].value;
                    if (targetStatusSpan && sourceData.components[key]?.status !== undefined) targetStatusSpan.textContent = sourceData.components[key].status;
                }
            }
        }
    });

    const warrantyItems = document.querySelectorAll('.warranty-item'); 
    warrantyItems.forEach(item => {
        item.addEventListener('click', function() {
            const currentDetails = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            document.querySelectorAll('.warranty-item').forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                    const otherDetails = otherItem.nextElementSibling;
                    if (otherDetails && otherDetails.classList.contains('warranty-details') && !otherDetails.classList.contains('full-width-image-area')) { 
                        otherDetails.classList.remove('expanded');
                    }
                }
            });
            if (currentDetails && currentDetails.classList.contains('warranty-details') && !currentDetails.classList.contains('full-width-image-area')) {
                if (isActive) {
                    this.classList.remove('active');
                    currentDetails.classList.remove('expanded');
                } else {
                    this.classList.add('active');
                    currentDetails.classList.add('expanded');
                }
            }
        });
    });

    const originalCertificateImage = certificateImageElement; 
    const lightbox = document.getElementById('imageLightbox'); 
    const lightboxImg = document.getElementById('lightboxImage');
    let lightboxZoomState = 0; 
    let clickTimer = null;

    if (originalCertificateImage && lightbox && lightboxImg) {
        originalCertificateImage.addEventListener('click', function() {
            openLightbox(this.src); 
        });

        function openLightbox(src) {
            lightboxImg.src = src;
            lightboxZoomState = 1; 
            lightboxImg.classList.remove('lightbox-image-zoomed');
            lightbox.classList.remove('is-scrollable'); 
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
            lightboxZoomState = 0; 
            document.body.style.overflow = 'auto';
            lightboxImg.classList.remove('lightbox-image-zoomed');
            lightbox.classList.remove('is-scrollable'); 
        }

        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) { 
                closeLightbox();
            }
        });

        lightboxImg.addEventListener('click', function(event) {
            event.stopPropagation(); 
            if (clickTimer) { 
                clearTimeout(clickTimer);
                clickTimer = null;
                handleDoubleClick();
            } else { 
                clickTimer = setTimeout(() => {
                    clickTimer = null;
                    handleSingleClick();
                }, 250); 
            }
        });
        
        function handleSingleClick() {
            closeLightbox();
        }

        function handleDoubleClick() {
            if (lightboxZoomState === 1) { 
                lightboxImg.classList.add('lightbox-image-zoomed');
                lightbox.classList.add('is-scrollable'); 
                lightboxZoomState = 2;
            } else if (lightboxZoomState === 2) { 
                lightboxImg.classList.remove('lightbox-image-zoomed');
                lightbox.classList.remove('is-scrollable'); 
                lightboxZoomState = 1;
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightboxZoomState !== 0) {
                closeLightbox();
            }
        });

    } else {
        if (!originalCertificateImage) console.error('原始证书图片（用于灯箱）未找到！');
        if (!lightbox) console.error('灯箱覆盖层元素未找到！');
        if (!lightboxImg) console.error('灯箱图片元素未找到！');
    }
});