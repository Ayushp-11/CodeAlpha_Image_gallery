const filterItems = document.querySelector(".items");
const filterImg = document.querySelectorAll(".image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let visibleImages = Array.from(filterImg);

window.onload = () => {
    filterItems.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains("item")) {
            filterItems.querySelector(".active").classList.remove("active");
            selectedItem.target.classList.add("active");

            let filterName = selectedItem.target.getAttribute("data-name");
            visibleImages = [];

            filterImg.forEach((image) => {
                let imgCategory = image.getAttribute("data-name");

                if (filterName === "all" || imgCategory === filterName) {
                    image.classList.remove("hide");
                    image.classList.add("show", "active-bg");
                    visibleImages.push(image);
                } else {
                    image.classList.add("hide");
                    image.classList.remove("show", "active-bg");
                }
            });
        }
    };

    filterImg.forEach((image) => {
        image.addEventListener("click", () => preview(image));
    });
};

const previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    categoryName = previewBox.querySelector(".title p"),
    closeIcon = previewBox.querySelector(".icon"),
    shadow = document.querySelector(".shadow");

function preview(element) {
    document.body.style.overflow = "hidden";
    let selectedPrevImg = element.querySelector("img").src;
    let selectedImgCategory = element.getAttribute("data-name");

    categoryName.textContent = selectedImgCategory;
    previewImg.src = selectedPrevImg;

    previewBox.classList.add("show");
    shadow.classList.add("show");

    currentIndex = visibleImages.indexOf(element);
    updateButtons();
}

function updateButtons() {
    prevBtn.style.opacity = currentIndex > 0 ? "1" : "0.5";
    prevBtn.style.pointerEvents = currentIndex > 0 ? "all" : "none";

    nextBtn.style.opacity = currentIndex < visibleImages.length - 1 ? "1" : "0.5";
    nextBtn.style.pointerEvents = currentIndex < visibleImages.length - 1 ? "all" : "none";
}

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        const prevImage = visibleImages[currentIndex].querySelector("img");
        previewImg.src = prevImage.src;
        categoryName.textContent = visibleImages[currentIndex].getAttribute("data-name");
        updateButtons();
    }
};

nextBtn.onclick = () => {
    if (currentIndex < visibleImages.length - 1) {
        currentIndex++;
        const nextImage = visibleImages[currentIndex].querySelector("img");
        previewImg.src = nextImage.src;
        categoryName.textContent = visibleImages[currentIndex].getAttribute("data-name");
        updateButtons();
    }
};

closeIcon.onclick = () => {
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
    document.body.style.overflow = "";
};

shadow.onclick = () => {
    closeIcon.click();
};
