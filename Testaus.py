kortit = []
n = 1
for i in range(0, 52):
    n += 1
    if n == 15:
        n = 2
    kortit.append(n)

print(kortit)
