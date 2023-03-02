const $modeBtn = document.querySelector(".mode-btn");
const $eraserBtn = document.querySelector(".eraser-btn");
const $resetBtn = document.querySelector(".reset-btn");
const $saveBtn = document.querySelector(".save-btn");

// Array.from()을 하는 이유?
// => getElementsByClassName은 HTMLCollection을 반환하기 때문에
// forEach()를 사용하기 위해 배열로 변환해준다.
const $colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const $color = document.getElementById("color-picker");
const $lineWidth = document.getElementById("line-width");
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

$canvas.width = 1000;
$canvas.height = 600;
ctx.lineWidth = $lineWidth.value;

let isPainting = false;
let isFilling = false;

const onMove = (e) => {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(e.offsetX, e.offsetY);
};

const startPainting = () => {
  isPainting = true;
};

const finishPainting = () => {
  isPainting = false;
  ctx.beginPath();
};

const onLineWidthChange = (e) => {
  ctx.lineWidth = e.target.value;
};

const onColorChange = (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
};

const onColorClick = (e) => {
  const colorValue = e.target.dataset.color;
  onStyleColorChange(colorValue);
  $color.value = colorValue;
};

const onStyleColorChange = (color) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const onModeChange = () => {
  if (!isFilling) {
    isFilling = true;
    $modeBtn.innerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            fill="currentColor" 
            class="bi bi-paint-bucket" 
            viewBox="0 0 16 16">
            <path 
                d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"
            />
        </svg>`;
  } else {
    isFilling = false;
    $modeBtn.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-brush"
            viewBox="0 0 16 16">
            <path
                d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"
            />
        </svg>`;
  }
};

const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, 1000, 600);
  }
};

const onEraserClick = () => {
  ctx.strokeStyle = "white";
  isFilling = false;
  $modeBtn.innerHTML = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        class="bi bi-brush"
        viewBox="0 0 16 16">
        <path
            d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"
        />
    </svg>`;
};

const onResetClick = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 600);
};

const saveImages = () => {
  const img = $canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "new paint🖌";
  link.click();
};

$canvas.addEventListener("mousemove", onMove);
$canvas.addEventListener("mousedown", startPainting);
$canvas.addEventListener("mouseup", finishPainting);
$canvas.addEventListener("mouseleave", finishPainting);
$canvas.addEventListener("click", onCanvasClick);

$lineWidth.addEventListener("change", onLineWidthChange);
$color.addEventListener("change", onColorChange);
$colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

$modeBtn.addEventListener("click", onModeChange);
$eraserBtn.addEventListener("click", onEraserClick);
$resetBtn.addEventListener("click", onResetClick);
$saveBtn.addEventListener("click", saveImages);
