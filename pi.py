from faker import Faker
import random
import psycopg2

# Create a Faker instance
fake = Faker()

# Connect to your postgres DB
conn = psycopg2.connect(
    dbname="myappdb",
    user="udaydamerla",
    password="uday@5403D",
    host="localhost",
    port="5432"
)

# Open a cursor to perform database operations
cur = conn.cursor()

for i in range(1, 51):
    # Generate fake data
    customer_name = fake.name()
    age = random.randint(1, 100)
    phone = f"123-456-789{i}"
    location = fake.city()
    created_at = fake.date_time_between(start_date='-1y', end_date='now')

    # Execute the INSERT statement
    cur.execute(
        "INSERT INTO customer (sno, customer_name, age, phone, location, created_at) VALUES (%s, %s, %s, %s, %s, %s)",
        (i, customer_name, age, phone, location, created_at)
    )

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()