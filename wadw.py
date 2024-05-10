import random

list_chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

i = 0
token = []
while i < 23:
    if i == 5 or i == 11 or i == 17:  # Corrected condition
        token.append('-')
    else:
        random_index = random.randint(0, len(list_chars) - 1)
        token.append(list_chars[random_index])
    i += 1

# Join the elements of the token list into a single string
token_str = ''.join(token)

print(token_str)




