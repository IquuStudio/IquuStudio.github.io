
function magnify(div, zoom) {
  var glass, w, h, bw;

  // Get background image
  const bgUrl = window.getComputedStyle(div).backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

  // Create magnifier glass
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  glass.style.pointerEvents = "none"; // ważne, by lupa nie przechwytywała zdarzeń

  // Wstaw do środka diva
  div.appendChild(glass);

  // Set background for lupa
  glass.style.backgroundImage = `url('${bgUrl}')`;
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (div.offsetWidth * zoom) + "px " + (div.offsetHeight * zoom) + "px";

  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
    glass.style.left = "-9999px"; // ukryj poza ekran


div.addEventListener("mouseleave", () => {
  glass.classList.remove("active");
  glass.style.left = "-9999px"; // ukryj poza ekran
});

  div.addEventListener("mousemove", moveMagnifier);
  div.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    if (x > div.offsetWidth - (w / zoom)) x = div.offsetWidth - (w / zoom);
    if (x < w / zoom) x = w / zoom;
    if (y > div.offsetHeight - (h / zoom)) y = div.offsetHeight - (h / zoom);
    if (y < h / zoom) y = h / zoom;

    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    a = div.getBoundingClientRect();
    x = e.pageX - a.left - window.pageXOffset;
    y = e.pageY - a.top - window.pageYOffset;
    return { x: x, y: y };
  }
}
