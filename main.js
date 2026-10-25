document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    renderProfile(data.profile);
    renderEducation(data.education);
    renderExperiences(data.experiences);
    renderExpertise(data.expertise);
    renderGallery(data.gallery);
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }

  initScaler();
});

function renderProfile(p) {
  document.getElementById('profile-name').innerText = p.name;
  document.getElementById('profile-title').innerText = p.title;
  document.getElementById('intro-text').innerHTML = `
        <hr>Hello, my name is Giao Phan.<br><br>
        You might notice my portfolio website has a rather curious name: <span style="color: #002b59;">${p.intro_title}</span>. 
        Every creative journey begins the same way... <br><br>${p.intro_text}
    `;

  document.getElementById('profile-contacts').innerHTML = `
        <a class="connection" href="mailto:${p.email}" target="_blank" rel="noopener noreferrer">${p.email}</a><br>
        <a class="connection">${p.phone}</a><br>
        <a class="connection" href="${p.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/in/phan-giao</a><br>
        <a class="connection" href="${p.behance}" target="_blank" rel="noopener noreferrer">behance.net/phangiao</a>
    `;
}

function renderEducation(edu) {
  const container = document.getElementById('education-section');
  container.innerHTML = `
        <div><hr><span style="font-weight: bold;">EDUCATION</span></div>
        <div class="column2">
            <hr>
            <div style="padding: 0px 10px;">
                <span style="font-weight: bold;">${edu.school}</span><br><br>${edu.degree}
            </div>
        </div>
        <div>
            <hr>
            <div style="padding:0px  10px; text-align: justify;">
                <span style="font-weight: bold;">${edu.time}</span><br><br>
                <span style="background-image: url(img/neon.png);">${edu.honor}</span>
            </div>
        </div>
    `;
}

function renderExperiences(exps) {
  const container = document.getElementById('experiences-section');
  container.innerHTML = exps.map((exp, index) => `
        <div class="experience">
            <div>${index === 0 ? '<hr><span style="font-weight: bold;">EXPERIENCES</span>' : ''}</div>
            <div class="column2">
                <hr>
                <div style="padding: 0px 10px;">
                    <span style="font-weight: bold;">${exp.company}</span><br><br>${exp.role}
                </div>
            </div>
            <div>
                <hr>
                <div style="padding: 0px 10px; text-align: justify;">
                    <span style="font-weight: bold;">${exp.time}</span><br><br>${exp.desc}
                </div>
            </div>
        </div>
    `).join('');
}

function renderExpertise(exp) {
  const container = document.getElementById('expertise-section');
  container.innerHTML = `
        <div><hr><span style="font-weight: bold;">EXPERTISE</span></div>
        <div>
            <hr><div style="padding: 0px 10px;">
                <span style="font-weight: bold;">Languages</span><br><br>${exp.languages.join('<br>')}
            </div>
        </div>
        <div>
            <hr><div style="padding: 0px 10px;">
                <span style="font-weight: bold;">Soft skills</span><br><br>${exp.soft_skills.join('<br>')}
            </div>
        </div>
        <div>
            <hr><div style="padding: 0px 10px;">
                <span style="font-weight: bold;">Hard skills</span><br><br>${exp.hard_skills.join(', ')}
            </div>
        </div>
    `;
}

function renderGallery(galleryItems) {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = galleryItems.map(item => `
        <div class="gallery-item">
            <img class="draw" src="${item.img}" alt="Art Piece">
            <div class="caption">${item.caption}</div>
        </div>
    `).join('');
}

function initScaler() {
  var wrapper = document.getElementById('scale-wrapper');
  var DESIGN_WIDTH_PX = 530 * 96 / 25.4;

  function fitToScreen() {
    if (!wrapper) return;
    wrapper.style.transform = 'none';
    wrapper.style.width = DESIGN_WIDTH_PX + 'px';
    var naturalHeight = wrapper.getBoundingClientRect().height;

    var scale = window.innerWidth / DESIGN_WIDTH_PX;
    if (scale > 1) scale = 1;

    wrapper.style.transformOrigin = 'top left';
    wrapper.style.transform = 'scale(' + scale + ')';

    document.body.style.height = (naturalHeight * scale) + 'px';
    document.body.style.overflowX = 'hidden';
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitToScreen, 100);
  }

  window.addEventListener('load', fitToScreen);
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', fitToScreen);
  fitToScreen();
}