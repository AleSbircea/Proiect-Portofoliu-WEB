
const GITHUB_USERNAME = 'AleSbircea'; 
let proiecteGlobale = [];
let proiecteAfisate = 2;
const FALLBACK_REPOS = [

  {
    name: "management-parc-auto",
    description: "Aplicație pentru gestionarea unui parc auto.",
    language: "PHP, HTML, CSS, JavaScript",
    stargazers_count: 5,
    forks_count: 0,
    updated_at: "2024-01-01T00:00:00Z",
    html_url: "https://github.com/AleSbircea/management-parc-auto"
  },
  {
    name: "Proiect-Portofoliu-WEB",
    description: "Site personal de portofoliu cu integrare GitHub API.",
    language: "JavaScript, HTML, CSS",
    stargazers_count: 12,
    forks_count: 0,
        updated_at: "2024-02-01T00:00:00Z",
    html_url: "https://github.com/AleSbircea/Proiect-Portofoliu-WEB"
  },
  {
    name: "Laborator-Proiectare-Software",
    description: "Proiect de laborator - Proiectare Software.",
    language: "Java",
    stargazers_count: 3,
    forks_count: 0,
    updated_at: "2024-03-01T00:00:00Z",
    html_url: "https://github.com/AleSbircea/Laborator-Proiectare-Software"
  },

  {
    name: "Rummy-CSharp-Game",
    description: "Joc de Rummy pe tablă în rețea, creat folosind principiile OOP.",
    language: "C#",
    stargazers_count: 8,
    forks_count: 0,
    updated_at: "2024-04-01T00:00:00Z",
    html_url: "https://github.com/AleSbircea/Rummy-CSharp-Game"
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
      proiecteGlobale = FALLBACK_REPOS;
      setTimeout(() => afiseazaCarduri(proiecteGlobale), 1500);
      return;
    }

      document.getElementById('loading').style.display = 'none';
      proiecteGlobale = proiecteProprii;
      afiseazaCarduri(proiecteGlobale);

   } catch (eroare) {
  document.getElementById('loading').style.display = 'none';
  console.warn('Folosim fallback:', eroare.message);
  grid.innerHTML = '<p class="mesaj-eroare">Nu am putut încărca proiectele. Se afișează proiecte demo.</p>';
  proiecteGlobale = FALLBACK_REPOS;
  setTimeout(() => afiseazaCarduri(proiecteGlobale), 1500);
}
}


function afiseazaCarduri(proiecte) {
  const grid = document.getElementById('grid-proiecte');
  const sortare = document.getElementById('sortare').value;
  const cautare = document.getElementById('cautare').value.toLowerCase();

  let filtrate = proiecte.filter(p => {
    const nume = p.name.toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return nume.includes(cautare) || desc.includes(cautare);
  });

  filtrate.sort((a, b) => {
    if (sortare === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
  });

  grid.innerHTML = '';
  document.getElementById('btn-load-more').style.display = 'none';

  if (filtrate.length === 0) {
    grid.innerHTML = '<p class="mesaj-fallback">Niciun proiect găsit.</p>';
    return;
  }

 
  const deAfisat = filtrate.slice(0, proiecteAfisate);

  deAfisat.forEach(proiect => {
    const card = document.createElement('div');
    card.className = 'card-proiect';
    card.innerHTML = `
      <h3>${proiect.name}</h3>
      <p class="descriere-proiect">${proiect.description || 'Fără descriere disponibilă.'}</p>
      <span class="tag-limbaj">${proiect.language || 'Necunoscut'}</span>
      <div class="statistici">
        <span>${proiect.stargazers_count} stele</span>
        <span>${proiect.forks_count} fork-uri</span>
      </div>
     <a href="${proiect.html_url}" target="_blank" class="btn-github">Vezi pe GitHub</a>
    `;
    grid.appendChild(card);
    grid.appendChild(card);
  });

  
  if (filtrate.length > proiecteAfisate) {
    document.getElementById('btn-load-more').style.display = 'block';
  }
}
document.getElementById('sortare').addEventListener('change', () => {
  afiseazaCarduri(proiecteGlobale);
});

document.getElementById('cautare').addEventListener('input', () => {
  afiseazaCarduri(proiecteGlobale);
});

document.getElementById('btn-load-more').addEventListener('click', () => {
  proiecteAfisate += 6;
  afiseazaCarduri(proiecteGlobale);
});

incarcaProiecte();