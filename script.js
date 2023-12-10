document.addEventListener('DOMContentLoaded', function () {
    const dateNumber = document.getElementById('dateNumber');
    const dateText = document.getElementById('dateText');
    const dateMonth = document.getElementById('dateMonth');
    const dateYear = document.getElementById('dateYear');

    const tasksContainer = document.getElementById('tasksContainer');
    const taskTemplate = document.getElementById('taskTemplate');

    const setDate = () => {
        const date = new Date();
        dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
        dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
        dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
        dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
    };

    const addNewTask = event => {
        event.preventDefault();
        const { taskText, taskDescription, taskDate } = event.target;
        const value = taskText.value;
        const description = taskDescription.value;
        const date = taskDate.value;

        if (!value) return;

        const taskClone = taskTemplate.content.cloneNode(true);
        const taskTextElement = taskClone.querySelector('.task-text');
        const taskDescriptionElement = taskClone.querySelector('.task-description');
        const taskDateElement = taskClone.querySelector('.task-date');
        taskTextElement.textContent = value;
        taskDescriptionElement.textContent = description;
        taskDateElement.textContent = date;
        tasksContainer.prepend(taskClone);
        event.target.reset();
    };

    const editTask = task => {
        const taskText = task.querySelector('.task-text');
        const taskDescription = task.querySelector('.task-description');
        const taskDate = task.querySelector('.task-date');

        const editForm = document.createElement('form');
        editForm.classList.add('edit-form');

        const taskTextInput = document.createElement('input');
        taskTextInput.value = taskText.textContent;
        taskTextInput.classList.add('task-text-input');

        const taskDescriptionInput = document.createElement('textarea');
        taskDescriptionInput.value = taskDescription.textContent;
        taskDescriptionInput.classList.add('task-description-input');

        const taskDateInput = document.createElement('input');
        taskDateInput.value = taskDate.textContent;
        taskDateInput.classList.add('task-date-input');
        taskDateInput.setAttribute('data-input', '');

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar';
        saveButton.classList.add('save-button');
        saveButton.style.cssText = 'background-color: transparent; border: none;';
        saveButton.addEventListener('click', () => {
            taskText.textContent = taskTextInput.value;
            taskDescription.textContent = taskDescriptionInput.value;
            taskDate.textContent = taskDateInput.value;
            task.removeChild(editForm);
        });

        editForm.appendChild(taskTextInput);
        editForm.appendChild(taskDescriptionInput);
        editForm.appendChild(taskDateInput);
        editForm.appendChild(saveButton);
        task.appendChild(editForm);
    };

    const deleteTask = task => {
        task.remove();
    };

    const changeTaskState = event => {
        event.target.classList.toggle('done');
    };

    setDate();

    const form = document.getElementById('taskForm');
    form.addEventListener('submit', addNewTask);

    tasksContainer.addEventListener('click', event => {
        if (event.target.classList.contains('delete-icon')) {
            const task = event.target.parentNode.parentNode;
            deleteTask(task);
        } else if (event.target.classList.contains('task-text')) {
            changeTaskState(event);
        } else if (event.target.classList.contains('edit-icon')) {
            const task = event.target.parentNode.parentNode;
            editTask(task);
        }
    });

    flatpickr('[data-input]', {
        dateFormat: 'd/m/Y',
    });
});
