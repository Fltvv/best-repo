import sqlalchemy
import pymysql

import pandas as pd

import warnings

from pprint import pprint

warnings.simplefilter('ignore')


class SqlClass:
    # за ссылкой на базу данных обращайтесь в телеграм (@mgarbuzenko)
    db = 'mysql+pymysql://iceroute:password@185.179.189.57:3306/iceroute'

    def __init__(self):
        self.engine = sqlalchemy.create_engine(self.db)
        self.connection = self.engine.connect()

    def get_table_column_names(self, table_name):
        # print('QUERY')

        query = f'''
        SHOW fields from {table_name}
        '''

        column_names = self.connection.execute(query).fetchall()
        column_names = [column_name[0] for column_name in column_names]
        return column_names

    def select_table_from_reqests(self):
        # print('QUERY')
        query = '''
        SELECT *

        FROM reqests
        ORDER BY id DESC        
        '''
        column_names = self.get_table_column_names('reqests')
        data = self.connection.execute(query).fetchall()
        data = pd.DataFrame(data, columns=column_names)
        return data

    def select_distinct_route_id_from_routes(self, point_begin, point_end):
        # print('QUERY')

        query = f'''
        SELECT DISTINCT route_id

        FROM routes

        WHERE 
        (routes.point_a = '{point_begin}')
        and (routes.point_b = '{point_end}')
        '''

        # column_names = [self.get_table_column_names('routes')]
        data = self.connection.execute(query).fetchall()
        data = [el[0] for el in data]
        # data = pd.DataFrame(data, columns=column_names)
        return data

    def select_data_from_routes(self, route_id):
        # print('QUERY')

        query = f'''
        SELECT *
        
        FROM routes
        
        WHERE
        (route_id = {route_id})
        AND (distance IS NOT NULL)
        
        ORDER BY step
        '''

        column_names = self.get_table_column_names('routes')
        data = self.connection.execute(query).fetchall()
        data = pd.DataFrame(data, columns=column_names)
        return data

    def get_ball_from_day_ball(self, day, rib):
        # print('QUERY')
        if day == 31:
            day = 30
        query = f'''
        SELECT ball
        
        FROM day_ball
        WHERE 
        day = {day}
        AND rib = {rib}
        '''

        ball = self.connection.execute(query).fetchall()[0][0]
        return ball

    def insert_time_routes(self, point_a, point_b, reqest_id, date_begin, date_end, time, dangerous):
        # print('QUERY')
        query = f'''
        INSERT INTO time_routes
        (reqest_id, date_begin, point_a, point_b, date_end, time, dangerous)
        VALUES (
            {reqest_id}
            , '{date_begin}'
            , '{point_a}'
            , '{point_b}'
            , '{date_end}'
            , '{time}'
            , '{dangerous}'
        ) ON DUPLICATE KEY UPDATE reqest_id=reqest_id, date_begin=date_begin
        '''

        # print(query)

        # 'INSERT INTO person (name, balance) VALUES (:name, :balance)', name = 'Joe', balance = 100

        self.connection.execute(query)

        return None

    def insert_time_steps(self, point_a, point_b, reqest_id, route_id, step_id, date_begin,
                          date_end, time, dangerous, priority, speed, point_id, optimal,
                          date_begin_route, late):
        # print('QUERY')
        query = f'''
        INSERT INTO time_steps
        (reqest_id, date_begin_route, route_id, step_id, date_begin, point_a, point_b, date_end, time, dangerous, priority, speed, point_id, optimal, late)
        VALUES (
            {reqest_id}
            , '{date_begin_route}'
            , {route_id}
            , {step_id}
            , '{date_begin}'
            , '{point_a}'
            , '{point_b}'
            , '{date_end}'
            , '{time}'
            , '{dangerous}'
            , '{priority}'
            , '{speed}'
            , '{point_id}'
            , '{optimal}'
            , '{late}'
        ) ON DUPLICATE KEY UPDATE reqest_id=reqest_id, date_begin_route=date_begin_route,route_id=route_id, step_id=step_id
        '''

        # print(query)

        # 'INSERT INTO person (name, balance) VALUES (:name, :balance)', name = 'Joe', balance = 100

        self.connection.execute(query)

        return None

    def update_time_steps(self, reqest_id, date_begin_route, route_id):
        # print('QUERY')

        query = f'''
        UPDATE time_steps
        
        SET late = 1
        
        WHERE
        reqest_id={reqest_id}
        AND date_begin_route='{date_begin_route}'
        AND route_id={route_id}
        '''

        self.connection.execute(query)

        return None

    def get_groupby_data_time_steps(self):
        # print('QUERY')

        query = f'''
        WITH tab as
        (SELECT DISTINCT  point_a, point_b, date_begin_route, COUNT(reqest_id) as c, sum(late) as late FROM time_steps WHERE step_id=1 
        GROUP by  point_a, point_b, date_begin_route
        ORDER by c DESC, date_begin_route asc )
        
        SELECT tab.point_a,tab.point_b,tab.date_begin_route,DATE(tab.date_begin_route) as date, tab.c as count,sum(s.time) as sum_time, tab.late as late, sum(priority) as priority  FROM tab 
        JOIN time_steps AS s ON s.point_a = tab.point_a 
                        AND s.point_b = tab.point_b 
                            AND s.date_begin_route = tab.date_begin_route
                            
                            GROUP by tab.point_a,tab.point_b,tab.date_begin_route
        ORDER by count DESC,  sum_time  ASC, date_begin_route asc
        '''

        # column_names = self.get_table_column_names('time_steps')
        column_names = ['point_a', 'point_b', 'date_begin_route', 'date', 'count', 'sum_time', 'late', 'priority']
        data = self.connection.execute(query).fetchall()
        data = pd.DataFrame(data, columns=column_names)

        return data

    def update_caravan(self):
        # print('QUERY')

        query = f'''
        '''

        self.connection.execute(query)

        return None

