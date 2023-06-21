class coffeeClass{
    constructor(id, pictureUrl, name, description) {
        this.id = id;
        this.pictureUrl = pictureUrl;
        this.name = name;
        this.description = description;
    }

    create() {
        const coffee = document.createElement('div');
        coffee.id = 'coffee' + this.id;
        coffee.style.backgroundColor = 'hsl(0, 0%, 96%)';
        coffee.style.padding = '25px';
        coffee.style.display = 'flex';
        coffee.style.flexDirection = 'column';
        coffee.style.alignItems = 'center';
        coffee.style.borderRadius = '25px';

        const picture = document.createElement('img');
        picture.id = 'img' + this.id;
        picture.style.width = '300px';
        picture.style.height = '300px';
        picture.setAttribute('src', this.pictureUrl);
     
        const coffeeName = document.createElement('h3');
        coffeeName.innerText = this.name;

        const description = document.createElement('p');
        description.innerText = this.description;

        const deleteButton = document.createElement('button');
        //deleteButton.id = this.id;
        deleteButton.addEventListener("click", () => {
            deleteCoffee(this.id);
        });
        
        deleteButton.innerText = "Supprimer";

        deleteButton.style.backgroundColor = 'rgb(61, 60, 60)';
        deleteButton.style.padding = '15px';
        deleteButton.style.border = '0px';
        deleteButton.style.color = 'white';
        deleteButton.style.borderRadius = '20px';

       deleteButton.style.transition = 'background-color 0.3s ease';
       deleteButton.addEventListener('mouseover', () => {
        deleteButton.style.backgroundColor = 'rgb(210, 105, 30)';
        });

        deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.backgroundColor = 'rgb(61, 60, 60)';
            });


        coffee.append(picture, coffeeName, description, deleteButton);
        return coffee;
    }
}