// signup.js – updated with character limits, fixed IDs, and proper data saving + redirect

// First, impose character limits on relevant fields
const limits = [
    { id: "display-name", max: 20, label: "Display Name" },  // Matches HTML ID
    { id: "username",     max: 20, label: "Username"     }   // Matches HTML ID
    // Note: "input-gender-pronouns" and "input-about-me" don't exist in this signup HTML,
    //       so they're omitted here. Add them to profile-custom.js if needed later.
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

// Now, the submit handler (fixed to match HTML form ID "loginForm")
const form = document.getElementById("loginForm");  // ← Fixed: was "signupForm"

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Gather all values (fixed IDs to match HTML)
    const data = {
        email:       document.getElementById("email").value.trim(),
        displayName: document.getElementById("display-name").value.trim(),  // ← Fixed: was "displayName"
        username:    document.getElementById("username").value.trim(),
        gender:      document.querySelector('input[name="gender"]:checked')?.value || "Not specified",
        joined:      new Date().toISOString()
        // password: intentionally not saved (security)
    };

    // Save profile data to localStorage (so profile-custom.html can read it later)
    localStorage.setItem("userProfile", JSON.stringify(data));
    localStorage.setItem("signedIn", "true");  // ← Consistent with your inline script; was "signedUp"

    // Redirect – assuming profile-custom.html is in the same folder or adjust as needed
    // Based on your structure (signup in public/signup/), try this for root/profile-custom.html
    // If it doesn't work, test "../../profile-custom.html" or "../profile-custom.html"
    window.location.href = "../../index.html";  // ← Change to profile-custom as per earlier goal

    // Fallback alert (remove once working)
    alert("Welcome! Taking you to the homepage...");
});