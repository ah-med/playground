# A Dictionary is a collection which is unordered, changeable and indexed. No duplicate members.


# simple dict
person = {
    'frist_name': 'John',
    'last_name': 'Doe',
    'age': 30
}

# Using constructor
person = dict(first_name='John', last_name='Doe', age=30)

# Access vaue
print(person['first_name'])
print(person.get('last_name'))

# Add key/value
person['phone'] = '555-555-555'

# get the keys
print(person.keys())

# get the values
print(person.items())

# Make a copy
person2 = person.copy()
person2['city'] = 'Boston'

print(person)

# Remove Item
del(person['age'])
person.pop('phone')

# clear the dictionary
person.clear()


# get length
print(len(person2))

# List of dict
people = [
    {'name': 'Martha', 'age': 40},
    {'name': 'Ahmed', 'age': 60}
]

print(people)

print(people[1]['name'])
