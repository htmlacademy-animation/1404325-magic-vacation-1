export default () => {
  function onload() {
    document.body.classList.add(`body--loaded`);
  }

  if (document.readyState === `loading`) {
    document.addEventListener(`DOMContentLoaded`, onload);
  } else {
    onload();
  }
};
