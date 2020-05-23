import {Place} from '../consts';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place = Place.BEFOREEND) => {
  switch (place) {
    case Place.BEFOREEND:
      container.append(component.getElement());
      break;
    case Place.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Place.BEFOREBEGIN:
      container.before(component.getElement());
      break;
    case Place.AFTEREND:
      container.after(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
