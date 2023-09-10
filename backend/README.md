**Описание каталогов и файлов**

* **_ice_venv_** — папка виртуального окружения с установленными зависимостями;
* **_connection_to_database.py_** — подключение к БД MySQL, включая функции для выбора, заполнения, сортировки, группировки и агрегации данных;
* **_modeling.py_** — моделирование & оптимизация расписания движения отдельных судов посредством специализированной модификации генетического алгоритма;
* **_optimal_time.py_** — самописный модуль, отвечающий за оптимизационную часть;
* **_caravan.py_** — генерация датасета, содержащего потенциальные кластеры караванов, с описательными характеристиками
* **_testing.py_** — файл для отладки кода;

**Порядок установки & запуска**
1) pip3 install -r requirements.txt
2) run modeling.py
3) run caravan.py