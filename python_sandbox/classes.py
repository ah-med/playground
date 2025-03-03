# A class is like a blueprint for creating objects. An object has properties and methods(functions) associated with it. Almost everything in Python is an object

# create class
class User:
    # Constructor
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
    
    def greeting(self):
        return f'My name is {self.name} and I am {self.age}'

    def has_birthday(self):
        self.age += 1

# Init user object using the User class
john = User('John doe', 'john@mail.com', 34)
janet = User('Janet Williams', 'janet@mail.com', 23)

# Edit property
john.age = 38

print(john.age)
print(janet.email)
print(janet.has_birthday())

# call method
print(janet.greeting())

# Extend the class as Customer class
class Customer(User):
        # Constructor
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
        self.balance = 0

    def set_balance(self, balance):
        self.balance = balance
    
    def greeting(self):
        return f'My name is {self.name} and I am {self.age} an I owe {self.balance}'

# Init customer
joe = Customer('Joe Kirk', 'john@mail.com', 43)

print(joe.greeting())

joe.set_balance(500)

print(joe.balance)
print(joe.greeting())