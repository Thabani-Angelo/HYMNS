// ======================================
// HYMNS APP - CORE LOGIC
// ======================================

let hymns = [];

// ======================================
// LOAD HYMNS DATA (OFFLINE DATABASE)
// ======================================

fetch("hymns.json")
    .then(response => response.json())
    .then(data => {
        hymns = data;
        console.log("Hymns loaded:", hymns.length);
    })
    .catch(error => {
        console.error("Error loading hymns.json:", error);
    });


// ======================================
// HOME PAGE SEARCH FUNCTIONALITY
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("homeSearch");
    const resultsBox = document.getElementById("searchResults");

    // Only run if search exists on page
    if (!searchInput || !resultsBox) return;

    searchInput.addEventListener("input", function () {

        let query = this.value.toLowerCase().trim();

        // Clear results if empty
        if (query === "") {
            resultsBox.innerHTML = "";
            return;
        }

        // Filter hymns
        let filtered = hymns.filter(hymn => {
            return (
                hymn.title.toLowerCase().includes(query) ||
                hymn.id.toString().includes(query)
            );
        });

        // Render results
        resultsBox.innerHTML = "";

        if (filtered.length === 0) {
            resultsBox.innerHTML = `
                <div style="padding:12px; color:#777;">
                    No hymns found
                </div>
            `;
            return;
        }

        filtered.forEach(hymn => {

            const item = document.createElement("a");
            item.className = "result-item";
            item.href = `hymn.html?id=${hymn.id}`;

            item.innerHTML = `
                <div>${hymn.id}. ${hymn.title}</div>
                <div>→</div>
            `;

            resultsBox.appendChild(item);
        });

    });

});


// ======================================
// FUTURE FEATURES (PLACEHOLDERS)
// ======================================

// Open hymn (used later if needed)
function openHymn(id) {
    window.location.href = `hymn.html?id=${id}`;
}

// Optional: log helper
console.log("Hymns App Script Loaded");