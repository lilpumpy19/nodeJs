
console.log('e')
// ��������� ����� � ����� �����
const form = document.querySelector('form'),
    jobTitleInput = document.getElementById('jobTitle') as HTMLInputElement | null,
    locationInput = document.getElementById('location') as HTMLInputElement | null,
    descriptionInput = document.getElementById('description') as HTMLTextAreaElement | null,
    imgInput = document.getElementById('img') as HTMLInputElement | null,
    salaryInput = document.getElementById('salary') as HTMLInputElement | null;
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
