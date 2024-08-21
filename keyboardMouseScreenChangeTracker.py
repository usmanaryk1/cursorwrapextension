import pyautogui
import pygetwindow as gw
import time
import random
import logging
from threading import Thread, Event

# Configure logging
logging.basicConfig(filename='activity_log.txt', level=logging.INFO, format='%(asctime)s - %(message)s')

stop_event = Event()

def get_vscode_window():
    windows = gw.getWindowsWithTitle('Visual Studio Code')
    if windows:
        return windows[0]  # Get the first VSCode window
    return None

def simulate_keyboard_clicks_and_remove():
    vscode_window = get_vscode_window()
    if vscode_window and vscode_window.isActive:
        num_key_presses = random.randint(5, 15)
        for _ in range(num_key_presses):
            if stop_event.is_set():  # Check stop event before continuing
                return
            random_key = random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            pyautogui.write(random_key)
            logging.info(f"Key typed: {random_key}")
            print(f"Key typed: {random_key}")
            time.sleep(random.uniform(0.1, 0.5))  # Random delay between 100ms and 500ms
            
            # Simulate deleting the typed key
            pyautogui.press('backspace')
            logging.info(f"Key removed: {random_key}")
            print(f"Key removed: {random_key}")
            time.sleep(random.uniform(0.1, 0.5))  # Random delay before the next action

def simulate_mouse_clicks():
    vscode_window = get_vscode_window()
    if vscode_window and vscode_window.isActive:
        num_mouse_clicks = random.randint(5, 10)
        for _ in range(num_mouse_clicks):
            if stop_event.is_set():  # Check stop event before continuing
                return
            pyautogui.click()
            logging.info("Mouse click")
            print("Mouse click")
            time.sleep(random.uniform(1, 2))  # Random delay between 1 and 2 seconds

def activity_loop():
    while not stop_event.is_set():
        simulate_keyboard_clicks_and_remove()
        simulate_mouse_clicks()
        
        # Wait for 1 minute before the next cycle, check stop event
        for _ in range(60):
            if stop_event.is_set():
                return
            time.sleep(1)

def main():
    thread = Thread(target=activity_loop)
    thread.start()
    
    try:
        while not stop_event.is_set():
            user_input = input("Enter 'stop' to stop the script: ").strip().lower()
            if user_input == 'stop':
                stop_event.set()
                break
    except KeyboardInterrupt:
        stop_event.set()
        print("\nScript terminated by user (Ctrl + C).")
    
    thread.join()  # Wait for the thread to finish
    print("Script stopped.")

if __name__ == "__main__":
    main()
