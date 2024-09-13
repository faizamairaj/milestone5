// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    //  save from data in localStorage with the username as the key
    var resumeDate = {
        username: username,
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeDate));
    //Generate the resume content Shareable
    var resumeHTML = "\n <h2><b> Shareable Resume</b></h2>\n <h3>Personal Information</h3>\n <p><b>Name:</b><span conteneditable=\"true\">".concat(name, "</span></p>\n <p><b>Email:</b><span conteneditable=\"true\">").concat(email, "</span></p>\n <p><b>Phone:</b><span conteneditable=\"true\">").concat(phone, "</span></p>\n\n\n <h3>Education</h3>\n <p conteneditable=\"true\">").concat(education, "</p>\n\n <h3>Experience</h3>\n <p conteneditable=\"true\">").concat(experience, "</p> \n\n <h3>Skills</h3>\n <p conteneditable=\"true\">").concat(skills, "</p>\n  ");
    //   Display the generate resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "? username=").concat(encodeURIComponent(username));
    //  Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeDate = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeDate.name;
            document.getElementById('email').value = resumeDate.email;
            document.getElementById('phone').value = resumeDate.Phone;
            document.getElementById('education').value = resumeDate.education;
            document.getElementById('experience').value = resumeDate.experience;
            document.getElementById('skills').value = resumeDate.skills;
        }
    }
});
