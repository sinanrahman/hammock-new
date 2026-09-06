'use server';

export async function submitContactForm(formData: FormData) {
  // Placeholder for real backend logic
  // In a real application, you would send this to an API, database, or email service
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // For now, we'll just log it on the server and throw an error to show the configured state
  console.log('Received contact form submission:', Object.fromEntries(formData));
  
  throw new Error('Not connected to a real backend');
}
