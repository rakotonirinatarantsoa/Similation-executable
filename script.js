    // Fonction pour calculer les données avec la méthode RK4
    function calculateData(r, N0, K) {
        let t0 = 0.0;
        let pas = 2.0;
        let nbrSimulation = 30;
        let donnee = [];

        let t = t0;
        let N = N0;

        donnee.push({x: t, y: N});

        for (let i = 0; i < nbrSimulation; i++) {
            N = rungeKutta4(t, N, pas, r, K);
            t += pas;
            donnee.push({x: t, y: N});
        }

        return donnee;
    }


    // Fonction pour calculer la dérivée
    function logistique(t, N, r, K) {
        return r * N * (1 - N / K);
    }

    // Implémentation de la méthode Runge-Kutta 4
    function rungeKutta4(t, N, h, r, K) {
        let k1 = h * logistique(t, N, r, K);
        let k2 = h * logistique(t + h / 2.0, N + h * k1 / 2.0, r, K);
        let k3 = h * logistique(t + h / 2.0, N + h * k2 / 2.0, r, K);
        let k4 = h * logistique(t + h, N + h * k3, r, K);

        return N + (h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4);
    }

        // Fonction pour générer le graphique avec Chart.js
    // Fonction pour générer le graphique avec Chart.js
    function generateGraph() {
        let r = parseFloat(document.querySelector(".r").value);
        let N0 = parseFloat(document.querySelector(".N0").value);
        let K = parseFloat(document.querySelector(".K").value);

        // Calculer les données avec les valeurs saisies
        let data = calculateData(r, N0, K);

        // Récupérer le contexte du canvas
        let ctx = document.getElementById("chartCanvas").getContext("2d");

        // Créer un graphique avec Chart.js
        new Chart(ctx, {
            type: 'bar', // Modifier ici pour avoir un graphique en bâtons
            data: {
                datasets: [{
                    label: 'Croissance des utilisateurs',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bleu clair pour les barres
                    borderColor: 'rgba(54, 162, 235, 1)', // Bleu foncé pour les bordures
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    x: { 
                        type: 'linear', 
                        position: 'bottom' 
                    },
                    y: { 
                        beginAtZero: true 
                    }
                }
            }
        });
    }
       // Fonction bouton Actualiser 
       function actualiser() {
        location.reload()
     }