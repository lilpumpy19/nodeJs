"use strict";
// ��������� ����� � ����� �����
console.log('e');
const form = document.querySelector('form');
const jobTitleInput = document.getElementById('jobTitle');
const locationInput = document.getElementById('location');
const descriptionInput = document.getElementById('description');
const imgInput = document.getElementById('img');
const salaryInput = document.getElementById('salary');
// ���������� �������� �����
form.addEventListener('submit', (event) => {
    event.preventDefault(); // �������������� �������� �����
    // �������� ������� ��������
    const vacancy = {
        jobTitle: jobTitleInput.value,
        location: locationInput.value,
        description: descriptionInput.value,
        img: imgInput.value,
        salary: salaryInput.value,
    };
    // ��������� �������� ������� �������� �� LocalStorage ��� �������� ������ ������� �������
    const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    // ���������� ����� �������� � ������
    vacancies.push(vacancy);
    // ���������� ������������ ������� �������� � LocalStorage
    localStorage.setItem('vacancies', JSON.stringify(vacancies));
    // ������� ����� ����� ����� ���������� ��������
    form.reset();
});
