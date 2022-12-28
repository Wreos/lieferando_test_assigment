import {test, expect} from '@playwright/test';

const USER = '4147';

test('Test put the Toilet Seat Down', async ({request}) => {
    const response = await request.post(`/api/${USER}/toiletseat-down`);
    expect(response.ok()).toBeTruthy()
    expect(await response.json()).toMatchObject({
            "action": "toiletseat-down",
            "data": null,
            "message": "You just put the toilet seat down. You're a wonderful roommate!",
            "success": true,
        }
    );
});

test('Test put the Toilet Seat Down with wrong user id', async ({request}) => {
    const response = await request.post(`/api/${USER}44/barn-unlock`);
    expect(response.status()).toEqual(401)
    expect(await response.json()).toMatchObject({
        "error": "access_denied",
        "error_message": "You do not have access to take this action on behalf of this user"
    });
});