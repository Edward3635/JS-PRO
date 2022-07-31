// Оголошення змінних та стрілкових функцій.
/// Користувацька функція для отримання елементу сторінки по id/class/tag.
const getSelector = arg => document.querySelector(arg), pizzaSize = getSelector('#pizza'),
	pizzaIngridients = getSelector('.ingridients'), table = getSelector('.table');
let sauceOrToppingSum = 0;

/*
Создать сайт по заказу пиццы используя семантическую верстку.
На сайте должна быть возможность сделать пиццу самому.
При создании пиццы пользователь выбирает ингредиенты и размер пиццы:
- маленькая
- средняя
- большая
Ингредиенты ( сыр, пепперони, перец, кукуруза, ананасы и т.д) и также 3 вида соуса. 
При создании пиццы цена увеличивается. Все ингредиенты и коржи должны быть в виде картинок и 
накладываются друг на друга при выборе. В конце принять от пользователя телефон, email, имя и проверить на правильность введения.После чего весь результат заказа отправить на почту.
Так же создайте банер получить скидку на пиццу 30% и сделайте чтобы банер от курсора пользователя убегал.
*/

// Виклик функції слухачів подій
pizzaListeners();

//Функція, що містить в собі сліхачі подій на піцу
function pizzaListeners() {
	// Слухач на зміну радіокнопки (розмір піци)
	pizzaSize.addEventListener('change', (e) => {
		if (!e.target.classList.contains('radioIn')) {
			return;
		}
		// Виклик функції на розрахунок ціни
		calcPrice();
	});
	// Функція викликається на самому початку перенесення елемента, що перетягується.
	const dragStartListener = e => {
		if (e.target.tagName !== 'IMG') return;
		if (!e.target.classList.contains('draggable')) return;
		e.target.style.border = '3px dotted green';
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('Text', e.target.id);

		addOrRemoveListeners('add');
	},
		// Функція викликається наприкінці події перетягування - як успішного, і скасованого.
		dragEndListener = (e) => {
			e.target.style.border = '';
			addOrRemoveListeners('remove');
		},
		// Функція відбувається в момент коли об'єкт, що перетягується, потрапляє в область цільового елемента.
		dragEnterListener = e => {
			e.target.style.border = '3px solid gold';
		},
		// Функція відбувається коли елемент, що перетягується, залишає область цільового елемента.
		dragLeaveListener = e => {
			e.target.style.border = '';
		},
		// Функція відбувається коли перетягується елемент перебувати над цільовим елементом.
		dragOverListener = e => {
			if (e.preventDefault) e.preventDefault();
			return false;
		},
		// Функція викликається, коли подія перетягування завершується відпусканням елемента над цільовим елементом.
		dropListener = e => {
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();

			e.target.style.border = '';
			const id = e.dataTransfer.getData('Text');
			let elem = document.getElementById(id);

			if (elem !== null) {
				elem.draggable = false;
				elem.style.border = '';
				elem.style.pointerEvents = 'none';
				const elemClone = elem.cloneNode(true);
				table.append(elemClone);
				calcPrice(calcSauceAndTopping(elem));
				elem.classList.add('added__element');
			}

			return false;
		},
		// Функція, що одразу додає або видаляє всі слухачі подій
		addOrRemoveListeners = (arg) => {
			switch (arg) {
				case 'add':
					pizzaIngridients.addEventListener('dragend', dragEndListener, false);
					table.addEventListener('dragenter', dragEnterListener, false);
					table.addEventListener('dragleave', dragLeaveListener, false);
					table.addEventListener('dragover', dragOverListener, false);
					table.addEventListener('drop', dropListener, false);
					break;
				case 'remove':
					pizzaIngridients.removeEventListener('dragend', dragEndListener, false);
					table.removeEventListener('dragenter', dragEnterListener, false);
					table.removeEventListener('dragleave', dragLeaveListener, false);
					table.removeEventListener('dragover', dragOverListener, false);
					table.removeEventListener('drop', dropListener, false);
					break;
				default:
					break;
			}
		};

	// Слухач події на початок перетягування елементу
	pizzaIngridients.addEventListener('dragstart', dragStartListener, false);


}
// Розрахунок ціни
function calcPrice(sauceOrTopping) {
	const pizzaPrice = getSelector('.price__counter');
	if (typeof sauceOrTopping === 'number') {
		sauceOrToppingSum += sauceOrTopping;
		pizzaPrice.textContent = `${parseFloat(pizzaPrice.textContent) + sauceOrTopping} грн`;
		return;

	}
	let res = calcSize() + sauceOrToppingSum;
	pizzaPrice.textContent = `${res} грн`;
}
// Функція на розрахунок ціни за розміром піци
function calcSize() {
	const [...sizeInputs] = document.querySelectorAll('#pizza input');

	const [pizzaSize] = sizeInputs.filter(el => {
		if (el.checked === true) {
			return el;
		}
	});
	switch (pizzaSize.value) {
		case 'small': return 80;
		case 'mid': return 100;
		case 'big': return 120;

		default:
			break;
	}
}
// Функція, що повертає ціну певного соусу або топінгу
function calcSauceAndTopping(arg) {
	if (arg.classList.contains('topping')) {
		showTopping(arg.alt);
		switch (arg.alt) {
			case 'Сир звичайний': return 10;
			case 'Сир Фета': return 20;
			case 'Моцарелла': return 15;
			case 'Телятина': return 20;
			case 'Помідори': return 15;
			case 'Гриби': return 20;
			default: break;
		}
	} else {
		showSauce(arg.alt);
		switch (arg.alt) {
			case 'Кетчуп': return 10;
			case 'BBQ': return 20;
			case 'Рікотта': return 15;
			default: break;
		}
	}
}
// Функція, що виводить назви доданих начинок користувачу на сайті
function showTopping(name) {
	const toppingName = getSelector('.topings');
	toppingName.insertAdjacentHTML('beforeend', `<p>${name}</p>`);
}
// Функція, що виводить назви доданих соусів користувачу на сайті
function showSauce(name) {
	const sauceName = getSelector('.sauces');
	sauceName.insertAdjacentHTML('beforeend', `<p>${name}</p>`);
}



