# Formspree Setup Instructions

Your contact form is now ready to use Formspree for seamless email delivery without opening the user's mail client!

## Quick Setup (5 minutes):

### Step 1: Create a Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Click "Get Started" and sign up (free account)
3. Verify your email address

### Step 2: Create a New Form
1. Once logged in, click "New Form" or "+ New Project"
2. Give it a name like "BZS Software Contact Form"
3. You'll receive a **Form ID** (looks like: `mrbgkpdq` or similar)

### Step 3: Update Your Website
1. Open `index.html` in your code editor
2. Find line 326 where it says:
   ```html
   <form id="contact-form" class="chat-input-wrapper" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID from Formspree:
   ```html
   <form id="contact-form" class="chat-input-wrapper" action="https://formspree.io/f/mrbgkpdq" method="POST">
   ```

### Step 4: Test It!
1. Save your changes
2. Reload your website
3. Fill out the contact form
4. Check your email inbox for the submission

## What You'll Receive

When someone fills out the form, you'll get an email at `bzane09@gmail.com` containing:
- **Name**: Their full name
- **Email**: Their email address (you can reply directly)
- **Phone**: Their phone number
- **Workplace**: Where they work
- **Role**: What they do at their workplace
- **Message**: A formatted summary of all the information

## Features You Get (Free Plan):

✅ **50 submissions per month** (free tier)
✅ **Email notifications** sent to bzane09@gmail.com
✅ **Spam filtering** built-in
✅ **No mail client popup** - seamless experience
✅ **Form submission tracking** in Formspree dashboard
✅ **Export submissions** to CSV

## Upgrade Options (Optional):

- **Gold Plan ($10/month)**: 1,000 submissions/month + more features
- **Platinum Plan ($40/month)**: 10,000 submissions/month + custom branding

## How It Works:

1. User fills out your chat interface
2. JavaScript collects all the data
3. Form is submitted via AJAX to Formspree
4. Formspree sends you an email with the information
5. User sees success message and stays on your page
6. **No mail client opens!** 🎉

## Troubleshooting:

**Q: I'm getting a "Form not found" error**
- Make sure you replaced `YOUR_FORM_ID` with your actual Formspree form ID
- Check that you're using the correct format: `https://formspree.io/f/YOUR_FORM_ID`

**Q: I'm not receiving emails**
- Check your spam folder
- Verify your Formspree account email is confirmed
- Make sure the form ID is correct
- Check your Formspree dashboard for submissions

**Q: Form submissions aren't showing in Formspree**
- Make sure you saved the HTML file after updating the form ID
- Check browser console for any JavaScript errors
- Try submitting a test form directly from Formspree dashboard

## Support:

- Formspree Docs: [https://help.formspree.io](https://help.formspree.io)
- Formspree Support: support@formspree.io

---

**That's it!** Your contact form will now send emails directly to you without opening the user's mail client. 🚀

