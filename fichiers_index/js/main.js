function addLike(id){
    fetch('https://insta-api-api.0vxq7h.easypanel.host/likes', {
        method: 'POST',
        body: JSON.stringify({postId: id}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 201) {
            const likes = document.getElementById('likes' + id);
            let nbLikes = parseInt(likes.innerText);
            nbLikes++;
            likes.innerText = nbLikes;
        } else {
            console.log("Erreur - Le like n'a pas pu être ajouter");
        }
    })
    .catch(error => {
        console.error('La requête a échouée - ', error);
    });
}

function submitComment(id, comment){ 
    const commentData = {
        postId: id,
        content: comment
    };
    fetch('https://insta-api-api.0vxq7h.easypanel.host/comments', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 201) {
            const commentBox = document.getElementById('comment' + id);
            const newComment = document.createElement('p');
            newComment.innerText = comment;
            commentBox.append(newComment);
        } else {
            console.log("Erreur - Le commentaire n'a pas pu être créé");
        }
    })
    .catch(error => {
        console.error('La requête a échouée - ', error);
    });
}

function showCommentBox(id){
    const frame = document.createElement('form');
    const textArea = document.createElement('textarea');
    const addButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    textArea.placeholder = 'Commentaire';

    textArea.style.border = '0px';
    textArea.style.padding = '20px';
    textArea.style.borderRadius = '15px';

    frame.style.position = 'fixed';
    frame.style.top = '50%';
    frame.style.left = '50%';
    frame.style.transform = 'translate(-50%, -50%)';
    frame.style.padding = '25px';
    frame.style.backgroundColor = 'hsl(0, 0%, 96%)';
    frame.style.display = 'flex';
    frame.style.flexDirection = 'column';
    frame.style.borderRadius = '25px';
    frame.style.border = '0px';

    textArea.style.width = '300px';
    textArea.style.height = '200px';
    addButton.innerText = "Ajouter";

    addButton.style.color = 'white';
    addButton.style.backgroundColor = 'rgb(210, 105, 30)'
    addButton.style.border = '0px';
    addButton.style.padding = '10px';
    addButton.style.marginBottom = '2px';
    addButton.style.borderRadius = '10px';

    addButton.style.transition = 'background-color 0.3s ease';
    addButton.addEventListener('mouseover', () => {
        addButton.style.backgroundColor = 'rgb(61, 60, 60)';
    });

    addButton.addEventListener('mouseout', () => {
        addButton.style.backgroundColor = 'rgb(210, 105, 30)';
        });
    
    cancelButton.innerText = "Annuler";
    cancelButton.style.color = 'white';
    cancelButton.style.backgroundColor = 'rgb(61, 60, 60)'
    cancelButton.style.border = '0px';
    cancelButton.style.padding = '10px';
    cancelButton.style.borderRadius = '10px';

    cancelButton.style.transition = 'background-color 0.3s ease';
    cancelButton.addEventListener('mouseover', () => {
        cancelButton.style.backgroundColor = 'red';
    });

    cancelButton.addEventListener('mouseout', () => {
        cancelButton.style.backgroundColor = 'rgb(61, 60, 60)';
        });

    document.body.append(frame);
    frame.append(textArea, addButton, cancelButton);
    frame.addEventListener("submit", function(event) {
        event.preventDefault();
        submitComment(id, textArea.value);
        frame.remove(); 
    });
    cancelButton.addEventListener("click", function(e) {
        e.preventDefault(); 
        frame.remove();
    });
}

function showPosts(userId = -1, search = "", offset = 0){
    let params = ['limit=' + nbPostLimit];
    if (userId !== -1) {
        params.push('userId=' + userId);
    }
    if (search !== "") {
        params.push('search=' + search);
    }
    if (offset !== 0) {
        params.push('offset=' + offset);
    }
   
    fetch('https://insta-api-api.0vxq7h.easypanel.host/posts/?' + params.join('&'))
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                fetch('https://insta-api-api.0vxq7h.easypanel.host/users/' + element.userId)
                    .then(responseUser => responseUser.json())
                    .then(responseUser => {
                        const post = new postClass(element.id, element.userId, responseUser.username, element.pictureUrl, 
                                                    element.description, element.likes.length, element.comments);
                        postsContainer.append(post.create());
                    });
                });
                offset += nbPostLimit;
                if((offset < nbPostMax - nbPostLimit ||  offset < response.length - nbPostLimit)){  
                    timeout = setTimeout(() => {
                        showPosts(undefined, search, offset);
                    }, timeInSec * 1000);
                }
        });  
}

function getUsers(){
    fetch('https://insta-api-api.0vxq7h.easypanel.host/users')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const select = document.getElementById('post-name');
            response.forEach(u => {
                const option = document.createElement('option');
                option.value = u.id; 
                option.textContent = u.username; 
                select.append(option); 
            });  
        });
} 

function addPost(userId, inputDescription, inputPictureUrl){
    const commentData = {
        userId: userId,
        pictureUrl: inputPictureUrl,
        description: inputDescription
        
    };
    fetch('https://insta-api-api.0vxq7h.easypanel.host/posts', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 201) {
            return response.json(); 
        } else {
            throw new Error("Erreur - Le post n'a pas pu être créé");
        }
    })
    .then(element => {
        fetch('https://insta-api-api.0vxq7h.easypanel.host/users/' + element.userId)
            .then(responseUser => responseUser.json())
            .then(responseUser => {
                const post = new postClass(element.id, element.userId, responseUser.username, element.pictureUrl, 
                                            element.description, 0, []);
                postsContainer.append(post.create());
            });
            
    })
    .catch(error => {
        console.error('La requête a échouée - ', error);
    });
}

const formAjoutButton = document.getElementById('formAjoutButton');
const miniFormOverlay = document.getElementById('miniFormOverlay');
const ajoutButton = document.getElementById('ajoutButton');
const cancelButton = document.getElementById('cancel');
const zoneRecherche = document.getElementById("zoneRecherche");

zoneRecherche.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (typeof timeout !== 'undefined') {
        clearTimeout(timeout);
      }
    const search = zoneRecherche.value;
    postsContainer.innerHTML = '';
    showPosts(-1, search);
  }
});

formAjoutButton.addEventListener('click', () => {
    getUsers();
    miniFormOverlay.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
    miniFormOverlay.style.display = 'none';
});


ajoutButton.addEventListener('click', () => {
    const inputImage = document.getElementById('post-picture');
    const inputName = document.getElementById('post-name');
    const textareaDescription = document.getElementById('post-description');
    const picture = inputImage.value;
    const userId = inputName.value;
    const description = textareaDescription.value;
    addPost(userId, description, picture);
    miniFormOverlay.style.display = 'none';
});

showPosts();