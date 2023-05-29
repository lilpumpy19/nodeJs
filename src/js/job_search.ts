// Получение формы и элемента для отображения результатов
const form = document.getElementById('jobSearchForm') as HTMLFormElement | null;
const vacancyResults = document.getElementById('vacancyResults') as HTMLElement | null;

if (form && vacancyResults) {
    // Обработчик отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращение отправки формы

        // Получение значения полей ввода
        const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
        const location = (document.getElementById('location') as HTMLInputElement).value;

        // Получение сохраненных вакансий из LocalStorage
        const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');

        // Фильтрация вакансий по названию и местоположению
        const filteredVacancies = vacancies.filter((vacancy: any) => {
            return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
                vacancy.location.toLowerCase().includes(location.toLowerCase());
        });

        // Очистка элемента для отображения результатов
        vacancyResults.innerHTML = '';

        // Отображение отфильтрованных вакансий
        filteredVacancies.forEach((vacancy: any, index: number) => {
            const vacancyCardTemplate = document.getElementById('vacancyCardTemplate') as HTMLTemplateElement;
            const vacancyCard = vacancyCardTemplate.content.cloneNode(true) as HTMLElement;

            vacancyCard.querySelector('.vacancy-title')!.textContent = vacancy.jobTitle;
            vacancyCard.querySelector('.vacancy-salary')!.textContent = `Salary: ${vacancy.salary}`;
            vacancyCard.querySelector('.vacancy-location')!.textContent = `Location: ${vacancy.location}`;

            const vacancyImage = vacancyCard.querySelector('.vacancy-image') as HTMLImageElement;
            vacancyImage.src = vacancy.img;

            const deleteButton = vacancyCard.querySelector('.delete-button') as HTMLButtonElement;
            deleteButton.addEventListener('click', () => {
                deleteVacancy(index);
                vacancyCard.remove();
            });

            vacancyResults.appendChild(vacancyCard);
        });
    });
}

function deleteVacancy(index: number) {
    // Получение сохраненных вакансий из LocalStorage
    const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');

    // Удаление вакансии по индексу
    vacancies.splice(index, 1);

    // Обновление сохраненных вакансий в LocalStorage
    localStorage.setItem('vacancies', JSON.stringify(vacancies));

    // Перезагрузка страницы для отображения обновленных результатов
    location.reload();
}
