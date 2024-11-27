// Test Suite for Skeletal Recording Form
class SkeletalFormTests {
    constructor() {
        this.totalTests = 0;
        this.passedTests = 0;
    }

    async runAllTests() {
        console.log('Starting Tests...');
        
        // Form Validation Tests
        await this.testRequiredFields();
        await this.testNumericValidation();
        
        // Storage Tests
        await this.testSaveAndLoad();
        await this.testExportFunctionality();
        
        // Input Processing Tests
        await this.testMeasurementInputs();
        
        // Display Results
        this.displayResults();
    }

    async testRequiredFields() {
        console.log('Testing Required Fields...');
        
        // Test site number
        this.assert(
            document.getElementById('siteNumber').required,
            'Site Number should be required'
        );

        // Test observer
        this.assert(
            document.getElementById('observer').required,
            'Observer should be required'
        );

        // Test date
        this.assert(
            document.getElementById('date').required,
            'Date should be required'
        );
    }

    async testNumericValidation() {
        console.log('Testing Numeric Validation...');
        
        const numericInputs = document.querySelectorAll('input[type="number"]');
        numericInputs.forEach(input => {
            input.value = -1;
            input.dispatchEvent(new Event('input'));
            this.assert(
                input.value >= 0,
                `${input.id} should not accept negative values`
            );
        });
    }

    async testSaveAndLoad() {
        console.log('Testing Save and Load Functionality...');
        
        const testData = {
            siteNumber: 'TEST001',
            observer: 'Test Observer',
            date: '2024-11-27'
        };

        // Test save
        const storage = new SkeletalFormStorage();
        const saveResult = storage.saveForm(testData);
        this.assert(
            saveResult.success,
            'Should successfully save form data'
        );

        // Test load
        const loadedData = storage.loadForm(saveResult.key);
        this.assert(
            loadedData.siteNumber === testData.siteNumber,
            'Should correctly load saved data'
        );
    }

    async testExportFunctionality() {
        console.log('Testing Export Functionality...');
        
        const testData = {
            siteNumber: 'TEST001',
            observer: 'Test Observer',
            date: '2024-11-27'
        };

        const storage = new SkeletalFormStorage();
        
        // Test CSV Export
        try {
            storage.exportToCSV(testData);
            this.assert(true, 'CSV Export should not throw errors');
        } catch (e) {
            this.assert(false, 'CSV Export should not throw errors');
        }

        // Test JSON Export
        try {
            storage.exportToJSON(testData);
            this.assert(true, 'JSON Export should not throw errors');
        } catch (e) {
            this.assert(false, 'JSON Export should not throw errors');
        }
    }

    async testMeasurementInputs() {
        console.log('Testing Measurement Inputs...');
        
        const measurementInputs = document.querySelectorAll('input[type="number"]');
        measurementInputs.forEach(input => {
            // Test valid input
            input.value = '100';
            input.dispatchEvent(new Event('input'));
            this.assert(
                input.value === '100',
                `${input.id} should accept valid numbers`
            );

            // Test decimal input
            input.value = '100.5';
            input.dispatchEvent(new Event('input'));
            this.assert(
                !isNaN(parseFloat(input.value)),
                `${input.id} should handle decimal numbers`
            );
        });
    }

    assert(condition, message) {
        this.totalTests++;
        if (condition) {
            this.passedTests++;
            console.log(`✅ PASS: ${message}`);
        } else {
            console.error(`❌ FAIL: ${message}`);
        }
    }

    displayResults() {
        console.log('\nTest Results:');
        console.log(`Passed: ${this.passedTests}/${this.totalTests}`);
        console.log(`Success Rate: ${((this.passedTests/this.totalTests) * 100).toFixed(2)}%`);
    }
}

// Run tests when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tester = new SkeletalFormTests();
    tester.runAllTests();
});
