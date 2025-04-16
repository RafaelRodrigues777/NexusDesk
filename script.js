document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("chamadosChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Abertos", "Em Andamento", "Fechados"],
            datasets: [{
                label: "Chamados",
                data: [12, 5, 20],
                backgroundColor: ["#007bff", "#ffc107", "#28a745"]
            }]
        }
    });
});
