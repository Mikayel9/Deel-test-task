const { Profile } = require('../models/model');

test('Profile model should create a profile', () => {
    const profile = Profile.build({
        firstName: 'John',
        lastName: 'Doe',
        profession: 'Developer',
        balance: 1000,
        type: 'client'
    });
    expect(profile).toBeTruthy();
});