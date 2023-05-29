// Получение формы и элемента для отображения результатов
const form = document.getElementById('jobSearchForm') as HTMLFormElement | null;
const vacancyResults = document.getElementById('vacancyResults') as HTMLElement | null;

if (form && vacancyResults) {
    // Получение сохраненных вакансий из LocalStorage
    let vacancies: any[] = JSON.parse(localStorage.getItem('vacancies') || '[]');

    // Отображение всех сохраненных вакансий
    function renderVacancies(filteredVacancies?: any[]) {
        if (!vacancyResults) return; // Проверка на null

        vacancyResults.innerHTML = ''; // Очистка элемента для отображения результатов

        const vacanciesToDisplay = filteredVacancies || vacancies; // Используем отфильтрованные вакансии, если они переданы

        vacanciesToDisplay.forEach((vacancy: any, index: number) => {
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
            });

            vacancyResults.appendChild(vacancyCard);
        });
    }

    renderVacancies(); // Отображение всех вакансий при загрузке страницы

    // Обработчик отправки формы
    if (form) { // Проверка на null
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращение отправки формы

            // Получение значения полей ввода
            const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
            const location = (document.getElementById('location') as HTMLInputElement).value;

            // Фильтрация вакансий по названию и местоположению
            const filteredVacancies = vacancies.filter((vacancy: any) => {
                return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
                    vacancy.location.toLowerCase().includes(location.toLowerCase());
            });

            // Отображение отфильтрованных вакансий
            renderVacancies(filteredVacancies);
        });
    }

    function deleteVacancy(index: number) {
        // Удаление вакансии из массива
        vacancies.splice(index, 1);

        // Обновление сохраненных вакансий в LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));

        // Перерисовка вакансий
        renderVacancies();
    }
}