// Банер от курсора пользователя убегает
const discount = getSelector('.btn__discount'), discContainer = getSelector('#banner'),
	right = window.innerWidth - discContainer.offsetWidth, bottom = window.innerHeight - discContainer.offsetHeight;

// Слухач події на наведення курсору по елементу
discount.addEventListener('mouseover', () => {
	const prevBottomVal = parseFloat(getComputedStyle(discContainer).bottom), prevRightVal =
		parseFloat(getComputedStyle(discContainer).right);
	discContainer.style.bottom = `${getRandomInt(bottom - 90, prevBottomVal)}px`;
	discContainer.style.right = `${getRandomInt(right, prevRightVal)}px`;
});
// Слухач події на клік по знижці
discount.addEventListener('click', () => {
	alert('Вітаю! Знижка отримана!');
	discContainer.style.display = 'none';


});

// Функція на випадкові позиції блока 
// Також виключена можливість появлення блоку поряд з попередніми координатами
function getRandomInt(maxVal, prevVal) {
	let res = Math.floor(Math.random() * maxVal);
	while ((res > prevVal && res < prevVal + 200) || (res < prevVal && res > prevVal - 200)) {
		res = Math.floor(Math.random() * maxVal);
	}
	return res;
}


// Валідація input полей
const gridInputs = getSelector('.grid');
gridInputs.addEventListener('change', (e) => {
	if (e.target.tagName !== 'INPUT') return;
	if (!e.target.classList.contains('input__data')) return;
	if (e.target.value == '') {
		e.target.style.border = '4px solid red';
		return;
	}
	if (validate(e.target)) {
		e.target.style.border = '4px solid green';
	} else {
		e.target.style.border = '4px solid red';
	}
});

gridInputs.addEventListener('click', (e) => {
	if (!e.target.classList.contains('button')) return;
	if (e.target.classList.contains('btn__reset')) {
		sauceOrToppingSum = 0;
		calcPrice();

		const [...tableChildren] = table.children;
		tableChildren.forEach((el, index) => {
			if (index === 0) return;
			el.remove();
		});

		const [...addedElements] = document.querySelectorAll('.added__element');
		addedElements.forEach(el => {
			el.classList.remove('added__element');
			el.style.pointerEvents = '';
			el.draggable = true;
		});

		const [...sauces] = getSelector('.sauces').children, [...toppings] = getSelector('.topings').children;
		sauces.forEach((el, index) => {
			if (index === 0) return;
			el.remove();
		});
		toppings.forEach((el, index) => {
			if (index === 0) return;
			el.remove();
		});
		return;
	}
	const [...inputData] = document.querySelectorAll('.input__data');
	if (e.target.classList.contains('btn__submit')) {
		const validatedData = inputData.map(el => {
			return validate(el);
		});

		if (!validatedData.includes(false)) {
			//send mail
			getSelector('form').submit();
			window.location = 'thank-you.html';
		} else {
			// error
			inputData.forEach(el => {
				if (!validate(el)) {
					el.style.animation = 'shake 300ms';
					if (el.value === '') {
						el.style.border = '4px solid red';
					}
					setTimeout(() => {
						el.style.animation = '';
					}, 300);
				}
			});

		}
		return;
	}
});


function validate(target) {
	switch (target.name) {
		case 'name': return /[А-яіїєёa-z]/i.test(target.value);
		case 'phone': return /^\+380\d{9}$/i.test(target.value);
		case 'email': return /\S+@\S+\.\S+/i.test(target.value);
		default: break;
	}
}