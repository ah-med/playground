# Strings in python are surrounded by either single or double quotation marks. Let's look at string formatting and some string methods

name = 'brad'
age = 37



# String Formatting

    # Concatenate
    # print('Hello I am' + name + ' and I am ' + str(age))

    # Arguments by position
    # print('{}, {}, {}'.format('a', 'b', 'c'))

    # print('{1}, {0}, {2}'.format('a', 'b', 'c'))

    # Arguments by name
    # print('My name is {name} and I am {age}'.format(name=name, age=age))


    # F-string  (only in 3.6+)
    # print(f'My name is {name} and I am {age}')


# String Methods
s = 'hello theRe world'

# Capitalize first letter
s.capitalize()

# Make everything UpperCase
# print(s.upper())

# Swap Case
# print(s.swapcase())
