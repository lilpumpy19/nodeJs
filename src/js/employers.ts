console.log('e');

// Получение формы и полей ввода
// @ts-ignore
const form = document.querySelector('form');
const jobTitleInput = document.getElementById('jobTitle') as HTMLInputElement | null;
const locationInput = document.getElementById('location') as HTMLInputElement | null;
const descriptionInput = document.getElementById('description') as HTMLTextAreaElement | null;
const imgInput = document.getElementById('img') as HTMLInputElement | null;
const salaryInput = document.getElementById('salary') as HTMLInputElement | null;

if (form && jobTitleInput && locationInput && descriptionInput && imgInput && salaryInput) {
    // Обработчик отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращение отправки формы

        // Создание объекта вакансии
        const vacancy = {
            id: generateUniqueId(),
            jobTitle: jobTitleInput.value,
            location: locationInput.value,
            description: descriptionInput.value,
            img: imgInput.value,
            salary: salaryInput.value,
            comments: []
        };

        // Получение текущего массива вакансий из LocalStorage или создание нового пустого массива
        const vacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');


        vacancies.push(vacancy);

        // Сохранение обновленного массива вакансий в LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));

        // Очистка полей ввода после добавления вакансии
        form.reset();
    });
    function generateUniqueId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
