const createOption = (city) => `<option value="${city}"></option>`;

const createOptions = (cities) => cities.map((city) => createOption(city.name)).join(``);

export {createOptions};
