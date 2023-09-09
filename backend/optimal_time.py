from connection_to_database import SqlClass

from datetime import datetime
from datetime import timedelta

sql = SqlClass()


def get_step_time(row_step, row_reqest, day=1):
    ball = sql.get_ball_from_day_ball(day=day, rib=row_step['rib'])
    # print(day, row_step['rib'], ball, row_reqest['max_s'])

    distance = float(row_step['distance'])

    speed = row_reqest['speed']
    speed = speed * 1.15078  # перевод из узлов/ч в мили/ч
    speed = speed * (1 - ball * 0.07)
    time = distance / speed

    # Если количество баллов сплочения льда > максимально разрешенного
    # для самостоятельного плавания, то dangerous = priority = 1
    if ball > row_reqest['max_s']:
        dangerous = 1
        priority = 1
    else:
        if speed < 9:
            # Если скорость самостоятельного движения меньше 9 узлов, то рекомендуется проводка ледокола
            priority = speed / 9
        else:
            priority = 0
        dangerous = 0

    time = time * 3600  # перевод из часов в секунды
    time = timedelta(seconds=time)  # перевод в формат timedelta
    return time, speed, dangerous, priority


def get_route_time(row_reqests, route_id, begin_date):
    data = sql.select_data_from_routes(route_id)
    n_rows, n_cols = data.shape

    route_dangerous = 0

    current_date = begin_date
    for row_index in range(n_rows):
        row = data.loc[row_index]
        day = current_date.day
        step_time, speed, dangerous, priority = get_step_time(row_step=row,
                                                              row_reqest=row_reqests,
                                                              # row_reqests['speed'],
                                                              day=day)

        sql.insert_time_steps(point_a=row_reqests['point_begin'],
                              point_b=row_reqests['point_end'],
                              reqest_id=row_reqests['id'],
                              route_id=route_id,
                              step_id=row['step'],
                              date_begin=current_date,
                              date_end=current_date + step_time,
                              time=round(step_time.total_seconds() / 3600, 2),
                              dangerous=dangerous,
                              priority=round(priority, 2),
                              speed=round(speed, 2),
                              point_id=row['point_id'],
                              optimal=0,
                              date_begin_route=begin_date,
                              late=0
                              )
        current_date += step_time

        if dangerous == 1:
            route_dangerous = 1

    delta = current_date - begin_date

    return delta, route_dangerous


def get_optimal_time(row_reqests, route_id):
    begin_date = datetime.fromisoformat(row_reqests['date_begin'])
    end_date = datetime.fromisoformat(row_reqests['date_end']) - timedelta(seconds=3600 * 60)

    def hour_rounder(t):
        return (t.replace(second=0, microsecond=0, minute=0, hour=t.hour) + timedelta(hours=t.minute // 30))

    begin_date = hour_rounder(begin_date)

    current_date = begin_date

    while current_date < end_date:
        time, dangerous = get_route_time(row_reqests, route_id, begin_date=current_date)
        date_end = current_date + time

        late = bool(date_end > end_date)  # проверяем факт опоздания по данному маршруту

        sql.insert_time_routes(point_a=row_reqests['point_begin'],
                               point_b=row_reqests['point_end'],
                               reqest_id=row_reqests['id'],
                               date_begin=current_date,
                               date_end=date_end,
                               time=round(time.total_seconds() / 3600, 2),
                               dangerous=dangerous
                               )

        if late == 1:
            sql.update_time_steps(reqest_id=row_reqests['id'],
                                  date_begin_route=current_date,
                                  route_id=route_id)

        current_date += timedelta(seconds=3600)

    return None