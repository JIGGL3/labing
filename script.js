const API = "/api/tasks";

function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${task.text}
                    <button onclick="deleteTask(${task.id})">❌</button>
                `;
                list.appendChild(li);
            });
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value;

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    }).then(() => {
        input.value = "";
        loadTasks();
    });
}

function deleteTask(id) {
    fetch(API + "/" + id, {
        method: "DELETE"
    }).then(loadTasks);
}

loadTasks();
