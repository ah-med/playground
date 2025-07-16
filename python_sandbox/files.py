# Python has functions for creating, reading, updating, and deleting files.

# open a file
myfile = open('myfile.text', 'w')

# Get someinfo
print('Name: ', myfile.name)
print('Is Closed: ', myfile.closed)
print('Opening Mode: ', myfile.mode)

# Write to file
myfile.write('I love python')
myfile.write(' and Javascript')
myfile.close()

# Append to file
myfile = open('myfile.text', 'a')
myfile.write(' and  I love JavaScript')
# myfile.close()

# Read from file
myifle = open('myfile.text', 'r+')
text= myfile.read(100)
print(text)