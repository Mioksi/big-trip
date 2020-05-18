import AbstractComponent from '../../abstracts/abstract-component';

const createLoading = () => `<p class="trip-events__msg">Loading...</p>`;

export default class LoadingEvents extends AbstractComponent {
  getTemplate() {
    return createLoading();
  }
}
