import smtplib
import json
import schedule
import time
from datetime import datetime, timedelta


class PyScript:
    def __init__(self):
        self.smtp_server = 'smtp.gmail.com'
        self.smtp_port = 587
        self.smtp_username = 'eshwar.umarengan@gmail.com'
        self.smtp_password = 'vbkq uziz jhli hjpa'

        self.from_email = 'eshwar.umarengan@gmail.com'

    def sendEmail(self, to_email, name, input_time):
        message = f'Subject: Appointment reminder for {name}\n\nYour appointment is today at {input_time}'

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as smtp:
            smtp.starttls()
            smtp.login(self.smtp_username, self.smtp_password)
            print(f"to email:{to_email}, name:{name}, time:{input_time}")
            smtp.sendmail(self.from_email, to_email, message)

    def sendDayOfEmail(self, to_email, name, input_time):
        message = f'Subject: Appointment reminder for {name}\n\nYour appointment is today at {input_time}'

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as smtp:
            smtp.starttls()
            smtp.login(self.smtp_username, self.smtp_password)
            print(f"to email:{to_email}, name:{name}, time:{input_time}")
            smtp.sendmail(self.from_email, to_email, message)    

    def check_appointments(self):
        with open('src/components/appointments.json', 'r') as file:
            data = json.load(file)
        print("in json file")
        today = datetime.now()
        one_day_later = today + timedelta(hours=16)
        print("just outside the loop")
        for appointment in data['appointments']:
            print("inside the loop")
            print(appointment['email'], appointment['name'], appointment['day'], appointment['time'])
            to_email = appointment["email"]
            name = appointment["name"]
            input_time = appointment["time"]
            appointment_time = datetime.strptime(appointment['day'] + ' ' + appointment['time'], '%Y-%m-%d %H:%M')

            #if today < appointment_time < one_day_later:
            self.sendEmail(to_email, name, input_time)

# Create an instance of PyScript
script_instance = PyScript()
print("going to call the script instance")

# Call the sendEmail method to send the email
script_instance.check_appointments()