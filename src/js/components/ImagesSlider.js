const ImagesSlider = ({ images = [], jsClassIdentifier = '' }) => {
    return `
        <div class="images-slider ${jsClassIdentifier}">
            ${images
                .map(
                    (element, index) =>
                        `
                        <div class="images-slider__item js-images-slider__item" data-image-index="${index}">
                            <img src="${element}" alt="Movie Images" class="images-slider__image"/>
                        </div>
                    `
                )
                .join('')}
            ${
                images.length > 0
                    ? `<div class="images-slider__item js-images-slider__item">
                            <div class="view-all-images__wrapper cur-pointer" onclick="alert('One day...')">
                                <i class="icon-right-arrow view-all-images__icon color-blue"></i>
                                <p class="view-all-images__text color-black--transparent">View all</p>
                            </div>
                        </div>`
                    : ``
            }
        </div>
    `
}

export default ImagesSlider
