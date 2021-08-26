import AdminPanel from '../pages/AdminPanel';

const testProduct = {
    _id: "testId",
    name: {
        pl: "Kalosze",
        en: "Tall Wellington Boots"
    },
    brand: "Hunter",
    price: [
        {
            currency: "USD",
            price: 15338
        },
        {
            currency: "PLN",
            price: 59494
        },
        {
            currency: "EUR",
            price: 13000
        }
    ]
}

describe('admin', () => {
    it('allows user to log in as admin', () => {
        const admin = new AdminPanel();
        admin.signIn()
            .assertSuccessfulSignIn();
    });

    it('allows adding and removing products', () => {
        const admin = new AdminPanel();
        admin.signIn()
            .addNewProduct(testProduct)
            .checkIfProductIsAdded(testProduct);

        admin.removeProduct(testProduct);
    });

    it('allows to log out', () => {
        const admin = new AdminPanel();
        admin.signIn().assertSuccessfulSignIn()
            .logout()
            .assertSuccessfulLogout();
    });
});
