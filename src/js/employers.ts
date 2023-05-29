console.log('e');

// ��������� ����� � ����� �����
// @ts-ignore
const form = document.querySelector('form');
const jobTitleInput = document.getElementById('jobTitle') as HTMLInputElement | null;
const locationInput = document.getElementById('location') as HTMLInputElement | null;
const descriptionInput = document.getElementById('description') as HTMLTextAreaElement | null;
const imgInput = document.getElementById('img') as HTMLInputElement | null;
const salaryInput = document.getElementById('salary') as HTMLInputElement | null;

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
        const vacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');


        vacancies.push(vacancy);

        // ���������� ������������ ������� �������� � LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));

        // ������� ����� ����� ����� ���������� ��������
        form.reset();
    });
    function generateUniqueId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
