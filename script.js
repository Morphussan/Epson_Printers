document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterModal = document.getElementById('filterModal');
    const closeButton = document.querySelector('.close');
    const themeToggle = document.getElementById('theme-toggle');

    // Проверяем текущую тему при загрузке страницы
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Обработчик события для переключения темы
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        // Сохраняем выбор пользователя в локальном хранилище
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    filterToggle.addEventListener('click', function() {
        filterModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        filterModal.style.display = 'none';
    });

    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const filterDropdown = document.querySelector('.filter-dropdown');
    applyFilterBtn.addEventListener('click', function() {
        applyFilters();
        filterModal.style.display = 'none'; // Скрываем модальное окно фильтров после применения фильтров
    });

    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchSuggestions = document.getElementById('searchSuggestions');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        applySearch(searchTerm);
        searchInput.value = '';
        searchSuggestions.innerHTML = '';
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim();
        searchSuggestions.innerHTML = '';
        if (searchTerm.length === 0) {
            return;
        }
        const series = ['Epson EcoTank', 'Epson WorkForce Pro', 'Epson Expression'];
        const models = ['ET-4760', 'WF-4740', 'ET-2750'];
        [...series, ...models].forEach(suggestion => {
            if (suggestion.toLowerCase().includes(searchTerm.toLowerCase())) {
                const option = document.createElement('option');
                option.value = suggestion;
                searchSuggestions.appendChild(option);
            }
        });
    });

    function applyFilters() {
        const selectedDpiWidth = parseInt(document.getElementById('dpiSelectWidth').value);
        const selectedDpiHeight = parseInt(document.getElementById('dpiSelectHeight').value);
        const printSpeed = parseInt(document.getElementById('printSpeed').value);
        const faxChecked = document.getElementById('faxCheckbox').checked;
        console.log('Selected DPI Width:', selectedDpiWidth);
        console.log('Selected DPI Height:', selectedDpiHeight);
        console.log('Selected Print Speed:', printSpeed);
        console.log('Fax Checked:', faxChecked);
        const printers = document.querySelectorAll('.printer');
        printers.forEach(printer => {
            const dpiWidth = parseInt(printer.getAttribute('data-dpi-width'));
            const dpiHeight = parseInt(printer.getAttribute('data-dpi-height'));
            const hasFax = printer.getAttribute('data-fax') === 'true';
            const printSpeedAttr = parseInt(printer.getAttribute('data-print-speed'));
            const widthMatch = isNaN(selectedDpiWidth) || dpiWidth === selectedDpiWidth;
            const heightMatch = isNaN(selectedDpiHeight) || dpiHeight === selectedDpiHeight;
            const speedMatch = isNaN(printSpeed) || printSpeedAttr === printSpeed;
            const faxMatch = !faxChecked || hasFax;
            if (!widthMatch || !heightMatch || !speedMatch || !faxMatch) {
                printer.style.display = 'none';
            } else {
                printer.style.display = 'block';
            }
        });
    }

    function applySearch(searchTerm) {
        const printers = document.querySelectorAll('.printer');
        let matchedPrinters = [];
        printers.forEach(printer => {
            const printerName = printer.querySelector('h3').textContent.toLowerCase();
            if (printerName.includes(searchTerm.toLowerCase())) {
                matchedPrinters.push(printer);
            }
        });
        printers.forEach(printer => {
            if (matchedPrinters.includes(printer)) {
                printer.style.display = 'block';
            } else {
                printer.style.display = 'none';
            }
        });
        if (matchedPrinters.length === 1) {
            searchSuggestions.innerHTML = '';
        }
    }

});
