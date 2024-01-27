from app import app, db
from farmhub_server.models import User, Farm, Worker, Task




with app.app_context():
    # Create tables
    db.create_all()

 
    user_data = [
        {"firstname": "John", "lastname": "Doe", "username": "john_doe", "email": "john.doe@example.com", "password": "password_1"},
        {"firstname": "Alice", "lastname": "Smith", "username": "alice_smith", "email": "alice.smith@example.com", "password":"password_2"}, 
        {"firstname": "Bob", "lastname": "Johnson", "username": "bob_j", "email": "bob.johnson@example.com", "password": "password_3"},
        {"firstname": "Eva", "lastname": "Williams", "username": "eva_w", "email": "eva.williams@example.com", "password": "password_4"},
        {"firstname": "Michael", "lastname": "Miller", "username": "michael_m", "email": "michael.miller@example.com", "password": "password_5"},
        {"firstname": "Sara", "lastname": "Jones", "username": "sara_j", "email": "sara.jones@example.com", "password":"password_6"} ,
        {"firstname": "David", "lastname": "Davis", "username": "david_d", "email": "david.davis@example.com", "password":"password_7" },
        {"firstname": "Emma", "lastname": "Johnson", "username": "emma_j", "email": "emma.johnson@example.com", "password": "password_8"},
        {"firstname": "Andrew", "lastname": "Taylor", "username": "andrew_t", "email": "andrew.taylor@example.com", "password": "password_9"},
        {"firstname": "Olivia", "lastname": "Martin", "username": "olivia_m", "email": "olivia.martin@example.com", "password": "password_10"},
    ]

   
    for data in user_data:
        new_user = User(**data)
        db.session.add(new_user)

   
    db.session.commit()

 
    worker_data = [
        {"name": "Michael Worker", "role": "Farm Worker", "contact_info": "michael.worker@example.com", "city": "Farmville"},
        {"name": "Sara Farmhand", "role": "Farmhand", "contact_info": "sara.farmhand@example.com", "city": "Rural City"},
        {"name": "David Planter", "role": "Planting Specialist", "contact_info": "david.planter@example.com", "city": "Greensburg"},
        {"name": "Emma Gardner", "role": "Crop Manager", "contact_info": "emma.gardner@example.com", "city": "Harbor City"},
        {"name": "Andrew Farmer", "role": "Livestock Supervisor", "contact_info": "andrew.farmer@example.com", "city": "Meadowville"},
        {"name": "Olivia Agronomist", "role": "Agronomist", "contact_info": "olivia.agronomist@example.com", "city": "Cropfield"},
        {"name": "Bob Rancher", "role": "Rancher", "contact_info": "bob.rancher@example.com", "city": "Cattle Springs"},
        {"name": "Eva Horticulturist", "role": "Horticulturist", "contact_info": "eva.horticulturist@example.com", "city": "Green Valley"},
        {"name": "Alice Soil Scientist", "role": "Soil Scientist", "contact_info": "alice.soilscientist@example.com", "city": "Tillington"},
        {"name": "John Farm Manager", "role": "Farm Manager", "contact_info": "john.farmmanager@example.com", "city": "Harvesttown"},
    ]

  
    for data in worker_data:
        new_worker = Worker(**data)
        db.session.add(new_worker)

    db.session.commit()

    
    task_data = [
        {"worker_id": 1, "farm_id": 1, "task_name": "Planting Crops", "task_status": "Completed"},
        {"worker_id": 2, "farm_id": 2, "task_name": "Harvesting Vegetables", "task_status": "Pending"},
        {"worker_id": 3, "farm_id": 3, "task_name": "Feeding Livestock", "task_status": "Completed"},
        {"worker_id": 4, "farm_id": 4, "task_name": "Repairing Fences", "task_status": "Pending"},
        {"worker_id": 5, "farm_id": 5, "task_name": "Irrigating Fields", "task_status": "Completed"},
        {"worker_id": 6, "farm_id": 6, "task_name": "Inspecting Crops", "task_status": "Pending"},
        {"worker_id": 7, "farm_id": 7, "task_name": "Managing Farm Records", "task_status": "Completed"},
        {"worker_id": 8, "farm_id": 8, "task_name": "Pruning Fruit Trees", "task_status": "Pending"},
        {"worker_id": 9, "farm_id": 9, "task_name": "Preparing Soil", "task_status": "Completed"},
        {"worker_id": 10, "farm_id": 10, "task_name": "Crop Rotation Planning", "task_status": "Pending"},
    ]

    for data in task_data:
        new_task = Task(**data)
        db.session.add(new_task)


    farm_data = [
    {"worker_id": 1, "user_id": 1, "name": "Sunshine Farm", "city": "Farmville"},
    {"worker_id": 2, "user_id": 2, "name": "Green Fields", "city": "Rural City"},
    {"worker_id": 3, "user_id": 3, "name": "Harvest Haven", "city": "Greensburg"},
    {"worker_id": 4, "user_id": 4, "name": "Meadow Meadows", "city": "Harbor City"},
    {"worker_id": 5, "user_id": 5, "name": "Cattle Ranch", "city": "Meadowville"},
    {"worker_id": 6, "user_id": 6, "name": "Cropfield Oasis", "city": "Cropfield"},
    {"worker_id": 7, "user_id": 7, "name": "Sprout Springs", "city": "Cattle Springs"},
    {"worker_id": 8, "user_id": 8, "name": "Green Valley Farms", "city": "Green Valley"},
    {"worker_id": 9, "user_id": 9, "name": "Tillington Farmstead", "city": "Tillington"},
    {"worker_id": 10, "user_id": 10, "name": "Harvesttown Homestead", "city": "Harvesttown"},
]

    for data in farm_data:
        new_farm = Farm(**data)
        db.session.add(new_farm)

 
    db.session.commit()
    
    print("Database seeded successfully!")