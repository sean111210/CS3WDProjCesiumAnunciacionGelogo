// Get all users
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}


// Save all users
function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


// Get current logged-in user
function getCurrentUser() {
    const username = localStorage.getItem("currentUser");
    if (!username) return null;


    const users = getUsers();
    return users.find(u => u.username === username);
}


// Save or update a profile
function saveProfile(profile) {
    let users = getUsers();


    const index = users.findIndex(u => u.username === profile.username);


    if (index !== -1) {
        users[index] = profile; // update
    } else {
        users.push(profile); // new
    }


    setUsers(users);
    localStorage.setItem("currentUser", profile.username);
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
}


window.addEventListener("load", () => {
    console.log("profile-custom.js loaded – initializing");


    // 🔹 Load current user data
    const data = getCurrentUser();


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
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;


    const confirmRedirect = confirm("Return to sign up page?");
    if (!confirmRedirect) return;


    localStorage.removeItem("currentUser");


    window.location.href = "../signup/signup.html";
}

function deleteAccount() {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be reversed.");
    if (!confirmDelete) return;


    const confirmRedirect = confirm("Return to sign up page?");
    if (!confirmRedirect) return;


    localStorage.removeItem("currentUser");
    localStorage.removeItem("signedUp");
    localStorage.removeItem("userProfile");


    window.location.href = "../signup/signup.html";
}


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
