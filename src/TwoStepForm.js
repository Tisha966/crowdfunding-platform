import React, { useState } from 'react';
import './TwoStepForm.css'; // Import your CSS file

const TwoStepForm = () => {
  const [step, setStep] = useState(1); // Track the step
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: 'en',
    description: '',
    image: null,
    bold: false,
    italic: false,
    minAmount: '',
    educationStatus: '',
    heardAbout: '',
    relationship: '',
    employmentStatus: '',
    mobileNumber: '',
    whyRaiseFunds: '',
  });

  const [submitted, setSubmitted] = useState(false); // To track if the form has been submitted

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleToggleBold = () => {
    setFormData({
      ...formData,
      bold: !formData.bold,
    });
  };

  const handleToggleItalic = () => {
    setFormData({
      ...formData,
      italic: !formData.italic,
    });
  };

  const handleNextStep = () => {
    setStep(2); // Move to the next step
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark form as submitted
  };

  const handleAnotherFormSubmit = (e) => {
    e.preventDefault();
    alert('Another form has been submitted!');
  };

  const formTextStyle = {
    fontWeight: formData.bold ? 'bold' : 'normal',
    fontStyle: formData.italic ? 'italic' : 'normal',
  };

  const getLocalizedText = (key) => {
    const translations = {
      en: {
        description: 'Campaign Description',
        image: 'Upload Image',
        language: 'Language',
        next: 'Next',
        relationship: 'Relationship (e.g., sibling, mother)',
        employmentStatus: 'Employment Status',
        mobileNumber: 'Mobile Number',
        minAmount: 'Minimum Amount',
        educationStatus: 'Education Status',
        heardAbout: 'How did you hear about crowdfunding?',
        whyRaiseFunds: 'Why do you want to raise funds?',
        submit: 'Submit',
        congratulations: 'Congratulations, ',
        liveFundMessage: ' your fund is live!',
      },
      hi: {
        description: 'अभियान विवरण',
        image: 'चित्र अपलोड करें',
        language: 'भाषा',
        next: 'अगला',
        relationship: 'रिश्ता (जैसे भाई, माँ)',
        employmentStatus: 'रोजगार स्थिति',
        mobileNumber: 'मोबाइल नंबर',
        minAmount: 'न्यूनतम राशि',
        educationStatus: 'शिक्षा की स्थिति',
        heardAbout: 'आपने क्राउडफंडिंग के बारे में कैसे सुना?',
        whyRaiseFunds: 'आप धन क्यों इकट्ठा करना चाहते हैं?',
        submit: 'जमा करें',
        congratulations: 'बधाई हो, ',
        liveFundMessage: ' आपका फंड लाइव है!',
      },
    };

    return translations[formData.language][key];
  };

  return (
    <div>
      {!submitted ? (
        <>
          {/* Step 1 */}
          {step === 1 && (
            <form>
              <h2>{getLocalizedText('whyRaiseFunds')}</h2>
              <div>
                <label htmlFor="description">{getLocalizedText('description')}:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={formTextStyle}
                />
              </div>

              <div className="step-indicator">
                <button type="button" onClick={handleToggleBold}>
                  {formData.bold ? 'Unbold' : 'Bold'}
                </button>
                <button type="button" onClick={handleToggleItalic}>
                  {formData.italic ? 'Unitalic' : 'Italic'}
                </button>
              </div>

              <div>
                <label htmlFor="image">{getLocalizedText('image')}:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label htmlFor="language">{getLocalizedText('language')}:</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              <div>
                <label htmlFor="whyRaiseFunds">{getLocalizedText('whyRaiseFunds')}:</label>
                <textarea
                  id="whyRaiseFunds"
                  name="whyRaiseFunds"
                  value={formData.whyRaiseFunds}
                  onChange={handleChange}
                />
              </div>

              <button type="button" onClick={handleNextStep}>
                {getLocalizedText('next')}
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2>{getLocalizedText('relationship')}</h2>
              <div>
  <h2>{getLocalizedText('relationship')}</h2>
  <div>
    <label htmlFor="relationship">{getLocalizedText('relationship')}:</label>
    <select
      id="relationship"
      name="relationship"
      value={formData.relationship}
      onChange={handleChange}
      style={{
        maxHeight: '100px', // Limits dropdown height
        overflowY: 'auto', // Adds scrolling for long lists
      }}
    >
      <option value="">{getLocalizedText('relationship')}</option>
      <option value="parent">Parent</option>
      <option value="sibling">Sibling</option>
      <option value="friend">Friend</option>
      <option value="spouse">Spouse</option>
      <option value="colleague">Colleague</option>
      <option value="other">Other</option>
    </select>
  </div>
</div>
              <div>
  <label htmlFor="educationStatus">{getLocalizedText('educationStatus')}:</label>
  <select
    id="educationStatus"
    name="educationStatus"
    value={formData.educationStatus}
    onChange={handleChange}
    style={{
      maxHeight: '100px', // Limits the dropdown height
      overflowY: 'auto', // Adds scrolling if options exceed the height
    }}
  >
    <option value="">{getLocalizedText('educationStatus')}</option>
    <option value="highschool">High School</option>
    <option value="bachelor">Bachelor's Degree</option>
    <option value="master">Master's Degree</option>
    <option value="phd">PhD</option>
    <option value="other">Other</option>
  </select>
</div>
<div>
  <label htmlFor="gender">{getLocalizedText('gender')}:</label>
  <select
    id="gender"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    style={{
      maxHeight: '100px', // Limits dropdown height
      overflowY: 'auto', // Adds scrolling for long lists
    }}
  >
    <option value="">{getLocalizedText('gender')}</option>
    <option value="male">{getLocalizedText('male')}</option>
    <option value="female">{getLocalizedText('female')}</option>
    <option value="other">{getLocalizedText('other')}</option>
  </select>
</div>
              <div>
                <label htmlFor="minAmount">{getLocalizedText('minAmount')}:</label>
                <input
                  type="number"
                  id="minAmount"
                  name="minAmount"
                  value={formData.minAmount}
                  onChange={handleChange}
                />
              </div>

              <div>
  <label htmlFor="employmentStatus">{getLocalizedText('employmentStatus')}:</label>
  <select
    id="employmentStatus"
    name="employmentStatus"
    value={formData.employmentStatus}
    onChange={handleChange}
    style={{
      maxHeight: '100px', // Ensures the dropdown is scrollable if options exceed the height
      overflowY: 'auto', // Enables scrolling within the dropdown
    }}
  >
    <option value="">{getLocalizedText('employmentStatus')}</option>
    <option value="unemployed">Unemployed</option>
    <option value="employed">Employed</option>
    <option value="selfemployed">Self-Employed</option>
    <option value="student">Student</option>
    <option value="retired">Retired</option>
    <option value="other">Other</option>
  </select>
</div>


              <div>
                <label htmlFor="heardAbout">{getLocalizedText('heardAbout')}:</label>
                <input
                  type="text"
                  id="heardAbout"
                  name="heardAbout"
                  value={formData.heardAbout}
                  onChange={handleChange}
                />
              </div>

              <button onClick={handleSubmit}>
                {getLocalizedText('submit')}
              </button>
            </div>
          )}
        </>
      ) : (
        // After form submission, show a personalized message
        <div className="new-form">
          <h2>{getLocalizedText('congratulations')}{formData.name},</h2>
          <p>{getLocalizedText('liveFundMessage')}</p>
        </div>
      )}
    </div>
  );
};

export default TwoStepForm;
