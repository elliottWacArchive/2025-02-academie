const textZone = document.getElementById('text-tweet');

let entry = '';
textZone.addEventListener('keydown', async function(event) {
    if (event.key === ' ') {
        entry = '';
    } else if (event.key === 'Enter') {
        entry = '';
    } else if (event.key === 'Backspace') {
        entry = entry.slice(0, entry.length - 1);
    } else if (event.key === '#') {
        entry = '#';
    } else if (event.key === '@') {
        entry = '@';
    } else if (entry.length > 0) {
        entry += event.key;
        checkEntry(entry);
    }
    if (document.getElementById('autocomplete-suggestions')) {
        document.getElementById('autocomplete-suggestions').remove();
    }

    console.log(entry);
});

async function checkEntry(entry) {
    let proposition = [];
    const selection = window.getSelection();
    if (entry[0] === '#') {
        const response = await fetch('http://localhost:3000/tweets/getHashtag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hashtag: entry.slice(1) }),
        });
        const result = await response.json();
        proposition = result.user.map(user => user.name);
    } else if (entry[0] === '@') {
        const response = await fetch('http://localhost:3000/tweets/getAt', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ at: entry.slice(1) }),
        });
        const result = await response.json();
        proposition = result.user.map(user => user.username);
        console.log(proposition);
    }
    if (proposition.length > 0) {
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const x = rect.left;
            const y = rect.top;
            console.log(`Cursor position - x: ${x}, y: ${y}`);
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = `${x}px`;
            div.style.top = `calc(${y}px + 1.1rem)`;
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.backgroundColor = 'grey';
            div.style.border = '1px solid black';
            div.style.padding = '5px';
            if (document.getElementById('autocomplete-suggestions')) {
                document.getElementById('autocomplete-suggestions').remove();
            }
            div.id = 'autocomplete-suggestions';
            proposition.forEach(element => {
                const elem = document.createElement('div');
                elem.innerText = element;
                div.appendChild(elem);
            });
            document.body.appendChild(div);
        }
    }
}