// Global function - accessible everywhere
function updatePreview() {
    const displayName = document.getElementById("input-display-name")?.value.trim() || "DISPLAY NAME";
    document.getElementById("preview-display-name-text").textContent = displayName;

    const username = document.getElementById("input-username")?.value.trim() || "USERNAME";
    const genderPronouns = document.getElementById("input-gender-pronouns")?.value.trim() || "GENDER";
    document.getElementById("preview-meta").textContent = `${username} || ${genderPronouns}`;

    const about = document.getElementById("input-about-me")?.value.trim();
    document.getElementById("preview-about").innerHTML = about 
        ? `<strong>ABOUT ME:</strong><br>${about.replace(/\n/g, '<br>')}`
        : `<strong>ABOUT ME:</strong><br>No description yet.`;

    const initials = displayName.split(/\s+/).map(w => w[0]?.toUpperCase() || '').join('').slice(0,2) || "✏️";
    document.getElementById("preview-avatar").textContent = initials;
}

window.addEventListener("load", () => {
    console.log("profile-custom.js loaded – initializing");

    // 1. First try to load and apply saved data
    const saved = localStorage.getItem("userProfile");
    let hasSavedData = false;

    if (saved) {
        try {
            const data = JSON.parse(saved);
            console.log("Found saved profile:", data);

            const mappings = [
                ["input-display-name",    data.displayName],
                ["input-username",        data.username],
                ["input-gender-pronouns", data.genderPronouns],
                ["input-about-me",        data.about]
            ];

            mappings.forEach(([id, value]) => {
                const el = document.getElementById(id);
                if (el && value !== undefined && value !== null) {
                    el.value = value;
                }
            });

            hasSavedData = true;
        } catch (err) {
            console.warn("Could not parse saved profile:", err);
        }
    }

    // 2. Apply character limit + counters to all fields
    const limits = [
        { id: "input-display-name",    max: 20,  label: "Display Name" },
        { id: "input-username",        max: 20,  label: "Username"     },
        { id: "input-gender-pronouns", max: 15,  label: "Pronouns"     },
        { id: "input-about-me",        max: 100, label: "About Me"     }
    ];

    limits.forEach(({id, max}) => {
        const field = document.getElementById(id);
        if (!field) return;

        const counter = document.createElement("div");
        counter.style.cssText = "font-size:0.85em; color:#888; margin-top:6px; text-align:right;";
        counter.textContent = `0 / ${max}`;
        field.parentNode.insertBefore(counter, field.nextSibling);

        const updateCounter = () => {
            const length = field.value.length;
            counter.textContent = `${length} / ${max}`;
            counter.style.color = length >= max ? "#e74c3c" 
                                 : length > max - 5 ? "#f39c12" : "#888";
        };

        field.addEventListener("keydown", (e) => {
            if (field.value.length >= max) {
                const allowed = e.ctrlKey || e.metaKey || 
                    ["Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown",
                     "Home","End","Tab","Escape"].includes(e.key);
                if (!allowed) e.preventDefault();
            }
        });

        field.addEventListener("input", () => {
            if (field.value.length > max) {
                field.value = field.value.substring(0, max);
            }
            updateCounter();
        });

        field.addEventListener("paste", () => {
            setTimeout(() => {
                if (field.value.length > max) {
                    field.value = field.value.substring(0, max);
                }
                updateCounter();
            }, 0);
        });

        updateCounter(); // initial count (will use saved value if present)
    });

    // 3. Finally update the preview – now with saved values if any
    updatePreview();

    // 4. Handle form submit
    const form = document.getElementById("profileForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const profile = {
                displayName:     document.getElementById("input-display-name")?.value.trim()     || "",
                username:        document.getElementById("input-username")?.value.trim()         || "",
                genderPronouns:  document.getElementById("input-gender-pronouns")?.value.trim()  || "",
                about:           document.getElementById("input-about-me")?.value.trim()         || "",
                lastUpdated:     new Date().toISOString()
            };

            localStorage.setItem("userProfile", JSON.stringify(profile));
            updatePreview();

            alert("Profile saved! Preview updated.");
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const raw = localStorage.getItem("signedUp");
    console.log("Raw stored data:", raw);

    if (!raw) {
        console.log("No profile data found");
        alert("No profile data – check signup step");
        return;
    }

    try {
        const data = JSON.parse(raw);
        console.log("Parsed data:", data);

        document.getElementById("preview-display-name-text").textContent = data.displayName || "???";
        document.getElementById("preview-meta").textContent = 
            (data.username || "???") + " || " + (data.gender || "???");
    } catch (e) {
        console.error("Parse error:", e);
    }
});