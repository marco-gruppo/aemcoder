export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows[0];
  const contentRow = rows[1];

  const link = mediaRow?.querySelector('a');
  const videoSrc = link?.href || '';
  const isVideo = videoSrc.endsWith('.mp4');

  block.innerHTML = '';

  if (isVideo) {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'hero-video-bg';

    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.append(source);

    const overlay = document.createElement('div');
    overlay.className = 'hero-video-overlay';

    videoWrapper.append(video, overlay);
    block.append(videoWrapper);
  } else if (mediaRow?.querySelector('picture')) {
    const pictureWrapper = document.createElement('div');
    pictureWrapper.className = 'hero-video-bg';
    pictureWrapper.append(mediaRow.querySelector('picture'));

    const overlay = document.createElement('div');
    overlay.className = 'hero-video-overlay';
    pictureWrapper.append(overlay);
    block.append(pictureWrapper);
  }

  if (contentRow) {
    const content = document.createElement('div');
    content.className = 'hero-video-content';
    const inner = contentRow.querySelector('div');
    if (inner) {
      [...inner.childNodes].forEach((node) => {
        if (node.nodeType === 8) return;
        content.append(node.cloneNode(true));
      });
    }
    block.append(content);
  }
}
