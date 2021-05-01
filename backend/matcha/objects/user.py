class User:
    def __init__(self, user_id=None, username=None, password=None, first_name=None, last_name=None,
                 email=None, gender=None, preference=None, biography=None, interests=None, enabled=False):
        self.id = user_id
        self.enabled = enabled
        self.name = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.gender = gender
        self.preference = preference
        self.biography = biography
        self.interests = interests

    def as_dict(self):
        return {
            'username': self.name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'gender': self.gender,
            'preference': self.preference,
            'biography': self.biography
        }
