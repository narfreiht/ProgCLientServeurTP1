function addCoffee(inputName, inputDescription, inputPictureUrl){
    const commentData = {
        name: inputName,
        description: inputDescription,
        pictureUrl: inputPictureUrl
    };
    fetch('https://insta-api-api.0vxq7h.easypanel.host/coffees', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 201) {
            return response.json(); 
        } else {
            throw new Error("Erreur - Le café n'a pas pu être créé");
        }
    })
    .then(coffee => {
        const newCoffee = new coffeeClass(coffee.id, coffee.pictureUrl, coffee.name,
                                            coffee.description);
        coffeesContainer.append(newCoffee.create()); 
    })
    .catch(error => {
        console.error('La requête a échouée - ', error);
    });
}

function deleteCoffee(id){
    fetch('https://insta-api-api.0vxq7h.easypanel.host/coffees/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 200) {
            const coffeeBox = document.getElementById('coffee' + id);
            coffeeBox.remove();
            
        } else {
            console.log("Erreur - Le café n'a pas pu être supprimé");
        }
    })
    .catch(error => {
        console.error('La requête a échouée - ', error);
    });
}

function showCoffees(){
    fetch('https://insta-api-api.0vxq7h.easypanel.host/coffees')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            response.forEach(element => {
                const coffee = new coffeeClass(element.id, element.pictureUrl, element.name,
                                            element.description);
                                            
                    coffeesContainer.append(coffee.create());         
                });
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
    const inputImage = document.getElementById('coffee-picture');
    const inputTitre = document.getElementById('coffee-title');
    const textareaDescription = document.getElementById('coffee-description');
    const Picture = inputImage.value;
    const title = inputTitre.value;
    const description = textareaDescription.value;
    addCoffee(title, description, Picture);
    miniFormOverlay.style.display = 'none';
});

showCoffees();

      
        // picture.setAttribute('src', 'https://cdn.pixabay.com/photo/2018/10/06/11/22/coffee-3727673_1280.jpg');

     
        // coffeeName.innerText = "Cappuccino latté";

      
        // description.innerText = "C'est peut-être un gâteau";

     