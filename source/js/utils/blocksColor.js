const coloredBlocks = document.querySelectorAll('.color')

if(coloredBlocks.length > 0) {
  coloredBlocks.forEach((elem) => {
    const color = elem.getAttribute('data-color')
    elem.style.setProperty('--block-color', color);
  })
}
