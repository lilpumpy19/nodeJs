// Получение элементов для отображения данных о вакансии
const jobTitleElement = document.getElementById('jobTitle') as HTMLElement | null;
const locationElement = document.getElementById('location') as HTMLElement | null;
const salaryElement = document.getElementById('salary') as HTMLElement | null;
const vacancyImageElement = document.getElementById('vacancyImage') as HTMLImageElement | null;
const descriptionElement = document.getElementById('description') as HTMLElement | null;

if (jobTitleElement && locationElement && salaryElement && vacancyImageElement && descriptionElement) {
    // Получение параметров вакансии из URL
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('jobTitle');
    const location = urlParams.get('location');
    const salary = urlParams.get('salary');
    const img = urlParams.get('img');
    const description = urlParams.get('description');

    // Заполнение элементов данными о вакансии
    jobTitleElement.textContent = jobTitle || '';
    locationElement.textContent = `Location: ${location}` || '';
    salaryElement.textContent = `Salary: ${salary}` || '';
    vacancyImageElement.src = img || '';
    descriptionElement.textContent = description || '';
}
