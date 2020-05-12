const RULES_SCREEN_ID = 3;
const ANIMATION_CLASS = `rules__link--animated`;
let rulesScreenOpened = false;

export default () => {
  const lastRuleItemText = document.querySelector(`.rules__list .rules__item:last-child p`);
  const rulesButton = document.querySelector(`.rules__link`);


  lastRuleItemText.addEventListener(`animationend`, () => {
    if (rulesScreenOpened) {
      rulesButton.classList.add(ANIMATION_CLASS);
    }
  });

  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenId === RULES_SCREEN_ID) {
      rulesScreenOpened = true;
      return;
    }

    if (rulesScreenOpened) {
      rulesScreenOpened = false;
      rulesButton.classList.remove(ANIMATION_CLASS);
    }
  });
};
