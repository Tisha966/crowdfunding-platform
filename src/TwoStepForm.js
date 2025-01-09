import React, { useState } from 'react';
import './TwoStepForm.css';

const TwoStepForm = () => {
  const [step, setStep] = useState(1);
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

  const [submitted, setSubmitted] = useState(false);

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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
        submit: 'Submit',
        congratulations: 'Congratulations, ',
        liveFundMessage: ' your fund is live!',
      },
      hi: {
        description: 'अभियान विवरण',
        image: 'चित्र अपलोड करें',
        language: 'भाषा',
        next: 'अगला',
        submit: 'जमा करें',
        congratulations: 'बधाई हो, ',
        liveFundMessage: ' आपका फंड लाइव है!',
      },
    };

    return translations[formData.language][key];
  };

  return (
    <div className="two-step-form-container">
      {!submitted ? (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
  <div 
    className="progress" 
    style={{ width: `${(step / 2) * 100}%` }}
  ></div>
  <div className="steps">
    <span className={`step ${step >= 1 ? 'active' : ''}`}>1</span>
    <span className={`step ${step >= 2 ? 'active' : ''}`}>2</span>
  </div>
</div>




          {/* Step 1 */}
          {step === 1 && (
            <form>
              <h2>{getLocalizedText('description')}</h2>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={formTextStyle}
              />

              <label htmlFor="image">{getLocalizedText('image')}:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />

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

              <button type="button" onClick={handleNextStep}>
                {getLocalizedText('next')}
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div class="two-step-form-container">
  <h2>Fundraiser Details</h2>
 

  {/* <!-- Fundraiser Title --> */}
  <label for="fundraiser-title">Fundraiser Title</label>
  <input type="text" id="fundraiser-title" placeholder="Enter fundraiser title" />

  {/* <!-- Fundraising Goal --> */}
  <label for="goal-amount">Fundraising Goal (in USD)</label>
  <input type="number" id="goal-amount" placeholder="Enter target amount" />

  {/* <!-- Reason for Fundraising --> */}
  <label for="fundraiser-reason">Reason for Fundraising</label>
  <textarea id="fundraiser-reason" placeholder="Describe the purpose"></textarea>

  {/* <!-- Beneficiary Details --> */}
  <label for="beneficiary-name">Beneficiary Name</label>
  <input type="text" id="beneficiary-name" placeholder="Enter beneficiary's name" />

  {/* <!-- Document Upload --> */}
  <label for="documents">Upload Documents</label>
  <input type="file" id="documents" />

  {/* <!-- Bank Details --> */}
  <label for="account-number">Bank Account Number</label>
  <input type="text" id="account-number" placeholder="Enter account number" />
  <label for="ifsc-code">IFSC Code</label>
  <input type="text" id="ifsc-code" placeholder="Enter IFSC code" />

  {/* <!-- Campaign Duration --> */}
  <label for="campaign-duration">Campaign Duration</label>
  <input type="date" id="start-date" placeholder="Start Date" />
  <input type="date" id="end-date" placeholder="End Date" />

  {/* <!-- Buttons --> */}
  <div class="button-group">
    <button type="button" class="back-button">Back</button>
    <button type="submit" >Submit</button>
  </div>
</div>

              <button type="submit" >
                {getLocalizedText('submit')}
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="new-form">
          <h2>{getLocalizedText('congratulations')}{formData.name}</h2>
          <p>{getLocalizedText('liveFundMessage')}</p>
        </div>
      )}
    </div>
  );
};

export default TwoStepForm;
