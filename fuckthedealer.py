import random

kortit = []
n = 1
for i in range(0, 52):
    n += 1
    if n == 15:
        n = 2
    kortit.append(n)
n = 0
k = 0
arvaus = 0
kortti = random.choice(kortit)
while True:
    if len(kortit) == 0:
        print('Peli päättyi. Kortit loppuivat.')
        break
    try:
        arvaus = int(input('Arvaa kortti (2 - 14): '))
    except ValueError:
        print('Kirjoita luku.')
    if arvaus == kortti:
        print(f'Oikein! Kortti oli {kortti}. Dealer juo {int(4 / (n + 1))} hölää')
        kortit.remove(kortti)
        kortti = random.choice(kortit)
        if n == 0:
            print('Dealer vaihtuu.')
        k = 0
        n = 0
    elif arvaus < kortti:
        print('Liian pieni arvaus.')
        n += 1
    elif arvaus > kortti:
        print('Liian suuri arvaus.')
        n += 1
    if n == 2:
        print(f'Väärin arvattu. Kortti oli {kortti}. Arvaaja juo 2 hölää ja arvaaja vaihtuu')
        kortit.remove(kortti)
        kortti = random.choice(kortit)
        n = 0
        k += 1
    if k == 3:
        print('Dealer vaihtuu.')
        k = 0




