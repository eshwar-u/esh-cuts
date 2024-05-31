from datetime import timedelta
from datetime import datetime
import datetime
import psycopg2
from Config import config

def connect(date, time):
    connection = None
    try:
        params = config()
        print("connecting to database")
        connection = psycopg2.connect(**params)
        connection.autocommit = True

        cursor = connection.cursor()
        print('postgresql database version: ')
        cursor.execute('SELECT version()')
        db_version = cursor.fetchone()
        print(db_version)
        insert_appointments(cursor)

        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if connection is not None:
            connection.close()
            print('Database connection terminated')

def insert_appointments(cur, date, time):
    execute =  f'UPDATE public."Appointments" SET is_booked = True WHERE appointment_day = {date} and appointment_time = {time}' 
    cur.execute(execute)
