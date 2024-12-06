function nextStage(stage) {
  if (validateStage()) {
    document.querySelector('.stage.active').classList.remove('active');
    document.getElementById('stage' + stage).classList.add('active');
  }
}

function prevStage(stage) {
  document.querySelector('.stage.active').classList.remove('active');
  document.getElementById('stage' + stage).classList.add('active');
}

document.getElementById('applicationForm').onsubmit = function (event) {
  event.preventDefault();
  if (validateStage()) {
    alert('Application Submitted Successfully!');
  }
};

function validateStage() {
  const activeStage = document.querySelector('.stage.active');
  const inputs = activeStage.querySelectorAll('input, textarea');

  for (let input of inputs) {
    const value = input.value.trim();

    // Check for required fields
    if (input.hasAttribute('required') && !value) {
      alert(`${input.previousSibling.textContent.trim()} is required.`);
      return false;
    }

    // Full Name Validation
    if (input.name === 'fullName') {
      const namePattern = /^[a-zA-Z\s]+$/;
      if (!namePattern.test(value)) {
        alert('Full Name should only contain letters and spaces.');
        return false;
      }
    }

    // Date of Birth Validation
    if (input.name === 'dob') {
      const dob = new Date(value);
      const today = new Date();
      if (dob >= today) {
        alert('Date of Birth must be a past date.');
        return false;
      }
    }

    // Email Validation
    if (input.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        alert('Please enter a valid email address.');
        return false;
      }
    }

    // Phone Number Validation
    if (input.type === 'tel') {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(value)) {
        alert('Phone number must be exactly 10 digits.');
        return false;
      }
    }

    // Emergency Contact Validation
    if (input.name === 'emergencyContact') {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(value)) {
        alert('Emergency Contact must be exactly 10 digits.');
        return false;
      }
    }

    // Departure Date Validation
    if (input.name === 'departure') {
      const departureDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ensure we are comparing only the date part
      if (departureDate <= today) {
        alert('Departure Date must be in the future.');
        return false;
      }
    }

    // Return Date Validation
    if (input.name === 'return') {
      const departureDate = new Date(document.querySelector('input[name="departure"]').value);
      const returnDate = new Date(value);
      if (returnDate <= departureDate) {
        alert('Return Date must be after the Departure Date.');
        return false;
      }
    }
  }

  return true;
}
