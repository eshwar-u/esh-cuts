import json

class AppointmentManager:
    def bookAppointment(self, data_dict):
        # Read existing data
        with open('src/components/appointments.json', 'r') as file:
            data = json.load(file)
            print("Existing data:", data)

        # Append the new appointment
        data['appointments'].append(data_dict)

        # Write the updated data back to the file
        with open('src/components/appointments.json', 'w') as file:
            json.dump(data, file, indent=2)

# Create an instance of AppointmentManager
manager = AppointmentManager()

# Example appointment data
appointment_data = {
    "name": "eshwar",
    "time": "10:00 AM",
    "day": "2023-11-12",
    "phonenumber": "4254998933",
    "email": "eshwar.umarengan@gmail.com"
}

# Book the appointment
manager.bookAppointment(appointment_data)
