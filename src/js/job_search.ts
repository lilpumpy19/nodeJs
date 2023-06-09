// ��������� ����� � �������� ��� ����������� �����������
interface Vacancy {
    id: string;
    jobTitle: string;
    location: string;
    description: string;
    salary: string;
    img: string;
}

// @ts-ignore
const form = document.getElementById('jobSearchForm') as HTMLFormElement | null;
const vacancyResults = document.getElementById('vacancyResults') as HTMLElement | null;

if (form && vacancyResults) {
    // ��������� ����������� �������� �� LocalStorage
    let vacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');

    // ����������� ���� ����������� ��������
    function renderVacancies(filteredVacancies?: Vacancy[]) {
        if (!vacancyResults) return; // �������� �� null

        vacancyResults.innerHTML = ''; // ������� �������� ��� ����������� �����������

        const vacanciesToDisplay = filteredVacancies || vacancies; // ���������� ��������������� ��������, ���� ��� ��������

        vacanciesToDisplay.forEach((vacancy: Vacancy, index: number) => {
            const vacancyCardTemplate = document.getElementById('vacancyCardTemplate') as HTMLTemplateElement;
            const vacancyCard = vacancyCardTemplate.content.cloneNode(true) as HTMLElement;

            vacancyCard.querySelector('.vacancy-title')!.textContent = vacancy.jobTitle;
            vacancyCard.querySelector('.vacancy-salary')!.textContent = `Salary: ${vacancy.salary}`;
            vacancyCard.querySelector('.vacancy-location')!.textContent = `Location: ${vacancy.location}`;

            const vacancyImage = vacancyCard.querySelector('.vacancy-image') as HTMLImageElement;
            vacancyImage.src = vacancy.img;

            const detailsButton = vacancyCard.querySelector('.details-button') as HTMLButtonElement;
            detailsButton.addEventListener('click', () => {
                // ������� �� �������� "vacancy.html" � ��������� ������ �������� ����� ��������� URL
                window.location.href = `vacancy.html?id=${vacancy.id}&jobTitle=${vacancy.jobTitle}&location=${vacancy.location}&description=${vacancy.description}&salary=${vacancy.salary}&img=${vacancy.img}`;
            });

            const deleteButton = vacancyCard.querySelector('.delete-button') as HTMLButtonElement;
            deleteButton.addEventListener('click', () => {
                deleteVacancy(index);
            })

            vacancyResults.appendChild(vacancyCard);
        });
    }

    renderVacancies(); // ����������� ���� �������� ��� �������� ��������

    // ���������� �������� �����
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // �������������� �������� �����


            const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
            const location = (document.getElementById('location') as HTMLInputElement).value;

            // ���������� �������� �� �������� � ��������������
            const filteredVacancies = vacancies.filter((vacancy: Vacancy) => {
                return vacancy.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) &&
                    vacancy.location.toLowerCase().includes(location.toLowerCase());
            });

            // ����������� ��������������� ��������
            renderVacancies(filteredVacancies);
        });
    }
    function deleteVacancy(index: number) {
        // �������� �������� �� �������
        vacancies.splice(index, 1);

        // ���������� ����������� �������� � LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));


        renderVacancies();
    }
}
