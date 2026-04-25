
function getProfile() {
    return JSON.parse(localStorage.getItem("userProfile"));
}

function saveProfile(profile) {
    localStorage.setItem("userProfile", JSON.stringify(profile));
}

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

    const initials = displayName
        .split(/\s+/)
        .map(w => w[0]?.toUpperCase() || '')
        .join('')
        .slice(0,2) || "✏️";

    document.getElementById("preview-avatar").textContent = initials;

    const navName = document.getElementById("nav-display-name");
    if (navName) {
        navName.textContent = displayName;
    }
}

window.addEventListener("load", () => {
    console.log("profile-custom.js loaded – initializing");

    // Load current user data
    const raw = localStorage.getItem("userProfile");
    const data = raw ? JSON.parse(raw) : null;
    
    if (data) {
        console.log("Loaded current user:", data);

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
    } else {
        console.warn("No current user found.");
    }

    const limits = [
        { id: "input-display-name",    max: 20 },
        { id: "input-username",        max: 20 },
        { id: "input-gender-pronouns", max: 15 },
        { id: "input-about-me",        max: 100 }
    ];

    limits.forEach(({id, max}) => {
        const field = document.getElementById(id);
        if (!field) return;

        const counter = document.createElement("div");
        counter.style.cssText = "font-size:0.85em; color:#888; margin-top:6px; text-align:right;";
        field.parentNode.insertBefore(counter, field.nextSibling);

        const updateCounter = () => {
            const length = field.value.length;
            counter.textContent = `${length} / ${max}`;
            counter.style.color =
                length >= max ? "#e74c3c" :
                length > max - 5 ? "#f39c12" : "#888";
        };

        field.addEventListener("input", () => {
            if (field.value.length > max) {
                field.value = field.value.substring(0, max);
            }
            updateCounter();
        });

        updateCounter();
    });

    ["input-display-name", "input-username", "input-gender-pronouns", "input-about-me"]
    .forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", updatePreview);
        }
    });

    updatePreview();

    const form = document.getElementById("profileForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const profile = {
                displayName:     document.getElementById("input-display-name")?.value.trim() || "",
                username:        document.getElementById("input-username")?.value.trim() || "",
                genderPronouns:  document.getElementById("input-gender-pronouns")?.value.trim() || "",
                about:           document.getElementById("input-about-me")?.value.trim() || "",
                lastUpdated:     new Date().toISOString()
            };

            saveProfile(profile);
            updatePreview();

            alert("Profile saved!");
        });
    }
});



function logout() {
    const confirmDelete = confirm("Are you sure you want to log out? This will delete your account and all your data.");
    if (!confirmDelete) return;

    const confirmRedirect = confirm("Return to sign up page?");
    if (!confirmRedirect) return;

    localStorage.removeItem("currentUser");

    window.location.href = "../signup/signup.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const raw = localStorage.getItem("userProfile");
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
        document.getElementById("nav-display-name").textContent = data.displayName || "Username";
    } catch (e) {
        console.error("Parse error:", e);
    }
});

