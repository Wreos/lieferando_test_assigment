import {test, expect} from '@playwright/test';

const USER = '4147';

test('Test unlock the Barn', async ({request}) => {
    const response = await request.post(`/api/${USER}/barn-unlock`);
    expect(response.ok()).toBeTruthy()
    expect(await response.json()).toMatchObject({
        "action": "barn-unlock",
        "data": null,
        "message": "You just unlocked your barn! Watch out for strangers!",
        "success": true
    });
});

test('Test validation when unlock the Barn with wrong user id', async ({request}) => {
    const response = await request.post(`/api/${USER}44/barn-unlock`);
    expect(response.status()).toEqual(401)
    expect(await response.json()).toMatchObject({
        "error": "access_denied",
        "error_message": "You do not have access to take this action on behalf of this user"
    });
});