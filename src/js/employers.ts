
console.log('e')
// Получение формы и полей ввода
const form = document.querySelector('form'),
    jobTitleInput = document.getElementById('jobTitle') as HTMLInputElement | null,
    locationInput = document.getElementById('location') as HTMLInputElement | null,
    descriptionInput = document.getElementById('description') as HTMLTextAreaElement | null,
    imgInput = document.getElementById('img') as HTMLInputElement | null,
    salaryInput = document.getElementById('salary') as HTMLInputElement | null;
if (form && jobTitleInput && locationInput && descriptionInput && imgInput && salaryInput) {
    // Обработчик отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращение отправки формы

        // Создание объекта вакансии
        const vacancy = {
            jobTitle: jobTitleInput.value,
            location: locationInput.value,
            description: descriptionInput.value,
            img: imgInput.value,
            salary: salaryInput.value,
        };

        // Получение текущего массива вакансий из LocalStorage или создание нового пустого массива
        const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');

        // Добавление новой вакансии в массив
        vacancies.push(vacancy);

        // Сохранение обновленного массива вакансий в LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));

        // Очистка полей ввода после добавления вакансии
        form.reset();
    });
}
