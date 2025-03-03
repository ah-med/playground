# A Tuple is a collection which is ordered and unchangeable. Allows duplicate members.
 
# simple tuples
fruit_tuple = ('apples', 'oranges', 'mango')

# print(fruit_tuple)

# cannot change value
# fruit_tuple[1] = 'Grape'

# Tuples with one value should have trailing comma
fruit_tuple_2 = ('Apple',)

# Get length
# print(len(fruit_tuple_2))

# However you can delete an entire tuple
del fruit_tuple_2




# A Set is a collection which is unordered and unindexed. No duplicate members.

fruit_set = {'Apple', 'Orange', 'Mango'}

print(fruit_set)

print('Apple' in fruit_set)

# add to a set
fruit_set.add('Grape')

print(fruit_set)

# remove from a set
fruit_set.remove('Grape')

print(fruit_set)

# clear set
fruit_set.clear()

print(fruit_set)

# to completely delete it
del fruit_set

