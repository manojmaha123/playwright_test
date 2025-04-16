import { test, expect } from '@playwright/test';
import twilio from 'twilio';

// Twilio credentials
const accountSid = 'ACcb1c529090409f650c18ee6222cb1199';
const authToken = '6edc656d60c1a7337c4c8ec16f17d578';
const client = twilio(accountSid, authToken);

test('test', async ({ page, context }) => {
  await page.goto('https://shop.royalchallengers.com/ticket');
  await page.waitForLoadState('networkidle');
  const buyTicketsButtons = await page.locator('button', { hasText: 'BUY TICKETS' }).count();
  
  if (buyTicketsButtons >= 2) {
    client.calls.create({
      twiml: '<Response><Say>RCB tickets are now available. Hurry up and book your tickets now.</Say></Response>',
      from: '+15075854277',
      to: '+916309649279'
    }).then(call => console.log(`Call initiated: ${call.sid}`))
      .catch(error => console.error(`Failed to initiate call: ${error}`));
  } else {
    console.log(`Tickets are not available.`);
  }
});
