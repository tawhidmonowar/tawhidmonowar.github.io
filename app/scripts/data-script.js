async function updatePageData() {
    try {
        const response = await fetch('../app/config/data-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        document.getElementById('title').textContent = data.title;
        document.getElementById('name').textContent = data.name;
        document.getElementById('username').textContent = data.username;

    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}

updatePageData();