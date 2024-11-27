document.addEventListener('DOMContentLoaded', function() {
    // Load the SVG into the skeleton container
    fetch('assets/images/skeleton-anterior.svg')
        .then(response => response.text())
        .then(svgContent => {
            document.querySelector('.skeleton-container').innerHTML = svgContent;
            initializeBoneInteraction();
        });
});

function initializeBoneInteraction() {
    // Add click handlers to all bone elements
    document.querySelectorAll('.bone').forEach(bone => {
        bone.addEventListener('click', function(e) {
            showBoneDetails(this);
        });

        // Add hover effects
        bone.addEventListener('mouseenter', function(e) {
            this.style.opacity = '0.7';
        });

        bone.addEventListener('mouseleave', function(e) {
            this.style.opacity = '1';
        });
    });
}

function showBoneDetails(boneElement) {
    const boneName = boneElement.dataset.boneName;
    const boneType = boneElement.dataset.boneType;
    
    const detailsPanel = document.getElementById('boneDetails');
    detailsPanel.innerHTML = `
        <h4>${boneName}</h4>
        <div class="bone-condition">
            <label>Condition:</label>
            <select class="condition-select" onchange="updateBoneCondition('${boneElement.id}', this.value)">
                <option value="">Select...</option>
                <option value="complete">Complete</option>
                <option value="partial">Partial</option>
                <option value="absent">Absent</option>
            </select>
        </div>
        <div class="bone-notes">
            <label>Notes:</label>
            <textarea id="notes_${boneElement.id}"></textarea>
        </div>
    `;
}

function updateBoneCondition(boneId, condition) {
    const bone = document.getElementById(boneId);
    // Remove existing condition classes
    bone.classList.remove('complete', 'partial', 'absent');
    // Add new condition class
    bone.classList.add(condition);
}
