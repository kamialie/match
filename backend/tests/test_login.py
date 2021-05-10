def test_successful_login(client):
    response = client.post('/auth/login', json={
        'username': 'root', 'password': 'pass'
    })
    assert response.status_code == 200

    json_data = response.get_json()
    assert json_data['username'] == 'root'
    assert json_data['biography'] == "I'm the root, what you want?"
    assert json_data['email'] == 'root@gmail.com'
    assert json_data['first_name'] == 'root'
    assert json_data['gender'] is None
    assert json_data['last_name'] == 'sudo'
    assert json_data['preference'] is None
    # assert json_data['token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MjA2NjQxMDR9.JtTl11E-NW3tDBbwJT3aPZK2PRtgPMOVELYWv99RQq4",

    # assert verify_token(email, json_data['token'])

def test_nonexisting_username(client):
    response = client.post('/auth/login', json={
        'username': 'roo', 'password': 'pass'
    })
    assert response.status_code == 400

def test_invalid_password(client):
    response = client.post('/auth/login', json={
        'username': 'root', 'password': 'three'
    })
    assert response.status_code == 400
