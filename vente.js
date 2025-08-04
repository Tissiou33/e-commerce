document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    
    // Nouveaux éléments pour la navigation
    const mainCategories = document.getElementById('main-categories');
    const subCategoriesContainer = document.getElementById('sub-categories-container');
    const subCategoriesTitle = document.getElementById('sub-categories-title');
    const subCategoriesList = document.getElementById('sub-categories-list');
    const backToMainButton = document.getElementById('back-to-main-button');
    
    // Nouveaux éléments pour les produits
    const productsContainer = document.getElementById('products-container');
    const productsTitle = document.getElementById('products-title');
    const productsGrid = document.getElementById('products-grid');
    const backToSubButton = document.getElementById('back-to-sub-button');

    // Définition des sous-catégories
    const subCategories = {
        'electromenager': ['Réfrigérateurs', 'Lave-linge', 'Micro-ondes'],
        'vestimentaire': ['Tee-shirts', 'Pantalons', 'Robes'],
        'meubles': ['Canapés', 'Lits', 'Tables']
    };

    // Base de données des produits factice
    const products = {
        'Réfrigérateurs': [
            { name: 'Réfrigérateur A', price: '140.000xof', stock: 'En stock', image: 'images/frig1.jpg' },
            { name: 'Réfrigérateur B', price: '89.000xof', stock: 'En stock', image:  'images/frig.jpg'},
            { name: 'Réfrigérateur C', price: '114.000xof', stock: 'Stock faible', image: 'images/OIP.webp' },
            { name: 'Réfrigérateur E', price: '175.000xof', stock: 'En stock', image:  'images/frig.jpg'},
            { name: 'Réfrigérateur F', price: '104.000xof', stock: 'Stock faible', image: 'images/OIP (1).webp' }
        ],
        'Tee-shirts': [
            { name: 'Tee-shirt Coton', price: '19.99€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=T-shirt_Coton' },
            { name: 'Tee-shirt Sport', price: '29.99€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=T-shirt_Sport' }
        ],
        'Canapés': [
            { name: 'Canapé d\'angle', price: '899€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Canape_Angle' },
            { name: 'Canapé 3 places', price: '650€', stock: 'Stock faible', image: 'https://via.placeholder.com/250x200.png?text=Canape_3_Places' }
        ],
        'Pantalons': [
            { name: 'Jean classique', price: '45€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Jean_Classique' },
            { name: 'Pantalon de jogging', price: '30€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Pantalon_Jogging' }
        ],
        'Robes': [
            { name: 'Robe de soirée', price: '80€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Robe_Soiree' }
        ],
        'Lits': [
            { name: 'Lit double', price: '300€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Lit_Double' }
        ],
        'Tables': [
            { name: 'Table basse', price: '150€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Table_Basse' }
        ],
        'Lave-linge': [
            { name: 'Lave-linge 8kg', price: '400€', stock: 'En stock', image: 'https://via.placeholder.com/250x200.png?text=Lave-linge_8kg' }
        ]
    };

    // Afficher/cacher le chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    // Fonction pour ajouter un message au chatbot
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message');
        messageDiv.classList.add(`chatbot-${sender}-message`);
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Fonction pour trouver un produit par son nom
    function getProductDetails(productName) {
        for (const category in products) {
            const foundProduct = products[category].find(p => p.name.toLowerCase() === productName.toLowerCase());
            if (foundProduct) {
                return foundProduct;
            }
        }
        return null;
    }

    // Fonction de redirection du chatbot
    function redirect(targetSubCategory) {
        let categoryId;
        for (const cat in subCategories) {
            if (subCategories[cat].includes(targetSubCategory)) {
                categoryId = cat;
                break;
            }
        }

        if (categoryId) {
            displaySubCategories(categoryId, categoryId.charAt(0).toUpperCase() + categoryId.slice(1));
            
            setTimeout(() => {
                const subCategoryElement = document.querySelector(`#sub-categories-list li[data-sub-category="${targetSubCategory}"]`);
                if (subCategoryElement) {
                    subCategoryElement.click();
                }
            }, 100);
            return `Très bien, je vous redirige vers la page des ${targetSubCategory.toLowerCase()}.`;
        }
        return "Désolé, je n'ai pas trouvé cette catégorie. Je peux vous rediriger vers l'électroménager, le vestimentaire ou les meubles.";
    }

    // Réponse du chatbot
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('bonjour') || lowerCaseMessage.includes('salut')) {
            return "Bonjour ! Bienvenue chez Vente-Run. Je suis votre assistant virtuel. Comment puis-je vous aider ?";
        } else if (lowerCaseMessage.includes('electromenager')) {
            return "Nous avons une large gamme d'électroménager : réfrigérateurs, lave-linge, micro-ondes, etc. Que recherchez-vous ?";
        } else if (lowerCaseMessage.includes('vestimentaire') || lowerCaseMessage.includes('vêtements')) {
            return "Découvrez notre collection de vêtements pour hommes, femmes et enfants. N'hésitez pas à me demander si vous cherchez quelque chose de particulier.";
        } else if (lowerCaseMessage.includes('meubles')) {
            return "Vous cherchez à meubler votre maison ? Explorez nos canapés, lits, tables, et chaises.";
        } else if (lowerCaseMessage.includes('livraison')) {
            return "Nos délais de livraison varient en fonction du produit et de votre localisation. Un délai estimé est indiqué sur la page de chaque produit.";
        } else if (lowerCaseMessage.includes('merci') || lowerCaseMessage.includes('au revoir')) {
            return "De rien ! N'hésitez pas si vous avez d'autres questions. Bonne journée !";
        }
        
        // Gérer les questions spécifiques sur les produits
        const productKeywords = Object.values(products).flat().map(p => p.name.toLowerCase());
        for (const keyword of productKeywords) {
            if (lowerCaseMessage.includes(keyword)) {
                const product = getProductDetails(keyword);
                if (product) {
                    if (lowerCaseMessage.includes('prix')) {
                        return `Le prix du ${product.name} est de ${product.price}.`;
                    } else if (lowerCaseMessage.includes('stock') || lowerCaseMessage.includes('disponible')) {
                        return `Le ${product.name} est actuellement ${product.stock.toLowerCase()}.`;
                    }
                    return `Le ${product.name} coûte ${product.price} et est ${product.stock.toLowerCase()}.`;
                }
            }
        }
        
        // Redirections spécifiques
        if (lowerCaseMessage.includes('réfrigérateurs') || lowerCaseMessage.includes('réfrigérateur')) {
            return redirect('Réfrigérateurs');
        } else if (lowerCaseMessage.includes('tee-shirts') || lowerCaseMessage.includes('t-shirts') || lowerCaseMessage.includes('tee-shirt')) {
            return redirect('Tee-shirts');
        } else if (lowerCaseMessage.includes('canapés') || lowerCaseMessage.includes('canapé')) {
            return redirect('Canapés');
        } else if (lowerCaseMessage.includes('pantalons') || lowerCaseMessage.includes('pantalon')) {
            return redirect('Pantalons');
        }
        
        // Réponse par défaut
        return "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ? Pour l'instant, je peux vous parler de nos catégories de produits, des délais de livraison, ou vous donner des informations sur des articles spécifiques.";
    }

    // Gérer l'envoi de messages
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userMessage = chatbotInput.value;
            if (userMessage.trim() !== '') {
                addMessage(userMessage, 'user');
                chatbotInput.value = '';

                setTimeout(() => {
                    const botResponse = getBotResponse(userMessage);
                    addMessage(botResponse, 'bot');
                }, 500);
            }
        }
    });

    // Message de bienvenue initial
    setTimeout(() => {
        addMessage("Bonjour ! Je suis l'assistant de Vente-Run. Comment puis-je vous aider aujourd'hui ?", 'bot');
    }, 1000);


    // Gestion du clic sur les catégories
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', () => {
            const categoryId = category.id.replace('category-', '');
            const categoryName = category.querySelector('h2').textContent;
            displaySubCategories(categoryId, categoryName);
        });
    });

    // Fonction pour afficher les sous-catégories
    function displaySubCategories(categoryId, categoryName) {
        mainCategories.classList.add('hidden');
        productsContainer.classList.add('hidden');
        subCategoriesContainer.classList.remove('hidden');

        subCategoriesTitle.textContent = categoryName;
        subCategoriesList.innerHTML = '';

        if (subCategories[categoryId]) {
            subCategories[categoryId].forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listItem.setAttribute('data-sub-category', item);
                listItem.addEventListener('click', () => {
                    displayProducts(item);
                });
                subCategoriesList.appendChild(listItem);
            });
        }
    }

    // Fonction pour afficher les produits
    function displayProducts(subCategoryName) {
        subCategoriesContainer.classList.add('hidden');
        productsContainer.classList.remove('hidden');

        productsTitle.textContent = subCategoryName;
        productsGrid.innerHTML = '';

        if (products[subCategoryName]) {
            products[subCategoryName].forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <p class="stock">${product.stock}</p>
                `;
                productsGrid.appendChild(productCard);
            });
        } else {
            productsGrid.innerHTML = '<p>Aucun article disponible pour le moment.</p>';
        }
    }

    // Gestion des boutons de retour
    backToMainButton.addEventListener('click', () => {
        subCategoriesContainer.classList.add('hidden');
        mainCategories.classList.remove('hidden');
    });

    backToSubButton.addEventListener('click', () => {
        productsContainer.classList.add('hidden');
        subCategoriesContainer.classList.remove('hidden');
    });
});