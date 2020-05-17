import TextAnimator from './text-animator';

const INTRO_SCREEN_ID = 0;

export default () => {
  const introTitle = document.querySelector(`.intro__title`);
  const introTitleAnimator = new TextAnimator(introTitle, {
    startDelay: 600
  });

  const introDate = document.querySelector(`.intro__date`);
  const introDateAnimator = new TextAnimator(introDate, {
    startDelay: 1700
  });

  let introScreenOpened = false;
  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenId === INTRO_SCREEN_ID) {
      introScreenOpened = true;
      introTitleAnimator.runAnimation();
      introDateAnimator.runAnimation();
      return;
    }

    if (introScreenOpened) {
      introScreenOpened = false;
      introTitleAnimator.stopAnimation();
      introDateAnimator.stopAnimation();
    }
  });
};
