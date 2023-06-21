const userId = new URLSearchParams(window.location.search).get('userId');

function showUser(id){
    fetch('https://insta-api-api.0vxq7h.easypanel.host/users/' + id)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const userBox = document.createElement('div'); 
            userBox.style.backgroundColor = 'rgb(240, 240, 240)';
            userBox.style.padding = '25px';
            userBox.style.maxHeight = '100%';
            userBox.style.marginBottom = '50px';
            userBox.style.borderRadius = '10px 10px 25px 25px';


            const picture = document.createElement('img');
            picture.id = 'img' + this.id;
            picture.style.width = '300px';
            picture.style.height = '300px';
            picture.setAttribute('src', response.avatarUrl); 
            picture.style.borderRadius = '10px';
            
            
            const userName = document.createElement('h3');
            userName.innerText = response.username;
            userName.style.color ='white';
            userName.style.backgroundColor = 'rgb(56, 54, 54)';
            userName.style.padding = '15px';
            userName.style.borderRadius = '10px';

            const description = document.createElement('p');
            description.innerText = response.description;
            description.style.paddingLeft = '25px';

            const nbPost = document.createElement('li');
            const totalPosts = response.posts.length;
            nbPost.innerText = totalPosts + (totalPosts <= 1 ? ' post' : ' posts');
            nbPost.style.textAlign = 'right';

            userBox.append(picture, userName, description, nbPost);

            const posts = document.createElement('div');
            response.posts.forEach(p => {
                const post = document.createElement('div');
                const postPicture = document.createElement('img');
                postPicture.style.width = '300px';
                postPicture.style.height = '300px';
                postPicture.setAttribute('src', p.pictureUrl);
                const postDescription = document.createElement('p');
                postDescription.innerText = p.description;
                post.append(postPicture,postDescription);
                posts.append(post);

                post.style.backgroundColor = 'hsl(0, 0%, 96%)';
                post.style.padding = '25px';
                post.style.display = 'flex';
                post.style.flexDirection = 'column';
                post.style.borderRadius = '15px';

                postDescription.style.backgroundColor = 'rgb(56, 54, 54)';
                postDescription.style.maxWidth = '300px';
                postDescription.style.padding = '15px';
                postDescription.style.color = 'white';
                postDescription.style.borderRadius = '5px';
            }); 

            posts.style.display = 'flex';
            posts.style.flexDirection ='column';    
            posts.style.flexWrap = 'wrap';
            posts.style.gap = '15px';

            userContainer.append(userBox, posts);   
            
        }); 
}   

function addUser(userName, userAvatarUrl, userDescription){
    const commentData = {
        username: userName,
        avatarUrl: userAvatarUrl,
        description: userDescription
    };
    fetch('https://insta-api-api.0vxq7h.easypanel.host/users', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 201) {
            return response.json(); 
        } else {
            throw new Error("Erreur - L'utilisateur n'a pas pu être créé");
        }
    })
    .then(user => {
        showUser(user.id);
    })
    .catch(error => {
        console.error('La requête a échouée - ', error);
    });
}

const formAjoutButton = document.getElementById('formAjoutButton');
const miniFormOverlay = document.getElementById('miniFormOverlay');
const ajoutButton = document.getElementById('ajoutButton');
const cancelButton = document.getElementById('cancel');

formAjoutButton.addEventListener('click', () => {
    miniFormOverlay.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
    miniFormOverlay.style.display = 'none';
});

ajoutButton.addEventListener('click', () => {
    userContainer.inneHTML = '';
    const inputImage = document.getElementById('user-picture');
    const inputName = document.getElementById('user-name');
    const textareaDescription = document.getElementById('user-description');
    const userPicture = inputImage.value;
    const userName = inputName.value;
    const userDescription = textareaDescription.value;
    addUser(userName, userPicture, userDescription)
    miniFormOverlay.style.display = 'none';
});

showUser(userId);

