from connection_to_database import SqlClass

from pprint import pprint

sql = SqlClass()

df = sql.get_groupby_data_time_steps()

df = df.groupby(['point_a', 'point_b', 'date']).first('date_begin_route').reset_index()

df.to_sql(name='users', con=sql.engine, if_exists='replace', index_label='id')

pprint(df)
