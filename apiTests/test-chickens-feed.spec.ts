import {test, expect} from '@playwright/test';

const USER = '4147';

test('Test chickens feed', async ({request}) => {
    const response = await request.post(`/api/${USER}/chickens-feed`);
    expect(response.status()).toEqual(200)
    expect(await response.json()).toMatchObject({
        "action": "chickens-feed",
        "data": null,
        "message": "Your chickens are now full and happy",
        "success": true
    });
});

test('Test chickens feed with wrong id', async ({request}) => {
    const response = await request.post(`/api/${USER}44/chickens-feed`);
    expect(response.status()).toEqual(401)
    expect(await response.json()).toMatchObject({
        "error": "access_denied",
        "error_message": "You do not have access to take this action on behalf of this user"
    });
});