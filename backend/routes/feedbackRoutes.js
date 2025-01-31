app.post('/api/feedback/submit', (req, res) => {
    const { email, message } = req.body;
  
    // Example validation
    if (!email || !message) {
      return res.status(400).json({ message: 'Email and message are required' });
    }
  
    // Assuming you're saving feedback to MongoDB
    const feedback = new Feedback({ email, message });
    feedback.save()
      .then(() => {
        console.log('Feedback saved:', feedback); // Log saved feedback
        res.status(200).json({ message: 'Feedback submitted successfully' });
      })
      .catch((err) => {
        console.error('Error saving feedback:', err); // Log any errors
        res.status(500).json({ message: 'Error saving feedback', error: err });
      });
  });
  
