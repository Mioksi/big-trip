const createOption = (city) => `<option value="${city}"></option>`;

const createOptions = (cities) => cities.map((createOption)).join(``);

export {createOptions};
