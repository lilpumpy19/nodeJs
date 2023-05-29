// Получение формы и элемента для отображения результатов
console.log('j')
const form = document.getElementById('jobSearchForm') as HTMLFormElement;
const vacancyResults = document.getElementById('vacancyResults');

// Обработчик отправки формы
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращение отправки формы

    // Получение значения полей ввода
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;

    // Получение массива вакансий из LocalStorage
    const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');

    // Фильтрация вакансий по названию и местоположению
    const filteredVacancies = vacancies.filter((vacancy: any) => {
        return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
            vacancy.location.toLowerCase().includes(location.toLowerCase());
    });

    // Очистка элемента для отображения результатов
    vacancyResults.innerHTML = '';

    // Отображение отфильтрованных вакансий
    filteredVacancies.forEach((vacancy: any) => {
        const vacancyCardTemplate = document.getElementById('vacancyCardTemplate') as HTMLTemplateElement;
        const vacancyCard = vacancyCardTemplate.content.cloneNode(true) as HTMLElement;

        vacancyCard.querySelector('.vacancy-title')!.textContent = vacancy.jobTitle;
        vacancyCard.querySelector('.vacancy-salary')!.textContent = `Salary: ${vacancy.salary}`;
        vacancyCard.querySelector('.vacancy-location')!.textContent = `Location: ${vacancy.location}`;
        vacancyCard.querySelector('.vacancy-image')!.src = vacancy.img;

        vacancyResults.appendChild(vacancyCard);
    });
});
