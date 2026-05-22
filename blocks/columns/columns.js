export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Detect split variant: 2 cols where second col has blue bg content
  // (h2 heading + paragraph + link, no image)
  if (cols.length === 2) {
    const col1 = cols[0];
    const col2 = cols[1];
    const col1HasImage = !!col1.querySelector('picture');
    const col2HasH2 = !!col2.querySelector('h2');
    const col2HasNoImage = !col2.querySelector('picture');
    if (col1HasImage && col2HasH2 && col2HasNoImage) {
      block.classList.add('columns-split');
      block.closest('.columns-wrapper')?.classList.add(
        'columns-split-wrapper',
      );
      return;
    }
  }

  // Default: setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
