import {getTours} from "@rest/tours";

import '@styles/main.scss';
import {ITours} from "./models/tours/tour";
import {getTourTemplate} from "./templates/tours";
import {openModal} from "@services/modal/modalService";
import {toursDataArray} from "@services/tours/registry";


function initApp() {
  getTours()
      .then((data): void => {
        for (let i=0;i<data.length;i++){
          toursDataArray.push(data[i]);
        }
        initToursDivElements(toursDataArray);
      });
}


function initToursDivElements(data: ITours[]) {

  if (!Array.isArray(data)) {
    return;
  }

  const rootElement = document.querySelector('.main-app');
  const tourWrap = document.createElement('div');

  tourWrap.classList.add('tour-wrap');

  tourWrap.addEventListener('click', (ev) => {
    const targetItem = ev.target as HTMLElement;
    const parentItem = (targetItem.parentNode as HTMLElement);

    let targetedDiv: HTMLElement = null;

    if (targetItem.hasAttribute('data-tour-item-index')) {
      targetedDiv = targetItem;
    } else if (parentItem.hasAttribute('data-tour-item-index')) {
      targetedDiv = parentItem;
    }

    if (!targetedDiv) {
      return;
    }

    const dataIndex = targetedDiv.getAttribute('data-tour-item-index');
    openModal('order', Number(dataIndex));
  });

  let rootElementData = '';

  for (let i = 0; i < data.length; i++) {
    rootElementData += getTourTemplate(data[i], i);
  }

  tourWrap.innerHTML = rootElementData;
  rootElement.appendChild(tourWrap);
}

// init app
initApp();
