class postClass{
    constructor(id, userId, userName, pictureUrl, description, likes, comments) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.pictureUrl = pictureUrl;
        this.description = description;
        this.likes = likes;
        this.comments = comments;
    }
  
    create() {
        const post = document.createElement('div');
        post.classList.add('post');
        const postImage = document.createElement('div');
    
        const postContenus = document.createElement('div');
        postContenus.classList.add('post-contenu'); 

        const linkUser = document.createElement('a');
        linkUser.classList.add('user-name');
        linkUser.href = 'user.html?userId=' + this.userId;
        linkUser.style.textDecoration = 'none';
        const userName = document.createElement('h2');
        userName.id = 'user' + this.userId;
        userName.innerText =  this.userName;
        linkUser.append(userName);
        userName.style.backgroundColor = 'rgb(61, 60, 60)';
        userName.style.color ='White';
        userName.style.padding = '15px';
        userName.style.borderRadius = '0px 20px 20px 0px';
     
        userName.style.transition = 'background-color 0.3s ease';
        userName.addEventListener('mouseover', () => {
        userName.style.backgroundColor = 'rgb(210, 105, 30)';
        });
        
        userName.addEventListener('mouseout', () => {
        userName.style.backgroundColor = 'rgb(61, 60, 60)';
        });
        
        const picture = document.createElement('img');
        picture.classList.add('post-image');
        picture.setAttribute('src', this.pictureUrl);

        const description = document.createElement('p');
        description.classList.add('post-description');
        description.innerText = this.description;

        const likes = document.createElement('div');
        likes.style.margin = '0 25px 25px 25px';
        likes.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style="padding-right: 5px;">' 
                + '<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - ' 
                + 'https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->' 
                + '<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 ' 
                + '300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 ' 
                + '268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>'
        const icon = likes.querySelector('svg path');
        const nbLikes = document.createElement('span');
        
        nbLikes.id = 'likes' + this.id;
        nbLikes.innerText = this.likes;
        likes.append(nbLikes);
        likes.addEventListener('mouseover', () => {
            icon.style.fill = 'red';
            });
        likes.addEventListener('mouseout', () => {
            icon.style.fill = '';
            });
        likes.addEventListener("click", () => {
            addLike(this.id);
            });

        likes.style.display = 'flex';
        likes.style.flexDirection = 'row';
        likes.style.padding = '10px';
        likes.style.justifyContent ="center";
        likes.style.border = '1px solid black';  

        const commentBox = document.createElement('div');
        commentBox.id = 'comment' + this.id;
        commentBox.classList.add('comment-box');
        const addButton = document.createElement('button');
        addButton.id = this.id;
        addButton.addEventListener("click", () => {
            showCommentBox(this.id);
        });
        this.comments.forEach(c => {
            const comment = document.createElement('p');
            comment.innerText = c.content;
            commentBox.append(comment);
        });
        addButton.innerText = "Ajouter un comment";
        addButton.style.padding = '15px';
        addButton.style.backgroundColor = 'rgb(210, 105, 30)';
        addButton.style.color = 'white';
        addButton.style.marginTop = '25px';
        addButton.style.border = 'none';
        addButton.style.borderRadius = '20px';

        addButton.style.transition = 'background-color 0.3s ease';
        addButton.addEventListener('mouseover', () => {
            addButton.style.backgroundColor = 'rgb(61, 60, 60)';
        });

        addButton.addEventListener('mouseout', () => {
            addButton.style.backgroundColor = 'rgb(210, 105, 30)';
            });

        postImage.append(picture, likes);

        postContenus.append( linkUser, description, commentBox, addButton);

        post.append(postImage, postContenus);
        return post;

    }
}