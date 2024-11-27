document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('skeletalRecordForm');
    const saveBtn = document.getElementById('saveBtn');
    const printBtn = document.getElementById('printBtn');
    const exportCSV = document.getElementById('exportCSV');
    const exportJSON = document.getElementById('exportJSON');
    const storage = new SkeletalFormStorage();

    function getFormData() {
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    }

    saveBtn.addEventListener('click', function() {
        const data = getFormData();
        const result = storage.saveForm(data);
        if (result.success) {
            alert('Form saved successfully!');
        } else {
            alert('Error saving form: ' + result.error);
        }
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    exportCSV.addEventListener('click', function() {
        const data = getFormData();
        storage.exportToCSV(data);
    });

    exportJSON.addEventListener('click', function() {
        const data = getFormData();
        storage.exportToJSON(data);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted successfully!');
    });
});
