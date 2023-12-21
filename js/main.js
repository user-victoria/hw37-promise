/*
    1. Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
    2. Ід має бути введений в інпут (валідація: ід від 1 до 100). Якщо знайдено пост,
       то вивести на сторінку блок з постом і зробити кнопку для отримання коментарів до посту.
    3. Зробити завдання використовуючи проміси, перехопити помилки.
*/

const refs = {
    input: document.querySelector('#input'),
    postBlock: document.querySelector('.block-for-post')
}

// creating "button"
let btn = document.createElement('button');
btn.innerHTML = 'Get comment';
btn.style.cursor = 'pointer';
btn.style.marginBottom = '50px';

async function getUrl(url) {
    try {
        let request = await fetch(url);
        let response = request.ok ? request.json() : Promise.catch(data.statusText);
        return response;
    }
    catch (err) {
        console.log('In catch:', err);
    }
}
getUrl('https://jsonplaceholder.typicode.com/posts')
    .then(post => {
        refs.input.addEventListener('change', function () {
            if (refs.input.value > 0 && refs.input.value < 101) {
                refs.postBlock.innerHTML = `
                    <p><b>Id:</b> ${post[(refs.input.value - 1)].id}</p>
                    <p><b>User Id:</b> ${post[(refs.input.value - 1)].userId}</p>
                    <p><b>Title:</b> ${post[(refs.input.value - 1)].title}</p>
                    <p><b>Body post:</b> ${post[(refs.input.value - 1)].body}</p>
                `;

                // adding "button"
                refs.postBlock.append(btn);

                btn.addEventListener('click', function () {
                    getUrl(`https://jsonplaceholder.typicode.com/posts/${refs.input.value}/comments`)
                        .then(comment => {
                            comment.forEach(elem => {
                                // creating "div" for comments
                                let divComments = document.createElement('div');

                                divComments.innerHTML = `
                                    <p><b>Id:</b> ${elem.id}</p>
                                    <p><b>Post Id:</b> ${elem.postId}</p>
                                    <p><b>Name:</b> ${elem.name}</p>
                                    <p><b>Body comment:</b> ${elem.body}</p>
                                    <p><b>Email:</b> ${elem.email}</p>
                                    </br>
                                `;
                                refs.postBlock.appendChild(divComments);
                            });
                        })
                }, { once: true });
            }
        });
    })