let content = document.querySelector('.content');
let navLinks = document.querySelectorAll('a[data-partial]');

// Default page to load
let url = 'partials/home.html';

function handleAjax(urlValue) {
    fetch(urlValue)
        .then(rsp => {
            if (!rsp.ok) throw new Error(rsp.statusText);
            return rsp.text();
        })
        .then(dataStr => {
            content.innerHTML = dataStr;

            bindAjaxLinks();
        })
        .catch(err => {
            console.log("AJAX load error:", err.message);
        });
}

function handleClick(e) {
    e.preventDefault();
    url = e.currentTarget.getAttribute('data-partial');
    handleAjax(url);
}

function bindAjaxLinks() {
    let ajaxLinks = document.querySelectorAll('a[data-partial]');
    ajaxLinks.forEach(link => {
        link.removeEventListener('click', handleClick);
        link.addEventListener('click', handleClick);
    });
}

bindAjaxLinks();

// Load default page on start
handleAjax(url);
