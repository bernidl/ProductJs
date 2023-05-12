class Product {
    constructor(name,price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
};

class UI {
    addProduct(product){
       const prodcutList = document.getElementById('product-list');
       const element = document.createElement('div');
       element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <button type="button" name="delete" class="btn btn-danger">Delete</button>
                </div>
            </div>
       `;
       prodcutList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully', 'info');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //  Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }
};

// DOM Events

document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        // Create new Product whit class Product()
        const product =  new Product(name,price,year);

        // Create new UI, then call the addProduct method and assing the product to it
        const ui = new UI();
        if( name === '' || price === '' || year === ''){
            return ui.showMessage('Complete Fields Please', 'danger');
        }
        ui.addProduct(product);
        // reset form method
        ui.resetForm();
        ui.showMessage('Product Added Sucessfully', 'success');

        // Cancel page refresh whit prevenDeault()
        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
    })