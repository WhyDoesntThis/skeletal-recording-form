// Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('skeletalRecordForm');
    const saveBtn = document.getElementById('saveBtn');
    const printBtn = document.getElementById('printBtn');

    // Form Data Management
    function getFormData() {
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    }

    function loadFormData(data) {
        for (const [key, value] of Object.entries(data)) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
            }
        }
    }

    // Save functionality
    saveBtn.addEventListener('click', function() {
        const data = getFormData();
        const timestamp = new Date().toISOString();
        const saveKey = `skeletalForm_${data.siteNumber}_${timestamp}`;
        
        try {
            localStorage.setItem(saveKey, JSON.stringify(data));
            alert('Form data saved successfully!');
            
            // Update saved forms list
            updateSavedFormsList();
        } catch (e) {
            alert('Error saving form data. Local storage might be full.');
            console.error('Save error:', e);
        }
    });

    // Print functionality
    printBtn.addEventListener('click', function() {
        window.print();
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const data = getFormData();
            
            // Here you would typically send the data to a server
            alert('Form submitted successfully!');
        }
    });

    // Basic form validation
    function validateForm() {
        let isValid = true;
        const required = form.querySelectorAll('[required]');
        
        required.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                // Add error message
                let errorMsg = field.parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    field.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'This field is required';
            } else {
                field.classList.remove('error');
                const errorMsg = field.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });

        return isValid;
    }

    // Load saved forms list
    function updateSavedFormsList() {
        const savedForms = Object.keys(localStorage)
            .filter(key => key.startsWith('skeletalForm_'))
            .map(key => {
                const data = JSON.parse(localStorage.getItem(key));
                return {
                    key,
                    siteNumber: data.siteNumber,
                    date: key.split('_').pop()
                };
            })
            .sort((a, b) => b.date.localeCompare(a.date));

        // You could display this list somewhere in your form
        
    }

    // Input validation for measurements
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Initialize
    updateSavedFormsList();
});

// Initialize storage
const formStorage = new SkeletalFormStorage();

// Add export buttons event listeners
document.getElementById('exportCSV').addEventListener('click', function() {
    const formData = getFormData();
    formStorage.exportToCSV(formData);
});

document.getElementById('exportJSON').addEventListener('click', function() {
    const formData = getFormData();
    formStorage.exportToJSON(formData);
});

// Update HTML to include export buttons
