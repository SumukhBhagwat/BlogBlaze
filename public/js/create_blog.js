'use strict';

/**
 * Import modules
 */
import Snackbar from './snackbar.js';   // Snackbar module for notifications
//import config from './config.js';   // Configuration file (e.g., for file size limit)

/**
 * Selectors for form elements
 */
const $form = document.querySelector('[data-form]');
const $publishBtn = document.querySelector('[data-publish-btn]');
const $progressBar = document.querySelector('[data-progress-bar]');

/**
 * Handle blog publish
 */
const handlePublishBlog = async function (event) {
  event.preventDefault(); // Prevent form from submitting in the default way

  // Disable the publish button to prevent multiple submissions
  $publishBtn.setAttribute('disabled', '');

  // Create a FormData object to capture all form data
  const formData = new FormData($form);

  // Create request body from formData
  const body = Object.fromEntries(formData.entries());

  // Show the progress bar to indicate that the request is being processed
  $progressBar.classList.add('loading');

  try {
    // Send the form data to the server to create the blog
    const response = await fetch(`${window.location.origin}/createblog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Handle success
    if (response.ok) {
      Snackbar({ message: 'Your blog has been created.' });
      $progressBar.classList.add('loading-end');
      // Redirect to the blog post page or another page upon success
      window.location = response.url;
    } else {
      // Handle error if response is not ok (e.g., 400 Bad Request)
      const { message } = await response.json();
      Snackbar({ type: 'error', message });
      $publishBtn.removeAttribute('disabled');
      $progressBar.classList.add('loading-end');
    }

  } catch (error) {
    // Handle network errors or other unexpected issues
    Snackbar({ type: 'error', message: 'An unexpected error occurred. Please try again later.' });
    $publishBtn.removeAttribute('disabled');
    $progressBar.classList.add('loading-end');
  }
};

// Add event listener for form submission
$form.addEventListener('submit', handlePublishBlog);
