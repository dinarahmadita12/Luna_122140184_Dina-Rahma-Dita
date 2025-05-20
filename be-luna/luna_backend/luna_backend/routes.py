def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    
    # Auth routes
    config.add_route('auth_register', '/api/auth/register')
    config.add_route('auth_login', '/api/auth/login')
    config.add_route('get_users', '/api/auth/users')  # Mendefinisikan route untuk mendapatkan daftar pengguna
    config.add_route('delete_user', 'api/auth/users/{id}')  # Mendefinisikan route untuk menghapus pengguna

    # Cycles routes
    config.add_route('cycles_collection', '/api/cycles')
    config.add_route('cycle_item', '/api/cycles/{id}')
    
    # Moods routes
    config.add_route('moods_collection', '/api/moods')
    config.add_route('mood_item', '/api/moods/{id}')
    
    # Symptoms routes
    config.add_route('symptoms_collection', '/api/symptoms')
    config.add_route('symptom_item', '/api/symptoms/{id}')
    
    # Medications routes
    config.add_route('medications_collection', '/api/medications')
    config.add_route('medication_item', '/api/medications/{id}')
    
    # Health Tips routes
    config.add_route('tips_collection', '/api/tips')
    config.add_route('tips_category', '/api/tips/{category}')