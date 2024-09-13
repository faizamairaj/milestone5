// Get references to the form and display area
let form = document.getElementById ('resume-form') as HTMLFormElement;
let resumeDisplayElement = document.getElementById ('resume-display') as HTMLDivElement;
let shareableLinkContainer = document.getElementById ('shareable-link-container') as HTMLDivElement;
let shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
let downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;


// Handle form submission
form.addEventListener('submit', (event: Event)=>{
    event.preventDefault(); // prevent page reload

    // collect input values
    let username = (document.getElementById('username') as HTMLInputElement).value
    let name = ( document.getElementById('name') as HTMLInputElement).value
    let email = ( document.getElementById('email') as HTMLInputElement).value
    let phone = ( document.getElementById('phone') as HTMLInputElement).value
    let education = ( document.getElementById('education') as HTMLTextAreaElement).value
    let experience = ( document.getElementById('experience') as HTMLTextAreaElement).value
    let skills = ( document.getElementById('skills') as HTMLTextAreaElement).value

   //  save from data in localStorage with the username as the key
   let resumeDate = {
      username,
      name,
      email,
      phone,
      education,
      experience,
      skills
   };
   localStorage.setItem(username, JSON.stringify(resumeDate));

//Generate the resume content Shareable
   let resumeHTML = `
 <h2><b> Shareable Resume</b></h2>
 <h3>Personal Information</h3>
 <p><b>Name:</b><span conteneditable="true">${name}</span></p>
 <p><b>Email:</b><span conteneditable="true">${email}</span></p>
 <p><b>Phone:</b><span conteneditable="true">${phone}</span></p>


 <h3>Education</h3>
 <p conteneditable="true">${education}</p>

 <h3>Experience</h3>
 <p conteneditable="true">${experience}</p> 

 <h3>Skills</h3>
 <p conteneditable="true">${skills}</p>
  `;

//   Display the generate resume
    resumeDisplayElement.innerHTML = resumeHTML;
     
    // Generate a shareable URL with the username only
    let shareableURL = `${window.location.origin}? username=${encodeURIComponent(username)}`

   //  Display the shareable link
   shareableLinkContainer.style.display = 'block';
   shareableLinkElement.href = shareableURL;
   shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click',()=>{
   window.print();
});

window.addEventListener('DOMContentLoaded',()=> {
   let urlParams = new URLSearchParams(window.location.search);
   let username = urlParams.get('username');
     
   if (username) {
      let savedResumeData = localStorage.getItem(username);
      
      if (savedResumeData) {
        let resumeDate = JSON.parse(savedResumeData);
        (document.getElementById('username') as HTMLInputElement).value = username;
        (document.getElementById('name') as HTMLInputElement).value = resumeDate.name;
        (document.getElementById('email') as HTMLInputElement).value = resumeDate.email;
        (document.getElementById('phone') as HTMLInputElement).value = resumeDate.Phone;
        (document.getElementById('education') as HTMLTextAreaElement).value = resumeDate.education;
        (document.getElementById('experience') as HTMLTextAreaElement).value = resumeDate.experience;
        (document.getElementById('skills') as HTMLTextAreaElement).value = resumeDate.skills;
      }
   }
});
