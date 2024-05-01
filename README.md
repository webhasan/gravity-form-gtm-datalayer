# Gravity form Tracking with Google Tag Manager - Graviy Form GTM Data Layer
## For Ajax / Non-Ajax Both Types of Gravity Form 

### How to use 
1. In Google Tag Manager, create a new tag as a custom HTML tag.
2. Inside the tag, paste the entire code from the `gform-datalayer.js` file provided in this repository. Don't forget to wrap the code with <script> tag.
3. Set the trigger to fire on all page views.

Once you've configured this setup, you'll begin receiving Google Tag Manager dataLayer events as `gravity_form_submit`. You will get form ID as ***formId*** and all other form inputs.
