# 1 получаем запись из request и обрабатываем строки в цикле
# 2 по строке request  определяем возможные маршруты из таблицы routes
# 3 итерируемся по часам с даты начала по дату окончания
# 4 для каждого времени отправления строим функцию времени прохождения всего маршрута
# 5 алгоритм функции времени (двигаемся по табличке routes по steps и вычисляем время прохождения первого шага
#   прибавляем к начальному времени время шага и получаем время и дату начала второго шага
#   и так далее доконца маршрута(получаем общее время пути))


import numpy as np

from connection_to_database import SqlClass

from optimal_time import get_optimal_time

from pprint import pprint


sql = SqlClass()


# Получаем таблицу requests
reqests = sql.select_table_from_reqests()

# Проходимся по таблице requests
n_rows_schedule, n_cols_schedule = reqests.shape
for row_index_schedule in range(n_rows_schedule):
    row_reqests = reqests.loc[row_index_schedule]

    point_begin = row_reqests['point_begin']
    point_end = row_reqests['point_end']

    # Получаем возможные маршруты
    route_id_list_for_current_schedule = sql.select_distinct_route_id_from_routes(point_begin=point_begin,
                                                                                  point_end=point_end)

    for route_id in route_id_list_for_current_schedule:
        delta = get_optimal_time(row_reqests=row_reqests, route_id=route_id)
        print(delta)
