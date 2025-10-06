# Contact Form Setup

The chat interface contact form is currently configured to send submissions via **mailto** link, which opens the user's default email client with pre-filled information.

## Current Implementation

When a user completes the chat (name, email, phone), the browser will automatically open an email to `bzane09@gmail.com` with all the collected information.

**Pros:**
- Works immediately, no setup required
- No third-party service needed
- Free

**Cons:**
- Opens email client (may interrupt user experience)
- Requires user to have email client configured
- User can see/modify the email before sending

## Alternative: Formspree (Recommended for Production)

For a seamless experience, you can use Formspree to handle form submissions:

### Setup Steps:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form project
3. Copy your form ID (looks like: `xzbqwery`)
4. In `index.html` line 317, replace `YOUR_FORM_ID` with your actual form ID:
   ```html
   <form id="contact-form" class="chat-input-wrapper" action="https://formspree.io/f/xzbqwery" method="POST">
   ```
5. In `script.js`, comment out or remove lines 239-249 (the mailto code)
6. Add form submission code instead:
   ```javascript
   // Submit form
   document.getElementById('contact-form').submit();
   ```

**Benefits:**
- Submissions sent directly to your email
- No email client interruption
- Clean user experience
- Can set up email notifications
- Free tier includes 50 submissions/month

## Alternative: Custom Backend

You can also create your own backend endpoint to handle submissions:
- Set up a serverless function (Vercel, Netlify, AWS Lambda)
- Send emails via SendGrid, Mailgun, or similar service
- Store submissions in a database

Let me know which approach you'd prefer and I can help implement it!

