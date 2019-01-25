import User from '../../models/User'

jest.mock('../../models/UserModel');

let userProps = {
    name: {
        first:'ami',
        last: 'friedman'
    },
    email: 'amishosh@gmail.com',
    password: '1234'
}

test('User Model: create and get the ID', async () => {
    let user = new User();
    await user.create(userProps);
    expect(user.getId()).toBe('1');
});

test('User Model: find by email', async () => {
    let user = new User();
    await user.create(userProps);
    let foundUser = await user.findByEmail('amishosh@gmail.com');
    expect(foundUser).toEqual(userProps);
});

test('User Model: find by ID', async () => {
    let user = new User();
    await user.create(userProps);
    let foundUser = await user.findById('1');
    expect(foundUser).toEqual(userProps);
});

test('User Model: validate password positive case', async () => {
    let user = new User();
    await user.create(userProps);
    expect(await user.validatePassword(userProps.email, userProps.password)).toBeTruthy();
});

test('User Model: validate password negative: wrong email', async () => {
    let user = new User();
    await user.create(userProps);
    
    expect(await user.validatePassword('shmagegi@pok.com', userProps.password)).toBeFalsy();
});

test('User Model: validate password negative: wrong password', async () => {
    let user = new User();
    await user.create(userProps);
    
    expect(await user.validatePassword(userProps.email, '12')).toBeFalsy();
});