# A for loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).

people = ['John', 'Janet', 'Karen']

# # simple for loop
# for person in people:
#     print('Current preson ' + person)

# # Break out of loop
# for person in people:
#     print('Current preson: ', person)
#     if person == 'Janet':
#         break

# # continue

# for person in people:
#     if person == 'Janet':
#         continue
#     print('Current preson: ', person)

# # Range
# for i in range(len(people)):
#     print('current person: ', people[i])

# for i in range(0, 10):
#     print('Current number: ', i)

# While loops execute a set of statements as long as a condition is true.
count = 0
while count <=10:
    print('Count ', count)
    count += 1
