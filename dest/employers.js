"use strict";
console.log('e');
// ��������� ����� � ����� �����
const form = document.querySelector('form'), jobTitleInput = document.getElementById('jobTitle'), locationInput = document.getElementById('location'), descriptionInput = document.getElementById('description'), imgInput = document.getElementById('img'), salaryInput = document.getElementById('salary');
if (form && jobTitleInput && locationInput && descriptionInput && imgInput && salaryInput) {
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
}
