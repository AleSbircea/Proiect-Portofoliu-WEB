
const GITHUB_USERNAME = 'AleSbircea'; 

const FALLBACK_REPOS = [
  {
    name: "management-parc-auto",
    description: "Aplicație pentru gestionarea unui parc auto.",
    language: "PHP, HTML, CSS, JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "#"
  },
  {
    name: "Proiect-Portofoliu-WEB",
    description: "Site personal de portofoliu cu integrare GitHub API.",
    language: "JavaScript, HTML, CSS",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "#"
  },
  {
    name: "Laborator-Proiectare-Software",
    description: "Proiect de laborator - Proiectare Software.",
    language: "Java",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "#"
  },

  {
    name: "Rummy-CSharp-Game",
    description: "Joc de Rummy pe tablă în rețea, creat folosind principiile OOP.",
    language: "C#",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "#"
  }
];


async function incarcaProiecte() {
  const grid = document.getElementById('grid-proiecte');

  document.getElementById('loading').style.display = 'flex';
  grid.innerHTML = '';
  try {
    const raspuns = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`
    );

    if (!raspuns.ok) {
      throw new Error('Eroare la GitHub API');
    }

    const proiecte = await raspuns.json();

   
    const proiecteProprii = proiecte.filter(p => p.fork === false);
       document.getElementById('loading').style.display = 'none';

    if (proiecteProprii.length < 5) {
    grid.innerHTML = '<p class="mesaj-fallback"> ATENȚIE: Sunt puține proiecte pe GitHub! Se afișează proiectele demo.</p>';
     setTimeout(() => afiseazaCarduri(FALLBACK_REPOS), 1500);
     return;
    }

      document.getElementById('loading').style.display = 'none';
    afiseazaCarduri(proiecteProprii);

   } catch (eroare) {
  document.getElementById('loading').style.display = 'none';
  console.warn('Folosim fallback:', eroare.message);
  grid.innerHTML = '<p class="mesaj-eroare">Nu am putut încărca proiectele. Se afișează proiecte demo.</p>';
  setTimeout(() => afiseazaCarduri(FALLBACK_REPOS), 1500);
}
}


function afiseazaCarduri(proiecte) {
  const grid = document.getElementById('grid-proiecte');
  grid.innerHTML = '';

  proiecte.forEach(proiect => {
    const card = document.createElement('div');
    card.className = 'card-proiect';

    card.innerHTML = `
      <h3>${proiect.name}</h3>
      <p class="descriere-proiect">
        ${proiect.description || 'Fără descriere disponibilă.'}
      </p>
      <span class="tag-limbaj">${proiect.language || 'Necunoscut'}</span>
      <div class="statistici">
        <span>${proiect.stargazers_count} stele</span>
        <span>${proiect.forks_count} fork-uri</span>
      </div>
      <a href="${proiect.html_url}" target="_blank" class="btn-github">
        Vezi pe GitHub →
      </a>
    `;

    grid.appendChild(card);
  });
}

incarcaProiecte();