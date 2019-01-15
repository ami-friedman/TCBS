import User from '../../models/User'

jest.mock('../../models/UserModel');

test('User Model: create and get the ID', async () => {
    let userProps = {
        name: {
            first:'ami',
            last: 'friedman'
        },
        email: 'amishosh@gmail.com',
        password: '1234'
    }
    let user = new User();
    await user.create(userProps);
    expect(user.getId()).toBe('1');
});

test('User Model: get by email', async () => {
    let userProps = {
        name: {
            first:'ami',
            last: 'friedman'
        },
        email: 'amishosh@gmail.com',
        password: '1234'
    }
    let user = new User();
    await user.create(userProps);
    let foundUser = await user.findByEmail('amishosh@gmail.com');
    expect(foundUser).toEqual('1');
});