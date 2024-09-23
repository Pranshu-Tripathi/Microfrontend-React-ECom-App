import faker from 'faker';

const mount = (el) => {
    let products = '';

    for (let i = 0 ; i < 12 ; i++) {
        const name = faker.commerce.productName();
        products += `<div>${name}</div>`;
    }

    el.innerHTML = products;
};

// development in products -> we can run immediately as dev-products is not dependent on any other service
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-products');

    if (el) {
        mount(el);
    }
}

// in container deployed in production, we can't run this immediately as we depend on other services name.
export { mount };