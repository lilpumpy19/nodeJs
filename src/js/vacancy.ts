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
