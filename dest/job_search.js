"use strict";
// ��������� ����� � �������� ��� ����������� �����������
const form = document.getElementById('jobSearchForm');
const vacancyResults = document.getElementById('vacancyResults');
if (form && vacancyResults) {
    // ���������� �������� �����
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // �������������� �������� �����
        // ��������� �������� ����� �����
        const jobTitle = document.getElementById('jobTitle').value;
        const location = document.getElementById('location').value;
        // ��������� ����������� �������� �� LocalStorage
        const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
        // ���������� �������� �� �������� � ��������������
        const filteredVacancies = vacancies.filter((vacancy) => {
            return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
                vacancy.location.toLowerCase().includes(location.toLowerCase());
        });
        // ������� �������� ��� ����������� �����������
        vacancyResults.innerHTML = '';
        // ����������� ��������������� ��������
        filteredVacancies.forEach((vacancy, index) => {
            const vacancyCardTemplate = document.getElementById('vacancyCardTemplate');
            const vacancyCard = vacancyCardTemplate.content.cloneNode(true);
            vacancyCard.querySelector('.vacancy-title').textContent = vacancy.jobTitle;
            vacancyCard.querySelector('.vacancy-salary').textContent = `Salary: ${vacancy.salary}`;
            vacancyCard.querySelector('.vacancy-location').textContent = `Location: ${vacancy.location}`;
            const vacancyImage = vacancyCard.querySelector('.vacancy-image');
            vacancyImage.src = vacancy.img;
            const deleteButton = vacancyCard.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                deleteVacancy(index);
                vacancyCard.remove();
            });
            vacancyResults.appendChild(vacancyCard);
        });
    });
}
function deleteVacancy(index) {
    // ��������� ����������� �������� �� LocalStorage
    const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    // �������� �������� �� �������
    vacancies.splice(index, 1);
    // ���������� ����������� �������� � LocalStorage
    localStorage.setItem('vacancies', JSON.stringify(vacancies));
    // ������������ �������� ��� ����������� ����������� �����������
    location.reload();
}
