from datetime import timedelta
from datetime import datetime
import datetime
import psycopg2
from Config import config

#connection = psycopg2.connect(host = "localhost", port = "5432", 
#                              database = "master", user = "postgres", 
#                              password = "Mahidhar88~")

def connect():
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

def insert_appointments(cur):
    start_date = datetime.datetime.now().replace(hour=10, minute=0, second=0, microsecond=0)
    end_date = start_date + timedelta(days=13)  # Two weeks from now

    current_date = start_date
    while current_date <= end_date:
        for hour in range(10, 20):  # From 10 am to 7 pm
            current_date = current_date.replace(hour=hour, minute=0, second=0, microsecond=0)
            is_booked = False  # You can set this to True if the appointment is booked

            # Check if the appointment already exists
            print(f"appointment day:{current_date.date()}")
            print(f"appointment time:{current_date.time()}")
            cur.execute(
                'SELECT COUNT(*) FROM public."Appointments" WHERE appointment_day = %s AND appointment_time = %s',
                (current_date.date(), current_date.time())
            )
            count = cur.fetchone()[0]

            if count == 0:
                print("in the insert if")
                # Insert into the appointments table
                execute =  f'INSERT INTO public."Appointments"(appointment_day, appointment_time, is_booked) VALUES' +f"('{current_date.date()}', '{current_date.time()}', '{is_booked}')"

                print(execute)
                cur.execute(execute)

        current_date += timedelta(days=1)

if __name__ == "__main__":
    connect()
