"use strict";
// ��������� ����� � �������� ��� ����������� �����������
console.log('j');
const form = document.getElementById('jobSearchForm');
const vacancyResults = document.getElementById('vacancyResults');
// ���������� �������� �����
form.addEventListener('submit', (event) => {
    event.preventDefault(); // �������������� �������� �����
    // ��������� �������� ����� �����
    const jobTitle = document.getElementById('jobTitle').value;
    const location = document.getElementById('location').value;
    // ��������� ������� �������� �� LocalStorage
    const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    // ���������� �������� �� �������� � ��������������
    const filteredVacancies = vacancies.filter((vacancy) => {
        return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
            vacancy.location.toLowerCase().includes(location.toLowerCase());
    });
    // ������� �������� ��� ����������� �����������
    vacancyResults.innerHTML = '';
    // ����������� ��������������� ��������
    filteredVacancies.forEach((vacancy) => {
        const vacancyCardTemplate = document.getElementById('vacancyCardTemplate');
        const vacancyCard = vacancyCardTemplate.content.cloneNode(true);
        vacancyCard.querySelector('.vacancy-title').textContent = vacancy.jobTitle;
        vacancyCard.querySelector('.vacancy-salary').textContent = `Salary: ${vacancy.salary}`;
        vacancyCard.querySelector('.vacancy-location').textContent = `Location: ${vacancy.location}`;
        vacancyCard.querySelector('.vacancy-image').src = vacancy.img;
        vacancyResults.appendChild(vacancyCard);
    });
});
