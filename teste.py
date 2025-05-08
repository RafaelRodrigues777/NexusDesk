import pyautogui
import time
pyautogui.press('win') 
time.sleep(3) 
pyautogui.write('google') 
time.sleep(1)
pyautogui.press('enter') 
time.sleep(2)
print(pyautogui.position())