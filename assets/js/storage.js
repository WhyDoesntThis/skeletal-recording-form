class SkeletalFormStorage {
    constructor() {
        this.storagePrefix = 'skeletalForm_';
    }

    saveForm(data) {
        const timestamp = new Date().toISOString();
        const saveKey = `${this.storagePrefix}${data.siteNumber}_${timestamp}`;
        
        try {
            localStorage.setItem(saveKey, JSON.stringify(data));
            return { success: true, key: saveKey };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    loadForm(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading form:', e);
            return null;
        }
    }

    exportToCSV(data) {
        const headers = Object.keys(data);
        const csvContent = [
            headers.join(','),
            headers.map(header => data[header] || '').join(',')
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `skeletal_record_${data.siteNumber}_${new Date().toISOString()}.csv`;
        link.click();
    }

    exportToJSON(data) {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `skeletal_record_${data.siteNumber}_${new Date().toISOString()}.json`;
        link.click();
    }
}
