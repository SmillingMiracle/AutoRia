Вітаю та дякую, що перевіряєте дану роботу та читаєте це </br>
Для початку роботи вам потрібно:</br>

1. npm install - інсталяція всіх бібліотек </br>
2. start:docker:db  - в packege.json підйом бази даних, редісу, самої аплікації </br>
3. start:local - в packege.json  використає locacl.env для запуску та роботи апки </br>

База даних Postgress щоб легко додатись до вже існуючої

Nest з системою модулів які легко можна забрати і додати щоб проект був адаптивний

Логіка ролей була задумана  створенням та використанням окремого role.guard в auth/guards</br>
![image](https://github.com/user-attachments/assets/9bb9c4ed-e2ec-41f9-bb59-a638da960187)
---------
Hа прикладі UserModule metod user/id/editRole для видання ролі </br>
На прикладі UserModule metod user/id/ban для видання бану</br>
На прикладі UserModule metod user/id/getPremium для видання преміуму тому хто купив</br>
Та сама логіка з типами аналогічно гвард type.guard в auth/guards</br>

![image](https://github.com/user-attachments/assets/b292d39c-fd8c-4937-bfb3-05e1941daa24)</br>
на прикладі CarModule metod car/id/stats - для отримання статистики </br>


<<!!! Технічний експерт запропонував зробити це через систему пермішинів>> </br>
-------------------
Через це зроблена для того щоб можна було повісити на будь який метод будь-яке обмеження використовуючи UseGuards</br>
Я добавив тільки в делька методів їх можна навішати багато куди за потреби замовника</br>


<<Також кастомер почув, що АWS це дуже стильно, модно і класно. Тому хотів би, що б нова платформа була зєднана з AWS.>></br>
-------------------
Логіка додання AWS - додана як загрузка фотографій в оголошення подібно як показувалось на занняттях є file-storage module зі всіма функціями </br>




<<Кожне оголошення проходить перевірку на нецензурну лексику автоматично.
Якщо платформа не знайшла підозрілої лексики, то воно переходить в статус активного і попадає в на платформу. Якщо платформа знаходить не відповідні слова, то система пропонує редагувати оголошення. Продавець може редагувати оголошення лише 3 рази. Якщо за 3 рази оголошення не проходить, то воно попадає в статус не активного. При цьому буде надіслано лист для менеджера для перевірки.>></br>
-------------------
Перевірка на нецензурну лексику була виконана методом containsInappropriateLanguage який приймає dto в carRepository. Викликається при створення оголошення </br>
дає статус isActive і editAttemps з кількістю редагувань також далі виконується  пункт в updateCar та createCar з редагуванням 3 рази а також повідомленням менеджера через модуль message</br>



<<4. Інформація про оголошення
	Платформа не надає інформації по оголошенню для продавця з аккаунтом “Базовий”. Якщо у продавця акаунт типу “Преміум”, то платформа надає йому наступні дані:
	* кількість переглядів оголошення
	* кількість переглядів за день, тиждень, місяць
	* Середню ціну на авто по регіону продажу авто.
Наприклад якщо авто продається у Києві, то буде середня ціна авто по Києву.
Якщо у Львівській області, то середня ціна буде по Львівській області
	* середня ціна авто по цілій Україні>></br>
-------------------
Логіка переглядів зроблена в модулі views і реалізовувалася при кліку на getCar </br>
Ця інформація доступна тільки для ПРЕМІУМ викноється в функції  getStats(carId: string) в КарСервісі на основі таблиці view та інформації в таблиці кар</br>
Одразу скажу можна було зробити лакаонічніше і розділити на КарРепозіторі це все однак пишу в бібліотеці,дуже тяжко х умовами в подальшому буду писати методи краще обіцяю. </br>


<<Клієнт може створити цінник в таких валютах USD, EUR, UAH. Ціна вказується лише в одній з валют. Решта валют вираховується по курсу приватбанку. Ціни оновлюються раз в день. Обов'язково вказувати по якому курсу ми робили підрахунок, та яку ціну вказував юзер при викладенні оголошення. >></br>
-------------------
Реалізовано - дуже гарний метод і модуль - добре вийшло створюється при створенні оголошення та розпаршується з таблиці в базі даних при РЕСПОНСІ</br>

Задумка валют реаліхована в модлі EXCHANGE  в діставанні з апі приватБанку відповідних полів і колонки Currency а також price з  car.dto </br>
https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5 </br>
а також добавлянням в відповідь РеспонсКар таблиця EXCHANGE приблизно як на фото </br>

![image](https://github.com/user-attachments/assets/0ba4681a-61ed-42d4-ad33-80113b1473e6)</br>


Реалізовано пошук в запиті ГетКарс</br>
![image](https://github.com/user-attachments/assets/fb210e2e-1b81-4846-b355-439a16333c56)</br>



Реалізовано ban користувачів До якого має доступ тільки Юзер з Роллю Адміністратор та для цього створенна окрема таблиця  </br>
-------------------
![image](https://github.com/user-attachments/assets/a6969ce9-9796-4eb2-afb3-9450b8a10e8c)</br>



<<!!! Клієнт заікнувся про автосалони. В майбутньому на платформу планується вихід не лише одиночних продавцій, а також автосалонів зі своїм менеджерами, адмінами, сейлами, механіками. Необхідно це врахувати при побудові архітектури.>></br>
-------------------
Додані Автосалони </br>
![image](https://github.com/user-attachments/assets/e47b4f28-b1c0-451b-9086-1b4d4a8b2d18)

Поки що з такими полями 
![image](https://github.com/user-attachments/assets/97a5af10-136f-49d9-8bd9-38b677416f02)

запис з бази даних. Також усе додається і пов'язано з іншими таблицями для того щоб легко витягнути 


Зареєстрований продавець може виставити своє на продаж. Якщо у  продавця аккаунт типу “Базовий”, то він може викласти лише одне авто на продаж. Якщо тип преміум, то кількість авто не обмеження.

Реалізовано
![image](https://github.com/user-attachments/assets/6416c971-36a6-4980-bfb7-da214a414dc3)


Практично усе  з контрольної реалізовано якщо я не вказав тут одразу вибачаюсь однак в роботі з завдань це реалізовано звісно можна було б лаконічніше і гарніше, однак 
згорів компютер і я все пишу з бібліотеки вже як місяць це не виправдання звісно в подальшому я буду старатись краще
-------------------




