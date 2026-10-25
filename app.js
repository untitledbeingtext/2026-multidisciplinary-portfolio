document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // 1. Render Profile / Intro
    document.querySelector('.cover_left_start').innerHTML = `
      <div style="font-weight: bold; font-size: 27mm; text-align: center; font-family: UnifrakturMaguntia; margin: 0px;">
        untitled_<br>being.txt
      </div>
      <div style="text-align: justify; text-align-last: center; font-weight: bold;">
        <hr>Hello, my name is Giao Phan.<br><br>
        You might notice my portfolio website has a rather curious name: <span style="color: #002b59;">${data.profile.intro_title}</span>. 
        Every creative journey begins the same way. Before a single idea takes shape, everything starts as <span style="color: #002b59;">untitled</span>, a blank page waiting for a story. 
        I've always loved the <span style="color: #002b59;">.txt</span> file format... 
        <br><br>Welcome to my Multidisciplinary portfolio!
      </div>
      <div class="img"></div>
    `;

    // 2. Render Education
    const eduContainer = document.querySelector('.education');
    if (eduContainer) {
      eduContainer.innerHTML = `
        <div><hr><span style="font-weight: bold;">EDUCATION</span></div>
        <div class="column2"><hr>
          <div style="padding: 0px 10px;">
            <span style="font-weight: bold;">${data.education.school}</span><br><br>${data.education.degree}
          </div>
        </div>
        <div><hr>
          <div style="padding: 0px 10px; text-align: justify;">
            <span style="font-weight: bold;">${data.education.time}</span><br><br><span style="background-image: url(img/neon.png);">${data.education.honor}</span>
          </div>
        </div>
      `;
    }

    // 3. Render Experiences (Tự động lặp qua mảng kinh nghiệm)
    const expContainer = document.querySelector('.experiences');
    if (expContainer) {
      expContainer.innerHTML = data.experiences.map((exp, index) => `
        <div class="experience">
          <div>${index === 0 ? '<hr><span style="font-weight: bold;">EXPERIENCES</span>' : ''}</div>
          <div class="column2"><hr>
            <div style="padding: 0px 10px;">
              <span style="font-weight: bold;">${exp.company}</span><br><br>${exp.role}
            </div>
          </div>
          <div><hr>
            <div style="padding: 0px 10px; text-align: justify;">
              <span style="font-weight: bold;">${exp.time}</span><br><br>${exp.desc}
            </div>
          </div>
        </div>
      `).join('');
    }

    // 4. Render Expertise
    const expertContainer = document.querySelector('.expertise');
    if (expertContainer) {
      expertContainer.innerHTML = `
        <div><hr><span style="font-weight: bold;">EXPERTISE</span></div>
        <div><hr>
          <div style="padding: 0px 10px;">
            <span style="font-weight: bold;">Languages</span><br><br>${data.expertise.languages.join('<br>')}
          </div>
        </div>
        <div><hr>
          <div style="padding: 0px 10px;">
            <span style="font-weight: bold;">Soft skills</span><br><br>${data.expertise.soft_skills.join('<br>')}
          </div>
        </div>
        <div><hr>
          <div style="padding: 0px 10px;">
            <span style="font-weight: bold;">Hard skills</span><br><br>${data.expertise.hard_skills.join(', ')}
          </div>
        </div>
      `;
    }

  } catch (error) {
    console.error("Lỗi khi tải dữ liệu JSON:", error);
  }
});