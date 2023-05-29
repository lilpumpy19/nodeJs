// ��������� ����� � ����� �����
console.log('e')
const form = document.querySelector('form');
const jobTitleInput = document.getElementById('jobTitle') as HTMLInputElement;
const locationInput = document.getElementById('location') as HTMLInputElement;
const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
const imgInput = document.getElementById('img') as HTMLInputElement;
const salaryInput = document.getElementById('salary') as HTMLInputElement;

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
