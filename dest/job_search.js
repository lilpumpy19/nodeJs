"use strict";
// @ts-ignore
const form = document.getElementById('jobSearchForm');
const vacancyResults = document.getElementById('vacancyResults');
if (form && vacancyResults) {
    // ��������� ����������� �������� �� LocalStorage
    let vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    // ����������� ���� ����������� ��������
    function renderVacancies(filteredVacancies) {
        if (!vacancyResults)
            return; // �������� �� null
        vacancyResults.innerHTML = ''; // ������� �������� ��� ����������� �����������
        const vacanciesToDisplay = filteredVacancies || vacancies; // ���������� ��������������� ��������, ���� ��� ��������
        vacanciesToDisplay.forEach((vacancy, index) => {
            const vacancyCardTemplate = document.getElementById('vacancyCardTemplate');
            const vacancyCard = vacancyCardTemplate.content.cloneNode(true);
            vacancyCard.querySelector('.vacancy-title').textContent = vacancy.jobTitle;
            vacancyCard.querySelector('.vacancy-salary').textContent = `Salary: ${vacancy.salary}`;
            vacancyCard.querySelector('.vacancy-location').textContent = `Location: ${vacancy.location}`;
            const vacancyImage = vacancyCard.querySelector('.vacancy-image');
            vacancyImage.src = vacancy.img;
            const detailsButton = vacancyCard.querySelector('.details-button');
            detailsButton.addEventListener('click', () => {
                // ������� �� �������� "vacancy.html" � ��������� ������ �������� ����� ��������� URL
                window.location.href = `vacancy.html?id=${vacancy.id}&jobTitle=${vacancy.jobTitle}&location=${vacancy.location}&description=${vacancy.description}&salary=${vacancy.salary}&img=${vacancy.img}`;
            });
            const deleteButton = vacancyCard.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                deleteVacancy(index);
            });
            vacancyResults.appendChild(vacancyCard);
        });
    }
    renderVacancies(); // ����������� ���� �������� ��� �������� ��������
    // ���������� �������� �����
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // �������������� �������� �����
            const jobTitle = document.getElementById('jobTitle').value;
            const location = document.getElementById('location').value;
            // ���������� �������� �� �������� � ��������������
            const filteredVacancies = vacancies.filter((vacancy) => {
                return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
                    vacancy.location.toLowerCase().includes(location.toLowerCase());
            });
            // ����������� ��������������� ��������
            renderVacancies(filteredVacancies);
        });
    }
    function deleteVacancy(index) {
        // �������� �������� �� �������
        vacancies.splice(index, 1);
        // ���������� ����������� �������� � LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));
        renderVacancies();
    }
}
