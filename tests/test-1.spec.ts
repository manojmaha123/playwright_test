import { test, expect } from '@playwright/test';
import twilio from 'twilio';

// Twilio credentials
const accountSid = 'ACcb1c529090409f650c18ee6222cb1199';
const authToken = '6edc656d60c1a7337c4c8ec16f17d578';
const client = twilio(accountSid, authToken);

test('test', async ({ page, context }) => {
  await page.goto('https://paytm.com/movies/bengaluru');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('.PageBlockWidget_closeBtn__MdHIU').click()
  ]);
  await newPage.close();
  await page.getByRole('radio', { name: 'Telugu filter' }).check();
  const movieLink = await page.getByRole('link', { name: 'Seethamma Vakitlo Sirimalle Chettu (2013) Seethamma Vakitlo Sirimalle Chettu (' });
  if (await movieLink.isVisible()) {
    await movieLink.click();
    await page.getByRole('link', { name: 'Fri 7' }).click();
    await page.getByRole('link', { name: 'Sandhya Theatre RGB Laser' }).click();


    client.messages.create({
      body: 'Seethamma Vakitlo Sirimalle Chettu is now available at Sandhya Theatre RGB Laser on Friday 7th.',
      from: '+15075854277',
      to: '+919133626880'
    }).then(message => console.log(`Message sent: ${message.sid}`))
      .catch(error => console.error(`Failed to send message: ${error}`));
  } else {
    console.log('Movie not found.');
  }
  
    // Send call notification
  //   client.calls.create({
  //     twiml: '<Response><Say>Seethamma Vakitlo Sirimalle Chettu is now available at Sandhya Theatre RGB Laser on Friday 7th.</Say></Response>',
  //     to: '+916309649279',
  //     from: '+15075854277'
  //   }).then(call => console.log(`Call initiated: ${call.sid}`))
  //     .catch(error => console.error(`Failed to initiate call: ${error}`));
  // } else {
  //   console.log('Movie not found.');
  // }
});