// ��������� ����� � �������� ��� ����������� �����������
const form = document.getElementById('jobSearchForm') as HTMLFormElement | null;
const vacancyResults = document.getElementById('vacancyResults') as HTMLElement | null;

if (form && vacancyResults) {
    // ���������� �������� �����
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // �������������� �������� �����

        // ��������� �������� ����� �����
        const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
        const location = (document.getElementById('location') as HTMLInputElement).value;

        // ��������� ����������� �������� �� LocalStorage
        const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');

        // ���������� �������� �� �������� � ��������������
        const filteredVacancies = vacancies.filter((vacancy: any) => {
            return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
                vacancy.location.toLowerCase().includes(location.toLowerCase());
        });

        // ������� �������� ��� ����������� �����������
        vacancyResults.innerHTML = '';

        // ����������� ��������������� ��������
        filteredVacancies.forEach((vacancy: any, index: number) => {
            const vacancyCardTemplate = document.getElementById('vacancyCardTemplate') as HTMLTemplateElement;
            const vacancyCard = vacancyCardTemplate.content.cloneNode(true) as HTMLElement;

            vacancyCard.querySelector('.vacancy-title')!.textContent = vacancy.jobTitle;
            vacancyCard.querySelector('.vacancy-salary')!.textContent = `Salary: ${vacancy.salary}`;
            vacancyCard.querySelector('.vacancy-location')!.textContent = `Location: ${vacancy.location}`;

            const vacancyImage = vacancyCard.querySelector('.vacancy-image') as HTMLImageElement;
            vacancyImage.src = vacancy.img;

            const deleteButton = vacancyCard.querySelector('.delete-button') as HTMLButtonElement;
            deleteButton.addEventListener('click', () => {
                deleteVacancy(index);
                vacancyCard.remove();
            });

            vacancyResults.appendChild(vacancyCard);
        });
    });
}

function deleteVacancy(index: number) {
    // ��������� ����������� �������� �� LocalStorage
    const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');

    // �������� �������� �� �������
    vacancies.splice(index, 1);

    // ���������� ����������� �������� � LocalStorage
    localStorage.setItem('vacancies', JSON.stringify(vacancies));

    // ������������ �������� ��� ����������� ����������� �����������
    location.reload();
}
