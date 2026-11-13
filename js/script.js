// ===== Footer year (dynamic content) =====
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== Mobile navigation menu =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

// ===== Academic Planner (task management) =====
const taskForm = document.getElementById("taskForm");

if (taskForm) {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");
  const taskError = document.getElementById("taskError");

  // Array that stores all tasks (saved in localStorage so they stay after refresh)
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateCount() {
    const completed = tasks.filter(function (task) {
      return task.completed;
    }).length;
    taskCount.textContent = "Total tasks: " + tasks.length + " | Completed: " + completed;
  }

  function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "No tasks yet. Add one above!";
      taskList.appendChild(empty);
    }

    tasks.forEach(function (task, index) {
      const li = document.createElement("li");
      if (task.completed) {
        li.classList.add("completed");
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", function () {
        toggleTask(index);
      });

      const text = document.createElement("span");
      text.textContent = task.text;

      const date = document.createElement("small");
      date.textContent = task.date ? "Due: " + task.date : "";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", function () {
        deleteTask(index);
      });

      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(date);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

    updateCount();
  }

  function addTask(text, date) {
    tasks.push({ text: text, date: date, completed: false });
    saveTasks();
    renderTasks();
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = taskInput.value.trim();

    if (text === "") {
      taskError.textContent = "Please enter a task.";
      return;
    }

    taskError.textContent = "";
    addTask(text, taskDate.value);
    taskInput.value = "";
    taskDate.value = "";
  });

  renderTasks();
}

// ===== Contact form validation =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const success = document.getElementById("formSuccess");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]+$/;

    let isValid = true;

    // Clear old messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("messageError").textContent = "";
    success.textContent = "";

    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (phone === "") {
      document.getElementById("phoneError").textContent = "Phone number is required.";
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      document.getElementById("phoneError").textContent = "Phone number must contain only digits.";
      isValid = false;
    }

    if (message === "") {
      document.getElementById("messageError").textContent = "Message is required.";
      isValid = false;
    }

    if (isValid) {
      success.textContent = "Thank you, " + name + "! Your message has been sent successfully.";
      contactForm.reset();
    }
  });
}
