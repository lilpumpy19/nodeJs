"use strict";
console.log('e');
// ��������� ����� � ����� �����
// @ts-ignore
const form = document.querySelector('form');
const jobTitleInput = document.getElementById('jobTitle');
const locationInput = document.getElementById('location');
const descriptionInput = document.getElementById('description');
const imgInput = document.getElementById('img');
const salaryInput = document.getElementById('salary');
if (form && jobTitleInput && locationInput && descriptionInput && imgInput && salaryInput) {
    // ���������� �������� �����
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // �������������� �������� �����
        // �������� ������� ��������
        const vacancy = {
            id: generateUniqueId(),
            jobTitle: jobTitleInput.value,
            location: locationInput.value,
            description: descriptionInput.value,
            img: imgInput.value,
            salary: salaryInput.value,
            comments: []
        };
        // ��������� �������� ������� �������� �� LocalStorage ��� �������� ������ ������� �������
        const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
        vacancies.push(vacancy);
        // ���������� ������������ ������� �������� � LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));
        // ������� ����� ����� ����� ���������� ��������
        form.reset();
    });
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
