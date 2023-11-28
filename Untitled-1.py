import numpy as np
import matplotlib.pyplot as plt
ax = plt.axes(projection = '3d')
x = np.arange(100)
y = np.random.randint(1,100,100)
z = np.random.randint(1,100,100)

ax.scatter(x,y,z)

plt.show()

import numpy as np
import matplotlib.pyplot as plt
ax = plt.axes(projection = '3d')
x = np.arange(-5,5,0.1)
y = np.arange(-5,5,0.1)
X,Y = np.meshgrid(x, y)
Z = np.sin(X)*np.cos(Y)

ax.plot_surface(X,Y,Z,cmap = 'Spectral')
ax.set_title("3D- Plot")
ax.view_init(azim=90, elev=135)
plt.show()


import matplotlib.pyplot as plt
import random 

heads_tails = [0,0]

for _ in range(1000):
    heads_tails[random.randint(0,1)] +=1
print(heads_tails)

import matplotlib.pyplot as plt
import random as r 
head_tails = [0,0]

for _ in range(100):
    head_tails[r.randint(0,1)] += 1 
    plt.bar(['Tails', 'Heads'], head_tails, color = ["Red", 'Blue'])
    plt.pause(0.00001)
print(f"Number of Tails: {head_tails[0]} /n Number of Heads: {head_tails[1]}" )
plt.show()



#head_tails[0] -- tails +1 +1 +1 +1 +1 +1 +1 +1 
# head_tails[1] -- heads +1 +1 +1 +1 +1 +1 +1 +1 +1 +1 +1 +1 +1 +1 +1 



import matplotlib.pyplot as plt
import random

heads_tails = [0, 0]

for _ in range(10):
    heads_tails[random.randint(0, 1)] += 1
    plt.bar(['Heads', 'Tails'], heads_tails, color=['Red', 'Blue'])
    plt.pause(0.0000001)

# Add custom text at the bottom of the chart
custom_text = f"Number of Heads: {heads_tails[0]} \nNumber of Tails: {heads_tails[1]}"
plt.text(0, -0.05, custom_text, ha='center', va='center', transform=plt.gca().transAxes, color = 'Green')

# 0: x-coordinate of the text, 0 means the center of the x-axis.
# -0.05: y-coordinate of the text, -0.05 means below the bottom of the chart.
# 'Custom Text at the Bottom': The actual text you want to display.
# ha='center': Horizontal alignment is set to center.
# va='center': Vertical alignment is set to center.
# transform=plt.gca().transAxes: Specifies that the coordinates are in axes coordinates (0 to 1).
plt.show()



import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0,2,100) #sample data
fig,ax = plt.subplots(figsize = (5,2.7), layout='constrained')
ax.plot(x,x,label = 'Linear')
ax.plot(x,x**2,label = 'Quadratic')
ax.plot(x,x**3,label = 'Cubic')
ax.plot(x,x**4,label = 'Bi-quadratic')
ax.set_label('X-axis')
ax.set_label('Y-axis')
ax.set_title('Simple Plot')
ax.legend()
plt.show()