// ��������� ��������� ��� ����������� ������ � ��������
const jobTitleElement = document.getElementById('jobTitle') as HTMLElement | null;
const locationElement = document.getElementById('location') as HTMLElement | null;
const salaryElement = document.getElementById('salary') as HTMLElement | null;
const vacancyImageElement = document.getElementById('vacancyImage') as HTMLImageElement | null;
const descriptionElement = document.getElementById('description') as HTMLElement | null;

if (jobTitleElement && locationElement && salaryElement && vacancyImageElement && descriptionElement) {
    // ��������� ���������� �������� �� URL
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('jobTitle');
    const location = urlParams.get('location');
    const salary = urlParams.get('salary');
    const img = urlParams.get('img');
    const description = urlParams.get('description');

    // ���������� ��������� ������� � ��������
    jobTitleElement.textContent = jobTitle || '';
    locationElement.textContent = `Location: ${location}` || '';
    salaryElement.textContent = `Salary: ${salary}` || '';
    vacancyImageElement.src = img || '';
    descriptionElement.textContent = description || '';
}
// ��������� ID ������� �������� �� URL
const urlParams = new URLSearchParams(window.location.search);
const vacancyId = urlParams.get('id');

// ��������� �������� ��� ����������� ������������
const commentContainer = document.getElementById('commentContainer') as HTMLElement;

// ��������� ������������ �� Local Storage ��� ������� ��������
let comments: string[] = JSON.parse(localStorage.getItem(`comments_${vacancyId}`) || '[]');

// ������� ����������� ������������
function renderComments() {
    if (!commentContainer) return;

    commentContainer.innerHTML = ''; // ������� ���������� ��� ������������

    comments.forEach((comment: string) => {
        const commentElement = document.createElement('div');
        commentElement.textContent = comment;
        commentContainer.appendChild(commentElement);
    });
}

renderComments(); // ����������� ������������ ��� �������� ��������

// ���������� �������� ����� �����������
const commentForm = document.getElementById('commentForm') as HTMLFormElement | null;
if (commentForm) {
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const commentInput = document.getElementById('commentInput') as HTMLInputElement | null;
        if (!commentInput) return;

        const commentText = commentInput.value.trim();
        if (commentText === '') return;


        comments.push(commentText);

        // ���������� ������������ � Local Storage ��� ������� ��������
        localStorage.setItem(`comments_${vacancyId}`, JSON.stringify(comments));


        renderComments();


        commentInput.value = '';
    });
}



interface Vacancy {
    id: string;
    jobTitle: string;
    location: string;
    description: string;
    img: string;
    salary: string;
}


interface Comment {
    vacancyId: string;
    text: string;
}


if (form && jobTitleInput && locationInput && descriptionInput && imgInput && salaryInput) {

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // �������������� �������� �����

        // �������� ������� ��������
        const vacancy: Vacancy = {
            id: generateUniqueId(), // ��������� ����������� �������������� ��������
            jobTitle: jobTitleInput.value,
            location: locationInput.value,
            description: descriptionInput.value,
            img: imgInput.value,
            salary: salaryInput.value,
        };

        // ��������� �������� ������� �������� �� LocalStorage ��� �������� ������ ������� �������
        const vacancies: { [id: string]: Vacancy } = JSON.parse(localStorage.getItem('vacancies') || '{}');

        // ���������� ����� �������� � ������
        vacancies[vacancy.id] = vacancy;

        // ���������� ������������ ������� �������� � LocalStorage
        localStorage.setItem('vacancies', JSON.stringify(vacancies));


        form.reset();
    });
}

// ������� ��� ��������� ����������� ��������������
function generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}